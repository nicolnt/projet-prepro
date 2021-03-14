<template lang="html">
    <VsPopupCustom :active.sync="popupActivo" title="Quitter le test ?" class="test-modal">
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
    </VsPopupCustom>
</template>

<script>
import VsPopupCustom from '@/components/VsPopupCustom.vue'

export default {
  name: 'TestQuitModal',
  components: {
    VsPopupCustom
  },
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
  user-select: none;
}
.test-modal >>> header {
  /* display: none; */
}
.test-modal >>> .vs-popup--content {
  display: block;
  margin: 15px 0;
}
.test-modal >>> .vs-popup--close {
  position: absolute;
  right: 0;
  top: 0;
  margin-right: 0;
  margin-top: 0;
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