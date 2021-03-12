class Game {
  state = {
    doTraining: false,
    currentLevel: -1
  }

  constructor(gameData, callAfterSuccess) {
    this.gameData = gameData
    this.callback = callAfterSuccess
    this.currentAnswers = []
    this.currentLevelData = null
    this.allScores = []
  }
  beginTraining() {
    this.state.doTraining = true
    this.state.currentLevel = 0
    this.startLevel()
  }
  beginTest() {
    this.state.doTraining = false
    this.state.currentLevel = 0
    this.startLevel()
  }
  switchToNextLevel() {
    this.state.currentLevel++
    this.startLevel()
  }  
  startLevel() {
    document.querySelector('#attention-capacity-test-content').classList.remove('hidden')
    if (this.gameData.training.length && this.state.doTraining === true) {
      this.currentLevelData = this.gameData.training[this.state.currentLevel]
    } else {
      this.currentLevelData = this.gameData.test[this.state.currentLevel]
    }
    this.startCurrentLevel()
  }

  currentLevelNumber() {
    return this.state.currentLevel + 1;
  }

  totalLevelForCurrentType() {
    if (this.state.doTraining === false) {
      return this.gameData.test.length
    } else {
      return this.gameData.training.length
    }
  }
  checkAnswers(answers){
    console.log(answers)
    let actualScore = 0
    answers.forEach( data => {
      console.log(data)
      if(this.currentLevelData.answer.includes(data)){
        actualScore++
      } else {
        console.log('yep')
        actualScore--
      }
    })
    this.allScores[this.currentLevelData.name]= (actualScore) *100
    console.log(this.allScores)
    this.callback()
  }
  startCurrentLevel(){
    const DOM = document.querySelector("#attention-capacity-test-content")
    DOM.querySelector('img').src = require(`./data/visuals/${this.currentLevelData.img}`)
    if(DOM.querySelector('#showImg').classList.contains('hidden')){
      DOM.querySelector('#showImg').classList.remove('hidden')
    }
    DOM.querySelector('#showImg').addEventListener('click',() => {
      DOM.querySelector('#showImg').classList.add('hidden')
      setTimeout(this.showQuizz, 2000)
    },false)
  }
  showQuizz(){
    const DOM = document.querySelector("#attention-capacity-test-content")
    DOM.querySelector("#choices").classList.remove('hidden')
  }
  onSubmit (answers){
    const DOM = document.querySelector("#attention-capacity-test-content")
    document.querySelectorAll('input[type=checkbox]').forEach( element => element.checked = false)
    answers.forEach( element => this.currentAnswers.push(element))
    DOM.querySelector("#choices").classList.add('hidden')
    this.checkAnswers(answers)
  }
}

export default Game
//export default Level
//level.setupLevel('path.svg', 800, 600)

// TODO check https://stackoverflow.com/questions/16968945/convert-base64-png-data-to-javascript-file-objects
// Do perf benchmark
