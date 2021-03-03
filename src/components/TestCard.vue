<template>
  <div class="testCard">
    <div class="header">
      <h3>{{ testName }}</h3>
    </div>
    <div class="testCardContent">
      <vs-button color="#9082FF" type="filled" id="startTestButton">
        Commencer le test
      </vs-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TestCard',
  props: {
    testName: String,
  }
}
</script>

<style scoped>
.testCard {
  background-color: white;
  box-shadow: 0 4px 16px 0 rgba(0,0,0,.05);
  border-radius: 16px;
  width: 25%;
  height: fit-content;
  margin: 0 auto;
  text-align: center;
  margin-top:2%;
}
.header {
  background-color:#9082FF;
  border-radius: 16px 16px 0 0;
  color: white;
  padding: 1.5% 0;
}
.header h3 {
  margin-left: 2%;
}
.testCardContent {
  display: flex;
  align-content: center;
  align-content: center;
  justify-content: center;
  height: 100%;
  margin-top: 2%;
  padding-bottom: 2%;
}
#startTestButton {
  margin-left: 2%;
  width: 60%;
  border-radius: 16px;
}
</style>