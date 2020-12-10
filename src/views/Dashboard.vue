<template>
  <div class="dashboard">
    <NavBar/>
    <div id="dashboardContent">
      <SideBar/>
      <div id="content">
        <h1 id="title">Liste des patients</h1>
        <div id="actions">
          <vs-input id="search" icon="search" placeholder="Search" v-model="valueInputSearch"/>
          <vs-chip color="#9082FF">
            Ajouter un patient  
            <span class="material-icons">add_circle</span> 
          </vs-chip>
        </div>
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
  background: linear-gradient(135deg, #ffffff, 80%, #EDEDED);
}
.vs-input-primary {
  margin: 3% ;
}
.material-icons {
  margin-left: 2%;
}
.con-color {
  height: 75%;
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
#actions {
  display: flex;
  flex-direction: row;
  align-items: center;
}
#addClient {
  display: flex;
  flex-direction: row;
  align-items: center;
}
#title {
  width: 100%;
}
</style>