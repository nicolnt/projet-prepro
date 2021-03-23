<!-- AUTHENTICATION FORM WITH SIGN IN AND SIGN UP -->
<template>
  <div class="formAuth">
    <div class="container-form">
      <div class="container-tabs">
        <div class="tabs active" data-anim="1"> Connexion </div>
        <div class="tabs" data-anim="2"> Inscription </div>
      </div>
      <div class="content-tabs">
        <SignIn class="sign activeContent" data-anim="1"/>
        <img class="illu activeContent plane" src="../assets/plane-illustration.svg" data-anim="1"/>
        <SignUp class="sign" data-anim="2"/>
        <img class="illu cloud" src="../assets/cloud-illustration.svg" data-anim="2"/>
      </div>
      <img class="leaf" src="../assets/leaf-home-illustration.svg">
      <img class="leaf-bottom" src="../assets/leaf-home-bis-illustration.svg">
    </div>
  </div>
</template>

<script>
import SignIn from '@/components/SignIn.vue'
import SignUp from '@/components/SignUp.vue'

export default {
  name: 'Form',
  components: {
    SignIn,
    SignUp
  },
  mounted() {
    const tabs = document.querySelectorAll('.tabs');
    const content = document.querySelectorAll('.sign');
    const illu = document.querySelectorAll('.illu');
    let index = 0;
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        if(tab.classList.contains('active')) {
          return
        } else {
            tab.classList.add('active')
        }
  
        index = tab.getAttribute('data-anim')
        
        for(let i = 0; i < tabs.length; i++) {
          if(tabs[i].getAttribute('data-anim') != index) {
              tabs[i].classList.remove('active')
          }
        }
    
        for(let j = 0; j < content.length; j++) {
          if(content[j].getAttribute('data-anim') == index) {
              content[j].classList.add('activeContent')
          } else {
              content[j].classList.remove('activeContent')
          }
          if(illu[j].getAttribute('data-anim') == index) {
              illu[j].classList.add('activeContent')
          } else {
              illu[j].classList.remove('activeContent')
          }
        }
      })
    })
  }
}
</script>

<style scoped>
.formAuth {
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  font-weight: 500;
}
.container-form {
  width: 70%;
  position: absolute;
  background-color: #FFFFFF;
  border-radius: 20px;
}
.container-tabs {
  width: 100%;
  display: flex;
}
.tabs {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .75rem 0;
  margin: 0.5rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all .5s ease;
}
.tabs:not(.active):hover {
  background-color: rgba(255, 141, 139, 0.2);;
}
.sign {
  width: 100%;
  height: 450px;
  display: none;
  opacity: 0;
  transition: all 2s ease;
}
.active {
  background-color: #FF8D8B;
  color: #FFFFFF;
}
.illu {
  display: none;
}
.plane {
  position: absolute;
  top: -21px;
  right: -48px;
}
.cloud {
  position: absolute;
  bottom: -27px;
  left: -48px;
}
.leaf {
  position: absolute;
  top: 1rem;
  left: 1rem;
  transform: translate(-50%, -50%);
  z-index: -1;
}
.leaf-bottom {
  position: absolute;
  bottom: 2rem;
  right: 0;
  transform: translate(50%, 50%);
  z-index: -1;
}
.activeContent {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
}

@media screen and (max-width: 1024px) {
  .container-form {
    width: 100%;
  }
}
</style>