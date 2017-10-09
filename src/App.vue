<template>
  <div id="app">
    <home/>
  </div>
</template>

<script>
import Home from './components/Home'

export default {
  name: 'app',
  components: {
      Home
  }
}
</script>

<style>
  html, body{height: 100%;background: #eee}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
