<template>
  <div class="test">
    <NavBarTest @ToggleQuitModal="ToggleQuitModal" testName="Motricité fine" p_color="#FF8D8B" p_colorBG="#FFFFFF" />
    <div class="test-content">
        <router-view ref="test" @ToggleInstructionsModal="ToggleInstructionsModal" @ToggleInfosModal="ToggleInfosModal"></router-view>
        <TestInstructionsModal @train="$refs.test.train()" @play='$refs.test.play()' ref="TestInstructionsModal"/>
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
    },
    ToggleQuitModal() {
      this.$refs.TestQuitModal.toggle()
    },
    ToggleInfosModal() {
      this.$refs.TestInfosModal.toggle()
    }
  },
  data(){
    return {
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
