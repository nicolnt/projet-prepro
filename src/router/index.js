import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AuthSignUp from '../views/AuthSignUp.vue'
import AuthSignIn from '../views/AuthSignIn.vue'
import Dashboard from '../views/Dashboard.vue'
/*import PsyInformations from '../views/PsyInformations.vue'
import Stats from '../views/Stats.vue'
import AppParams from '../views/AppParams.vue'
import PatientResults from '../views/PatientResults.vue'
import PatientProfil from '../views/PatientProfil.vue'
import TestList from '../views/TestList.vue'*/

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signUp',
    name: 'AuthSignUp',
    component: AuthSignUp
  },
  {
    path: '/signIn',
    name: 'AuthSignIn',
    component: AuthSignIn
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  /*{
    path: '/psy',
    name: 'PsyInformations',
    component: PsyInformations
  },
  {
    path: '/stats',
    name: 'Stats',
    component: Stats
  },
  {
    path: '/params',
    name: 'AppParams',
    component: AppParams
  },
  {
    path: '/patientResults',
    name: 'PatientResults',
    component: PatientResults
  },
  {
    path: '/patientProfil',
    name: 'PatientProfil',
    component: PatientProfil
  },
  {
    path: '/testList',
    name: 'TestList',
    component: TestList
  },*/
  {
    path: '*',
    name: 'default',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router