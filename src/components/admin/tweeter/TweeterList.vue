<template>
    <div class="container">
        <div class="row">
            <router-link to="tweeter/add"  class="text-dark">Ajouter</router-link>
        </div>
        <div class="row d-fle justify-content-center align-items-center">
            <b-pagination
                class="col-7"
                v-model="currentPage"
                :total-rows="totalCount"
                :per-page="pageSize"
                @change="handlePageChange"
            ></b-pagination>
            <div class="mb-3 col-5">
                Nombre d'élements par page
                <select v-model="pageSize" @change="handlePageSizeChange($event)">
                    <option v-for="size in pageSizes" :key="size" :value="size">
                        {{ size }}
                    </option>
                </select>
            </div>
        </div>
        <div class="row">
            <b-table striped hover :items="items" :fields="fields" id="my-table">
                <template #cell(name)="data">
                    {{ data.value }}
                </template>
                <template #cell(username)="data">
                    @{{ data.value }}
                </template>
                <template #cell(profilePictureURL)="data">
                    <img v-bind:src="data.value"/>
                </template>
            </b-table>
        </div>
    </div>
</template>
<script lang="ts">
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';
import config from '@/assets/config.json';

@Component
export default class TweeterList extends Vue {
    private items: Tweeter[] = [];
    private fields = [
            { key: 'name', label: 'Nom' },
            { key: 'username', label: 'Username' },
            { key: 'profilePictureURL', label: 'Photo' }
    ];
    private pageSize =  5;
    private currentPage = 1;
    private totalCount = 0;
    private pageSizes = [5,10,15,20];

    private async initItems() {
        try {
            const itemsResponse =  await axios.get(`${config.api_url}/tweeters?pageNumber=${this.currentPage}&pageSize=${this.pageSize}`);
            this.items = itemsResponse.data;
            this.totalCount = JSON.parse(itemsResponse.headers['paging-headers'])['totalCount'];
        } catch(error) {
            console.error(error);
        }
    }

    async mounted() {
        this.initItems();
    }

    handlePageChange(value: number) {
      this.currentPage = value;
      this.initItems();
    }

    handlePageSizeChange() {
        this.initItems();
    }
}

interface Tweeter {
    id: string,
    username: string,
    profilePictureURL: string,
    name: string
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
