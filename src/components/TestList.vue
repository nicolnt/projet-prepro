<!-- PAGE TEST LIST -->
<template>
  <div class="testList">
    <a @click="$router.go(-1)"><i class="material-icons">arrow_back</i></a>
    <Hero title="Liste des tests"/>
    <div class="testListContent">
      <TestCard @click.native="startTest('motricity')" testName="Motricité fine" img="motricite-illustration.svg"/>
      <TestCard @click.native="startTest('attentionCapacity')" testName="Capacités attentionnelles" img="capacite-attentionnelle-illustration.svg"/>
      <TestCard @click.native="startTest('thinkingSkills')" testName="Capacités de raisonnement" img="capacites-raisonnement-illustration.svg"/>
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
   methods: {
      startTest(type) {
        this.$router.push({
          path: '/game/'+type
        })
      }
   }
}
</script>

<style scoped>

.testList {
  position: relative;
  text-align: left;
  height: 100%;
}
.testList .testCard {
  cursor: pointer;
}

.testListContent {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
  grid-gap: 2rem;
  margin-top: 2rem;
}
@media screen and (max-width: 1024px) {
  .testListContent {
    grid-gap: 2rem;
  }
}
@media screen and (max-width: 800px) {
  .testListContent {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
