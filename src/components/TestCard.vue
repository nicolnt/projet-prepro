<!-- TEST CARD ON TEST LIST -->
<template>
  <div class="testCard">
    <div class="header">
      <h3>{{ testName }}</h3>
    </div>
    <div class="testCardContent">
      <img :src="require('../assets/' + img)"/>
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
    img: String
  }
}
</script>

<style scoped>
.testCard {
  background-color: white;
  box-shadow: 0 4px 16px 0 rgba(0,0,0,.05);
  border-radius: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
}
.header {
  background-color:#9082FF;
  border-radius: 16px 16px 0 0;
  color: white;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.header h3 {
  padding: .75rem;
}
.testCardContent img{
  width: 50%;
  margin: 1rem;
}
#startTestButton {
  margin-bottom: 1rem;
  width: 80%;
  border-radius: 16px;
  font-size: 16px;
}
</style>