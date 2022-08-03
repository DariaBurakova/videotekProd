<template>
  <v-carousel cycle :show-arrows="false" height="60vh">
    <v-carousel-item v-for="(item, i) in carousel" :key="i">
      <router-link :to="{ name: 'filmPage', params: { route: item.route } }">
        <img :src="getImgUrl(item.poster)" class="carouselImg" alt="film"/>
      </router-link>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import {host} from '@/server/settings'
import axios from "axios";

export default {
  name: 'FilmCarousel',
  data: () => ({
    carousel: []
  }),
  methods: {
    getImgUrl(img) {
      return host + '/images/' + img
    }
  },
  created() {
    axios
        .post(host + '/get-videocontent')
        .then(result => {
          const arr = result.data
          let n = Math.min(arr.length, 4)
          let selection = []
          let taken = []
          let x = Math.floor(Math.random() * arr.length);
          while (n--) {
            while (taken.includes(x) || !arr[x].poster) {
              x = Math.floor(Math.random() * arr.length)
            }
            taken.push(x)
            selection.push(arr[x])  
          }
          this.carousel = selection
        })
  }
}
</script>

<style>
.carouselImg {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
