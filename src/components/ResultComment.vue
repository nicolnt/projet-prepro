<template>
  <div class="comment-container">
    <div v-if="commenting === false" class="comment">
      <div class="comment-content">
        {{ content }}
      </div>
      <div class="edit-icon">
        <div class="edit-icon-background" @click="commenting = true">
          <i class="material-icons">edit</i>
        </div>
      </div>
    </div>
    <div v-else-if="commenting === true" class="comment-editor">
      <textarea autofocus placeholder="Ajouter un commentaire" v-model="content"></textarea>
      <vs-button class="save-button" @click="sendComment" color="#9082FF" type="filled">
        Enregistrer le commentaire
      </vs-button>
    </div>
  </div> 
  
</template>

<script>
import { db } from '../services/firebase'

export default {
  data() {
    return {
      content: '',
      commenting: true,
      commented: false
    }
  },
  props: ['type'],
  methods: {
    sendComment() {
      this.commenting = false
      if(this.commented){
        db.collection('comments')
        .where('idPatient', '==', this.$store.state.currentPatient.id)
        .where('idTest', '==', this.type)
        .get().then(docs => {
          docs.forEach(doc => {
            if (doc) {
              db.collection('comments').doc(doc.id).set({
                comment: this.content
              }, { merge: true })
              if(this.content === ''){
                this.commenting = true
              }
            }
          })
        })
      } else {
          db.collection('comments').add({
            idPatient: this.$store.state.currentPatient.id,
            idTest: this.type,
            comment: this.content
          })
          .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          })
      }
    }
  },
  mounted() {
    db.collection('comments').where('idPatient', '==', this.$store.state.currentPatient.id).get()
      .then(docs => {
        docs.forEach(doc => {
          const data = doc.data()
          if (data.idTest === this.type && data.comment && data.comment !== ''){
            this.content = data.comment
            this.commented= true
            this.commenting = false
          } 
        })
      })
  }
}
</script>

<style scoped>
.comment-editor {
  width: 100%;
}

.comment {
  width: 100%;
  display: flex;
  margin-top: 10px;
}
.comment-content {
  background-color: #F0F0F0;
  border-radius: 16px;
  font-size: 1.2rem;
  padding: 10px 20px;
  flex-grow: 1;
  align-items: stretch;
}
.comment .edit-icon {
  opacity: 1;
  width: 60px;
  position: relative;
}
.comment:hover .edit-icon {
  opacity: 1;
}
.comment .edit-icon .edit-icon-background {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background-color: #F0F0F0;
  border-radius: 50%;
}
.comment .edit-icon:hover .edit-icon-background {
  cursor: pointer;
  background-color: #C1BFBF;
}
.comment .edit-icon i {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.save-button {
  margin-top: 10px;
  border-radius: 16px;
  font-size: 16px;
  padding: 10px;
}
textarea {
  width: 100%;
  border: none;
  background-color: #F0F0F0;
  border-radius: 16px;
  padding: 10px;
}
</style>
