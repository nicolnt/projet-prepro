<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view name="default" />
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',
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
  color: #222222;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
body, html {
  position: fixed;
}

body {
  position: absolute;
  max-height: 100%;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  /* Disables pull-to-refresh and overscroll glow effect.
    Still keeps swipe navigations. */
  overscroll-behavior: none;
  overflow: hidden;
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
