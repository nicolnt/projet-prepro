<template lang="html">
    <vs-popup :active.sync="popupActivo" title="" id="quit">
        <p class="pQuit">Voulez-vous vraiment quitter le test ? <br> Il ne sera pas enregistré.</p>
        <div class="buttons">       
            <vs-button id="btnQuitTest">Quitter</vs-button>
            <vs-button id="btnResumeTest" icon="play_arrow">Continuer</vs-button>
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
      this.popupActivo = !this.open;
    },
    stopTest() {
      this.$router.push({name:'PatientProfil'})
    }
  }
}
</script>

<style lang="css">
.pQuit {
  text-align: center;
  margin-bottom: 1rem;
}
.buttons {
  display: flex;
  justify-content: center;
}
.buttons > button {
  margin: 1rem 0.5rem;
  border-radius: 16px;
  padding: .5rem 1.5rem;
}
</style>