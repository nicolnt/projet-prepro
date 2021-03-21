class Game {
  state = {
    doTraining: false,
    currentLevel: -1
  }

  constructor(gameData, callAfterSuccess) {
    this.gameData = gameData
    this.callback = callAfterSuccess
    this.currentLevelData = null
    this.score = 0
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
    this.state.currentLevel++
    this.startLevel()
  }  

  switchToEnd() {
    this.state.doTraining = false
    this.state.currentLevel = -1
    document.getElementById('question').classList.add("hidden")
  }

  startLevel() {
    if (this.gameData.training.length && this.state.doTraining === true) {
      this.currentLevelData = this.gameData.training[this.state.currentLevel]
    } else {
      this.currentLevelData = this.gameData.test[this.state.currentLevel]
    }
    this.startCurrentLevel()
  }

  startCurrentLevel(){
    const DOM = document.querySelector("#thinkingSkillsContent")
    DOM.querySelector("#statementEx1").src = require(`./data/visuals/${this.currentLevelData.name}/ex1.svg`)
    DOM.querySelector("#statementEx2").src = require(`./data/visuals/${this.currentLevelData.name}/ex2.svg`)
    DOM.querySelector("#statementQuestion").src = require(`./data/visuals/${this.currentLevelData.name}/question.svg`)
    for (let i = 0; i < 5; i++) {
      DOM.querySelector('#questionAnswers').children[i].querySelector('img').src = require(`./data/visuals/${this.currentLevelData.name}/answer${i+1}.svg`)
    }
    setTimeout(function(){ document.getElementById('question').classList.remove("hidden") }, 1000);
  }

  onSubmit(answer){
    document.getElementById('question').classList.add("hidden")
    this.checkAnswers(answer)
  }

  checkAnswers(answer){
    if(answer === this.currentLevelData.goodAnswer){
      this.score++
    }
    setTimeout(this.callback.bind(this), 500);
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
}

export default Game
