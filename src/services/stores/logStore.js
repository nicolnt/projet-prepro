import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      // lastName: "",
      // firstName: "",
      // email: "",
      // password: "",
      user: {
        loggedIn: false,
        data: {
          displayName: ""
        }
      },
      currentPatient: null
    },
    getters: {
      user(state){
        return state.user
      },
      // lastName() {
      //     return lastName;
      // },
      // firstName() {
      //     return firstName;
      // },
      // email() {
      //     return email;
      // },
      // password() {
      //     return password;
      // }
    },
    mutations: { // setters
      // setLastName (lastName) {
      //   this.lastName = lastName
      // },
      // setFirstName (firstName) {
      //   this.firstName = firstName
      // },
      // setEmail (email) {
      //   this.email = email
      // },
      // setPassword (password) {
      //   this.password = password
      // },
      /*SET_LOGGED(state, value) {
        state.user.loggedIn = value === true;
      },*/
      SET_USER(state, data) {
        state.user.data = data;
        state.user.loggedIn = true;
      },
      SET_CURRENT_PATIENT(state, patient) {
        state.currentPatient = patient;
      },
      SET_LOGGED_OUT(state) {
        state.user.loggedIn = false;
        state.user.data.displayName = "";
      }
      // mutation pour deconnexion en mettant toutes valeurs à null
    },
    actions: { // transformer action en asynchrone
     /*async*/ FETCH_USER({ commit }) {
        // to do : call server
        // await ....
        firebase.auth().onAuthStateChanged(user => {
          commit("SET_USER", user);
        })     
      },
      SIGN_OUT({commit}) {
        firebase.auth().signOut().then( () => {
          commit("SET_LOGGED_OUT");
        })
      }
        // login
        // logout
    }
  })