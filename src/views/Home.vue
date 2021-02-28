<template>
  <div class="home">
    <!-- <NavBar p_color="#FF8D8B" p_colorBG="#ffffff"/> -->
    <div class="introduction-application">
      <div class="presentation-application">
        <h1> Tapitap, l’application destinée aux psychologues </h1>
        <p> Gagnez du temps afin de faire passer l’habilitation au permis de conduire à vos patients. </p>
        <!-- <vs-button color="#FF8D8B" type="filled" v-on:click="goSignUp" id="btnSignUp">inscription</vs-button> -->
      </div>
      <!-- <div class="illustration-application">
        <img src="../assets/illustration-home.svg"/>
      </div> -->
      <Form/>
    </div>
    <Footer p_txtColor="#000000" p_colorBG="#ffffff"/>
  </div>
</template>

<script>
// import NavBar from '@/components/NavBar.vue'
import Form from '@/components/Form.vue'
import Footer from '@/components/Footer.vue'
import { mapGetters } from "vuex";

export default {
  name: 'Home',
  components: {
    // NavBar,
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
  justify-content: space-between;
  background-image: url("../assets/background.svg");
  background-repeat: no-repeat;
  background-position:right bottom;
  font-weight: 400;
}
.introduction-application {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin: auto;
}
.presentation-application {
  text-align: left;
  margin-right: 5rem;
  flex: 1;
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
    width: 85%;
  }
  h1 {
    font-size: 28px;
  }
}
@media screen and (max-width: 780px) {
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