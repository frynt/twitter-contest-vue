<template>
    <div class="container">
        <div class="row">
            <router-link to="/admin/tweeter" class="text-dark">Liste des tweeters</router-link>
        </div>
        <validation-observer v-slot="{ invalid }">
            <b-form @submit="onSubmit">
                <div class="row">
                        <InputText :model="usernameInputTextModel"></InputText>
                </div>
                <div class="row">
                        <InputText :model="nameInputTextModel"></InputText>
                </div>
                 <div class="row">
                    <b-button type="submit" variant="success" :disabled="invalid">Ajouter</b-button>
                 </div>
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
import axios from 'axios';

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

    async onSubmit() {
        try {
            const result: any = await axios
            .post('https://localhost:7064/api/tweeters/twitter', {
                username: this.usernameInputTextModel.value,
                name: this.nameInputTextModel.value
            });
            alert(result.data.id);
        } catch (error) {
            console.error(error);
            alert("Une erreur est survenue");
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
