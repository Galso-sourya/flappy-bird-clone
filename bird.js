const birdElem = document.querySelector("[data-bird]")//20.
const BIRD_SPEED = 0.5//27.
const JUMP_DURATION = 125//37. how many ms our jump is going to last
let timeSinceLastJump = Number.POSITIVE_INFINITY//36.

export function setupBird() {//28.
  setTop(window.innerHeight / 2)//29.in the starting of the game, the bird will start appearing from 
  //the middle of the screen
  document.removeEventListener("keydown", handleJump)//32.after jumping,it drops.right?
  document.addEventListener("keydown", handleJump)//31.
}

export function updateBird(delta) {//18.
  //25.console.log(getTop())
  if (timeSinceLastJump < JUMP_DURATION) {//38.
    //26.setTop(getTop()+BIRD_SPEED)
    setTop(getTop() - BIRD_SPEED * delta)//getTop() is the current top position. and setTop is the 
    //new and updated one.the bird goes up here
  } else {
    setTop(getTop() + BIRD_SPEED * delta)//39.this will make the bird to go  down
  }

  timeSinceLastJump += delta//40.
}

export function getBirdRect() {//41.this returns the current position of the bird on the screen
  return birdElem.getBoundingClientRect()
}

function setTop(top) {//21.one helper function
  birdElem.style.setProperty("--bird-top", top)//23.
}

function getTop() {//22.
  return parseFloat(getComputedStyle(birdElem).getPropertyValue("--bird-top"))//24.
}

function handleJump(e) {//33.
  if (e.code !== "Space") return//34.only spacebar will act. other cases,it will do nothing means return
  //null

  timeSinceLastJump = 0//35.if space bar is clicked,this will happen.
}
