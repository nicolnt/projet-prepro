<template>
  <div id="app">
    <router-view name="default" />
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
  /*height: 92vh;*/
  /*width: 100vw;*/
  position: absolute;
  max-height: 100%;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
}
h1, h2, h3, p {
  margin: 0;
  font-weight: 400;
}
</style>
