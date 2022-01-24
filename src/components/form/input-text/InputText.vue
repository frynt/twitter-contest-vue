<template>
    <validation-provider v-slot="{ errors, valid }" :name="model.name" :rules="rules">
        <b-form-group
            :label="model.label"
        >
            <b-form-input
                v-model="model.value"
                :placeholder="model.placeholder"
                type="text"
            ></b-form-input>
            <b-form-invalid-feedback :state="valid">
                <span v-for="(error, index) in errors" :key="index">{{ error }}</span>
            </b-form-invalid-feedback>
        </b-form-group>
    </validation-provider>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { extend, } from 'vee-validate';
import { InputTextModel } from './InputTextModel';
// eslint-disable-next-line no-unused-vars
import { min } from 'vee-validate/dist/rules'
extend('min', {
  ...min,
  message: '{_field_} should at least {length} characters'
})

@Component({ components: { ValidationProvider, ValidationObserver  } })
export default class TweeterAdd extends Vue {
    @Prop() model!: InputTextModel;
    get rules(): string {
        if (this.model.rules) {
            return this.model.rules.join('|')
        }
        return '';
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
