<template>
  <div>
    <div class="seasons" v-if="seasons && seasons.length > 1">
      Сезоны:
      <button
        v-for="season in seasons"
        :key="season"
        :class="getVBclass(season)"
        @click="activate(season)"
      >{{ season }}</button>
    </div>
    <div class="episodes-container">
      <div v-for="ep in episodes" :key="ep.id" class="episode-list">
        <div v-if="ep.video" class="episode">
          <Player :src="ep.video" />
          Серия {{ ep.ep }}: {{ep.title}}
        </div>
        <div v-else class="episode-textlist">
          Серия {{ ep.ep }}: {{ep.title}}
        </div>
      </div>
    </div>
      <!-- v-sheet>
        <v-slide-group show-arrows dark class="slider-style">
            <v-card>
              <v-row
                class="slider-style"
                align="center"
                justify="center"
              >
                  <div v-for="item in getSeries" :key="item.number">
                    <div class="player-card">
                        <Player :src="item.link" width="215" height="96" :key="item.number + activeSeason"/>
                        Серия {{ item.number }}: {{item.title}}
                    </div>
                  </div>
              </v-row>
            </v-card>
        </v-slide-group>
      </v-sheet -->
  </div>
</template>

<script>
import Player from './Player.vue'
import axios from 'axios'
import { host } from '@/server/settings.js'

export default {
  name: 'SerialWatchLine',
  components: { Player },
  props: {
    serialData: {
      type: Object
    }
  },
  data: () => ({
    activeSeason: 1,
    seasons: null,
    episodes: null,
  }),
  methods: {
    activate (item) {
      this.activeSeason = item
      this.updateSeriesList()
      this.$forceUpdate()
    },
    getVBclass(season) {
      if (this.activeSeason === season) return 'season-btn season-btn--active'
      return 'season-btn'
    },
    updateSeriesList() {
        axios
          .post(host + '/get-episodes', {route: this.serialData.route, season: this.activeSeason})
          .then(response => {
            this.episodes = response.data
          })
    }
  },
  computed: {
    getSeries () {
      return this.seasons[this.activeSeason - 1].series
    }
  },
  created() {
    axios
      .get(host + '/get-seasons-number/' + this.serialData.route)
      .then(response => {
        const seasonsNumber = response.data.count
        this.seasons = []
        for (let i = 0; i < seasonsNumber; i++) {
          this.seasons.push(i+1)
        }
        this.updateSeriesList()
      })
  }
}
</script>

<style>
.seasons {
  font-size: 15pt;
  font-weight: bold;
  margin: 10px 0;
  padding: 10px 0;
}

.season-btn {
  width: 40px;
  height: 40px;
  margin: 0 5px;
  border: 1px solid #eb5804;
  font-weight: normal;
}
.season-btn:hover {
  background-color: #eb5804;
  opacity: .5;
  color: black;
}
.season-btn--active {
  background-color: orangered;
  color: black;
}

.episodes-container {
  margin: 30px 0;
}

.episode-list {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.episode {
  margin: 0 auto 20px;
}

.episode-textlist {
  text-align: left;
}
</style>
