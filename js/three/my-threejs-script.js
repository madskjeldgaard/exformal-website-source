/* START OF THREEJS SETUP */
// These are defined in the short code

//   Parse width and height
const width = parseInt(canvasWidth, 10); // these are defined in the short code
const height = parseInt(canvasHeight, 10); // these are defined in the short code

// Scene setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor(0xffffff, 1); // Set background color to white
document.getElementById(threeJsContainerId).appendChild(renderer.domElement);

/* END OF THREEJS SETUP */
// ---------------------------------------------------------------

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 100);

// Create an object
const geometry = new THREE.TorusKnotGeometry(20, 50, 10, 16);
const material = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true });
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Camera position
camera.position.z = 100;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotation for animation
  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.01;

  // Update material color over time for psychedelic effect
  material.color.setHSL(Math.sin(Date.now() * 0.001), 0.5, 0.5);

  renderer.render(scene, camera);
}

animate();
