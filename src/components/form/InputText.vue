<template>
    <validation-observer v-slot="{ invalid }">
        <b-form>
            <validation-provider v-slot="{ errors, valid }" name="username" rules="required">
                <b-form-group
                    label="username: "
                >
                    <b-form-input
                    v-model="username"
                    placeholder="Enter Username"
                    required
                    type="text"
                    ></b-form-input>
                    <b-form-invalid-feedback :state="valid">
                        <span v-for="(error, index) in errors" :key="index">{{ error }}</span>
                    </b-form-invalid-feedback>
                </b-form-group>
            </validation-provider>
            <b-button variant="success" :disabled="invalid">Ajouter</b-button>
        </b-form>
    </validation-observer>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

@Component({ components: { ValidationProvider, ValidationObserver  } })
export default class TweeterAdd extends Vue {
    private username: string = "";
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
