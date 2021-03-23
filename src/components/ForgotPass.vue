<!-- MODAL FOR FORGOT PASSWORD -->
<template lang="html">
  <div id="modalPassword">
    <vs-popup class="modalContent" title="Mot de passe oublié" :active.sync="popupActivo">
      <div id="modalContent">
        <form action="#" @submit.prevent="submit">
          <div class="wrap-input validate-input" data-validate = "Valid email is required: ex@abc.xyz">
            <input 
              class="input"
              type="email"
              name="email"
              placeholder="Email"
              required
              autofocus
              v-model="form.email"
            />
            <span class="focus-input"></span>
            <span class="symbol-input">
              <i class="material-icons" aria-hidden="true">email</i>
            </span>
          </div>
          <button color="#9082FF" type="submit" class="button">Modifier</button>
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
.modalContent >>> .vs-popup {
  position: relative;
  font-family: 'Poppins';
  background-color: #eaedf0;
  border-radius: 20px;
  box-shadow: 0px 2px 30px rgba(200, 200, 200, 0.7);    
  width: 600px!important;
  text-align: center;
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
.wrap-input {
  position: relative;
  width: 100%;
  z-index: 1;
  margin-bottom: 1.5rem;
}
.input {
  font-size: 15px;
  font-family: 'Poppins';
  line-height: 1.5;
  color: rgb(118, 118, 118);
  display: block;
  width: 100%;
  border: 1px solid #EBEBEB;
  height: 45px;
  border-radius: 25px;
  padding: 0 30px 0 68px;
}
.focus-input {
  display: block;
  position: absolute;
  border-radius: 25px;
  bottom: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 0px 0px;
  color: #FF8D8B;
}
.input:focus + .focus-input {
  -webkit-animation: anim-shadow 0.5s ease-in-out forwards;
  animation: anim-shadow 0.5s ease-in-out forwards;
}
@-webkit-keyframes anim-shadow {
  to {
    box-shadow: 0px 0px 70px 25px;
    opacity: 0;
  }
}
@keyframes anim-shadow {
  to {
    box-shadow: 0px 0px 70px 25px;
    opacity: 0;
  }
}
.symbol-input {
  font-size: 15px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  position: absolute;
  border-radius: 25px;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-left: 35px;
  pointer-events: none;
  color: #B0B0B0;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}
.input:focus + .focus-input + .symbol-input {
  color: #FF8D8B;
  padding-left: 28px;
}
#btnConfirm {
  width: 110px;
  border-radius: 16px;
  margin-top: 1rem;
}
.btn-submit {
  display: flex;
  justify-content: center;
}
.button {
  font-size: 16px;
  border-radius: 25px;
  height: 45px;
  width: 45%;
  border: none;
  background-color: #FF8D8B;
  color: #FFFFFF;
  padding: .5rem 1.5rem;
  cursor: pointer;
  transition: all .5s ease-in-out;
}
.button:hover {
  background-color: #9082FF;
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