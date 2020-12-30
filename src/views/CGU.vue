<template>
  <div class="cgu">
    <NavBarAuth p_color="#FF8D8B" p_colorBG="#ffffff" />
      <div>
        <h1> CGU </h1>
        <p> Lorem ipsum dolor sit amet, consectetur, Lorem ipsum dolor sit amet, consectetur </p>
      </div>
    <Footer p_txtColor="#000000" p_colorBG="#ffffff"/>
  </div>
</template>

<script>
import NavBarAuth from '@/components/NavBarAuth.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'CGU',
  components: {
    NavBarAuth,
    Footer
  }
}
</script>

<style scoped>
.cgu {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: 400;
}
h1 {
  font-size: 48px;
  font-weight: 600;
  color: #382C50;
}
p {
  font-size: 18px;
  margin: 1rem auto;
}
</style>