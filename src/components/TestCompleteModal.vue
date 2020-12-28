<template lang="html">
    <vs-popup :active.sync="popupActivo" title="" id="quit">
        <p class="pComplete">Test terminé ! Vous allez maintenant revenir à l'accueil.</p>
        <div class="buttons">
            <vs-button id="btnEndTest">Ok</vs-button>
        </div>
    </vs-popup>
</template>

<script>
export default {
  name: 'TestCompleteModal',
  data() {
    return { 
        popupActivo: false
    }
  },
  methods: {
    toggle() {
      this.popupActivo = !this.open;
    }
  }
}
</script>

<style lang="css">
.pComplete {
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