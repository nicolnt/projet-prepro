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
    this.score = 0
    this.userErrors = 0
  }

  beginTraining() {
    this.state.doTraining = true
    this.state.currentLevel = 0
    this.startLevel()
  }

  beginTest() {
    this.state.doTraining = false
    this.state.currentLevel = 0
    this.userErrors = 0
    this.score = 0
    this.startLevel()
  }

  switchToNextLevel() {
    document.querySelector("#AttentionCapacityContent>img").src = ""
    this.state.currentLevel++
    this.startLevel()
  }  

  switchToEnd() {
    this.state.doTraining = false
    this.state.currentLevel = -1
    document.querySelector("#AttentionCapacityContent>img").src = ""
  }

  startLevel() {
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
    let actualScore = 6
    answers.forEach( userData => {
      if(this.currentLevelData.answer.includes(userData) != true){
        actualScore--
        this.userErrors++
      }
    })
    this.currentLevelData.answer.forEach ( testData => {
      if (answers.includes(testData) != true){
        actualScore--
        this.userErrors++
      }
    })
    this.score += actualScore
    this.callback()
  }

  startCurrentLevel(){
    const DOM = document.querySelector("#AttentionCapacityContent")
    DOM.querySelector('img').src = require(`./data/visuals/${this.currentLevelData.img}`)
    if(DOM.querySelector('#showImg').classList.contains('hidden')){
      DOM.querySelector('#showImg').classList.remove('hidden')
    }
    DOM.querySelector('#showImg').addEventListener('click',() => {
      DOM.querySelector('#showImg').classList.add('hidden')
      DOM.querySelector('img').classList.remove('blurred')
      setTimeout(this.showQuizz, 2000)
    },false)
  }

  showQuizz(){
    const DOM = document.querySelector("#AttentionCapacityContent")
    DOM.querySelector("#choices").classList.remove('hidden')
    DOM.querySelector('img').classList.add('blurred')
  }

  onSubmit (answers){
    const DOM = document.querySelector("#AttentionCapacityContent")
    DOM.querySelectorAll('input[type=checkbox]').forEach( element => element.checked = false)
    answers.forEach(element => this.currentAnswers.push(element))
    DOM.querySelector("#choices").classList.add('hidden')
    this.checkAnswers(answers)
  }
}

export default Game
