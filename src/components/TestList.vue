<template>
  <div class="testList">
    <Hero title="Liste des tests"/>
    <a @click="$router.go(-1)"><i class="material-icons">arrow_back</i></a>
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
  position: absolute;
  top: -40px;
  left: -28px;
  font-size: 30px;
  cursor: pointer;
}
</style>