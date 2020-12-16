import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AuthSignUp from '../views/AuthSignUp.vue'
import AuthSignIn from '../views/AuthSignIn.vue'
import Dashboard from '../views/Dashboard.vue'
import PatientsList from '../components/PatientsList.vue'
import PsyInformations from '../components/PsyInformations.vue'
import Stats from '../components/Stats.vue'
import AppParams from '../components/AppParams.vue'
import PatientResults from '../components/PatientResults.vue'
import PatientProfil from '../components/PatientProfil.vue'
import TestList from '../components/TestList.vue'

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
    component: Dashboard,
    children: [{
      path: '/dashboard/psy',
      name: 'PsyInformations',
      component: PsyInformations
    },
    {
      path: '/dashboard/patientsList',
      name: 'PatientsList',
      component: PatientsList
    },
    {
      path: '/dashboard/stats',
      name: 'Stats',
      component: Stats
    },
    {
      path: '/dashboard/params',
      name: 'AppParams',
      component: AppParams
    },
    {
      path: '/dashboard/patientResults',
      name: 'PatientResults',
      component: PatientResults
    },
    {
      path: '/dashboard/patientProfil',
      name: 'PatientProfil',
      component: PatientProfil
    },
    {
      path: '/dashboard/testList',
      name: 'TestList',
      component: TestList
    }]
  },
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