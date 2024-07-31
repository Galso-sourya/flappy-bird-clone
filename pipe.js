const HOLE_HEIGHT = 200//68.
const PIPE_WIDTH = 120//92.
const PIPE_INTERVAL = 1500//82.how often we create pipe
const PIPE_SPEED = 0.75//87.
let pipes = []//77.
//80.let timeSinceLastPipe=0
let timeSinceLastPipe
let passedPipeCount//98.

export function setupPipes() {//89.
  document.documentElement.style.setProperty("--pipe-width", PIPE_WIDTH)//90.the value is stored in a 
  //variable called PIPE_WIDTH
  document.documentElement.style.setProperty("--hole-height", HOLE_HEIGHT)//91.
  pipes.forEach(pipe => pipe.remove())//103.
  timeSinceLastPipe = PIPE_INTERVAL//94.user do not need to wait for pipe to appear
  passedPipeCount = 0//99.
}

export function updatePipes(delta) {//78.
  timeSinceLastPipe += delta//79.

  if (timeSinceLastPipe > PIPE_INTERVAL) {//81.
    timeSinceLastPipe = timeSinceLastPipe -PIPE_INTERVAL//84.
    //shortcut is timeSinceLastPipe -= PIPE_INTERVAL
    createPipe()//83.
  }

  pipes.forEach(pipe => {//85.
    if (pipe.left + PIPE_WIDTH < 0) {//96.
      passedPipeCount++//101.
      return pipe.remove()//97.
    }
    pipe.left = pipe.left - delta * PIPE_SPEED//86.
  })
}

export function getPassedPipesCount() {//100.alls
  return passedPipeCount
}

export function getPipeRects() {//105.
  return pipes.flatMap(pipe => pipe.rects())
}

function createPipe() {//53.
  const pipeElem = document.createElement("div")//54.
  const topElem = createPipeSegment("top")//56.
  const bottomElem = createPipeSegment("bottom")//57.
  pipeElem.append(topElem)//61.
  pipeElem.append(bottomElem)//62.
  pipeElem.classList.add("pipe")//63.
  pipeElem.style.setProperty(//64.
    "--hole-top",//65.
    randomNumberBetween(//66.
      HOLE_HEIGHT * 1.5,//69.hole will not touch the bottom of the scrren,a little pipe will be shown
      window.innerHeight - HOLE_HEIGHT * 0.5//68.hole will not touch the top of the screen
    )
  )
  const pipe = {//70.
    get left() {//71.
      return parseFloat(//72.
        getComputedStyle(pipeElem).getPropertyValue("--pipe-left")
      )
    },
    set left(value) {//72.
      pipeElem.style.setProperty("--pipe-left", value)//73.
    },
    remove() {//95.whole. this is removing the previous pipe from the array first, and then from the 
      //screen
      pipes = pipes.filter(p => p !== pipe)
      pipeElem.remove()
    },
    rects() {//104.rectangular shape of the pipe.full
      return [
        topElem.getBoundingClientRect(),
        bottomElem.getBoundingClientRect(),
      ]
    },
  }
  pipe.left = window.innerWidth//74.it will start from the left side of the screen
  document.body.append(pipeElem)//75.
  pipes.push(pipe)//76.
}

function createPipeSegment(position) {//55.
  const segment = document.createElement("div")//58.
  segment.classList.add("segment", position)//59.
  return segment//60.
}

function randomNumberBetween(min, max) {//67.full
  return Math.floor(Math.random() * (max - min + 1) + min)
}
