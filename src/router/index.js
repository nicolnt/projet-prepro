import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AuthSignUp from '../views/AuthSignUp.vue'
import AuthSignIn from '../views/AuthSignIn.vue'
import CGU from '../views/CGU.vue'
import LegalNotice from '../views/LegalNotice.vue'
import Dashboard from '../views/Dashboard.vue'
import PatientsList from '../components/PatientsList.vue'
import PsyInformations from '../components/PsyInformations.vue'
import Stats from '../components/Stats.vue'
import AppParams from '../components/AppParams.vue'
import PatientResults from '../components/PatientResults.vue'
import PatientProfil from '../components/PatientProfil.vue'
import TestList from '../components/TestList.vue'
import firebase from 'firebase/app'

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
    component: AuthSignUp,
    meta: {
      requiresGuest: true
    },
  },
  {
    path: '/signIn',
    name: 'AuthSignIn',
    component: AuthSignIn,
    meta: {
      requiresGuest: true
    },
  },
  {
    path: '/cgu',
    name: 'CGU',
    component: CGU
  },
  {
    path: '/legalNotice',
    name: 'LegalNotice',
    component: LegalNotice
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        component: PatientsList
      },
      {
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
      }
    ]
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

router.beforeEach((to, from, next) => {
  // check for requiresAuth guard
  if(to.matched.some(record => record.meta.requiresAuth)) {
    // check if not logged in
    if(!firebase.auth().currentUser) {
      // go to login
      next({
        path: '/signIn',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // proceed to the route
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // check if logged in
    if(firebase.auth().currentUser) {
      // go to login
      next({
        path: '/dashboard/patientList',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // proceed to the route
      next()
    }
  } else {
    // proceed to the route
    next()
  }
})

export default router