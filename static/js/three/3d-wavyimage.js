// Define the image path
const imagePath = '/img/disco.jpg'; // Replace with your actual image path

// START OF THREEJS SETUP
// Assuming canvasWidth, canvasHeight, and threeJsContainerId are defined in the shortcode
const width = parseInt(canvasWidth, 10); // Parse width from shortcode
const height = parseInt(canvasHeight, 10); // Parse height from shortcode

// Scene setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setClearColor(0xffffff, 1); // Set background color to white
renderer.setPixelRatio(window.devicePixelRatio);

document.getElementById(threeJsContainerId).appendChild(renderer.domElement);

// END OF THREEJS SETUP
// ---------------------------------------------------------------

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);

// Texture loader
const loader = new THREE.TextureLoader();
const texture = loader.load(imagePath);

texture.colorSpace = THREE.SRGBColorSpace;
const material = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture });

// Create an object (Cube)
const geometry = new THREE.CircleGeometry(15, 100);
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 0.85);
light.position.set(1, 1, 50);
scene.add(light);

// Camera position
camera.position.z = 20.5;

function animate() {
  requestAnimationFrame(animate);

  const time = Date.now() * 0.001; // Current time in seconds
  const positions = cube.geometry.attributes.position;

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);

    const waveX1 = 0.5 * Math.sin(x * 2 + time);
    const waveX2 = 0.5 * Math.sin(y * 3 + time);
    const waveY1 = 0.5 * Math.sin(x * 3 + time);
    const waveY2 = 0.5 * Math.sin(y * 2 + time);

    positions.setZ(i, waveX1 + waveX2 + waveY1 + waveY2);
  }

  positions.needsUpdate = true; // Required to update the geometry

  renderer.render(scene, camera);
}

animate();
