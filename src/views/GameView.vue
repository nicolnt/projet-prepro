<template>
  <div id="game">
    <NavBar/>
      <div id="content">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'GameView',
  components : {
    NavBar,
  }
}
</script>

<style scoped>
#game {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #EDEDED;
}
#content {
  width: 100%;
  flex: 1 1 auto;
  overflow: hidden;
  padding: 30px;
}
</style>
