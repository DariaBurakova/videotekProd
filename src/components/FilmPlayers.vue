<template>
  <div class="film-players">
    <div v-if="filmData.trailer && filmData.type !== 'video'">
      <transition name="fade">
        <div
          v-show="isTrailerVisible"
          class="player centered"
        >
          <Player :src="filmData.trailer" />
        </div>
      </transition>
    </div>
    <div class="player-margins centered" v-if="filmData.video">
      <Player :src="filmData.video" />
    </div>
  </div>
</template>

<script>
import Player from './Player.vue';

export default {
  name: 'FilmPlayers',
  components: { Player },
  props: {
    filmData: {
      type: Object
    },
    isTrailerVisible: {
      type: Boolean
    }
  }
}
</script>

<style>
.film-players {
  margin-top: 40px;
}

.centered {
  display: flex;
  justify-content: center;
}

.player-margins {
  margin: 50px 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
