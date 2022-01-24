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

  constructor() {
    super();
    this.tweeterDisplayModelA = {
      user: {
        name: "Emmanuel Macron",
        profileImageURL: "https://pbs.twimg.com/profile_images/1308812357502668812/jSVlszOa_normal.jpg"
      },
      likes: 1500,
      isSuccess: false,
      hasResponse: false
    }
    this.tweeterDisplayModelB = {
      user: {
        name: "Britney Spears",
        profileImageURL: "https://pbs.twimg.com/profile_images/1323418800876777474/0w4orMOC_normal.jpg"
      },
      likes: 500,
      isSuccess: false,
      hasResponse: false
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
    this.isDisplayOr = true;
    this.tweeterDisplayModelA.hasResponse = false;
    this.tweeterDisplayModelB.hasResponse = false;
    this.isUserDisplayHasResponse = false;
  }

  private _userDisplayPostClick() {
    this.tweeterDisplayModelA.isSuccess = true;
    this.isDisplayOr = false;
    this.tweeterDisplayModelA.hasResponse = true;
    this.tweeterDisplayModelB.hasResponse = true;
    this.isUserDisplayHasResponse = true;
  }
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
