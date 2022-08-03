<template>
<div class="centered-block" v-if="listNewsArticles">
  <div class="list-block">
    <h1 class="title-text">{{listNewsArticles.title}}</h1>
    <p class="datetime">{{listNewsArticles.created_date}}</p>
    <hr class="line-block" />
    <div class="block-img">
      <img class="fon-img" :src="getImgUrl(listNewsArticles.image)"/>
    </div>
    <div v-if="listNewsArticles.description" v-html="listNewsArticles.description" :class="$style.text">
      <p>{{listNewsArticles.description}}</p>
    </div>
    <hr class="line-block" />
  </div>
  <div class="link-container">
    <router-link class="back-link" to="/media">Назад</router-link>
  </div>
</div>
</template>

<script>
import { host } from '@/server/settings'
import axios from 'axios'
export default {
    name: 'NewsArticlesPage',
    data: () => ({
        listNewsArticles:undefined,
    }),
    methods: {
    getImgUrl(image) {
      return host + '/images/' + image
    },
  }, 
  created() {
    const mediaRoute = this.$route.params.route
    axios
      .get(host + '/get-media-info/' + mediaRoute)
      .then(result => {
        this.listNewsArticles = result.data
    })
    }
}
</script>
<style scoped>
.centered-block {
    width: 800px;
    margin: 30px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.list-block {
    background-color: white;
    border-radius: 10px 0 10px 0;
}

.fon-img {
    object-fit: contain;
    width:100%;
    height: 370px;
    margin: 10px auto;
}

.title-text {
    text-align: center;
    font-size:16pt;
    margin:20px 20px 5px 20px;
    color:black;
}

.line-block {
    width: 100%;
    height: 3px;
    color: #eb5804;
    background: linear-gradient(90deg, #eb5804 0%, rgba(0, 0, 0, 0) 90%);
    margin-bottom: 35px;
    margin-left:35px;
    border: none;
}

.datetime {
    color: rgb(48, 45, 45);
    font-size: 12pt;
    text-align: center;
}

.link-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.back-link {
  border: 1px solid #eb5804;
  padding: 5px 30px;
  margin: 20px 30px;
  color: #eb5804;
  transition: all 0.2s ease-in;
  text-decoration: none;
}

.back-link:hover {
  background-color: #eb5804;
  color: black;
}
</style>

<style module>
.text {
    color: black;
    font-size: 14pt;
    text-align: justify;
    margin: 20px
}
</style>
