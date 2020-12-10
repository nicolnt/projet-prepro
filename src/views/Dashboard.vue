<template>
  <div class="dashboard">
    <NavBar/>
    <div id="dashboardContent">
      <SideBar/>
      <div id="content">
        <h1>Liste des patients</h1>
        <vs-input icon="search" placeholder="Search" v-model="valueInputSearch"/>
        <div id="addClient"><vs-icon icon="add_circle_outline"/><p>Ajouter un client</p></div>
      </div>
    </div>
    <Footer p_txtColor="rgb(82, 82, 232)" p_colorBG="#fcfcff" />
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
  },
  data(){
    return {
      valueInputSearch:''
    }
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
  background-color: #8a94db;
}
.vs-input-primary {
  margin: 3% 0;
}
.materials-icon {
  margin-bottom: 2%;
}
#dashboardContent {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
}
#content {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#addClient {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>