<template>
	<div ref="container" @click="$emit('click')">
		<svg class="wave" :width="containerWidth" :style="{bottom}" viewBox="0 0 224 198" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
			<g opacity="0.82">
				<path d="M0 52.5866V15.0247C44.7512 -5.00824 89.5024 -5.00824 134.254 15.0247V52.5866H0Z" :fill="secondaryColor(score)"/>
				<path d="M0 197.093V7.51217C44.7512 15.8592 85.7732 15.8592 123.066 7.51217C160.359 -0.834904 193.922 -1.66961 223.756 5.00805V197.093H0Z" :fill="primaryColor(score)"/>
			</g>
		</svg>
	</div>
</template>

<script>
export default {
	name: 'Wave',
	props: [ 'score', ],
	data() {
		return {
			containerWidth: 0,
			containerHeight: 0,
		}
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
	mounted() {
		this.$watch(() => {
			return this.$refs['container'].clientWidth
		}, (newWidth) => { this.containerWidth = newWidth })
		this.$watch(() => {
			return this.$refs['container'].clientHeight
		}, (newHeight) => { this.containerHeight = newHeight })
	}
}
</script>

<style scoped>
.wave {
  position: absolute;
  width: 125%;
  height: 90%;
  left: 50%;
  border-radius: 25px;
  bottom: 0;
  transform: translateX(-50%);
}
</style>
