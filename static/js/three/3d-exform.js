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
const material = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  map: texture,
  // shininess: 0,
  // roughness: 10,

});

// Create an object (Cube)
// const geometry = new THREE.BoxGeometry();
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// Create an object (Sphere)
const geometry = new THREE.SphereGeometry(0.75, 32, 32);
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 0.85);
light.position.set(1, 1, 1);
scene.add(light);

// Camera position
camera.position.z = 1.5;

// Set camera and cube in the middle
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;

sphere.position.x = 0;
sphere.position.y = 0;

// Random rotation values
const randomRotationX = Math.random() * 0.01;
const randomRotationY = Math.random() * 0.01;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotation for animation with randomization
  // cube.rotation.x += 0.001 + randomRotationX;
  // cube.rotation.y += 0.001 + randomRotationY;

  sphere.rotation.x += 0.001 + randomRotationX;
  sphere.rotation.y += 0.001 + randomRotationY;

  // Also modulate the position of the sphere (keeping it within the camera view))
  sphere.position.x = Math.sin(Date.now() * 0.001) * 0.25;
  sphere.position.y = Math.cos(Date.now() * 0.001) * 0.125;

  // Clip the sphere to the camera view
  // sphere.scale.x = Math.sin(Date.now() * 0.0002) * 0.025;
  // sphere.scale.y = Math.sin(Date.now() * 0.0001) * 0.025;


  renderer.render(scene, camera);
}

animate();
