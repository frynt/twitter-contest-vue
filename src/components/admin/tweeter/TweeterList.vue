<template>
    <div class="container">
        <div class="row">
            <router-link to="tweeter/add"  class="text-dark">Ajouter</router-link>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TweeterList extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
