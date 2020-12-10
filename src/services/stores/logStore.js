import Vuex from 'vuex'

export default logStore = new Vuex.Store({
    state: {
      lastName: "",
      firstName: "",
      email: "",
      password: ""
    },
    getters: {
        lastName() {
            return lastName;
        },
        firstName() {
            return firstName;
        },
        email() {
            return email;
        },
        password() {
            return password;
        }
    },
    mutations: { // setters
      setLastName (lastName) {
        this.lastName = lastName
      },
      setFirstName (firstName) {
        this.firstName = firstName
      },
      setEmail (email) {
        this.email = email
      },
      setPassword (password) {
        this.password = password
      }
    },
    actions: {
        // login
        // logout
    }
  })