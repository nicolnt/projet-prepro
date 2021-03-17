<!-- PAGE TEST LIST -->
<template>
  <div class="testList">
    <a @click="$router.go(-1)"><i class="material-icons">arrow_back</i></a>
    <Hero title="Liste des tests"/>
    <div class="testListContent">
      <TestCard @click.native="startMotricity" testName="Motricité fine" img="motricite-illustration.svg"/>
      <TestCard @click.native="startAttentionCapacity" testName="Capacités attentionnelles" img="capacite-attentionnelle-illustration.svg"/>
      <TestCard @click.native="startMotricity" testName="Comportement en situation complexe" img="situation-complexe-illustration.svg"/>
    </div>
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'
import TestCard from '@/components/TestCard.vue'

import { db } from '../services/firebase'
require('firebase/auth')

export default {
  name: 'TestList',
  components: {
    Hero,
    TestCard
  },
   methods: {
      startMotricity() {
        this.$router.push({
          path: '/game/motricity'
        })
      },
      startAttentionCapacity() {
        const batch = db.batch()
        db.collection('tentatives').where('idPatient', '==', this.$store.state.currentPatient.id)
          .get()
          .then(docs => {
            docs.forEach(doc => {
              batch.delete(db.collection('tentatives').doc(doc.id))
            })
            batch.commit()
              .then(() => {
                console.log('Tests supprimés')
              })
              .catch(err => {
                console.log('Impossible de supprimer les tests', err)
              })
          })

        this.$router.push({
          path: '/game/attentionCapacity'
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
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 4rem;
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
