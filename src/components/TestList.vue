<template>
  <div class="testList">
    <Hero title="Liste des tests"/>
    <a @click="$router.go(-1)"><i class="material-icons">arrow_back</i></a>
      <vs-button color="#9082FF" type="filled" v-on:click="startMotricity" class="btn">Test de motricité fine</vs-button>
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'

export default {
  name: 'TestList',
  components: {
    Hero,
  },
   methods: {
      startMotricity() {
        this.$router.push({
          path: '/game/motricity',
        })
      }
   }
}
</script>

<style scoped>
.btn {
  border-radius: 16px;
  margin: 10px 0;
  width: 20%;
}

.testList {
  position: relative;
  text-align: left;
}
.testList a {
  position: absolute;
  top: -40px;
  left: -28px;
  font-size: 30px;
  cursor: pointer;
}
</style>
