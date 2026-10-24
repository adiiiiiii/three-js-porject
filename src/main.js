import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const gui = new GUI();

const property = {
  color: "#ff0000",
};

//creating a texture
const loadingManager = new THREE.LoadingManager();

loadingManager.onLoad = () => {
  console.log("All loaded!");
};

const textureLoader = new THREE.TextureLoader();

const texture = textureLoader.load(
  "https://plus.unsplash.com/premium_photo-1722769611510-b6cc10f26894?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  () => {
    console.log("texture loading!");
  },
  () => {
    console.log("progress!");
  },
  () => {
    console.log("error!");
  },
);

// texture.repeat.x = 3;
// texture.repeat.y = 2;

// texture.wrapS = THREE.MirroredRepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;

texture.minFilter = THREE.LinearFilter;
texture.magFilter = THREE.NearestFilter;

const texture_2 = textureLoader.load(
  "https://images.unsplash.com/photo-1792693927537-4c1a3b7e8c54?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
);

const texture_3 = textureLoader.load("./ganges_river_pebbles_nor_dx_1k.jpg");

texture_3.colorSpace = THREE.SRGBColorSpace;

const matCapTexture = textureLoader.load("./image.png");

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//gltf loader
const gltfLoader = new GLTFLoader();

let mixer;

gltfLoader.load(
  "./RobotExpressive.glb",
  (gltf) => {
    const model = gltf.scene;

    model.scale.set(0.5, 0.5, 0.5);
    if (gltf.animations && gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(model);

      const deathAnimation = THREE.AnimationClip.findByName(
        gltf.animations,
        "Death",
      );
      if (deathAnimation) {
        const deathAction = mixer.clipAction(deathAnimation);
        deathAction.play();
      }

      // const action = mixer.clipAction(gltf.animations[0]);
      // action.play();
    }
    scene.add(model);
    // console.log("gltf model loaded");
    console.log(gltf);
    // console.log(gltf.scene.children);
  },
  () => {
    console.log("model is loading!");
  },
  (error) => {
    console.log("error!", error);
  },
);

//creating a scene

const scene = new THREE.Scene();

//outdated
//const clock = new THREE.Clock();

const timer = new THREE.Timer();
//Lights
const ambientLights = new THREE.AmbientLight(0xffffff, 4);

const directionLights = new THREE.DirectionalLight(0xffffff, 2);

directionLights.position.set(-2, -4, 2);

const pointLight = new THREE.PointLight(0x00ff00, 500, 8);

pointLight.position.set(1, 2, 3);

const spotLight = new THREE.SpotLight(0x0000ff, 500, 10, Math.PI * 0.1, 0.3, 2);

spotLight.position.set(0, 2, 1);

const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);

// scene.add(spotLight);
scene.add(ambientLights);

spotLight.target.position.set(0, 0, 0);
// scene.add(spotLight.target);
//helper provider for directional lights

const directionLightshelper = new THREE.DirectionalLightHelper(
  directionLights,
  0.2,
);

const pointLighthelper = new THREE.PointLightHelper(pointLight, 1);
// scene.add(directionLightshelper);
// scene.add(pointLighthelper);

const sportLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(sportLightHelper);

const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  0.3,
);

// scene.add(hemisphereLightHelper);

// 3d object - mesh

//geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
// const geometry = new THREE.SphereGeometry(15, 32, 16);
// const geometry = new THREE.BufferGeometry();

const count = 50;

// const positionArray = new Float32Array(count * 3 * 3);

// for (let index = 0; index < count * 3 * 3; index++) {
//   positionArray[index] = (Math.random() - 0.5) * 4;
// }

// geometry.setAttribute("position", new THREE.BufferAttribute(positionArray, 3));

//material

const material = new THREE.MeshStandardMaterial({
  color: 0xff0000,
});

const cube = new THREE.Mesh(geometry, material);

// cube.position.set(1, 2, 1)
// cube.scale.set(2, 2, 2);

// cube.position.z = -5;

// gui.addColor(property, "color").onChange(() => {
//   material.color.set(property.color);
// });

const positionFolder = gui.addFolder("Position");
const rotationFolder = gui.addFolder("Rotation");

positionFolder
  .add(cube.position, "x")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("Position X");
positionFolder
  .add(cube.position, "y")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("Position Y");
positionFolder
  .add(cube.position, "z")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("Position Z");

rotationFolder
  .add(cube.rotation, "x")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("Position X");
rotationFolder
  .add(cube.rotation, "y")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("Position Y");
rotationFolder
  .add(cube.rotation, "z")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("Position Z");

// scene.add(cube);

// cube.rotation.set(Math.PI / 3, Math.PI / 6, Math.PI / 5)
//camera

const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100,
);

// const camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.1, 100 )

camera.position.z = 3;
camera.lookAt(0, 0, 0);

//renderer

const canvas = document.querySelector("#webgl");

const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(size.width, size.height);

//orbitc controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// display

function animate() {
  timer.update();
  // sportLightHelper.update();
  controls.update();
  const delta = timer.getDelta();

  if (mixer) {
    mixer.update(delta);
  }
  // cube.rotation.y += delta;
  // cube.rotation.x += delta;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  console.log("Hav move jata!");
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
});
