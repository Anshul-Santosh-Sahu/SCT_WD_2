let startTime, updatedTime, difference, tInterval, running = false;
let  paused = false;
let savedTime = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const barsContainer = document.getElementById('bars');

startStopBtn.addEventListener('click', startStopResume);
resetBtn.addEventListener('click', reset);

function startStopResume() {
    if (!running) {
        if (!paused) {
            startTime = new Date().getTime();
        } else {
            startTime = new Date().getTime() - savedTime;
        }
        tInterval = setInterval(getShowTime, 1);
        running = true;
        paused = false;
        startStopBtn.textContent = 'Stop';
        startBarsAnimation();
    } else {
        clearInterval(tInterval);
        running = false;
        paused = true;
        savedTime = difference;
        startStopBtn.textContent = 'Resume';
        stopBarsAnimation();
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    savedTime = 0;
    startTime = null;
    difference = null;
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    resetBarsAnimation();
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    display.textContent = hours + ':' + minutes + ':' + seconds;
}


function startBarsAnimation() {
    barsContainer.innerHTML = '';
    for (let i = 0; i < 50; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.animationDelay = `${i * 0.05}s`;
        barsContainer.appendChild(bar);
    }
}

function stopBarsAnimation() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        bar.style.animationPlayState = 'paused';
    });
}

function resetBarsAnimation() {
    barsContainer.innerHTML = '';
}
