import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState({
      paths: ['currentPatient']
    })],
    state: {
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
      currentPatient(state){
        return state.currentPatient
      },
    },
    mutations: { // setters
      SET_USER(state, data) {
        if(data) {
          state.user.data = data;
          state.user.loggedIn = true;
        }
      },
      SET_CURRENT_PATIENT(state, patient) {
        state.currentPatient = patient;
      },
      SET_LOGGED_OUT(state) {
        state.user.loggedIn = false;
        state.user.data.displayName = "";
      }
    },
    actions: {
      FETCH_USER({ commit }) {
        firebase.auth().onAuthStateChanged(user => {
          commit("SET_USER", user);
        })     
      },
      SIGN_OUT({ commit }) {
        firebase.auth().signOut().then( () => {
          commit("SET_LOGGED_OUT");
        })
      },
      // FETCH_PATIENT({ commit }) {
      //   (currentPatient) => {
      //     commit("SET_CURRENT_PATIENT", currentPatient)
      //   }
      // }
    }
  })
