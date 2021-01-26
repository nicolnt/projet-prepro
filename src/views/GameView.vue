<template>
  <div class="test">
    <NavBarTest testName="Motricité fine" p_color="#FF8D8B" p_colorBG="#ffffff" />
    <div class="test-content">
        <router-view @toggleHelp="ToggleInstructionsModal"></router-view>
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
</style>
