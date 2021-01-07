<template>
  <div class="legalNotice">
    <NavBarAuth p_color="#FF8D8B" p_colorBG="#ffffff" />
      <div>
        <a @click="$router.go(-1)"><i class="material-icons">arrow_back</i></a>
        <Hero title="Mentions légales"/>
        <p> Lorem ipsum dolor sit amet, consectetur, Lorem ipsum dolor sit amet, consectetur </p>
      </div>
    <Footer p_txtColor="#000000" p_colorBG="#ffffff"/>
  </div>
</template>

<script>
import NavBarAuth from '@/components/NavBarAuth.vue'
import Hero from '@/components/Hero.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'LegalNotice',
  components: {
    NavBarAuth,
    Hero,
    Footer
  }
}
</script>

<style scoped>
.legalNotice {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: 400;
}
.legalNotice a {
  position: absolute;
  top: 78px;
  left: 32px;
  font-size: 30px;
  cursor: pointer;
}
p {
  font-size: 18px;
  margin: 1rem auto;
}
</style>