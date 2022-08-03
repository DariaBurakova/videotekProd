<template>
    <div>
      <router-link
        class="router-link-news"
        :to="{ name: 'NewsArticlesPage', params: { route: item.route } }"
      >
        <div class="news-card">
          <img class="news-img" :src="getImgUrl(item.image)" alt="news"/>
          <div class="title-block">
            <h2 class="title-news">{{item.title}}</h2>
          </div>
          <div class="date-block">
            <p class="date-news">{{item.created_date}}</p>
          </div>
        </div>
      </router-link>
    </div>
</template>

<script>
import { host } from '@/server/settings'
export default {
  name: 'NewsCard',
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    getImgUrl(image) {
      return host + '/images/' + image
    },
  }, 
}
</script>

<style scoped>
.news-card{
    position: relative;
    width: auto;
    height: 420px;
    background-color:#DCDCDC;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px 0 10px 0;
}
.title-block{
margin:10px;
}
.title-news{
    color: black;
    font-size: 13pt;
    text-align: left;
}
.title-news:hover{
  color:#EB5804;
}
.date-news{
    position: absolute;
    color: rgb(48, 45, 45);
    font-size: 12pt;
    bottom: 4px;
    left:15px;
}
.news-img{
    width: 100%;
    object-fit: contain;
    height:auto;
    margin: 0px auto;
    border-radius: 10px 0  0;
}
.news-card:hover{
    transform: scale(1.02);
    cursor: pointer;
}
.router-link-news{
  text-decoration: none;
  color: white;
}
</style>
