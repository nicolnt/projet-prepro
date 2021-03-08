<!-- PAGE WITH PSY'S INFORMATIONS -->
<template>
  <div class="psyInformations">
    <a @click="$router.go(-1)"><i class="material-icons">arrow_back</i></a>
    <Hero title="Informations du psychologue"/>
    <div class="wrapperPsyInformations">
      <div id="psyDatas">
        <img src="../assets/avatarPsy.svg" alt="imgPatient" id="imgPatient">
        <div class="contentPsyDatas">
          <h2>{{user.data.displayName}}</h2>
          <vs-button color="#9082FF" type="filled" id="btnModif" @click="toggleModal">Modifier les informations</vs-button>
        </div>
      </div>
      <UpdateDataModal ref="updateDatasModal" :person="user.data" :personType="'psy'"/>
    </div>
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'
import UpdateDataModal from '@/components/UpdateDataModal.vue'
import { mapGetters } from "vuex"

export default {
  name: 'PsyInformations',
  components: {
    Hero,
    UpdateDataModal
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    toggleModal() {
      this.$refs.updateDatasModal.toggle()
    }
  }
}
</script>

<style scoped>
.psyInformations {
  position: relative;
  text-align: left;
}
.wrapperPsyInformations {
  background-color: #F0F0F0;
  box-shadow: 0 4px 16px 0 rgb(0 0 0 / 5%);
  border-radius: 16px;
  padding: 2rem;
  margin-top: 2rem;
  margin-right: 3rem;
}
#icon_back {
  display: flex;
  align-self: flex-start;
  margin-top: 12px;
}
#btnModif {
  border-radius: 16px;
  font-size: 16px;
  margin-top: 1rem;
}
#psyDatas {
  display: flex;
  flex-direction: row;
  margin: 20px 0;
}
.contentPsyDatas {
  margin-left: 2rem;
}
#imgPatient {
  margin-right: 10px;
  width: 14%;
}
.psyInformations a {
  cursor: pointer;
}

@media screen and (max-width: 800px) {
  #psyDatas {
    flex-direction: column;
    margin: 0;
    align-items: center;
  }
  #imgPatient {
    width: 50%;
    margin: auto;
  }
  .contentPsyDatas {
    margin-left: 0;
    margin-top: 2rem;
  }
}
</style>