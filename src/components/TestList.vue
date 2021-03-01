<template>
  <div class="testList">
    <Hero title="Liste des tests"/>
    <a @click="$router.go(-1)"><i class="material-icons">arrow_back</i></a>
      <vs-button color="#9082FF" type="filled" @click="startMotricity" class="btn">Test de motricité fine</vs-button>
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'

import { db } from '../services/firebase'
require('firebase/auth')

export default {
  name: 'TestList',
  components: {
    Hero,
  },
   methods: {
      startMotricity() {
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
          path: '/game/motricity',
        })
      }
   }
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
