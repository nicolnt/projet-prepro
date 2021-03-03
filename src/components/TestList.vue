<template>
  <div class="testList">
    <a @click="$router.go(-1)"><i class="material-icons">arrow_back</i></a>
    <Hero title="Liste des tests"/>
    <div class="testListContent">
      <TestCard testName="Motricité fine"/>
      <TestCard testName="Capacités attentionnelles"/>
      <TestCard testName="Comportement en situation complexe"/>
    </div>
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'
import TestCard from '@/components/TestCard.vue'

export default {
  name: 'TestList',
  components: {
    Hero,
    TestCard
  },
}
</script>

<style scoped>
.testList {
  position: relative;
  text-align: left;
  height: 100%;
}
.testList a {
  cursor: pointer;
}
.testListContent {
  display: flex;
  flex-flow: row wrap;
  margin-right: 3rem;
}
</style>