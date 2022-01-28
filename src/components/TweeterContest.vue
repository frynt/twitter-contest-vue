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
        <TweeterDisplay :tweeterDisplayModel="tweeterDisplayModelA"></TweeterDisplay>
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
        <TweeterDisplay :tweeterDisplayModel="tweeterDisplayModelB"></TweeterDisplay>
      </div>
    </div>
      <div class="row mt-4">
      <div class="col-3"></div>
      <div class="col-6">
        <b-progress :value="25" :variant="'info'" show-progress animated></b-progress>
      </div>
      <div class="col-3"></div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        40 duels restants
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
  tweeterDisplayModelA!: TweeterDisplayModel;
  tweeterDisplayModelB!: TweeterDisplayModel;
  isDisplayOr = true;
  isUserDisplayHasResponse: boolean = false;
  isDisplayWin = false;
  contest: Contest | null = null;

  constructor() {
    super();
    this.tweeterDisplayModelA = {
      user: {
        name: "Emmanuel Macron",
        profilePictureURL: "https://pbs.twimg.com/profile_images/1308812357502668812/jSVlszOa_normal.jpg"
      },
      likes: 1500,
      isSuccess: false,
      hasResponse: false
    }
    this.tweeterDisplayModelB = {
      user: {
        name: "Britney Spears",
        profilePictureURL: "https://pbs.twimg.com/profile_images/1323418800876777474/0w4orMOC_normal.jpg"
      },
      likes: 500,
      isSuccess: false,
      hasResponse: false
    }
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
          alert('fini !')
      }
      try {
          const duel: Duel =  (await axios.get(`${config.api_url}/duels/${this.contest?.nextDuelsIds[0]}`)).data;
          const [tweeterAResponse, tweeterBResponse] = await Promise.all([
             axios.get(`${config.api_url}/tweeters/${duel.proposalTweeterAId}`),
             axios.get(`${config.api_url}/tweeters/${duel.proposalTweeterBId}`)
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

  tweeterDisplayAClicked() {
   this._userDisplayPostClick();
   this.isDisplayWin = true;
  }

  tweeterDisplayBClicked() {
    this._userDisplayPostClick();
    this.isDisplayWin = false;
  }

  nextDuelClicked() {
    this.initNextDuel();
  }

  private _userDisplayPostClick() {
    this.tweeterDisplayModelA.isSuccess = true;
    this.isDisplayOr = false;
    this.tweeterDisplayModelA.hasResponse = true;
    this.tweeterDisplayModelB.hasResponse = true;
    this.isUserDisplayHasResponse = true;
  }
}

interface Contest {
  id: string;
  pastDuelIds: string[];
  nextDuelsIds: string[];
}
interface Duel {
  id: string;
  proposalTweeterAId: string;
  proposalTweeterBId: string;
  userProposalTweeterId: string | null;
  tweeterALikes: number | null;
  tweeterBLikes: number | null;
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
