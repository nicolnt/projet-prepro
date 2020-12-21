<template>
  <div class="psyInformations">
    <h1>Informations du psychologue</h1>
    <vs-button color="#9082FF" type="filled" id="btnModif">Modifier les informations</vs-button>
  </div>
</template>

<script>

export default {
  name: 'PsyInformations'
}
</script>

<style scoped>
.psyInformations {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#btnModif {
  border-radius: 16px;
}
</style>