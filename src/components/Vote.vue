<template>
      <div class="film-page-vote">
        <div class="vote-text">Оцените {{ varVote }}:</div>
        <span>
          <button
            v-for="item in score"
            :key="item"
            :disabled="isVoteDisabled"
            :class="getVBclass(item)"
            @click="vote(item)"
          >{{ item }}</button>
        </span>
      </div>
</template>

<script>
export default {
    name: "Vote",
    data: () => ({
        voted: false,
        isVoteDisabled: true,
        varVote: null,
    }),
    props: {
        contentRoute: String,
        contentType: String,
    },
    methods: {
        getVBclass(item) {
            if (this.voted === +item) return 'vote-btn vote-dis-btn'
            return 'vote-btn'
        },
    },
    computed: {
        score: () => {
            let array = []
            for (let i = 1; i < 11; i++) array.push(i)
            return array
        },
    },
    created() {
        switch (this.contentType) {
          case 'film':
            this.varVote = 'фильм'
            break;
          case 'serial':
            this.varVote = 'сериал'
            break;
          case 'video':
            this.varVote = 'видео'
            break;
      }
    },
}
</script>

<style>
.film-page-vote {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 40px 0;
}

.vote-text {
  font-size: 15pt;
  padding-right: 30px;
}

.vote-btn {
  width: 40px;
  height: 40px;
  margin: 0 5px;
  border: 1px solid #eb5804;
}
.vote-btn:hover:not(:disabled) {
  background-color: #eb5804;
  color: black;
}
.vote-btn:disabled {
  opacity: .5;
}

.vote-dis-btn {
  background-color: orangered;
  color: black;
}
</style>