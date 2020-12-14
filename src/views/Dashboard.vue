<template>
  <div class="dashboard">
    <NavBar/>
    <div id="dashboardContent">
      <SideBar ref="sideBar"/>
      <div id="content">
        <PatientsList v-if="this.isActivePatientsList"/>
        <Stats v-if="this.isActiveStatsPage"/>
        <AppParams v-if="this.isActiveAppParamsPage"/>
      </div>
    </div>
    <Footer p_txtColor="#000000" p_colorBG="#ffffff"/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import SideBar from '@/components/SideBar.vue'
import PatientsList from '@/components/PatientsList.vue'
import Stats from '@/components/Stats.vue'
import AppParams from '@/components/AppParams.vue'

export default {
  name: 'Dashboard',
  components : {
    NavBar,
    Footer,
    SideBar,
    PatientsList,
    Stats,
    AppParams
  },
  data() {
    return {
      isActivePatientsList: false,
      isActiveStatsPage: false,
      isActiveAppParamsPage: false
    }
  },
  methods: {
    updatePagesStates(){
      this.isActivePatientsList = this.$refs.sideBar.isActivePatients
      this.isActiveStatsPage = this.$refs.sideBar.isActiveStats
      this.isActiveAppParamsPage = this.$refs.sideBar.isActiveParams
      console.log("isActivePatientsList : " + this.isActivePatientsList)
      console.log("isActiveStatsPage : " + this.isActiveStatsPage)
      console.log("isActiveParamsPage : " + this.isActiveAppParamsPage)
    }
  },
  mounted() {
    this.updatePagesStates()
  },
  watch: {
    function(){
      this.updatePagesStates()
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
#content {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>