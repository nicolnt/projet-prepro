<template>
  <div class="test">
    <div class="test-quit">
      <vs-button color="#9082FF" type="filled" @click="ToggleQuitModal">Quitter le test</vs-button>
    </div>
    <div class="test-content">
        <router-view ref="test" @ToggleInfosModal="ToggleInfosModal"></router-view>
        <TestQuitModal ref="TestQuitModal"/>
        <TestInfosModal ref="TestInfosModal"/>
    </div>
  </div>
</template>

<script>
import TestQuitModal from '@/components/TestQuitModal.vue'
import TestInfosModal from '@/components/TestInfosModal.vue'

export default {
  name: 'Test',
  components: {
    TestQuitModal,
    TestInfosModal
  },
  beforeMount() {
    if (!this.$store.state.currentPatient)
      this.$router.push({name: 'Dashboard'})
  },
  methods: {
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
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #EDEDED;
  user-select: none;
}
.test-quit {
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 5;
}
.test-quit > button {
  border-radius: 15px;
  padding: 10px 20px;
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
