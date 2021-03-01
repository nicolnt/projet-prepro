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

export default {
  name: 'Stats',
  components: {
    Hero,
    apexchart: VueApexCharts,
  },
  data() {
    return {
      patient: {},
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
  mounted() {
    db.collection('patients').doc(this.$store.state.currentPatient.id).get()
    .then(docs => {
      this.patient = docs.data()
    })
  },
  methods: {
    getDate(dateISO){ 
      let creationDate = new Date(dateISO)
      let month = creationDate.getMonth()
      month < 10 ? month = '0'+(month+1) : month = (month+1)
      const date = creationDate.getDate() +'/' + month + '/'+ creationDate.getFullYear()
      return date
    },
    calcReussiteTest() {
      this.getDate(this.patient.dateCreation.toDate())
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