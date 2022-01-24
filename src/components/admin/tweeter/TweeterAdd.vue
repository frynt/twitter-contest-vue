<template>
    <div class="container">
        <div class="row">
            <router-link to="/admin/tweeter" class="text-dark">Liste des tweeters</router-link>
        </div>
        <validation-observer v-slot="{ invalid }">
            <b-form>
                <div class="row">
                        <InputText :model="usernameInputTextModel"></InputText>
                </div>
                <div class="row">
                        <InputText :model="nameInputTextModel"></InputText>
                </div>
                 <b-button variant="success" :disabled="invalid">Ajouter</b-button>
            </b-form>
        </validation-observer>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import InputText from '@/components/form/input-text/InputText.vue';
import { extend, setInteractionMode, } from 'vee-validate';
import { required } from 'vee-validate/dist/rules'
import { InputTextModel } from '@/components/form/input-text/InputTextModel';
import { ValidationObserver } from 'vee-validate';

setInteractionMode('aggressive')
extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

@Component({ components: { InputText, ValidationObserver  } })
export default class TweeterAdd extends Vue {
    private usernameInputTextModel: InputTextModel = {
        name: "username",
        value: null,
        placeholder: "Enter a linkedin username",
        rules: ['required', 'min:3' ],
        label: "Username"
    };
    private nameInputTextModel: InputTextModel = {
        name: "name",
        value: null,
        placeholder: "Enter a name",
        rules: ['required', 'min:3' ],
        label: "Name"
    };

    constructor() {
        super();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
