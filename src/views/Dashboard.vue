<!-- VIEW : DASHBOARD WHICH WILL CONTAIN PATIENT PROFIL, PATIENT'S RESULTs, ETC. -->
<template>
  <div class="dashboard">
    <div id="dashboardContent">
      <SideBar ref="sideBar"/>
      <div id="content">
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'Dashboard',
  components : {
    SideBar
  }
}
</script>

<style scoped>
.dashboard {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgb(248, 248, 248);
}
#dashboardContent {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
}
#content {
  padding: 2rem 3rem;
  width: calc(100% - 285px);
  overflow-y: scroll;
  z-index: 1;
}
@media screen and (max-width: 1025px) {
  #content {
    width: calc(100% - 180px);
  }
}
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .2s;
}
.fade-leave-active {
  transition-delay: .2s;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>