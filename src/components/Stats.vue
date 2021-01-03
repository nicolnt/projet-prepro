<template>
  <div class="stats">
    <span class="material-icons" id="icon_back" v-on:click="goPatientsList"> keyboard_backspace </span>
    <h1>Statistiques des patients</h1>
  </div>
</template>

<script>

export default {
  name: 'Stats',
  methods: {
    goPatientsList() {
      this.$router.push({name:'PatientsList'})
    }
  }
}
</script>

<style scoped>
.stats {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
#icon_back {
  display: flex;
  align-self: flex-start;
  margin-top: 12px;
}
</style>