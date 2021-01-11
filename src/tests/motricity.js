class Track {
	trackReady = false
	onload = () => {}
	trackCanvas = document.getElementById('pickerTrack')
	backgroundCanvas = document.getElementById('backgroundTrack')

	constructor() {
		this.trackImage = new Image()
		// Build picker track used to check the type of underlying object
		this.trackCanvasContext = this.trackCanvas.getContext('2d')
		this.backgroundCanvasContext = this.backgroundCanvas.getContext('2d')
	}

	/**
	 * Init a new track
	 */
	setTrack(trackImagePath, canvasWidth, canvasHeight) {
		this.trackImage.src = trackImagePath
		this.trackReady = false

		this.trackImage.onload = () => {
			this.trackCanvas.width = canvasWidth
			this.trackCanvas.height = canvasHeight
			this.trackCanvasContext.clearRect(0, 0, canvasWidth, canvasHeight)
			this.trackCanvasContext.drawImage(this.trackImage, 0, 0, canvasWidth, canvasHeight)

			this.backgroundCanvas.width = canvasWidth
			this.backgroundCanvas.height = canvasHeight
			this.backgroundCanvasContext.clearRect(0, 0, canvasWidth, canvasHeight)
			this.backgroundCanvasContext.drawImage(this.trackImage, 0, 0, canvasWidth, canvasHeight)

			this.trackReady = true
			this.onload()
		}
	}

	/**
	 * Obtain the hex color code of a certain pixel from the picker canvas
	 */
	getColorFromCoords(coords) {
		return this.trackCanvasContext.getImageData(coords.x, coords.y, 1, 1).data
			.reduce((acc, curr) => acc + this.colorComponentToHex(curr), '')
			.slice(0, 6)
	}

	/**
	 * Convert 256 bit color to hex, preced by a '0' if lower than 10
	 */
	colorComponentToHex(colorValue) {
		var hex = colorValue.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}

	getTypeFromCoordInCheckerContext(coords) {
		switch (this.getColorFromCoords(coords)) {
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

/**
 * Top level class that manage the level : track + user path
 */
class Level {
	pointSeries = [] // Array of objects containing a type and a series of points
	drawing = false
	length = {
		inside: 0,
		outside: 0,
	}
	traces = 0
	startValidated = false
	timeElapsed = Date.now()

	setupLevel(trackImagePath, canvasWidth = 800, canvasHeight = 600) {
    this.traceCanvas = document.getElementById('traceCanvas')
		this.track = new Track()
		this.traceCanvasContext = this.traceCanvas.getContext('2d')
		this.traceCanvas.width = canvasWidth
		this.traceCanvas.height = canvasHeight
		this.traceCanvasContext.clearRect(0, 0, this.traceCanvas.width, this.traceCanvas.height)
		this.track.setTrack(trackImagePath, canvasWidth, canvasHeight) // TODO lock drawing while not ready
		this.pointSeries = []
		this.length.inside = 0
		this.length.outside = 0
		this.traces = 0
		this.drawing = false
		this.startValidated = false
		this.timeElapsed = Date.now()
		//setTimeout(this.initMeasures, 1000)
		this.initMeasures()
	}

	initMeasures() {
		this.traceCanvas.addEventListener('mousedown', pointer => {
			// Create a new series
			this.drawing = true
			const coords = { x: pointer.offsetX, y: pointer.offsetY }

			this.addPoint(coords, true)
			this.traces++
		})

		this.traceCanvas.addEventListener('mousemove', pointer => {
			if (this.drawing === true) {
				const coords = { x: pointer.offsetX, y: pointer.offsetY }
				this.addPoint(coords)
			}
		})
		this.traceCanvas.addEventListener('mouseup', pointer => {
			const coords = { x: pointer.offsetX, y: pointer.offsetY }
			this.addPoint(coords, false, true)
			this.drawing = false
		})
	}

	setStrokeColorAccordingToType(type) {
		if (type === 'path')
			this.traceCanvasContext.strokeStyle = 'blue'
		else if (type === 'beforeStart')
			this.traceCanvasContext.strokeStyle = 'purple'
		else
			this.traceCanvasContext.strokeStyle = 'red'
	}

	addNewSeries(type) {
		this.traceCanvasContext.beginPath()
		this.setStrokeColorAccordingToType(type)
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
			else
				this.length.inside += length
		}

		console.log('inside:', this.length.inside, '\noutside:', this.length.outside)
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
		let type = this.track.getTypeFromCoordInCheckerContext(coords)

		if (this.startValidated === false && type !== 'start') {
			type = 'beforeStart'
		}
		else if (type === 'start') {
			this.startValidated = true
			type = 'path'
		}

		if (newSeries === true || (this.pointSeries[this.pointSeries.length - 1].type !== type && type !== 'beforeStart')) {
			this.traceCanvasContext.lineWidth = 10
			this.traceCanvasContext.moveTo(coords.x, coords.y)
			this.addNewSeries(type)
		}


		const prevSeries = this.pointSeries[this.pointSeries.length - 2]
		if (newSeries === false && prevSeries && prevSeries.type !== type && this.pointSeries[this.pointSeries.length - 1].points.length === 0) {
			const prevPoint = prevSeries.points[prevSeries.points.length - 1]
			this.traceCanvasContext.moveTo(prevPoint.x, prevPoint.y)
			this.pointSeries[this.pointSeries.length - 1].points.push({x: prevPoint.x, y: prevPoint.y})
		}

		const currentSeries = this.pointSeries[this.pointSeries.length - 1]
		const prevPoint = currentSeries.points[currentSeries.points.length - 1]
		if (forcePoint || currentSeries.points.length === 0 || (prevPoint && (Level.computeLength(prevPoint, coords) > 5))) {
			if (currentSeries.points.length) {
				this.traceCanvasContext.lineTo(coords.x, coords.y)
				this.traceCanvasContext.stroke()
			}
			this.pointSeries[this.pointSeries.length - 1].points.push(coords)
			this.updateLength()
		}
		if (type === 'end')
			this.stopLevel()
	}
	stopLevel() {
		this.timeElapsed = Date.now() - this.timeElapsed
		console.log(this.timeElapsed)
		this.setupLevel('path2.svg')
	}
}

export default Level
//level.setupLevel('path.svg', 800, 600)

// TODO check https://stackoverflow.com/questions/16968945/convert-base64-png-data-to-javascript-file-objects
// Do perf benchmark
