<template>
    <button class="loginbtn" @click="login()">
      <p v-if="userName" class="username">{{ userName }}</p>
      <v-icon>mdi-account</v-icon>
    </button>
</template>

<script>
import axios from 'axios'
import { host } from '@/server/settings'

export default {
  name: 'LoginButton',
  data: () => ({
    userName: null
  }),
  methods: {
    login() {
      this.$router.push({ name: 'Login'})
    },
    getUserName() {
      const token = localStorage.getItem('uid')
      if (token) {
          axios
            .get(host + '/get-username/' + token)
            .then(response => {
              this.userName = response.data.login
            })
      }
    },
  },
  created() {
    this.getUserName()
  },
  updated() {
    this.getUserName()
  }
}
</script>

<style scoped>
.loginbtn {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 50vh;
}
.loginbtn:hover {
  background-color: #363636;
}
.username {
  margin-right: 10px;
}
</style>
