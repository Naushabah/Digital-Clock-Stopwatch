//Tab
function switchTab(tab){
    document.querySelectorAll('.panel').forEach(p=> p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b=> b.classList.remove('active'));
    document.getElementById('panel-'+ tab).classList.add('active');
    event.target.classList.add('active');
}

//CLOCK

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function updateClock(){
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    const ampm = h >= 12? 'PM' : 'AM';
    h = h%12 || 12;

    document.getElementById('clock-hm').textContent = String(h).padStart(2, '0')+":"+String(m).padStart(2, '0');
    document.getElementById('clock-s').textContent = String(s).padStart(2, '0');
    document.getElementById('clock-ampm').textContent = ampm;
    document.getElementById('clock-date').textContent = days[now.getDay()]+", "+month[now.getMonth()]+" "+now.getDate()+" "+now.getFullYear();


}

updateClock();
setInterval(updateClock, 1000);


//STOPWATCH

let swRunning = false;
let swStartTime = 0;
let swElapsed = 0;
let swFrame;

function swStart() {
    if (!swRunning) {
    swRunning = true;
    swStartTime = performance.now() - swElapsed;
    document.getElementById('btn-start').textContent = 'Pause';
    document.getElementById('btn-start').className = 'btn btn-stop';
    document.getElementById('btn-start').onclick = swPause;
    swFrame = requestAnimationFrame(swTick);
    }
}

function swPause() {
    swRunning = false;
    swElapsed = performance.now() - swStartTime;
    cancelAnimationFrame(swFrame);
    document.getElementById('btn-start').textContent = 'Resume';
    document.getElementById('btn-start').className = 'btn btn-start';
    document.getElementById('btn-start').onclick = swStart;
}

function swReset() {
    swRunning = false;
    cancelAnimationFrame(swFrame);
    swElapsed = 0;
    document.getElementById('sw-hm').textContent = '00:00';
    document.getElementById('sw-ms').textContent = '.000';
    document.getElementById('btn-start').textContent = 'Start';
    document.getElementById('btn-start').className = 'btn btn-start';
    document.getElementById('btn-start').onclick = swStart;
}

function swTick() {
    swElapsed = performance.now() - swStartTime;
    const totalMs = Math.floor(swElapsed);
    const ms = totalMs % 1000;
    const totalSec = Math.floor(totalMs / 1000);
    const s = totalSec % 60;
    const m = Math.floor(totalSec / 60) % 60;
    const h = Math.floor(totalSec / 3600);

    const hm = h > 0
    ? String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0')
    : String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');

    document.getElementById('sw-hm').textContent = hm;
    document.getElementById('sw-ms').textContent = '.' + String(ms).padStart(3,'0');
    swFrame = requestAnimationFrame(swTick);
}
