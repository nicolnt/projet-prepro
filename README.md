# Tapitap
![accueil-tapitap](doc/accueil.PNG?raw=true "Accueil Tapitap")

## Table of Contents
  - [Presentation](#presentation)
  - [Building configuration](#building-configuration)
    - [Clone repository](#clone-repository)
    - [Launch local project](#launch-local-project)
    - [Build project](#build-project)
  - [Dependencies](#dependencies)

## Presentation
Tapitap is an application for psychologists. It allows them to make their patients take tests for driver's license.

## Building configuration
You need [Node.js] (http://nodejs.org) to launch this project.

### Clone repository
In a local folder for the project
```
git clone https://github.com/imac-web/projet-prepro.git
```

### Launch local project
In the Node Command Prompt, in the project folder
```
npm install
npm run serve
```

### Build project
In the Node Command Prompt, in the project folder
```
npm install
npm run build
```
The build folder is dist, in the project folder.

## Dependencies
- [Vue-sax](https://vuesax.com/). For styles
- [Material-icons](https://material.io/resources/icons/). For icons
- [Vue-apexCharts](https://apexcharts.com/docs/vue-charts/). For charts in stats page
- [Vue-router](https://router.vuejs.org/). For router
- [VueX](https://vuex.vuejs.org/). For store
- [Firebase](https://firebase.google.com/). For backend
- [Vue-fire](https://vuefire.vuejs.org/). To link firebase and vuejs app

## Firebase
```
firebase deploy --only hosting
```

## Icon Android
```
npm run resources
```

## Capacitor IOS
```
npx cap add ios
npx cap copy
npx cap open ios
```