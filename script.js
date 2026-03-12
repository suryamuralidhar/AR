// Rev 1 

let camera;
let scene;
let renderer;
let controls;

init();

function init(){

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
1,
1100
);

renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("viewer").appendChild(renderer.domElement);


/* panorama sphere */

const geometry = new THREE.SphereGeometry(500,60,40);
geometry.scale(-1,1,1);

const texture = new THREE.TextureLoader().load(CONFIG.panoramaImage);

const material = new THREE.MeshBasicMaterial({map:texture});

const mesh = new THREE.Mesh(geometry,material);

scene.add(mesh);

animate();

}


/* render loop */

function animate(){

requestAnimationFrame(animate);

if(controls){
controls.update();
}

renderer.render(scene,camera);

}


/* =====================
   AR BUTTON
===================== */

document.getElementById("arBtn").addEventListener("click", async function(){

/* fullscreen */

document.body.requestFullscreen();


/* iPhone permission */

if(typeof DeviceOrientationEvent !== "undefined" &&
typeof DeviceOrientationEvent.requestPermission === "function"){

try{

const response = await DeviceOrientationEvent.requestPermission();

if(response === "granted"){
enableGyro();
}

}catch(e){
console.log(e);
}

}else{

enableGyro();

}

});


function enableGyro(){

controls = new THREE.DeviceOrientationControls(camera);
controls.connect();
controls.update();

}
