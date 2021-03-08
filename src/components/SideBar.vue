<!-- SIDEBAR ON THE LEFT WITH PSY'S PROFIL AND NAVIGATION -->
<template>
  <div class="sideBar">
    <h2 v-on:click="goDashboard"> Tapitap </h2>
    <div size="small" id="cardUser">
      <!-- changer l'avatar en homme/femme en fonction de la connexion  -->
      <img class="avatar" alt="Avatar woman" src="../assets/avatar-woman-illustration.svg"/>
      <div id="txtCardUser">
        <h3>{{user.data.displayName}}</h3>
        <p>Psychologue</p>
      </div>
      <div class="icon-settings">
        <vs-icon class="icon-settings-animation" icon="settings" v-on:click="goPsyInformations"></vs-icon>
      </div>
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
    <img class="leaf" src="../assets/leaf-illustration.svg"/>
    <img class="leaf-responsive" src="../assets/leaf-illustration-responsive.svg"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: 'SideBar',
  data(){
    return {
      isActivePatients: true,
      isActiveStats: false,
      isActiveParams: false
    }
  },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  created() {
    if(this.$route.name === 'PatientsList') {
      this.isActiveStats = false
      this.isActiveParams = false
      this.isActivePatients = true
    }
    if(this.$route.name === 'Stats') {
      this.isActiveParams = false
      this.isActivePatients = false
      this.isActiveStats = true
    }
    if(this.$route.name === 'AppParams') {
      this.isActiveStats = false
      this.isActivePatients = false
      this.isActiveParams = true
    }
  },
  methods: { 
    activePage(isActive){
      if(isActive === 'isActivePatients' && this.$route.name != 'PatientsList') {
        this.isActiveStats = false
        this.isActiveParams = false
        this.isActivePatients = true
        this.$router.push({name:'PatientsList'})
      }
      if(isActive === 'isActiveStats' && this.$route.name != 'Stats') {
        this.isActiveParams = false
        this.isActivePatients = false
        this.isActiveStats = true
        this.$router.push({name:'Stats'})
      }
      if(isActive === 'isActiveParams' && this.$route.name != 'AppParams') {
        this.isActiveStats = false
        this.isActivePatients = false
        this.isActiveParams = true
        this.$router.push({name:'AppParams'})
      }
    },
    goPsyInformations() {
      if(this.$route.name != 'PsyInformations')
        this.$router.push({name:'PsyInformations'})
    }, 
    goDashboard() {
      if(this.$route.name != 'PatientsList')
        this.$router.push({name:'PatientsList'})
    }
  }
}
</script>

<style scoped>
.sideBar {
  width: 335px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color:#ffffff;
  box-shadow: 17px 0px 30px -24px rgba(200, 200, 200, 0.2);
  position: relative;
  z-index: 2;
}
h2 {
  margin: 2rem 0;
}
.pages {
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
  color: #a8a8a8;
  cursor: pointer;
  transition: all 0.5s ease;
}
.pages:hover {
  color: #535353;
  transform: translateX(10px);
}
.pages:hover .line {
  background-color: #535353;
}
.titlePages {
  margin-left: 10px;
}
.selectedPage {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  color: #9082FF;
}
.line {
  display: block;
  height: 24px;
  width: 5px;
  border-radius: 0 20px 20px 0;
  background-color: #a8a8a8;
  margin-right: 10px;
}
.selectedLine {
  display: block;
  height: 24px;
  width: 5px;
  border-radius: 0 20px 20px 0;
  background-color: #9082FF;
  margin-right: 10px;
}
#cardUser {
  height: 90px;
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  background-color: #9082FF;
  border-radius: 10px;
  padding: 10px;
}
.avatar {
  width: 50px;
}
#txtCardUser {
  display: flex;
  flex-direction: column;
  text-align: left;
  color: #fff;
  margin: 0 .5rem;
}
.icon-settings {
  display: flex;
  background-color: #fff;
  border-radius: 5px;
  padding: 3px;
  color: #9082FF;
  cursor: pointer;
}
.icon-settings-animation {
  transition: all 2s ease;
}
.icon-settings-animation:hover {
  transform: rotate(360deg) scale(1.2);
}
.material-icons {
  margin-left: 0;
}
#tag {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  align-items: flex-start;
  margin-left: 11%;
}
.leaf {
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
}
.leaf-responsive {
  display: none;
  position: absolute;
  bottom: 0;
  left: 20px;
}

@media screen and (max-width: 1025px) {
  .sideBar {
    width: auto;
    padding: 1rem;
  }
  #cardUser {
    height: auto;
    flex-direction: column;
    margin-top: 0;
  }
  #txtCardUser {
    margin: .5rem 0;
    text-align: center;
  }
  #tag {
    align-items: center;
    margin-left: 0;
  }
  .selectedPage {
    flex-direction: column;
    margin-left: 0;
  }
  .pages {
    flex-direction: column;
  }
  .selectedLine {
    display: none;
  }
  .line {
    display: none;
  }
  .leaf {
    display: none;
  }
  .leaf-responsive {
    display: block;
  }
}
</style>