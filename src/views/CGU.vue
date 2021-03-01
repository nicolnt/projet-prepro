<template>
  <div class="cgu">
    <NavBar p_color="#FF8D8B" p_colorBG="#ffffff"/>
      <div>
        <a v-if="user.loggedIn" @click="goDashboard"><i class="material-icons">arrow_back</i></a>
        <a v-else @click="goHome"><i class="material-icons">arrow_back</i></a>
        <Hero title="CGU"/>
        <p> Lorem ipsum dolor sit amet, consectetur, Lorem ipsum dolor sit amet, consectetur </p>
      </div>
    <Footer p_txtColor="#000000" p_colorBG="#ffffff"/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Hero from '@/components/Hero.vue'
import Footer from '@/components/Footer.vue'
import { mapGetters } from "vuex";

export default {
  name: 'CGU',
  components: {
    NavBar,
    Hero,
    Footer
  },
  methods : {
    goHome(){
      if(this.$route.name != 'Home')
        this.$router.push({name:'Home'})
    },
    goDashboard() {
      if(this.$route.name != 'PatientsList')
        this.$router.push({name:'PatientsList'})
    }
  },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user"
    })
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
  position: relative;
}
.cgu a {
  position: absolute;
  top: 78px;
  left: 32px;
  font-size: 30px;
  cursor: pointer;
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