<template>
  <div class="stats">
    <Hero title="Statistiques des patients"/>
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'

export default {
  name: 'Stats',
  components: {
    Hero,
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
</style>