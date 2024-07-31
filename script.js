import { updateBird, setupBird, getBirdRect } from "./bird.js"//19.
import {
  updatePipes,
  setupPipes,
  getPassedPipesCount,
  getPipeRects,
} from "./pipe.js"//87.

document.addEventListener("keypress", handleStart, { once: true })//3.
const title = document.querySelector("[data-title]")//4.
const subtitle = document.querySelector("[data-subtitle]")//49.

let lastTime//10.by default, the lastTime do not have any value. that is why we have to assign it to
//time
function updateLoop(time) {//7.
  //8.console.log(time) this tells in ms how much time the game is loaded. only one time
  if (lastTime == null) {//13.this tells that ignore the first render of time because it is a large number.
    //this is means reducing the time value so that the delta is small
    lastTime = time//11.
    //12.console.log(time-lastTime) this tells after how much time, the next time is being printed
    window.requestAnimationFrame(updateLoop)//9.this will print the time continuously. this is more
    //efficient than set interval in game development.
    return//14.
  }//15.
  const delta = time - lastTime//16.time between different animation frame.if long animation frame,
  //the bird should move faster to prevent lagging and uniformity. if delta is small,the bird can also
  //move slow
  updateBird(delta)//17.
  updatePipes(delta)//88.
  if (checkLose()) return handleLose()//42.
  lastTime = time
  window.requestAnimationFrame(updateLoop)
}

function checkLose() {//43.
  const birdRect = getBirdRect()//44.
  const insidePipe = getPipeRects().some(rect => isCollision(birdRect, rect))//107.
  const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight//45.
  //46.return outsideWorld
  return outsideWorld || insidePipe//108.
}

function isCollision(rect1, rect2) {//106.
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  )
}

function handleStart() {//1.
  title.classList.add("hide")//5.once we press any key, the title will not be shown again
  setupBird()//30.
  setupPipes()//93.
  lastTime = null//52.the time will restart also after the end.game over.if this line is not there,
  //we will loose the game again and again after pressing space immediately and instantly
  window.requestAnimationFrame(updateLoop)//6.this creates a game loop
}

function handleLose() {//2.
  setTimeout(() => {//51.this makes sure that after lossing,it will not restart immediately. it will wait
    //for some time.we should not accidentally restart if we do not want to play again for frustration
    title.classList.remove("hide")//47.
    subtitle.classList.remove("hide")//48.
    //49.subtitle.textContent ="0 pipes"
    subtitle.textContent = `${getPassedPipesCount()} Pipes`//102.
    document.addEventListener("keypress", handleStart, { once: true })//50.this will restart our game
    //from the beginning
  }, 100)
}
