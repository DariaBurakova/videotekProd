<template>
  <div class="search-container">
    <transition name="moveleft">
      <v-text-field
        v-show="show"
        v-model="search"
        @keyup.enter="searchFilm"
        placeholder="Название фильма"
        class="search-input"
        regular
        dense
        single-line
      />
    </transition>
    <v-btn icon @click="onSearchClick">
      <v-icon v-if="show">mdi-close</v-icon>
      <v-icon v-else>mdi-magnify</v-icon>
    </v-btn>
  </div>
</template>

<script>
import axios from 'axios'
import { host } from '@/server/settings.js'

export default {
  name: 'Search',
  data: () => ({
    show: false,
    search: '',
    // jumpCounter: 0
  }),
  methods: {
    onSearchClick() {
      this.show = ! this.show
      this.search = ''
    },
    searchFilm() {
            axios
        .post(host + '/go-search', { searchString: this.search })
        .then(response => {
          const result = response.data
          console.log(result)
          if (result.length === 1) {
            // this.jumpCounter++
            this.$router.push('/films/' + result[0].route)
            this.$router.go()
          }
        })
    },
  }
}
</script>

<style>
.search-container {
  display: flex;
  align-items: center;
}

.search-input {
  width: 200px;
}

.moveleft-enter-active, .moveleft-leave-active {
  width: 200px;
  transition: width .5s ease;
}
.moveleft-enter, .moveleft-leave-to {
  width: 0;
}
</style>
