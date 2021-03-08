<template lang="html">
    <VsPopupCustom :active.sync="popupActivo" :closeOnClickOutside="false" title="" class="test-modal">
        <div class="test-modal-content">
            <p><strong>Test terminé !</strong> Vous allez maintenant revenir à l'accueil.</p>
        </div>
        <div class="test-modal-buttons">
            <vs-button id="btnEndTest" color="#9082FF" @click="endTest">Ok</vs-button>
        </div>
    </VsPopupCustom>
</template>

<script>
import VsPopupCustom from '@/components/VsPopupCustom.vue'

export default {
  name: 'TestInfoseModal',
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
    endTest() {
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
  display: none;
}
.test-modal >>> .vs-popup--content {
  display: block;
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