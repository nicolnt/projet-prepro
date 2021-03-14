<template>
  <div @click="$emit('click')" class="wave-container">
    <Wave :score="score" />
    <slot/>
    <div v-if="showScore" class="score-number">
      <span class="percent-score-int">{{ Math.trunc(score) }}</span>
      <span class="percent-score-float">{{ (((score) % 1).toFixed(2).toString()).slice(1) }}</span>
      <span class="percent-sign">%</span>
    </div>
  </div>
</template>

<script>
import Wave from './Wave.vue'
export default {
  name: 'WaveScore',
  props: [ 'score', 'showScore' ],
  components: {
    Wave
  },
  computed: {
    bottom() {
      return (- (1 - this.score/100) * 70) + '%'
    }
  },
  methods: {
    primaryColor(score) {
      if (score >= 90) return "#74DB63";
      else if (score >= 60) return "#B0CC41";
      else if (score >= 40) return "#D4BB5F";
      else if (score >= 15) return "#F0B747";
      else return "#E44B4B";
    },
    secondaryColor(score) {
      if (score >= 90) return "#75BE89";
      else if (score >= 60) return "#9EB056";
      else if (score >= 40) return "#E0832D";
      else if (score >= 15) return "#E0832D";
      else return "#A33425";
    },
  },
}
</script>

<style scoped>
/*.wave-container .wave {*/
  /*position: absolute;*/
  /*width: 125%;*/
  /*height: 90%;*/
  /*left: 50%;*/
  /*border-radius: 25px;*/
  /*bottom: 0;*/
  /*transform: translateX(-50%);*/
/*}*/

.wave-container .score-number {
  position: absolute;
  bottom: 0;
  right: 10px;
  font-weight: bold;
  font-size: 2rem;
  color: white;
}
.wave-container .score-number span.percent-score-int {
  font-size: 3.5rem;
}
.wave-container .score-number span.percent-score-float {
  font-size: 1.5rem;
}
.wave-container .score-number span {
  text-shadow: 0px 1px 5px rgba(0,0,0,0.5);
}
</style>

