<template>
  <div class="stats">
    <Hero title="Statistiques des patients"/>
    <h3> Taux de réussites des tests (2020 - aujourd'hui) </h3>
    <div id="chart">
      <apexchart type="area" width="800" height="500" :options="chartOptions" :series="series"></apexchart>
    </div>
    <div @click="calcReussiteTest()"> </div>
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'
import VueApexCharts from 'vue-apexcharts'
import { db } from '../services/firebase'
import  { mapState } from 'vuex'

export default {
  name: 'Stats',
  components: {
    Hero,
    apexchart: VueApexCharts,
  },
  data() {
    return {
      patientOrderByMonth: [],
      patientJanuary: [],
      patientFebruary: [],
      patientMarch: [],
      patientApril: [],
      patientMay: [],
      patientJune: [],
      patientJuly: [],
      patientAugust: [],
      patientSeptember: [],
      patientOctober: [],
      patientNovember: [],
      patientDecember: [],
      tentatives: [],
      tentativesTri: [],
      tentativesByPatientData: [],
      series: 
      [{
        name: '2021',
        data: [31, 40, 28, 51, 42, 19, 10, 60, 86, 45, 10, 20]
      }, 
      {
        name: '2022',
        data: [11, 32, 45, 32, 34, 52, 41, 51, 42, 19, 10, 42]
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        colors: ["#9082FF", "#FF8D8B"],
        yaxis: {
          // type: 'datetime',
          categories: ['0', '10', '20']
        },
        xaxis: {
          // type: 'datetime',
          categories: ['Janvier','Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre' , 'Novembre', 'Décembre']
        },
        // tooltip: {
        //   x: {
        //     format: 'dd/MM/yy HH:mm'
        //   },
        // },    
      },
      legend: {
        fontSize: '16px',
      },
    }
  },
  computed: {
    ...mapState({
      patient: 'currentPatient'
    })
  },
  methods: {
    getDate(dateISO){ 
      let creationDate = new Date(dateISO)
      let month = creationDate.getMonth()
      return month
    },
    tentativesByPatient(doc) {
      if(this.tentativesByPatientData[doc] === doc.data().idPatient) {
        this.tentativesByPatientData = doc
      }
    },
    getScorePatient(doc) {
      return this.tentatives[doc] = doc.data()
      // this.tentativesTri[doc] = this.tentatives[doc].idPatient;
      // this.tentativesTri = [...new Set(this.tentativesTri)]
      // return console.log(this.tentativesTri)
    },
    getAverageScorePatients() {
      return
    }
  },
  mounted() {
    db.collection('tentatives')
      .orderBy('idPatient')
      .get()
      .then(docs => {
        docs.forEach(doc => {
          // this.tentativesByPatient(this.tentatives[doc])
          // console.log(this.tentatives[doc])
          this.getScorePatient(doc)

          // const data = doc.data() 
          // data.score = (data.score * 100).toFixed(2)
        })
      })
    db.collection("patients").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.patientOrderByMonth[doc] = this.getDate(doc.data().dateCreation.toDate())
          if(this.patientOrderByMonth[doc] === 0) {
            this.patientJanuary[doc] = doc.id
            // calculer ici la moyenne des scores des patients de janvier
          } else if (this.patientOrderByMonth[doc] === 1) {
            this.patientFebruary[doc] = doc.id
          } else if (this.patientOrderByMonth[doc] === 2) {
            this.patientMarch[doc] = doc.id
          } else if (this.patientOrderByMonth[doc] === 3) {
            this.patientApril[doc] = doc.id
          } else if (this.patientOrderByMonth[doc] === 4) {
            this.patientMay[doc] = doc.id
          } else if (this.patientOrderByMonth[doc] === 5) {
            this.patientJune[doc] = doc.id
          } else if (this.patientOrderByMonth[doc] === 6) {
            this.patientJuly[doc] = doc.id
          } else if (this.patientOrderByMonth[doc] === 7) {
            this.patientAugust[doc] = doc.id
          } else if (this.patientOrderByMonth[doc] === 8) {
            this.patientSeptember[doc] = doc.id
          } else if (this.patientOrderByMonth[doc] === 9) {
            this.patientOctober[doc] = doc.id
          } else if (this.patientOrderByMonth[doc] === 10) {
            this.patientNovember[doc] = doc.id
          } else if (this.patientOrderByMonth[doc] === 11) {
            this.patientDecember[doc] = doc.id
          } else {
            return
          }
        })
      })
  }
}
</script>

<style scoped>
.stats {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
}
#icon_back {
  display: flex;
  align-self: flex-start;
  margin-top: 12px;
}
#chart {
  margin-top: 2rem;
}
</style>