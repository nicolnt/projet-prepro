class Track {
	static trackReady = false
	static trackImageBackground = new Image()
	static trackImageTrack = new Image()

  /**
   * Init a new track
   */
  static setTrack(trackImageName) {
    Track.trackReady = false

		Track.trackCanvas = document.getElementById('pickerTrack')
		Track.backgroundCanvas = document.getElementById('backgroundTrack')
		Track.trackCanvasContext = Track.trackCanvas.getContext('2d')
		Track.backgroundCanvasContext = Track.backgroundCanvas.getContext('2d')

		Track.traceCanvas = document.getElementById('traceCanvas')
		Track.traceCanvasContext = Track.traceCanvas.getContext('2d')

    Track.trackImageBackground.src = require(`./paths/${trackImageName}_background.svg`)
    Track.trackImageTrack.src = require(`./paths/${trackImageName}_track.svg`)

    Track.trackImageBackground.onload = Track.trackLoaded
    Track.trackImageTrack.onload = Track.trackLoaded
  }

  static setStrokeColorAccordingToType(type) {
    if (type === 'path')
      Track.traceCanvasContext.strokeStyle = '#53ff53'
    else if (type === 'beforeStart')
      Track.traceCanvasContext.strokeStyle = '#9082FF'
    else
      Track.traceCanvasContext.strokeStyle = '#ff5353'
  }

  static exportTraceImage() {
    return Track.traceCanvas.toDataURL("image/png");
  }

	static trackLoaded() {
		if (Track.trackImageBackground.complete && Track.trackImageTrack.complete) {
			const imageRatio = Track.trackImageBackground.width / Track.trackImageBackground.height
			const canvasWidth = Track.traceCanvas.clientWidth
			const canvasHeight = Track.traceCanvas.clientHeight

      Track.traceCanvas.width = canvasWidth
      Track.traceCanvas.height = canvasHeight
      Track.traceCanvasContext.clearRect(0, 0, canvasWidth, canvasHeight)

      Track.trackCanvas.width = canvasWidth
      Track.trackCanvas.height = canvasHeight
      Track.trackCanvasContext.clearRect(0, 0, canvasWidth, canvasHeight)
      Track.trackCanvasContext.drawImage(Track.trackImageTrack, 0, canvasHeight*0.5 - (canvasWidth/imageRatio)*0.5, canvasWidth, canvasWidth / imageRatio)

      Track.backgroundCanvas.width = canvasWidth
      Track.backgroundCanvas.height = canvasHeight
      Track.backgroundCanvasContext.clearRect(0, 0, canvasWidth, canvasHeight)
      Track.backgroundCanvasContext.drawImage(Track.trackImageBackground, 0, canvasHeight*0.5 - (canvasWidth/imageRatio)*0.5, canvasWidth, canvasWidth / imageRatio)

      Track.trackReady = true
    }
  }

  /**
   * Obtain the hex color code of a certain pixel from the picker canvas
   */
  static getColorFromCoords(coords) {
    return Track.trackCanvasContext.getImageData(coords.x, coords.y, 1, 1).data
      .reduce((acc, curr) => acc + Track.colorComponentToHex(curr), '')
      .slice(0, 6)
  }

  /**
   * Convert 256 bit color to hex, preced by a '0' if lower than 10
   */
  static colorComponentToHex(colorValue) {
    var hex = colorValue.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  static getTypeFromCoordInCheckerContext(coords) {
    switch (Track.getColorFromCoords(coords)) {
      case '2469ff':
        return 'path'
      case '0fff00':
        return 'start'
      case 'fffd07':
        return 'end'
      case 'ff0000':
        return 'obstacle'
      default:
        return 'out'
    }
  }
}

function finPos(target, offset) {
	let left = 0;
	let top = 0;
	if (target.offsetParent) {
		do {
			left += target.offsetLeft
			top += target.offsetTop
			/* eslint no-cond-assign: "off" */
		} while (target = target.offsetParent)
	}
	offset.x = left
	offset.y = top
}

/**
 * Top level class that manage the level : track + user path
 */
class Level {
  pointSeries = [] // Array of objects containing a type and a series of points
  drawing = false
  length = {
    inside: 0,
    obstacle: 0,
    beforeStart: 0,
    outside: 0,
  }
  traces = 0
  startValidated = false
  timeElapsed = Date.now()
  callback

	static currentLevel

  constructor(levelData, callback) {
    this.callback = callback
    Track.setTrack(levelData.name) // TODO lock drawing while not ready
    this.pointSeries = []
    this.length.inside = 0
    this.length.outside = 0
    this.traces = 0
    this.drawing = false
    if (levelData.startingPoint === true)
      this.startValidated = false
    else
      this.startValidated = true
    this.levelData = levelData
    //setTimeout(this.initMeasures, 1000)
    Level.currentLevel = this
    this.initMeasures()
  }

  initMeasures() {
    const offset = {
      x: 0,
      y: 0
    }

    Track.traceCanvas.addEventListener('touchstart', pointer => {
      // Create a new series
      if (Track.trackReady) {
        if (offset.x === 0) {
          finPos(pointer.target, offset)
        }

				Level.currentLevel.drawing = true
				const coords = { x: pointer.changedTouches[0].pageX - offset.x, y: pointer.changedTouches[0].pageY - offset.y }

        Level.currentLevel.addPoint(coords, true)
        Level.currentLevel.traces++
      }
    })

    Track.traceCanvas.addEventListener('touchmove', pointer => {
      if (Level.currentLevel.drawing === true) {
        const coords = { x: pointer.changedTouches[0].pageX - offset.x, y: pointer.changedTouches[0].pageY - offset.y }
        Level.currentLevel.addPoint(coords)
      }
    })

    Track.traceCanvas.addEventListener('touchend', pointer => {
      if (Level.currentLevel.drawing === true) {
        const coords = { x: pointer.changedTouches[0].pageX  - offset.x, y: pointer.changedTouches[0].pageY - offset.y }
        Level.currentLevel.addPoint(coords, false, true)
        Level.currentLevel.drawing = false
      }
    })

    Track.traceCanvas.addEventListener('mousedown', pointer => {
      // Create a new series
      if (Track.trackReady) {
        Level.currentLevel.drawing = true
        const coords = { x: pointer.offsetX, y: pointer.offsetY }

        Level.currentLevel.addPoint(coords, true)
        Level.currentLevel.traces++
      }
    })

    Track.traceCanvas.addEventListener('mousemove', pointer => {
      if (Level.currentLevel.drawing === true) {
        const coords = { x: pointer.offsetX, y: pointer.offsetY }
        Level.currentLevel.addPoint(coords)
      }
    })

    Track.traceCanvas.addEventListener('mouseup', pointer => {
      if (Level.currentLevel.drawing === true) {
        const coords = { x: pointer.offsetX, y: pointer.offsetY }
        Level.currentLevel.addPoint(coords, false, true)
        Level.currentLevel.drawing = false
      }
    })
  }

  addNewSeries(type) {
    Track.traceCanvasContext.beginPath()
    Track.setStrokeColorAccordingToType(type)
    this.pointSeries.push({
      type,
      points: []
    })
  }

  updateLength() {
    const currentSeries = this.pointSeries[this.pointSeries.length - 1]
    if (currentSeries.points.length >= 2) {
      const length = Level.computeLength(currentSeries.points[currentSeries.points.length - 2], currentSeries.points[currentSeries.points.length - 1])
      if (currentSeries.type === 'out')
        this.length.outside += length
      else if (currentSeries.type === 'obstacle')
        this.length.obstacle += length
      else if (currentSeries.type === 'beforeStart')
        this.length.beforeStart += length
      else
        this.length.inside += length
    }
    console.log('inside:', this.length.inside, '\nobstacle', this.length.obstacle, '\nbeforeStart:', this.length.beforeStart, '\noutside:', this.length.outside)
  }

  getTraceLength() {
    let lenIN = 0 
    let lenOUT = 0 
    for (let i = 0; i <= this.pointSeries.length; i++) {
      const series = this.pointSeries[i]
      let length = 0
      for (let j = 0; j < series.points.length - 1; j++) {
        length += Level.computeLength(series.points[j], series.points[j+1])
      }
      if (series.type === 'out')
        lenOUT += length
      else
        lenIN += length
    }
    console.log('inside:', lenIN, '\noutside:', lenOUT)
  }

  static computeLength(point_1, point_2) {
    const c1 = point_1.x - point_2.x
    const c2 = point_1.y - point_2.y
    return Math.sqrt(Math.pow(c1, 2) + Math.pow(c2, 2))
  }

  addPoint(coords, newSeries = false, forcePoint = false) {
    let type = Track.getTypeFromCoordInCheckerContext(coords)
    if (this.startValidated === false && type !== 'start') {
      type = 'beforeStart'
    }
    else if (type === 'start') {
      this.startValidated = true
      type = 'path'
    }

    if (newSeries === true || (this.pointSeries[this.pointSeries.length - 1].type !== type && type !== 'beforeStart')) {
      if (this.pointSeries.length === 0) {
        this.startingPoint = coords
        this.timeElapsed = Date.now()
      }
      Track.traceCanvasContext.lineWidth = 10
      Track.traceCanvasContext.moveTo(coords.x, coords.y)
      this.addNewSeries(type)
    }

    const prevSeries = this.pointSeries[this.pointSeries.length - 2]
    if (newSeries === false && prevSeries && prevSeries.type !== type && this.pointSeries[this.pointSeries.length - 1].points.length === 0) {
      const prevPoint = prevSeries.points[prevSeries.points.length - 1]
      Track.traceCanvasContext.moveTo(prevPoint.x, prevPoint.y)
      this.pointSeries[this.pointSeries.length - 1].points.push({x: prevPoint.x, y: prevPoint.y})
    }

    const currentSeries = this.pointSeries[this.pointSeries.length - 1]
    const prevPoint = currentSeries.points[currentSeries.points.length - 1]
    if (forcePoint || currentSeries.points.length === 0 || (prevPoint && (Level.computeLength(prevPoint, coords) > 5))) {
      if (currentSeries.points.length) {
        Track.traceCanvasContext.lineTo(coords.x, coords.y)
        Track.traceCanvasContext.stroke()
      }
      this.pointSeries[this.pointSeries.length - 1].points.push(coords)
      this.updateLength()
    }

    // NOTE end of the level
    if (type === 'end' || (this.levelData.startingPoint === false &&  (this.length.inside + this.length.obstacle + this.length.outside)/Track.traceCanvas.width >= this.levelData.meanLength * 0.05 && Level.computeLength(coords, this.startingPoint) <= 10))
      this.levelComplete()
  }

  computeScoreForCurrentLevel() {
    const totalLengthRatio = (this.length.inside + this.length.outside + this.length.obstacle) / Track.traceCanvas.width
    this.score = 1
    const tolerance = 0.95
    // Length
    const upper = this.levelData.meanLength * (1 + 1-tolerance)
    if (this.length.inside / Track.traceCanvas.width < this.levelData.meanLength * tolerance) {
      //this.score -= Math.pow((1/tolerance)*totalLengthRatio - 1, 2)
      //this.score -= Math.pow(this.length.inside / Track.traceCanvas.width / (this.levelData.meanLength * tolerance) - 1, 2)
      this.score -= -(this.length.inside / Track.traceCanvas.width / (this.levelData.meanLength * tolerance) - 1)
    }
    else if (this.length.inside / Track.traceCanvas.width > upper) {
      //this.score -= Math.pow(totalLengthRatio - (1 + (1-tolerance)), 2)
      //this.score -= Math.pow((this.length.inside / Track.traceCanvas.width - upper)/( upper + this.levelData.meanLength ), 2)
      this.score -= (this.length.inside / Track.traceCanvas.width - upper)/( upper + this.levelData.meanLength)
    }
    // Obstacles
    this.score -= Math.pow(this.length.obstacle / Track.traceCanvas.width / this.levelData.meanLength * 1.1, 4)
    // Outside
    this.score -= Math.pow(this.length.outside / Track.traceCanvas.width / this.levelData.meanLength * 1.1, 4)

    this.traceImage = Track.exportTraceImage()
    console.log('score :', this.score)
    console.log('length :', totalLengthRatio)
  }

  levelComplete() {
    this.timeElapsed = Date.now() - this.timeElapsed
    this.drawing = false
    this.computeScoreForCurrentLevel()
    //console.log(this.timeElapsed)
    Level.callback()
    //this.setupLevel('path2.svg')
  }
}

class Game {
  state = {
    doTraining: false,
    currentLevel: -1
  }

  constructor(gameData, callAfterSuccess) {
    this.gameData = gameData
    Level.callback = callAfterSuccess
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

  switchToEnd() {
    this.state.doTraining = false
    this.state.currentLevel = -1
    new Level(this.gameData.defaultPath[0])
  }

  startLevel() {
    let currentLevelData
    if (this.gameData.trainingPaths.length && this.state.doTraining === true) {
      currentLevelData = this.gameData.trainingPaths[this.state.currentLevel]
    } else if (this.gameData.testPaths.length) {
      currentLevelData = this.gameData.testPaths[this.state.currentLevel]
    }
    currentLevelData.level = new Level(currentLevelData)
  }

  currentLevelNumber() {
    return this.state.currentLevel + 1;
  }

  totalLevelForCurrentType() {
    if (this.state.doTraining === false) {
      return this.gameData.testPaths.length
    } else {
      return this.gameData.trainingPaths.length
    }
  }
}

export default Game
//export default Level
//level.setupLevel('path.svg', 800, 600)

// TODO check https://stackoverflow.com/questions/16968945/convert-base64-png-data-to-javascript-file-objects
// Do perf benchmark
