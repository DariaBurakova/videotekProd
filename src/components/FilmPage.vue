<template>
  <div class="film-page">
    <div class="film-page-content" v-if="filmData">
      <div class="film-data-block">
        <div class="left-column">
          <img :src="getImgUrl(filmData.image)" alt="film data" />
          <button class="btn">В избранное</button>
          <button
            v-if="filmData.trailer && filmData.type !== 'video'"
            class="btn"
            @click="isTrailer = !isTrailer"
          >
            Трейлер
            <span v-show="isTrailer" class="btn-flag">▾</span>
          </button>
          <button class="backbtn" @click="$router.go(-1)">➔</button>
        </div>
        <div class="film-data">
          <div class="underlined position">
            <h1>{{ filmData.title }}</h1>
            <div class="score-block" v-if="filmData.rating">
              Рейтинг: <strong>{{ (+filmData.rating).toPrecision(2) }}</strong>
            </div>
          </div>
          <p v-if="filmData.agelimit" class="age-boundary">{{ filmData.agelimit }}+</p>
          <div v-if="filmData.description" v-html="filmData.description" class="film-page-description"></div>
          <h2 class="underlined">{{ varAbout }}</h2>
          <p v-if="filmData.country">
            <em class="parameter">Страна:</em> {{ filmData.country }}
          </p>
          <p v-if="filmData.release_year">
            <em class="parameter">Год выпуска:</em> {{ filmData.release_year }}
          </p>
          <p v-if="filmData.genres && filmData.genres.length > 0">
            <em class="parameter">Жанр<span v-if="filmData.genres.length > 1">ы</span>:</em> {{ filmCategories }}
          </p>
          <div v-if="directors && directors.length > 0" class="actors-paragraph">
            <em class="param-paragraph parameter">Режиссёр<span v-if="directors.length > 1">ы</span>:</em>
            <ul class="directors-list inline-ul">
              <li
                v-for="director in directors"
                :key="director.route"
                class="inline-li"
              >
                <router-link
                  class="routerLink"
                  :to="'/person/' + director.route"
                >{{ director.name }}</router-link>
              </li>
            </ul>
          </div>
          <div v-if="actors && actors.length > 0" class="actors-paragraph">
            <p class="param-paragraph parameter">В главных ролях:</p>
            <ul class="actors-list inline-ul">
              <li
                v-for="actor in actors"
                :key="actor.route"
                class="inline-li"
              >
                <router-link
                  class="routerLink"
                  :to="'/person/' + actor.route"
                  >{{ actor.name }}</router-link>
              </li>
            </ul>
          </div>
          <FilmPlayers v-if="filmData.type === 'film' || filmData.type === 'video'"
            :filmData="filmData"
            :isTrailerVisible="isTrailer"
          />
          <SerialWatchLine v-if="filmData.type === 'serial'" :serialData="filmData" />
          <Vote :contentRoute="filmData.route" :contentType="filmData.type" />
          <h2 class="underlined">Отзывы</h2>
          <Comment :filmRoute="filmData.route" />
        </div>
      </div>
      <ToTopButton/>
    </div>
  </div>
</template>

<script>
import Vote from './Vote'
import FilmPlayers from './FilmPlayers'
import Comment from './Comment'
import SerialWatchLine from './SerialWatchLine'
import axios from 'axios'
import { host } from '@/server/settings.js'
import ToTopButton from "@/components/ToTopButton";

export default {
  name: "FilmPage",
  components: {ToTopButton, Vote, Comment, FilmPlayers, SerialWatchLine },
  data: () => ({
    filmData: undefined,
    directors: null,
    actors: null,
    isTrailer: false,
    varAbout: null,
  }),
  methods: {
    getImgUrl(img) {
      return host + '/images/' + img
    },
  },
  beforeCreate() {
    const filmRoute = this.$route.params.route
    axios
      .get(host + '/get-videocontent-info/' + filmRoute)
      .then(result => {
        this.filmData = result.data
        switch (this.filmData.type) {
          case 'film':
            this.varAbout = 'О фильме'
            this.varVote = 'фильм'
            break;
          case 'serial':
            this.varAbout = 'О сериале'
            this.varVote = 'сериал'
            break;
          case 'video':
            this.varAbout = 'Об этом видео'
            this.varVote = 'видео'
            break;
      }
    })
    axios
      .get(host + '/get-directors/' + filmRoute)
      .then(result => {
        this.directors = result.data
      })
    axios
      .get(host + '/get-actors/' + filmRoute)
      .then(result => {
        this.actors = result.data
      })
  },
}
</script>

<style>
.inline-li {
  list-style-type: none;
  display: inline;
  margin-top: 10px;
  margin-bottom: 10px;
}
.inline-li:not(:last-of-type)::after {
  content: ", ";
}

.inline-ul {
  display: inline;
  line-height: 150%;
}
.inline-ul::before {
  content: " ";
}

.underlined {
    border-bottom: 4px solid transparent;
    border-image: linear-gradient(to right, #eb5804 0%, black 90%);
    border-image-slice: 1;
    padding-bottom: 6pt;
    margin-bottom: 6pt;
}

.position {
  position: relative;
}

.listButton {
  list-style: none;
  display: flex;
  justify-content: space-between;
}

.film-data {
  margin: 15px 0;
}

.film-page h1 {
  max-width: 80%;
  font-size: 25pt;
}
.film-page h2 {
  font-size: 18pt;
  margin-top: 30px;
}
.film-data .parameter {
  font-size: 15pt;
  font-style: normal;
  font-weight: bold;
}
.film-data p {
  font-size: 12pt;
  line-height: 1.5;
}
.film-page-description {
  margin-top: 12pt;
  margin-bottom: 12pt;
  text-align: justify;
  line-height: 1.5;
}

.data-block {
  display: flex;
  align-items: flex-end;
}

.data-block p {
  margin-left: 5px;
}

.left-column {
  margin-top: 30px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
}

.btn {
  border: 1px solid #eb5804;
  padding: 5px 30px;
  margin: 20px 30px 10px;
  color: #eb5804;
  position: relative;
  transition: all 0.3s ease-in;
}
.btn:hover {
  background: #eb5804;
  color: black;
}

.film-page-content {
  margin: 20px auto;
  padding: 10px 15px;
  width: 1140px;
}

.film-data-block {
  display: flex;
  position: relative;
}

.age-boundary {
  width: 50px;
  text-align: center;
  font-weight: 900;
  color: white;
  background-color: #eb5804;
  padding: 8px 8px;
  font-size: 10pt;
  border-radius: 2px;
  margin-bottom: 10px;
}

.routerLink {
  text-decoration: none;
  color: white;
  white-space: nowrap;
}
.routerLink:hover {
  color: #eb5804;
}

.score-block {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 18pt;
}

.btn-toggle {
  display: flex;
  justify-content: center;
}

.btn-flag {
  position: absolute;
  right: 10px;
}

.backbtn {
  font-size: 18pt;
  color: #eb5804;
  opacity: .8;
  border: 1px solid #eb5804;
  width: 40px;
  height: 40px;
  margin: 30px auto;
  transform: rotate(180deg);
  transition: all 0.3s ease-in;
  position: absolute;
  top: -50px;
  left: -50px;
}
.backbtn:hover {
  color: black;
  background-color: #eb5804;
}

.actors-paragraph {
  display: flex;
  align-items: flex-start;
}

.param-paragraph {
  white-space: nowrap;
  padding-right: 10px;
}

.actors-list {
  margin-top: 5px;
}

.directors-list {
  margin-top: 2px;
}
</style>
