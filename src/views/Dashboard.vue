<template>
  <div class="dashboard">
    <NavBar/>
    <div id="dashboardContent">
      <SideBar ref="sideBar"/>
      <div id="content">
        <router-view></router-view>
      </div>
    </div>
    <Footer p_txtColor="#000000" p_colorBG="#ffffff"/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'Dashboard',
  components : {
    NavBar,
    Footer,
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
  background: linear-gradient(135deg, #ffffff, 80%, #EDEDED);
}
#content {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>