<template>
  <div class="input">
      <p id="titleInput">{{m_title}}</p>
      <input class="valInput" type="this.m_type" name="this.m_name" oninput="this.onChangeInput" required>
  </div>
</template>

<script>
//import logStore from 'logStore'

export default {
  name: 'SignUp',
  props:{
    title : {type: String, required: true},
    type : {type: String, required:true},
    name : {type: String, required:true},
    value : {type: String},
    verifInput : {type:Function, default: () => true }
  },
  /*watch: {
  },*/
  mounted() {
    this.setTitle()
    this.setType()
    this.setName()
    this.setVerifInput()
  },
  data() {
    return {
      m_title : "",
      m_type : "",
      m_name : "",
      m_verifInput : null
    }
  },
  methods : {
    setTitle() {
      if(this.title.length > 2 && this.title.length < 30) {
        this.m_title = this.title
      } else {
        throw new Error("Le titre de l'input " + this.title + "doit posséder entre 2 et 30 caractères");
      }
    },
    setType() {
      if(this.type === "button" || this.type === "checkbox" || this.type === "color"
        || this.type === "date" || this.type === "datetime-local" || this.type === "email"
        || this.type === "file" || this.type === "hidden" || this.type === "image"
        || this.type === "month" || this.type === "number" || this.type === "password"
        || this.type === "radio" || this.type === "range" || this.type === "reset"
        || this.type === "search" || this.type === "submit" || this.type === "tel"
        || this.type === "text" || this.type === "time" || this.type === "url"
        || this.type === "week") {
        this.m_type = this.type
      } else {
        throw new Error("Le type de l'input doit être valide");
      }
    },
    setName() {
      if(this.name.length > 2 && this.title.length < 30) {
        this.m_name = this.name
      } else {
        throw new Error("Le nom de l'input doit posséder entre 2 et 30 caractères");
      }
    },
    setValue() {
      if(this.value.length > 0) {
        this.m_value = this.value
      } else {
        throw new Error("Le champs de l'input doit posséderau moins 1 caractère");
      }
    },
    setVerifInput(){
      this.m_verifInput = this.verifInput
    },
    onChangeInput(e) {
      if(this.m_verifInput(e)) {
        //encadre input vert
      } // sinon encadre rouge
    }
  }
}
</script>

<style scoped>
.input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 1vh 0;
}
.valInput {
    background-color: #eaedf0;
    border: 1px solid #2c3e50;
    border-radius: 8px;
    padding: 2%;
}
#titleInput {
    margin-bottom: 1vh;
}
</style>