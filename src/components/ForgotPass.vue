<!-- MODAL FOR FORGOT PASSWORD -->
<template lang="html">
  <div id="modalPassword">
    <vs-popup title="Mot de passe oublié" :active.sync="popupActivo">
      <div id="modalContent">
        <form action="#" @submit.prevent="submit">
          <div>
            <input id="email" type="email" name="email" placeholder="Email" required v-model="form.email"/>
          </div>
          <button color="#9082FF" type="submit" id="button">Valider</button>
        </form>
          <img class="plane-purple" src="../assets/plane-purple-illustration.svg"/>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import firebase from 'firebase/app'
require('firebase/auth')

export default {
  name: 'ForgotPass',
  data() {
    return { 
      popupActivo: false,
      form: {
        email: ""
      },
      error: null,
      id:null
    }
  },
  methods: {
    toggle() {
      this.popupActivo = !this.open;
    },
    confirm() {
      this.popupActivo = !this.popupActivo
      this.$router.go(0)
    },
    submit(){
      firebase.auth().useDeviceLanguage()
      var auth = firebase.auth()
      var emailAddress = this.form.email;
      var self=this
      auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
        self.confirm()
      }).catch(function(error) {
        console.log(error)
      });
    }
  }
}
</script>

<style scoped>
.vs-popup {
  position: relative;
  font-family: Poppins;
  background-color: #eaedf0;
  border-radius: 20px;
  box-shadow: 0px 2px 30px rgba(200, 200, 200, 0.7);    
  width: 600px!important;
}
.selectExample {
  margin: 10px;
}
.con-select-example {
  display: flex;
  align-items: center;
  justify-content: center;
}
.con-select {
  width: 300px !important;
}
.con-select .vs-select {
  width: 300px !important;
}
.vs-popup--close--icon {
  margin-right: 9%;
  margin-top: 3%;
}
.plane {
  position: absolute;
  top: 17px;
  right: 27%;
}
#modalContent {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.vs-popup--content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 46px);
}
#btnConfirm {
  width: 110px;
  border-radius: 16px;
  margin-top: 1rem;
}
.plane-purple {
  position: absolute;
  top: -19px;
  left: -44px;
}
.vs-popup h3 {
  text-align: center;
}
</style>