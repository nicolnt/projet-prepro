import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      // lastName: "",
      // firstName: "",
      // email: "",
      // password: "",
      user: {
        loggedIn: false,
        data: null
      }
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
      SET_LOGGED_IN(state, value) {
        state.user.loggedIn = value;
      },
      SET_USER(state, data) {
        state.user.data = data;
      },
      SET_PATIENT(state, patient) {
        state.user.patient = patient;
      },
    },
    actions: {
      fetchUser({ commit }, user) {
        commit("SET_LOGGED_IN", user !== null);
        if (user) {
          commit("SET_USER", {
            displayName: user.displayName,
            email: user.email
          });
        } else {
          commit("SET_USER", null);
        }
      }
        // login
        // logout
    }
  })
