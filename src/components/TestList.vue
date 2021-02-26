<template>
  <div class="testList">
    <a @click="$router.go(-1)"><i class="material-icons">arrow_back</i></a>
    <Hero title="Liste des tests"/>
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'

export default {
  name: 'TestList',
  components: {
    Hero,
  },
}
</script>

<style scoped>
.testList {
  position: relative;
  text-align: left;
}
.testList a {
  cursor: pointer;
}
</style>