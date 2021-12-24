<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- <button @click="get">123</button> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Axios from "axios"
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods:{
    get: async function(){
      let res = await Axios.get('/api/get_hw_img_msg')
      console.log(res.data)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
