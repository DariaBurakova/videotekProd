<template>
  <div class="toTop-wrapper">
    <button class="toTop" @click="toTop">наверх</button>
  </div>
</template>

<script>
export default {
  name: "ToTopButton",
  methods: {
    toTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },
  },
}
</script>

<style scoped>
.toTop-wrapper{
  display: flex;
  justify-content: flex-end;
}

.toTop {
  color: #eb5804;
  border: 1px solid #eb5804;
  height: 40px;
  text-transform: capitalize;
  padding: 5px 30px;
  transition: all 0.3s ease-in;
}
.toTop:hover {
  background: #eb5804;
  color: black;
}
</style>
