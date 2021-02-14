<template lang="html">
    <vs-popup :active.sync="popupActivo" title="" class="test-modal">
        <div class="test-modal-content">
            <p>
              Voulez-vous vraiment quitter le test ?<br/> 
              Il ne sera pas enregistré.
            </p>
        </div>
        <div class="test-modal-buttons">       
            <vs-button id="btnQuitTest" color="#9082FF" @click="stopTest">Quitter</vs-button>
            <vs-button id="btnResumeTest" color="#9082FF" icon="play_arrow" @click="toggle">Continuer</vs-button>
        </div>
    </vs-popup>
</template>

<script>
export default {
  name: 'TestQuitModal',
  data() {
    return { 
      popupActivo: false
    }
  },
  methods: {
    toggle() {
      this.popupActivo = !this.popupActivo;
    },
    stopTest() {
      this.$router.push({name:'PatientProfil'})
    }
  }
}
</script>

<style scoped>
.test-modal {
  text-align: center;
  font-family: Poppins;
}
.test-modal >>> header {
  display: none;
}
.test-modal >>> .vs-popup--content {
  margin: 15px 0;
}
.test-modal-content {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-evenly;
  text-align: center;
}
.test-modal-buttons {
  display: flex;
  justify-content: center;
}
.test-modal-buttons > button {
  margin: 0 10px;
  border-radius: 15px;
  padding: 10px 20px;
}
</style>