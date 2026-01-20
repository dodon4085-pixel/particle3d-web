import { Hands } from 'https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js';
import { Camera } from 'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js';

let landmarks = null;
const videoElement = document.getElementById('webcam');

export async function initHands(){
  const hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
  });
  hands.setOptions({
    maxNumHands:1,
    modelComplexity:1,
    minDetectionConfidence:0.8,
    minTrackingConfidence:0.8
  });

  hands.onResults((results)=>{
    if(results.multiHandLandmarks && results.multiHandLandmarks[0]){
      landmarks = results.multiHandLandmarks[0];
    }
  });

  const camera = new Camera(videoElement, {
    onFrame: async ()=>{ await hands.send({image:videoElement}); },
    width:640,
    height:480
  });
  videoElement.style.display = 'block';
  camera.start();
}

export function getLandmarks(){ return landmarks; }
