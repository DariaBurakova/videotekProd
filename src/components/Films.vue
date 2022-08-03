<template>
  <div class="container-list">
    <h1 v-if="this.filmsOrSerials === 'Films'">Фильмы от VIDEOTEK</h1>
    <h1 v-else>Сериалы от VIDEOTEK</h1>
    <hr class="line"/>
    <button @click="show = !show" class="btn-genre">{{ this.genre }}<span class="flag">▾</span></button>
    <div class="filter" v-show="show">
      <button
          class="btn"
          @click="onGenreClick(item)"
          v-for="(item, index) in genres"
          :key="index"
          v-bind:value="item">
        {{ item.genre }}
      </button>
    </div>
    <div class="films-list">
      <CardFilm
          v-for="film in genreFilms ? genreFilms : allFilms"
          :key="film.id"
          :film="film"
          :img="film.img"/>
    </div>
    <hr class="line" v-if="showPagination"/>
    <div v-if="paginationLength">
      <v-pagination
          v-model="page"
          :length="paginationLength"
          dark
          color="#eb5804"
          :total-visible="7"
      ></v-pagination>
    </div>

  </div>
</template>

<script>
import axios from "axios"
import CardFilm from "./CardFilm.vue"
import {host} from "@/server/settings";

export default {
  name: "Films",
  data: () => ({
    allFilms: null,
    genres: null,
    genreFilms: null,
    show: false,
    filmsOrSerials: '',
    genre: 'Жанры',
    page: 1,
    paginationLength: null,
    showPagination: false,
    genreId: null,
  }),
  components: {CardFilm},
  methods: {
    onGenreClick(item) {
      if (item.id === 0) {
        this.genreFilms = null
        this.genre = 'Жанры'
        this.page = 1
        this.refreshData()
        this.getPaginationLength()
      } else {
        this.genreId = item.id
        this.genre = item.genre
        this.page = 1
        this.refreshData()
      }
    },
    updateAllFilms(result) {
      this.allFilms = result.data
    },
    updateGenres(result) {
      this.genres = result.data
    },
    getPaginationLength () {
      axios
          .get(host + '/get-number-of-films')
          .then(result => {
            this.paginationLength = Math.ceil(+result.data.count / 3)
          })
      // this.showPagination = this.paginationLength > 0 && this.filmsOrSerials === 'Films'
    },
    refreshData() {
      if (this.filmsOrSerials === 'Films') {
        axios
            .post(host + '/get-genres', { contentType: 'film' })
            .then((result) => {
              this.updateGenres(result)
            })
        if (this.genre === 'Жанры') {
          if (this.page === this.paginationLength && this.page !== 1) {
            axios
                .post(host + '/get-films', {order: 'newest', arrayLength: 1, page: 10})
                .then((result) => {
                  this.updateAllFilms(result)
                })
          } else {
            axios
                .post(host + '/get-films', {order: 'newest', arrayLength: 3, page: this.page})
                .then((result) => {
                  this.updateAllFilms(result)
                })
          }
        } else {
          axios
              .get(host + '/get-number-of-films/'+ this.genreId)
              .then(result => {
                this.paginationLength = Math.ceil(result.data.count / 1)
              })
          axios
              .post(host + '/get-films', {order: 'newest', arrayLength: 1, page: this.page, sort: this.genreId})
              .then((result) => {
                this.genreFilms = result.data
              })
        }
      }
      if (this.filmsOrSerials === 'Serials') {
        axios
            .post(host + '/get-genres', { contentType: 'serial' })
            .then((result) => {
              this.updateGenres(result)
            })
        axios
            .get(host + '/get-serials')
            .then((result) => {
              this.updateAllFilms(result)
              this.paginationLength = null
            })
      }
    }
  },
  watch: {
    $route(to, from) {
      this.filmsOrSerials = this.$route.name
      this.genre = 'Жанры'
      this.genreId = null
      this.refreshData()
      this.show = false
      this.genreFilms = null
    },
    page: function () {
      this.refreshData()
      window.scrollTo(0, 0)
    }
  },
  created() {
    this.filmsOrSerials = this.$route.name
    this.refreshData()
    this.getPaginationLength()
  },
};
</script>

<style scoped>
.container-list {
  width: 1140px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
}

.films-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 5%;
  grid-row-gap: 10px;
}

.container-list h1 {
  font-size: 24pt;
  padding-bottom: 5px;
}

.btn {
  margin: 3px 10px;
  padding: 0;
  border: 1px solid #2c1101;
  border-radius: 10px 0 10px 0;
  color: #eb5804;
  transition: all 0.3s ease-in;
}

.btn:hover {
  background: #eb5804;
  color: black;
}

.btn-genre {
  border: 1px solid #eb5804;
  padding: 4px 4px;
  width: 235px;
  margin-bottom: 10px;
  color: #eb5804;
  transition: all 0.3s ease-in;
}

.btn-genre:hover {
  background: #eb5804;
  color: black;
}

.filter {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 40px;
}

.btn-bottom {
  margin: 0 auto;
}

.flag {
  margin-left: 10px;
}
</style>
