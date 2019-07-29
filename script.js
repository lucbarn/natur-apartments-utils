// map
const latitude = 0;
const longitude = 0;
const zoom = 0;

let myMap = L.map('map', {scrollWheelZoom: false,
                                    doubleClickZoom: false,
                                    zoomControl: false,
                                    dragging: false,
                                    boxZoom: false,
                                    keyboard: false,
                                    tap: false,
                                    touchZoom: false}).setView([latitude, longitude], zoom);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

const mapContainer = document.getElementById('map-container');
const map = document.getElementById('map');
const point = document.getElementById('map-point');
const toggleSwitch = document.getElementById('toggle-switch');
const recordingStatus = document.getElementById('recording-status');
const recButton = document.getElementById('rec-button');
const video = document.getElementById('video');
let initialPosition;
let x;
let y;
// milliseconds used in setInterval
const ms = 100;
let recordingEnabled = false;
let recording = false;
let videoMapSynchronization = false;
let pointFixed = true;

function trackCursor(event) {
  x = event.clientX;
  y = event.clientY;
}

const timePosition = [];


mapContainer.addEventListener('click', function(event) {
  if (recording) {
    recording = false;
    video.pause();
  }
  else if (recordingEnabled) {
    point.style.display = 'none';
    initialPosition = [event.clientX, event.clientY];
    let position = setInterval(function() {
      if (video.ended || video.paused) {
        clearInterval(position);
      } else {
        timePosition.push([x - initialPosition[0], y - initialPosition[1]]);
      }
    }, ms);
    recording = true;
    video.play();
  }
});

recButton.addEventListener('click', function() {
  if (recordingEnabled) {
    recordingEnabled = false;
    recordingStatus.style.color = 'red';
    recordingStatus.innerText = 'OFF';
    window.removeEventListener('mousemove', trackCursor);
  } else {
    recordingEnabled = true;
    recordingStatus.style.color = 'green';
    recordingStatus.innerText = 'ON';
    window.addEventListener('mousemove', trackCursor);
  }
});

toggleSwitch.addEventListener('click', function() {
  if (videoMapSynchronization) {
    videoMapSynchronization = false;
    toggleSwitch.style.left = '0%';
    point.style.display = 'none';
  } else {
    videoMapSynchronization = true;
    toggleSwitch.style.left = '100%';
    point.style.display = 'block';
  }
});

let currentPosition = 0;

video.addEventListener('seeked', function() {
  if (videoMapSynchronization) {
    // video.currentTime * 1000 = current time of the video in milliseconds
    // dividing the current time of the video by the number of milliseconds
    // of each step (ms) and rounding the result gives the current position in the
    // timePosition array with a maximum error of half the number of milliseconds
    // of each step, in this case 50 milliseconds;
    // for example, if the current time is 2.768 seconds, then currentPosition is 28,
    // which corresponds to the position of the cursor at time 2800 ms, with an
    // error of 32 ms
    currentPosition = Math.round((video.currentTime * 1000) / ms);
    if (pointFixed) {
      map.style.left = `calc(50% - ${timePosition[currentPosition][0]}px)`;
      map.style.top = `calc(50% - ${timePosition[currentPosition][1]}px)`;
    } else {
      point.style.left = `calc(50% + ${timePosition[currentPosition][0]}px)`;
      point.style.top = `calc(50% + ${timePosition[currentPosition][1]}px)`;
    }
  }
});

video.addEventListener('play', function() {
  if (videoMapSynchronization) {
    if (!pointFixed && (map.style.left || map.style.top)) {
      map.style.left = '50%';
      map.style.top = '50%';
    }
    if (pointFixed && (point.style.left || point.style.top)) {
      point.style.left = '50%';
      point.style.top = '50%';
    }
    let sync = setInterval(function() {
      currentPosition = Math.round((video.currentTime * 1000) / ms);
      if (video.ended || video.paused) {
        clearInterval(sync);
      } else if (pointFixed) {
        map.style.left = `calc(50% - ${timePosition[currentPosition][0]}px)`;
        map.style.top = `calc(50% - ${timePosition[currentPosition][1]}px)`;
      } else {
        point.style.left = `calc(50% + ${timePosition[currentPosition][0]}px)`;
        point.style.top = `calc(50% + ${timePosition[currentPosition][1]}px)`;
      }
    }, ms);
  }
})
