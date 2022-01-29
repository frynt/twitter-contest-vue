<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-12 text-center">
        <h2>
          Devine qui a réalisé le <b>plus de likes</b> sur ses dix derniers tweets : 
        </h2>
      </div>
    </div>
    <div class="row d-flex align-items-center mt-4">
      <div 
        class="userDisplayContainer col-4 p-3"
        v-on:click="tweeterDisplayAClicked()">
        <TweeterDisplay v-if="tweeterDisplayModelA" :tweeterDisplayModel="tweeterDisplayModelA"></TweeterDisplay>
      </div>
      <div class="col-4 text-center">
        <h1 v-if="isDisplayOr">ou</h1>
        <div v-if="isUserDisplayHasResponse">
          <h4 class="rounded text-success pb-1" v-if="isDisplayWin">Gagné</h4>
          <h4 class="rounded text-danger pb-1" v-if="!isDisplayWin">Perdu</h4>
          <button id="nextDuel" v-on:click="nextDuelClicked()" class="btn btn-primary text-center">Suivant</button>
        </div>
      </div>
      <div 
        class="tweeterDisplayContainer col-4 p-3"
        v-on:click="tweeterDisplayBClicked()">
        <TweeterDisplay v-if="tweeterDisplayModelB" :tweeterDisplayModel="tweeterDisplayModelB"></TweeterDisplay>
      </div>
    </div>
      <div class="row mt-4">
      <div class="col-3"></div>
      <div class="col-6">
        <b-progress 
        :variant="'info'" show-progress 
        animated>
        <b-progress-bar :value="progressBarValue" :label="`${progressBarValue.toFixed(0)}%`"></b-progress-bar>
        </b-progress>
      </div>
      <div class="col-3"></div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        {{remainingDuels}} duels à suivre
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TweeterDisplay from './TweeterDisplay/TweeterDisplay.vue';
import { TweeterDisplayModel } from '../components/TweeterDisplay/TweeterDisplayModel';
import config from '@/assets/config.json';
import axios from 'axios';

@Component({
  components: {
    TweeterDisplay
  },
})
export default class App extends Vue {
  tweeterDisplayModelA: TweeterDisplayModel | null = null;
  tweeterDisplayModelB: TweeterDisplayModel | null = null;
  isDisplayOr = true;
  isUserDisplayHasResponse: boolean = false;
  isDisplayWin = false;
  contest: Contest | null = null;
  duel: Duel | null = null;

  constructor() {
    super();
  }

    async mounted() {
      let contestId: string | null = null;
      if (localStorage.getItem('contest') != null) {
        try {
          contestId = localStorage.getItem('contestId');
        } catch (error) {
          console.error('unable to parse localStorage contest');
        }
      }
      let contest: Contest | null = null;
      if (contestId == null) {
        try {
          contest =  (await axios.post(`${config.api_url}/contests`)).data;
          localStorage.setItem('contestId', contest!.id);
        } catch(error) {
            console.error(error);
        }
      } else {
          try {
          contest =  (await axios.get(`${config.api_url}/contests/${contestId}`)).data;
        } catch(error) {
            console.error(error);
        }
      }
      if (contest ==null) {
        console.error('no contest retrieved');
        return;
      }
      this.contest = contest;
      this.initNextDuel();
    }
  
  async initNextDuel(): Promise<void> {
      if (this.contest?.nextDuelsIds.length === 0) {
          localStorage.removeItem('contestId');
          alert('Vous avez terminé !')
          window.location.reload();
      }
      try {
          this.duel =  (await axios.get(`${config.api_url}/duels/${this.contest?.nextDuelsIds[0]}`)).data;
          const [tweeterAResponse, tweeterBResponse] = await Promise.all([
             axios.get(`${config.api_url}/tweeters/${this.duel!.proposalTweeterAId}`),
             axios.get(`${config.api_url}/tweeters/${this.duel!.proposalTweeterBId}`)
          ]);
          const tweeterA: Tweeter = tweeterAResponse.data;
          const tweeterB: Tweeter = tweeterBResponse.data;
          this.tweeterDisplayModelA = {
            user: tweeterA,
            isSuccess: false,
            hasResponse: false,
            likes: null
          };
          this.tweeterDisplayModelB = {
            user: tweeterB,
            isSuccess: false,
            hasResponse: false,
            likes: null
          };
          this.isDisplayOr = true;
          this.isUserDisplayHasResponse = false;
      } catch(error) {
            console.error(error);
      }
  }

  async tweeterDisplayAClicked() {
    try {
      const duel: Duel =  (await axios.patch(`${config.api_url}/duels/${this.duel!.id}`, {UserProposalTweeterId : this.tweeterDisplayModelA!.user.id})).data;
      this._userDisplayPostClick(duel);
    } catch (error) {
      console.error(error);
    }
  }

  async tweeterDisplayBClicked() {
    try {
      const duel: Duel =  (await axios.patch(`${config.api_url}/duels/${this.duel!.id}`, {UserProposalTweeterId : this.tweeterDisplayModelB!.user.id})).data;
      this._userDisplayPostClick(duel);
    } catch (error) {
      console.error(error);
    }
  }

  nextDuelClicked() {
    this.initNextDuel();
  }

  get progressBarValue() : number {
    if (this.contest) {
      return this.contest.previousDuelsIds.length / 
      (this.contest.nextDuelsIds.length + this.contest.previousDuelsIds.length)
       * 100;
    }
    return 0;
  }

  get remainingDuels() : number {
    if (this.contest) {
      return this.contest.nextDuelsIds.length;
    }
    return 0;
  }

  private _userDisplayPostClick(duel: Duel) {
    this.isDisplayWin = duel.isWin;
    this.tweeterDisplayModelA!.isSuccess = duel.responseTweeterId === this.tweeterDisplayModelA!.user.id;
    this.tweeterDisplayModelB!.isSuccess = duel.responseTweeterId === this.tweeterDisplayModelB!.user.id;
    this.isDisplayOr = false;
    this.tweeterDisplayModelA!.likes = duel.tweeterALikes;
    this.tweeterDisplayModelB!.likes = duel.tweeterBLikes;
    this.tweeterDisplayModelA!.hasResponse = true;
    this.tweeterDisplayModelB!.hasResponse = true;
    this.isUserDisplayHasResponse = true;
    // eslint-disable-next-line no-debugger
    this.contest!.previousDuelsIds.push(this.contest!.nextDuelsIds.shift() as string);
  }
}

interface Contest {
  id: string;
  previousDuelsIds: string[];
  nextDuelsIds: string[];
}
interface Duel {
  id: string;
  proposalTweeterAId: string;
  proposalTweeterBId: string;
  userProposalTweeterId: string | null;
  tweeterALikes: number | null;
  tweeterBLikes: number | null;
  isWin: boolean;
  responseTweeterId: string;
}
interface Tweeter {
  id: string;
  username: string;
  name: string;
  profilePictureURL: string;
}
</script>

<style>
.tweeterDisplayContainer {
    border-width: 3px !important;
}
#nextDuel{
    animation-name: transform;
    transform-origin: center middle;
    font-size:20px;
    animation-iteration-count: infinite;
    animation-duration: 0.5s;
    animation-direction: alternate;
}

@keyframes transform{
    from {
        transform:scale(.8);
    }

    to {
        transform:scale(1);
    }
}
</style>
