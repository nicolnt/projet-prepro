<template>
  <div class="sideBar">
    <div size="small" id="cardUser">
      <vs-icon icon="account_box" color="#ffffff" size="50px"></vs-icon>
      <div id="txtCardUser">
        <h3>Nom Prénom</h3>
        <p>Psychologue</p>
      </div>
      <div id="settings"><vs-icon icon="settings" color="rgb(189, 189, 189)"></vs-icon></div>
    </div>
    <div id="tag">
      <div v-bind:class="{selectedPage : isActivePatients, pages: !isActivePatients}" v-on:click="activePage('isActivePatients')">
        <div v-bind:class="{selectedLine : isActivePatients, line: !isActivePatients}"></div>
        <i class="material-icons">person</i>
        <h3 class="titlePages">Patients</h3>
      </div>
      <div v-bind:class="{selectedPage : isActiveStats, pages: !isActiveStats}" v-on:click="activePage('isActiveStats')">
        <div v-bind:class="{selectedLine : isActiveStats, line: !isActiveStats}"></div>
        <i class="material-icons">show_chart</i>
        <h3 class="titlePages">Statistiques</h3>
      </div>
      <div v-bind:class="{selectedPage : isActiveParams, pages: !isActiveParams}" v-on:click="activePage('isActiveParams')">
        <div v-bind:class="{selectedLine : isActiveParams, line: !isActiveParams}"></div>
        <i class="material-icons">settings</i>
        <h3 class="titlePages">Paramètres</h3>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SideBar',
  data(){
    return {
      isActivePatients: true,
      isActiveStats: false,
      isActiveParams: false
    }
  },
  methods: { 
    activePage(isActive){
      if(isActive === 'isActivePatients') {
        this.isActiveStats = false
        this.isActiveParams = false
        this.isActivePatients = !this.isActivePatients
      }
      if(isActive === 'isActiveStats') {
        this.isActiveParams = false
        this.isActivePatients = false
        this.isActiveStats = !this.isActiveStats
      }
      if(isActive === 'isActiveParams') {
        this.isActiveStats = false
        this.isActivePatients = false
        this.isActiveParams = !this.isActiveParams
      }
      this.$parent.updatePagesStates()
    }
  }
}
</script>

<style scoped>
.sideBar {
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color:#ffffff;
  box-shadow: 0px 2px 30px rgba(200, 200, 200, 0.2);
}
.pages {
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
  color: #a8a8a8;
}
.titlePages {
  margin-left: 10px;
}
.selectedPage {
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
  color: #9082FF;
}
.line {
  height: 24px;
  width: 4px;
  border-radius: 9px;
  background-color: #a8a8a8;
  margin-right: 10px;
}
.selectedLine {
  height: 24px;
  width: 4px;
  border-radius: 9px;
  background-color: #9082FF;
  margin-right: 10px;
}
#cardUser {
    height: 12%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: center;
    background-color: #9082FF;
    padding: 0 6%px;
    margin-top: 15px;
    border-radius: 10px;
}
#avatarUser {
    margin: 0 15px 0 0;
}
#txtCardUser {
    display: flex;
    flex-direction: column;
    text-align: left;
}
#settings {
    background-color: white;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px;
    margin-left: 5px;
}
#tag {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    align-items: flex-start;
    margin-left: 11%;
}
</style>