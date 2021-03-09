<!-- VIEW : HOME PAGE -->
<template>
  <div class="home">
    <div class="introduction-application">
      <div class="presentation-application">
        <h1> Tapitap </h1>
        <h2> L’application destinée aux psychologues </h2>
        <p> Gagnez du temps afin de faire passer l’habilitation au permis de conduire à vos patients. </p>
      </div>
      <Form/>
    </div>
    <Footer p_txtColor="#000000" p_colorBG="#ffffff"/>
  </div>
</template>

<script>
import Form from '@/components/Form.vue'
import Footer from '@/components/Footer.vue'
import { mapGetters } from "vuex";

export default {
  name: 'Home',
  components: {
    Form,
    Footer
  },
  methods: {
    goSignUp() {
      if(this.$route.name != 'AuthSignUp')
        this.$router.push({name:'AuthSignUp'})
    }
  },
  mounted: function(){
    console.log(this.user)
    if(this.user.loggedIn==true){
      this.$router.push({path:'/dashboard'})
    }
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
}
</script>

<style scoped>
.home {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/background.svg");
  background-repeat: no-repeat;
  background-position:right bottom;
}
.introduction-application {
  display: flex;
  width: 80%;
  position: relative;
}
.presentation-application {
  text-align: left;
  flex: 1;
}
h1 {
  font-size: 48px;
  font-weight: 600;
  color: #382C50;
  position: absolute;
  top: -6rem;
}
h2 {
  font-size: 32px;
  font-weight: 500;
  color: #382C50;
  margin-top: 2rem;
}
p {
  font-size: 18px;
  margin: 1rem auto;
}
img {
  max-width: 100%;
}
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus,
input:-webkit-autofill:active  {
  box-shadow: 0 0 0 30px white inset !important;
}
#btnSignUp {
  display: flex;
  align-self: center;
  padding: .5rem 1rem;
  font-size: 16px;
}
@media screen and (max-width: 1024px) {
  .introduction-application {
    flex-direction: column;
  }
}
@media screen and (max-width: 800px) {
  .introduction-application {
    flex-direction: column;
  }
  .presentation-application {
    text-align: center;
    margin-right: 0;
  }
  .illustration-application {
    margin-top: 3rem;
  }
  h1 {
    font-size: 28px;
  }
  img {
    max-width: 70%;
  }
  #btnSignUp {
    display: initial;
  }
}
</style>