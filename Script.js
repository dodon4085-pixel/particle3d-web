const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color('#000');

const camera3D = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera3D.position.z = 200;

// Create target sphere
const geo = new THREE.SphereGeometry(10, 32, 32);
const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
const ball = new THREE.Mesh(geo, mat);
scene.add(ball);

function animate() {
  requestAnimationFrame(animate);

  if (handData) {
    let x = (handData[9].x - 0.5) * 2;
    let y = -(handData[9].y - 0.5) * 2;
    let z = handData[9].z;

    ball.position.x += (x * 100 - ball.position.x) * 0.15;
    ball.position.y += (y * 100 - ball.position.y) * 0.15;
    ball.position.z = z * 200;
  }

  renderer.render(scene, camera3D);
}

animate();
