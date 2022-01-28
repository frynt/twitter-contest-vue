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
                <div class="row">
                    <p class="text-danger" v-if="errorMessage">{{errorMessage}}</p>
                    <p class="text-success" v-if="successMessage">{{successMessage}}</p>
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

    private errorMessage: string = "";
    private successMessage: string = "";

    constructor() {
        super();
    }

    async onSubmit() {
        this.errorMessage = "";
        this.successMessage = "";
        // axios.interceptors.response.use((response) => {
        //     return response;
        //     }, function (error) {
        //         return Promise.reject(error);
        // });
        // try {
        //     await axios
        //     .post('https://localhost:7064/api/tweeters/twitter', {
        //         username: this.usernameInputTextModel.value,
        //         name: this.nameInputTextModel.value
        //     });
        //     this.successMessage = "Le tweeter a bien été ajouté";
        // } catch (error: any) {
        //     console.log(error);
        //     // eslint-disable-next-line no-debugger
        //     debugger;

        // }
        
        axios.post('https://localhost:7064/api/tweeters/twitter', {
            username: this.usernameInputTextModel.value,
            name: this.nameInputTextModel.value
        })
        .then(() => { 
            this.successMessage = "Le tweeter a bien été ajouté";
        })
        .catch((error: any) => {
            if (error.response.data.error) {
                this.errorMessage = error.response.data.error;
            } else {
                this.errorMessage = "Une erreur est survenue";
            }
        });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
