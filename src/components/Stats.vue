<template>
  <div class="stats">
    <Hero title="Statistiques des patients"/>
    <h2> Cette fonctionnalité est débloquée lorsque vous avez au <span> minimum 10 patients </span> renseignés dans l’application. Elle permet d’avoir une vue d’ensemble des informations liées aux patients ou aux tests. </h2>
    <div v-if="this.isActive" id="graphics">
      <div class="graphicsPatient">
        <div class="graphicNbPatient graphic">
          <h3> Nombre de personnes inscrits tous les mois </h3>
          <div class="chart">
            <apexchart type="area" width="100%" height="500" :options="chartOptions" :series="series"></apexchart>
          </div>
        </div>
        <div class="wrapperGraphic">
          <div class="graphicAveragePatientAge graphic">
            <h3> Age moyen des patients </h3>
            <div class="wrapperResult">
              <p> {{this.averagePatientAge}} ans </p>
            </div>
          </div>
          <div class="graphicPartWomenMen graphic">
            <h3> Pourcentage d'hommes ou de femmes </h3>
            <div class="wrapperResult">
              <apexchart type="pie" width="100%" height="500" :options="chartOptions2" :series="series2"></apexchart>
            </div>
          </div>
        </div>
      </div>
      <div class="graphicsTest">
        <div class="testSucceedFailed graphic">
            <h3> Nombre de tests réussis ou échoués </h3>
            <apexchart type="bar" width="100%" height="500" :options="chartOptions3" :series="series3"></apexchart>
        </div>
        <div class="graphicAveragePatientScore graphic">
          <h3> Score moyen des patients </h3>
          <div class="wrapperResult">
            <p> {{this.averagePatientScore}} % </p>
          </div>
        </div>
      </div>
    </div>
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
      isActive: false,
      /* Data for graphic */
      patientOrderByMonth: 0,
      patientJanuary: 0,
      patientFebruary: 0,
      patientMarch: 0,
      patientApril: 0,
      patientMay: 0,
      patientJune: 0,
      patientJuly: 0,
      patientAugust: 0,
      patientSeptember: 0,
      patientOctober: 0,
      patientNovember: 0,
      patientDecember: 0,
      patientAge: 0,
      averagePatientAge: 0,
      nbPatientAge: 0,
      nbPatient: 0,
      nbWomen: 0,
      nbMen: 0,
      nbTestSucceed: 0,
      nbTestFailed: 0,
      patientScore: 0,
      averagePatientScore: 0,
      
      /* Graphic 1 */
      series:
      [{
        name: '2021',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }, 
      {
        name: '2022',
        data: [20, 32, 45, 32, 34, 52, 41, 51, 42, 19, 10, 42]
      }],
      chartOptions: {
        chart: {
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        colors: ["#9082FF", "#FF8D8B"],
        xaxis: {
          categories: ['Janvier','Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre' , 'Novembre', 'Décembre']
        },
      },
      
      /* Graphic 3 */
      series2: [0, 0],
      chartOptions2: {
        chart: {
          type: 'pie'
        },
        labels: ['Femmes', 'Hommes'],
        colors: ["#9082FF", "#FF8D8B"],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },

      /* Graphic 4 */
      series3: [{
        data: [0, 0]
      }],
      chartOptions3: {
        chart: {
          type: 'bar'
        },
        labels: ['Réussis', 'Échoués'],
        colors: ["#9082FF", "#FF8D8B"],
      },

      /* For all the graphics */
      legend: {
        fontSize: '16px',
      },
    }
  },
  methods: {
    getDateMonth(dateISO){ 
      let creationDate = new Date(dateISO)
      let month = creationDate.getMonth()
      return month
    },
    getDateYear(dateISO){ 
      let creationDate = new Date(dateISO)
      let year = creationDate.getFullYear()
      let todayYear = new Date().getFullYear()
      let patientYear = todayYear - year
      return patientYear
    },
    updateChart(nbPatientJanvier, nbPatientFebrurary, nbPatientMarch, nbPatientApril, nbPatientMay, nbPatientJune, nbPatientJuly, nbPatientAugust, nbPatientSeptember, nbPatientOctober, nbPatientNovember, nbPatientDecember) {
      this.series = [{
        data: [nbPatientJanvier, nbPatientFebrurary, nbPatientMarch, nbPatientApril, nbPatientMay, nbPatientJune, nbPatientJuly, nbPatientAugust, nbPatientSeptember, nbPatientOctober, nbPatientNovember, nbPatientDecember]
      }]
    },
    updateChartPercent(nbWomenPercent, nbMenPercent) {
      this.series2 = [nbWomenPercent, nbMenPercent]
    },
    updateChartTest(nbTestSucceed, nbTestFailed) {
      this.series3 = [{
        data:[nbTestSucceed, nbTestFailed]
      }]
    },
  },
  mounted() {
    db.collection('patients').get()
      .then((querySnapshot) => { 
        querySnapshot.forEach((doc) => {
          /* Activation of the graphics when number of patient > 9 */
          this.nbPatient += 1
          if(this.nbPatient > 9) {
            this.isActive = true
          }
          /* Graphic 1 : Number of patients registered per month */
          this.patientOrderByMonth = this.getDateMonth(doc.data().dateCreation.toDate())
          if(this.patientOrderByMonth === 0) {
            this.patientJanuary += 1
          } else if (this.patientOrderByMonth === 1) {
            this.patientFebruary += 1
          } else if (this.patientOrderByMonth === 2) {
            this.patientMarch += 1
          } else if (this.patientOrderByMonth === 3) {
            this.patientApril += 1
          } else if (this.patientOrderByMonth === 4) {
            this.patientMay += 1
          } else if (this.patientOrderByMonth === 5) {
            this.patientJune += 1
          } else if (this.patientOrderByMonth === 6) {
            this.patientJuly += 1
          } else if (this.patientOrderByMonth === 7) {
            this.patientAugust += 1
          } else if (this.patientOrderByMonth === 8) {
            this.patientSeptember += 1
          } else if (this.patientOrderByMonth === 9) {
            this.patientOctober += 1
          } else if (this.patientOrderByMonth === 10) {
            this.patientNovember += 1
          } else if (this.patientOrderByMonth === 11) {
            this.patientDecember += 1
          } else {
            return
          }
          /* Graphic 2 : Total patient age */
          if(this.getDateYear(doc.data().birthday) > 17) {
            this.patientAge += Number(this.getDateYear(doc.data().birthday))
            this.nbPatientAge += 1
          }
          /* Graphic 3 : Number of men or women */
          if(doc.data().gender === "0") {
            this.nbWomen += 1
          } else if (doc.data().gender === "1") {
            this.nbMen += 1
          } else {
            return
          }
        })
      /* Graphic 1 */
      this.updateChart(this.patientJanuary, this.patientFebruary, this.patientMarch, this.patientApril, this.patientMay, this.patientJune, this.patientJuly, this.patientAugust, this.patientSeptember, this.patientOctober, this.patientNovember, this.patientDecember)
      /* Graphic 2 : Averahe patient age */
      this.averagePatientAge = Math.round(this.patientAge/this.nbPatientAge)
      /* Graphic 3 */
      this.updateChartPercent(this.nbWomen, this.nbMen)
      });
    db.collection('tentatives').get()
      .then((querySnapshot) => { 
        querySnapshot.forEach((doc) => {
          /* Graphic 4 */
          const data = doc.data() 
          if(data.succeed === true) {
            this.nbTestSucceed += 1
          } else if(doc.data().succeed === false) {
            this.nbTestFailed += 1
          } else {
            return
          }
          /* Graphic 5 */
          data.score = (data.score * 100).toFixed(2)
          this.patientScore += Number(data.score)
        })
        /* Graphic 4 */
        this.updateChartTest(this.nbTestSucceed, this.nbTestFailed)
        /* Graphic 5 */
        this.averagePatientScore = Math.round(this.patientScore/this.nbPatient)
      });
  }
}
</script>

<style scoped>
.stats {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
}
h2 {
  font-size: 18px;
  margin-top: 1rem;
}
h2 span {
  font-weight: 600;
}
#icon_back {
  display: flex;
  align-self: flex-start;
  margin-top: 12px;
}
h3 {
  font-weight: 500;
}
#graphics {
  margin-top: 2rem;
  overflow-y: scroll;
}
.graphicsPatient {
  display: flex;
  flex-direction: row;
}
.graphicsTest {
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
}
.graphic {
  padding: 2rem;
  background-color: #f0f0f0;
  border-radius: 25px;
  height: 100%;
}
.graphicNbPatient {
  width: 60%;
  margin-right: 2rem;
}
.wrapperGraphic {
  display: flex;
  flex-direction: column;
  width: 40%;
}
.graphicPartWomenMen {
  margin-top: 2rem;
}
.wrapperResult {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.wrapperResult p {
  font-size: 42px;
  font-weight: 600;
  text-align: center;
}
.testSucceedFailed {
  width: 100%;
  margin-right: 2rem;
}
.graphicAveragePatientScore {
  width: 100%;
}
@media screen and (max-width: 1025px) {
  #graphics {
    flex-direction: column;
  }
  .graphicNbPatient {
    width: 100%;
    margin-right: 0;
  }
  .wrapperGraphic {
    flex-direction: row;
    width: 100%;
    margin-top: 2rem;
  }
  .graphicAveragePatientAge {
    margin-right: 2rem;
  }
  .graphicPartWomenMen {
    margin-top: 0;
  }
}
</style>