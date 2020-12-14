<template>
  <div class="patientsList">
    <h1 id="title">Liste des patients</h1>
    <div id="actions">
      <vs-input id="search" icon="search" placeholder="Search" v-model="valueInputSearch"/>
      <vs-chip color="#9082FF">
        Ajouter un patient  
        <span class="material-icons">add_circle</span> 
      </vs-chip>
    </div>
  </div>
</template>
    
<script>
export default {
  name: 'PatientsList',
  data(){
    return {
      valueInputSearch:''
    }
  }
}
</script>
    
<style>
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
