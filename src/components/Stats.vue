<!-- PAGE ALL PATIENTS' STATS -->
<template>
  <div class="stats">
    <Hero title="Statistiques des patients" />
    <h2>
      Cette fonctionnalité est débloquée lorsque vous avez au
      <span> minimum 10 patients </span> renseignés dans l’application. Elle
      permet d’avoir une vue d’ensemble des informations liées aux patients ou
      aux tests.
    </h2>
    <div v-if="this.isActive" id="graphics">
      <div class="graphicsPatient">
        <div class="graphicNbPatient graphic">
          <h3>Nombre de personnes inscrits tous les mois</h3>
          <apexchart
            class="chart"
            type="area"
            width="100%"
            height="500"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
        <div class="wrapperGraphic">
          <div class="graphicAveragePatientAge graphic">
            <h3>Âge moyen des patients</h3>
            <div class="wrapperResult">
              <p>{{ this.averagePatientAge }} ans</p>
            </div>
            <img
              class="illustration"
              src="../assets/man-fauteuil-illustration.svg"
            />
          </div>
          <div class="graphicPartWomenMen graphic">
            <h3>Pourcentage d'hommes ou de femmes inscrits</h3>
            <div class="wrapperResult">
              <apexchart
                type="pie"
                width="100%"
                height="100%"
                :options="chartOptions2"
                :series="series2"
              ></apexchart>
            </div>
          </div>
        </div>
      </div>
      <div class="graphicsTest">
        <div class="wrapperGraphic">
          <div class="waveEffect">
            <div class="graphicAveragePatientScore graphic">
              <h3>Score moyen des patients</h3>
              <div class="wrapperResult">
                <p>{{ (this.averagePatientScore * 100).toFixed(2) }} %</p>
              </div>
            </div>
            <Wave :score="averagePatientScore" />
          </div>
          <div class="graphicNbTest graphic">
            <h3>Nombre total de tests passés</h3>
            <div class="wrapperResult">
              <p>{{ score.motricityTests.length / 5 + score.thinkingTests.length + score.attentionTests.length }}</p>
            </div>
            <img class="illustration" src="../assets/background.svg" />
          </div>
        </div>
        <div class="testSucceedFailed graphic">
          <h3>Nombre de tests réussis ou échoués</h3>
          <apexchart
            class="chart"
            type="bar"
            width="100%"
            height="500"
            :options="chartOptions3"
            :series="series3"
          ></apexchart>
        </div>
      </div>
      <div class="scorePerTest">
        <WaveScore :score="averagePatientMotricityScore * 100" showScore="true">
          <img class="test-logo" :src="require('../assets/' + 'motricite-illustration.svg')">
        </WaveScore>
        <WaveScore :score="averagePatientAttentionScore * 100" showScore="true">
          <img class="test-logo" :src="require('../assets/' + 'capacite-attentionnelle-illustration.svg')">
        </WaveScore>
        <WaveScore :score="averagePatientThinkingScore * 100" showScore="true">
          <img class="test-logo" :src="require('../assets/' + 'capacites-raisonnement-illustration.svg')">
        </WaveScore>
      </div>
    </div>
  </div>
</template>

<script>
import Hero from "@/components/Hero.vue";
import WaveScore from "@/components/WaveScore.vue";
import Wave from "@/components/Wave.vue";
import VueApexCharts from "vue-apexcharts";
import { db } from "../services/firebase";

export default {
  name: "Stats",
  components: {
    Hero,
    apexchart: VueApexCharts, WaveScore, Wave
  },
  data() {
    return {
      userId: '',
       score : {
          motricityTests: [],
          thinkingTests: [],
          attentionTests: [],
          stress: 0
       },
       isActive: false,
       nbPatient: 0,
       /* Graphic 1 */
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
       /* Graphic 2 */
       patientAge: 0,
       averagePatientAge: 0,
       nbPatientAge: 0,
       /* Graphic 3 */
       nbWomen: 0,
       nbMen: 0,
       /* Graphic 4 */
       nbTestSucceed: 0,
       nbTestFailed: 0,
       /* Graphic 5 */
       patientScore: 0,
       /* Graphic 6 */
       nbTest: 0,
       /* Graphic 1 */
       series: [
          {
             name: "2021",
             data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
          {
             name: "2022",
             data: [20, 32, 45, 32, 34, 52, 41, 51, 42, 19, 10, 42],
          },
       ],
       chartOptions: {
          chart: {
             type: "area",
          },
          dataLabels: {
             enabled: false,
          },
          stroke: {
             curve: "smooth",
          },
          colors: ["#9082FF", "#FF8D8B"],
          xaxis: {
             categories: [
                "Janvier",
                "Février",
                "Mars",
                "Avril",
                "Mai",
                "Juin",
                "Juillet",
                "Août",
                "Septembre",
                "Octobre",
                "Novembre",
                "Décembre",
             ],
          },
       },
       /* Graphic 3 */
       series2: [0, 0],
       chartOptions2: {
          chart: {
             type: "pie",
          },
          labels: ["Femmes", "Hommes"],
          colors: ["#9082FF", "#FF8D8B"],
          responsive: [
             {
                breakpoint: 480,
                options: {
                   chart: {
                      width: 200,
                   },
                   legend: {
                      position: "bottom",
                   },
                },
             },
          ],
       },
       /* Graphic 4 */
       series3: [
          {
             data: [0, 0],
          },
       ],
       chartOptions3: {
          chart: {
             type: "bar",
          },
          labels: ["Réussis", "Échoués"],
          colors: ["#9082FF", "#FF8D8B"],
       },
       /* For all the graphics */
       legend: {
          fontSize: "16px",
       },
    };
  },
  computed: {
    averagePatientScore() {
      let score = 0 
      let denominator = 0 
      if (this.score.motricityTests.length) {
        score += this.averagePatientMotricityScore
        denominator++
      }
      if (this.score.attentionTests.length) {
        score += this.averagePatientAttentionScore
        denominator++
      }
      if (this.score.thinkingTests.length) {
        score += this.averagePatientThinkingScore
        denominator++
      }
      return score / denominator
    },
    averagePatientMotricityScore() {
      return this.score.motricityTests.reduce((acc, curr) => acc += curr.score, 0) / this.score.motricityTests.length
    },
    averagePatientAttentionScore() {
      return this.score.attentionTests.reduce((acc, curr) => acc += (curr.score/100), 0) / this.score.attentionTests.length
    },
    averagePatientThinkingScore() {
      return this.score.thinkingTests.reduce((acc, curr) => acc += (curr.score), 0) / this.score.thinkingTests.length
    }
  },
  methods: {
    getDateMonth(dateISO) {
      let creationDate = new Date(dateISO);
      let month = creationDate.getMonth();
      return month;
    },
    getDateYear(dateISO) {
      let creationDate = new Date(dateISO);
      let year = creationDate.getFullYear();
      let todayYear = new Date().getFullYear();
      let patientYear = todayYear - year;
      return patientYear;
    },
    secondaryColor(score) {
      if (score >= 90) return "#75BE89";
      else if (score >= 60) return "#9EB056";
      else if (score >= 40) return "#E0832D";
      else if (score >= 15) return "#E0832D";
      else return "#A33425";
    },
    primaryColor(score) {
      if (score >= 90) return "#74DB63";
      else if (score >= 60) return "#B0CC41";
      else if (score >= 40) return "#D4BB5F";
      else if (score >= 15) return "#F0B747";
      else return "#E44B4B";
    },
    updateChartNbInscrit(
      nbPatientJanvier,
      nbPatientFebrurary,
      nbPatientMarch,
      nbPatientApril,
      nbPatientMay,
      nbPatientJune,
      nbPatientJuly,
      nbPatientAugust,
      nbPatientSeptember,
      nbPatientOctober,
      nbPatientNovember,
      nbPatientDecember
    ) {
      this.series = [
        {
          data: [
            nbPatientJanvier,
            nbPatientFebrurary,
            nbPatientMarch,
            nbPatientApril,
            nbPatientMay,
            nbPatientJune,
            nbPatientJuly,
            nbPatientAugust,
            nbPatientSeptember,
            nbPatientOctober,
            nbPatientNovember,
            nbPatientDecember,
          ],
        },
      ];
    },
    updateChartNbWomenMen(nbWomenPercent, nbMenPercent) {
      this.series2 = [nbWomenPercent, nbMenPercent];
    },
    updateChartNbTestSucceedFailed(nbTestSucceed, nbTestFailed) {
      this.series3 = [
        {
          data: [nbTestSucceed, nbTestFailed],
        },
      ];
    },
  },
  mounted() {
    db.collection('users').where('email', '==', this.$store.state.user.data.email)
      .onSnapshot(snapshot => { 
        this.userId = snapshot.docs[0].id
        db.collection('patients')
          .where('idUser', '==', snapshot.docs[0].id)
          .get()
          .then(patientRef => {
            const patientIds = []
            patientRef.forEach(doc => {
              patientIds.push(doc.id)

              const patientData = doc.data()
              if (patientData.attentionTest)
              {
                this.score.attentionTests.push(patientData.attentionTest)
                    if (patientData.attentionTest.succeed)
                      this.series3[0].data[0] += 1
                else
                  this.series3[0].data[1] += 1
              }
              if (patientData.thinkingTest) {
                this.score.thinkingTests.push(patientData.thinkingTest)
                if (patientData.thinkingTest.succeed)
                  this.series3[0].data[0] += 1
                else
                  this.series3[0].data[1] += 1
              }

              /* Activation of the graphics when number of patient > 9 */
              this.nbPatient += 1;
              if (this.nbPatient > 9) {
                this.isActive = true;
              }
              /* Graphic 1 : Number of patients registered per month */
              this.patientOrderByMonth = this.getDateMonth(
                patientData.dateCreation.toDate()
              );
              if (this.patientOrderByMonth === 0) {
                this.patientJanuary += 1;
              } else if (this.patientOrderByMonth === 1) {
                this.patientFebruary += 1;
              } else if (this.patientOrderByMonth === 2) {
                this.patientMarch += 1;
              } else if (this.patientOrderByMonth === 3) {
                this.patientApril += 1;
              } else if (this.patientOrderByMonth === 4) {
                this.patientMay += 1;
              } else if (this.patientOrderByMonth === 5) {
                this.patientJune += 1;
              } else if (this.patientOrderByMonth === 6) {
                this.patientJuly += 1;
              } else if (this.patientOrderByMonth === 7) {
                this.patientAugust += 1;
              } else if (this.patientOrderByMonth === 8) {
                this.patientSeptember += 1;
              } else if (this.patientOrderByMonth === 9) {
                this.patientOctober += 1;
              } else if (this.patientOrderByMonth === 10) {
                this.patientNovember += 1;
              } else if (this.patientOrderByMonth === 11) {
                this.patientDecember += 1;
              } else {
                return;
              }
              /* Graphic 2 : Average patient age */
              //if (this.getDateYear(patientData.birthday)) {
                this.patientAge += Number(this.getDateYear(patientData.birthday));
                this.nbPatientAge += 1;
              //}
              /* Graphic 3 : Number of men or women */
              if (patientData.gender === "0") {
                this.nbWomen += 1;
              } else if (patientData.gender === "1") {
                this.nbMen += 1;
              } else {
                return;
              }
            });
            /* Graphic 1 */
            this.updateChartNbInscrit(
              this.patientJanuary,
              this.patientFebruary,
              this.patientMarch,
              this.patientApril,
              this.patientMay,
              this.patientJune,
              this.patientJuly,
              this.patientAugust,
              this.patientSeptember,
              this.patientOctober,
              this.patientNovember,
              this.patientDecember
            );
            /* Graphic 2 */
            this.averagePatientAge = Math.round(
              this.patientAge / this.nbPatientAge
            );
            /* Graphic 3 */
            this.updateChartNbWomenMen(this.nbWomen, this.nbMen);


            //console.log(doc.data())
            patientIds.forEach(id => {
              db.collection(`patients/${id}/motricityTest`)
              .get()
                .then(motricityRef => {
                  const tests = []
                  motricityRef.forEach(motricityDoc => {
                    this.score.motricityTests.push(motricityDoc.data())
                    tests.push(motricityDoc.data())
                  })
                  if (motricityRef.docs.length) {
                    if (tests.reduce((acc, curr) => acc += (curr.succeed ? 1 : 0), 0) >= 3)
                      this.series3[0].data[0] += 1
                    else
                      this.series3[0].data[1] += 1
                    this.series3 = [ this.series3[0] ]
                  }
                })
            })
          })
      })
  },
};
</script>

<style scoped>
.stats {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 5rem;
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
  height: 20%;
  color: #382c50;
}
#graphics {
  margin-top: 2rem;
}
.chart {
  padding-top: 2rem;
}

.wave-container {
  position: relative;
  width: 250px;
  margin-right: 2rem;
  overflow: hidden;
  border-radius: 25px;
  height: 180px;
  box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.3);
}

.waveEffect {
  position: relative;
  height: 100%;
  background-color: white;
  border-radius: 25px;
  overflow: hidden;
  width: 100%;
}
.waveEffect .graphic {
  background-color: transparent;
}
.wrapperResult {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
}
.wrapperResult p {
  font-size: 42px;
  font-weight: 600;
  text-align: center;
}
.wrapperGraphic {
  display: flex;
  flex-direction: column;
  width: 40%;
}
.graphic {
  padding: 2rem;
  height: 100%;
  position: relative;
  z-index: 2;
  background-color: white;
  box-shadow: 0px 0px 30px -20px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  overflow: hidden;
}
.graphicAveragePatientAge .illustration {
  position: absolute;
  width: 40%;
  bottom: 1rem;
  left: 1rem;
  z-index: -1;
}
.graphicNbTest .illustration {
  position: absolute;
  width: 100%;
  bottom: 0;
  right: 0;
  z-index: -1;
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
}
.graphicsPatient {
  display: flex;
  flex-direction: row;
}
.graphicsPatient .graphicNbPatient {
  width: 60%;
  margin-right: 2rem;
}
.graphicsPatient .graphicPartWomenMen {
  margin-top: 2rem;
}
.graphicsTest {
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
}
.scorePerTest {
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
}
.testSucceedFailed {
  width: 60%;
}
.graphicsTest .wrapperGraphic {
  margin-right: 2rem;
}
.graphicsTest .testSucceedFailed {
  width: 100%;
}
.graphicsTest .graphicAveragePatientScore {
  width: 100%;
}
.graphicsTest .graphicNbTest {
  width: 100%;
  margin-top: 2rem;
}
.wave-container .test-logo {
  position: absolute;
  width: 50%;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media screen and (max-width: 1025px) {
  .graphic {
    height: auto;
  }
  .graphicsPatient {
    flex-direction: column;
  }
  .graphicsPatient .graphicNbPatient {
    width: 100%;
    margin-right: 0;
  }
  .wrapperGraphic {
    flex-direction: row;
    width: 100%;
    margin-top: 2rem;
  }
  .wrapperResult p {
    padding: 2rem;
  }
  .graphicsPatient .graphicAveragePatientAge {
    margin-right: 2rem;
  }
  .graphicsPatient .graphicPartWomenMen {
    margin-top: 0;
  }
  .graphicsTest {
    flex-direction: column;
  }
  .graphicsTest .wrapperGraphic {
    margin-top: 0;
    margin-right: 0;
  }
  .waveEffect {
    margin-right: 2rem;
  }
  .graphicsTest .graphicNbTest {
    margin-top: 0;
  }
  .graphicsTest .testSucceedFailed {
    margin-top: 2rem;
  }
}
@media screen and (max-width: 800px) {
  .wrapperGraphic {
    flex-direction: column;
  }
  .graphicsPatient .graphicAveragePatientAge {
    margin-right: 0;
  }
  .graphicsPatient .graphicPartWomenMen {
    margin-top: 2rem;
  }
  .graphicsTest .graphicNbTest {
    margin-top: 2rem;
  }
}
</style>
