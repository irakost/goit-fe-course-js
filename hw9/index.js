'use strict';
const p = document.querySelector(".js-time");
const btnStart = document.querySelector(".js-start");
const btnReset = document.querySelector(".js-reset");
const btnTake = document.querySelector(".js-take-lap");
const ul = document.querySelector(".js-laps");
let interval ;

const timer = {
  startTime: null,
  deltaTime: null,
  id: null,
  isActiv: false,
  isPause: false,
  pauseTime: null
};

function startTimer(){
  btnReset.disabled = false;
  if(!timer.isActiv) {
    timer.isActiv = true;
    btnStart.innerHTML = 'Pause';
    timer.startTime =  Date.now();
    interval = setInterval(() => {
      timer.deltaTime = Date.now() - timer.startTime;
      updateClockface(p, timer.deltaTime);
    },100)
  }
   else {
     if(!timer.isPause){
       timer.isPause = true;
       btnStart.innerHTML = 'Continue';
       clearInterval(interval);
       timer.pauseTime = timer.deltaTime;
     }
     else {
      timer.isPause = false;
      btnStart.innerHTML = 'Pause';
      timer.startTime = Date.now() - timer.pauseTime;
      interval = setInterval(() => {
        timer.deltaTime = Date.now() - timer.startTime;
        updateClockface(p, timer.deltaTime);
      },100)
     }
   }
}

function resetTimer(){
  clearInterval(interval);
  timer.isActiv = false;
  timer.isPause = false;
  updateClockface(p, 0);
  ul.innerHTML = '';
  btnStart.innerHTML = 'start';
  btnReset.disabled = true;
}

function takeLap(){
  if(!timer.isPause&&timer.isActiv){
ul.innerHTML += `<li> ${p.innerHTML}</li>`;
  }
}
btnStart.addEventListener('click', startTimer);
btnReset.addEventListener('click', resetTimer);
btnTake.addEventListener('click', takeLap);


function getFormattedTime(time) {
  let date = new Date(time);
  let min = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
      sec = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds(),
      millisecx100 = Math.floor(date.getMilliseconds()/100);
  return `${min}:${sec}.${millisecx100}`;
}

function updateClockface(elem, time) {
   elem.textContent = getFormattedTime(time);
}
