<template lang="html">
    <VsPopupCustom :active.sync="popupActive" :button-close-hidden="false" :title="'Situation '+(idTest+1)" class="test-modal">
        <div class="test-track-img-content">
          <img class="track" :src="require(`../assets/result_assets/thinkingSkills_screen_${idTest+1}.png`)" />
        </div>
    </VsPopupCustom>
</template>

<script>
import VsPopupCustom from '@/components/VsPopupCustom.vue'

export default {
  name: 'TestTrackViewModal',
  props: [
    'idTest'
],
  components: {
    VsPopupCustom
  },
  data() {
    return { 
        popupActive: false
    }
  },
  methods: {
    toggleThinkingSkills() {
      this.popupActive = !this.popupActive;
    }
  },
}
</script>

<style scoped>
.test-modal {
  text-align: center;
  font-family: Poppins;
  user-select: none;
}
.test-modal >>> header {
  display: flex;
  background-color: #9082FF;
  color: #FFFFFF;
}
.test-modal >>> .vs-popup--content {
  margin: 15px 0;
}
.test-modal >>> .vs-popup--close {
  position: absolute;
  right: 0;
  top: 0;
}
.test-track-img-content {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
  height: 350px;
  position: relative;
}

.test-track-img-content img {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.test-modal-content > figure {
  width: 45%;
}
.test-modal-content > figure > img {
  width: 100%;
}
.test-modal-content > figure > figcaption {
  text-align: left;
}

@media only screen and (max-width: 576px) {
  .test-modal-content > figure {
    margin-bottom: 15px;
    width: 100%;
    max-width: 300px;
  }
}
</style>
