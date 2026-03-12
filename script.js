let viewer;

window.addEventListener("load", function(){

viewer = pannellum.viewer("panorama",{

type:"equirectangular",
panorama: CONFIG.panoramaImage,
autoLoad:true,
showControls:false

});

});


document.getElementById("arBtn").addEventListener("click", function(){

if(!viewer) return;


/* iOS / modern browsers permission */

if(typeof DeviceOrientationEvent !== "undefined" &&
typeof DeviceOrientationEvent.requestPermission === "function"){

DeviceOrientationEvent.requestPermission()
.then(function(response){

if(response === "granted"){

startAR();

}else{

alert("Motion permission denied");

}

});

}else{

startAR();

}

});


function startAR(){

viewer.startOrientation();

/* fullscreen */

const pano = document.getElementById("panorama");

if(pano.requestFullscreen){
pano.requestFullscreen();
}

}