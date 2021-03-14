<template>
	<div class="wave-container">
		<svg class="wave" :style="{ bottom: - (90 - ((15.56 * score)/100 * 90))+'px'}" width="264" height="173" viewBox="0 0 264 173" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g opacity="0.82">
				<path d="M0 73.0446V28.727C52.8 5.09099 105.6 5.09099 158.4 28.727V73.0446H0Z" :fill="secondaryColor(15.56 * score)"/>
				<path d="M0 175V19.8634C52.8 29.7118 101.2 29.7118 145.2 19.8634C189.2 10.0151 228.8 9.03027 264 16.9089V175H0Z" :fill="primaryColor(15.56 * score)"/>
			</g>
		</svg>
		<div class="score-number">
			<span class="percent-score-int">{{ Math.trunc(15.56 * score) }}</span>
			<span class="percent-score-float">{{ (((15.56 * score) % 1).toFixed(2).toString()).slice(1) }}</span>
			<span class="percent-sign">%</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'WaveScore',
	props: [ 'score', 'showScore' ],
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
	}
}
</script>

<style>

</style>
