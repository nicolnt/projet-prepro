<template>
  <div class="appParams">
    <Hero title="Paramètres de l'application"/>
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue'

export default {
  name: 'AppParams',
  components: {
    Hero,
  }
}
</script>

<style scoped>
.appParams {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
#icon_back {
  display: flex;
  align-self: flex-start;
  margin-top: 12px;
}
</style>