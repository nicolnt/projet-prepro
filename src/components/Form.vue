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
    width: 100%;
    height: 100%;
    flex: 1;
    position: relative;
  }
  .container-form {
    width: 100%;
    height: 115%;
    position: absolute;
    background-color: #FFFFFF;
    border-radius: 20px;
  }
  .container-tabs {
    width: 100%;
    display: flex;
    border-bottom: 1px solid #FF8D8B;
  }
  .tabs {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .75rem 0;
    cursor: pointer;
  }
  .sign {
    width: 100%;
    position: absolute;
    display: none;
  }
  .active {
    background-color: #FF8D8B;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
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
    top: -21px;
    left: -48px;
  }
  .activeContent {
    display: block;
  }
</style>