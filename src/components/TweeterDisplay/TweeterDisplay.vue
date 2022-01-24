<template>
  <div   
    v-on:click="tweeterDisplayClicked()"
    class="rounded tweeterDisplay"      
    v-bind:class="{ 
      'btn': !tweeterDisplayModel.hasResponse, 
      'btn-primary': !tweeterDisplayModel.hasResponse, 
      'bg-light': tweeterDisplayModel.hasResponse, 
      'border': tweeterDisplayModel.hasResponse,
      'border-success': tweeterDisplayModel.hasResponse && tweeterDisplayModel.isSuccess,
      'border-danger': tweeterDisplayModel.hasResponse && !tweeterDisplayModel.isSuccess
    }">
    <div class="row">
      <div class="col-12 text-center">
        <h5 class="">{{ tweeterDisplayModel.user.name }}</h5>
      </div>
    </div>
    <div class="row  align-items-center">
      <div class="col-12 text-center">
        <img v-bind:src="tweeterDisplayModel.user.profileImageURL" />
        <h5 class="mt-3" v-if="tweeterDisplayModel.hasResponse" >
          <span class="badge badge-info"> {{ tweeterDisplayModel.likes }} likes</span>
        </h5>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { TweeterDisplayModel } from './TweeterDisplayModel';

@Component
export default class TweeterDisplay extends Vue {
  @Prop() private tweeterDisplayModel!: TweeterDisplayModel;

  tweeterDisplayClicked() {
    this.$emit("clicked");
  }
}
</script>

<style scoped>
.tweeterDisplay {
  border-width: 3px !important;
}
</style>
