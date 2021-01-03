<template>
  <div class="testList">
    <span class="material-icons" id="icon_back" v-on:click="goPatientsList"> keyboard_backspace </span>
    <h1>Liste des tests</h1>
  </div>
</template>

<script>

export default {
  name: 'TestList',
  methods: {
    goPatientsList() {
      this.$router.push({name:'PatientsList'})
    }
  }
}
</script>

<style scoped>
.testList {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>