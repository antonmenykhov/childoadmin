<template>
  <div class="home">
    Это главная страница
    <el-button @click="exit">Выйти</el-button>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {
    
  },
  methods: {
    exit(){
      this.$cookie.delete('token')
      this.$router.push({path: '/'})
    }
  },
}
</script>
