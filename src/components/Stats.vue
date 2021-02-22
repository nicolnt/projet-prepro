<template>
  <div class="stats">
    <Hero title="Statistiques des patients"/>
    <div id="chart">
      <apexchart type="area" width="800" height="500" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'

import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'Stats',
  components: {
    Hero,
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: 
      [{
        name: '2021',
        data: [31, 40, 28, 51, 42, 109, 100, 60, 86, 45, 100, 120]
      }, 
      {
        name: '2022',
        data: [11, 32, 45, 32, 34, 52, 41, 51, 42, 109, 100, 42]
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