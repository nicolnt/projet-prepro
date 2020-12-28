<template>
  <div class="test">
    <NavBarTest testName="Motricité fine" p_color="#FF8D8B" p_colorBG="#ffffff" />
    <div id="testContent">
        <div id="barTest">
          <p id="countTest">1/3</p>
          <vs-button @click="ToggleInstructionsModal" radius type="flat" icon="help" color="#9082FF"></vs-button>
        </div>
        <h1>C'est parti !</h1>
        <TestInstructionsModal ref="TestInstructionsModal"/>
        <TestQuitModal ref="TestQuitModal"/>
        <TestCompleteModal ref="TestCompleteModal"/>
    </div>
  </div>
</template>

<script>
import NavBarTest from '@/components/NavBarTest.vue'
import TestInstructionsModal from '@/components/TestInstructionsModal.vue'
import TestQuitModal from '@/components/TestQuitModal.vue'
import TestCompleteModal from '@/components/TestCompleteModal.vue'

export default {
  name: 'MotricityTest',
  components: {
    NavBarTest,
    TestInstructionsModal,
    TestQuitModal,
    TestCompleteModal
  },
  methods: {
    ToggleInstructionsModal() {
      this.$refs.TestInstructionsModal.toggle()
    }
  },
  data(){
    return {
      quitPopupActiv:false,
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
}
#testContent {
  height: 100%;
  padding: 20px;
}
#barTest {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
h1 {
  margin-top: 10%;
}
#countTest {
  margin: 0.45rem;
}
</style>