import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/GLTFLoader.js";
import { HandTracker } from "./hand.js";
import { GestureController } from "./gesture.js";

let scene, camera, renderer, model;
let handTracker, gestureController;

init();
async function init() {
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1.5, 3);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Lights
  const ambient = new THREE.AmbientLight(0x0ff, 0.6);
  scene.add(ambient);
  const dirLight = new THREE.DirectionalLight(0x0ff, 1);
  dirLight.position.set(5, 10, 7.5);
  scene.add(dirLight);

  // Load humanoid model
  const loader = new GLTFLoader();
  loader.load('model.glb', (gltf) => {
    model = gltf.scene;
    model.traverse((c) => {
      if (c.isMesh) c.material.wireframe = true; // sci-fi effect
    });
    scene.add(model);
  });

  // Setup hand tracking
  const video = document.getElementById("webcam");
  handTracker = new HandTracker(video);
  handTracker.start();

  gestureController = new GestureController(handTracker);

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  if (gestureController) {
    gestureController.update();
    applyGestureToModel(gestureController.currentGesture);
  }

  renderer.render(scene, camera);
}

function applyGestureToModel(gesture) {
  if (!model) return;

  switch(gesture) {
    case "open":
      model.scale.set(1.2, 1.2, 1.2);
      break;
    case "fist":
      model.scale.set(0.8, 0.8, 0.8);
      break;
    case "thumbs_up":
      model.rotation.y += 0.05;
      break;
  }
}
