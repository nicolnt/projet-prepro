<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view name="default" />
    </transition>
  </div>
</template>

<script>
// import { db } from './services/firebase'


export default {
  
  name: 'App',
  created () {
    this.checkDataBase()
  },
  methods: {
    checkDataBase () {
      // var query = db.ref('patients').orderByKey()
      // query.once('value').then(function (snapshot) {
      //   snapshot.forEach(function (childSnapshot) {
      //      console.log(childSnapshot.val())
      //   })
      // })
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
*{
  box-sizing: border-box;
}
#app {
  font-family: Poppins, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  height: 100%;
  width: 100%;
}
body {
  height: 100vh;
  width: 100vw;
}
h1, h2, h3, p {
  margin: 0;
  font-weight: 400;
}
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .3s;
}
.fade-leave-active {
  transition-delay: .3s;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
