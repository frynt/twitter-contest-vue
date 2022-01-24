<template>
    <div class="container">
        <div class="row">
            <router-link to="/admin/tweeter" class="text-dark">Liste des tweeters</router-link>
        </div>
        <div class="row justify-content-center d-flex">
            <InputText></InputText>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import InputText from '@/components/form/InputText.vue';
import { extend, setInteractionMode, } from 'vee-validate';
import { required } from 'vee-validate/dist/rules'

setInteractionMode('aggressive')
extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

@Component({ components: { InputText  } })
export default class TweeterAdd extends Vue {
    private username: string = "";
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
