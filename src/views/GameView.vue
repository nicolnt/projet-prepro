<template>
  <div class="test">
    <NavBarTest testName="Motricité fine" p_color="#FF8D8B" p_colorBG="#ffffff" />
    <div class="test-content">
        <div class="test-bar">
          <span class="test-counter">1/3</span>
          <vs-button @click="ToggleInstructionsModal" radius type="flat" icon="help" color="#9082FF"></vs-button>
        </div>
        <router-view></router-view>
        <TestInstructionsModal ref="TestInstructionsModal"/>
        <TestQuitModal ref="TestQuitModal"/>
        <TestInfosModal ref="TestInfosModal"/>
    </div>
  </div>
</template>

<script>
import NavBarTest from '@/components/NavBarTest.vue'
import TestInstructionsModal from '@/components/TestInstructionsModal.vue'
import TestQuitModal from '@/components/TestQuitModal.vue'
import TestInfosModal from '@/components/TestInfosModal.vue'

export default {
  name: 'MotricityTest',
  components: {
    NavBarTest,
    TestInstructionsModal,
    TestQuitModal,
    TestInfosModal
  },
  methods: {
    ToggleInstructionsModal() {
      this.$refs.TestInstructionsModal.toggle()
    }

  },
  data(){
    return {
      quitPopupActiv:false
    }
  }
}
</script>

<style scoped>
.test {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #EDEDED;
}
.test-content {
  background-color: #FFFFFF;
  border-radius: 20px;
  box-shadow: 0px 0px 20px rgba(200, 200, 200, 0.2);
  flex: 1 1 auto;
  position: relative;
  overflow: hidden;
  margin: 20px;
}
.test-bar {
  display: flex;
  position: absolute;
  top: 10px;
  right: 10px;
}
.test-bar > .test-counter {
  padding: 10px;
  line-height: 18px;
}
</style>
