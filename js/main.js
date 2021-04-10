var currentCamera, cameraTop, cameraSide, cameraFront, scene, renderer, clock, robot, target;
var pressedLeft = false, pressedUp = false, pressedRight = false, pressedDown = false;
var topOrtho = false, sideOrtho = false, frontOrtho = false;
var rotateBaseLeft = false, rotateBaseRight = false, rotateArmLeft = false, rotateArmRight = false;

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;


function createScene(){ 'use strict';
    scene = new THREE.Scene();
    robot = new Robot(0, 0, 0, scene);
    target = new Target(4, 4, 0, scene);
}

function createCameras(){ 'use strict';
    //Side Ortho
    cameraSide = new THREE.OrthographicCamera( SCREEN_WIDTH / -10, SCREEN_WIDTH /10, SCREEN_HEIGHT /10, SCREEN_HEIGHT / -10, 0, 100000);
    cameraSide.position.z = 100;

    //TOP Ortho
    cameraTop = new THREE.OrthographicCamera( SCREEN_WIDTH / -10, SCREEN_WIDTH /10, SCREEN_HEIGHT /10, SCREEN_HEIGHT / -10, 0, 100000 );
    cameraTop.position.y= 100;
    
    //Front Ortho
    cameraFront = new THREE.OrthographicCamera( SCREEN_WIDTH / - 10, SCREEN_WIDTH / 10, SCREEN_HEIGHT / 10, SCREEN_HEIGHT / - 10, 0, 100000 );
    cameraFront.position.x=100;
   

    currentCamera = cameraSide;
    currentCamera.lookAt(scene.position);

}


function onResize(){ 'use strict';
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {

        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;
        var scale = newWidth/SCREEN_WIDTH;
        currentCamera.left = -newWidth / (10*scale);
        currentCamera.right = newWidth / (10*scale); 
        currentCamera.top = newHeight / (10*scale);
        currentCamera.bottom = -newHeight / (10*scale);
        currentCamera.updateProjectionMatrix();
    }
}

//ver se passa evento ou nao
//camaras deviam estar aqui

function onKeyDown(event){ 'use strict';
switch(event.keyCode){

  //MOVIMENTO
  case 37: pressedLeft = true; break;

  case 38: pressedUp = true; break;

  case 39: pressedRight = true; break;

  case 40: pressedDown = true; break;

  //CAMARAS

  case 49: topOrtho = true; break;

  case 50: sideOrtho = true; break;

  case 51: frontOrtho = true; break;

  //ROTACOES

  case 65: rotateBaseLeft = true; break;
  case 83: rotateBaseRight = true; break;

  case 81: rotateArmLeft = true; break;
  case 87: rotateArmRight = true; break;

  //WIREFRAME
  case 52:
    scene.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
          node.material.wireframe = !node.material.wireframe;
        }});
    break;
  }
}

function onKeyUp(event){ 'use strict';
  switch(event.keyCode){

    //MOVIMENTO
    case 37: pressedLeft = false; break;

    case 38: pressedUp = false; break;

    case 39: pressedRight = false; break;

    case 40: pressedDown = false; break;

    //CAMARAS
    case 49: topOrtho = false; break;

    case 50: sideOrtho = false; break;

    case 51: frontOrtho = false; break;

    //ROTACOES
    case 65: rotateBaseLeft = false; break;

    case 83: rotateBaseRight = false; break;

    case 81: rotateArmLeft = false; break;

    case 87: rotateArmRight = false; break;
  }
}


function render(){ 'use strict';
    renderer.render(scene, currentCamera);
}

function update(){ 'use strict';
  var direction = new THREE.Vector3(0,0,0);
  var velocity = (window.innerWidth + window.innerHeight) / 100;

  if(pressedLeft){ direction.x -= 1;}

  if(pressedUp){ direction.z -= 1;}

  if(pressedRight){ direction.x += 1;}

  if(pressedDown){ direction.z += 1;}

  //manutencao de velocidade constante
  direction.normalize();
  direction.multiplyScalar(velocity*clock.getDelta());
  robot.getRobot().position.add(direction);

  //atualiza a camara a ser utilizada
  if(topOrtho){
      currentCamera = cameraTop;
      currentCamera.updateProjectionMatrix();
      currentCamera.lookAt(scene.position);
  }

  if(sideOrtho){
      currentCamera = cameraSide;
      currentCamera.updateProjectionMatrix();
      currentCamera.lookAt(scene.position);
  }

  if(frontOrtho){
      currentCamera = cameraFront;
      currentCamera.updateProjectionMatrix();
      currentCamera.lookAt(scene.position);
  }

  //ROTACOES
  if (rotateArmLeft){
    robot.rotateArm(0.05);
  }
  if (rotateArmRight){
    robot.rotateArm(-0.05);
  }
  if (rotateBaseLeft){
    robot.rotateBase(0.05);
  }
  if (rotateBaseRight){
    robot.rotateBase(-0.05);
  }
}

function init() { 'use strict';
    renderer = new THREE.WebGLRenderer({antialias: true, fullscreen: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    clock = new THREE.Clock({autostart:true});

    createScene();
    createCameras();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);

    render();
}


function animate(){ 'use strict';
  requestAnimationFrame(animate);

  render();
  update();
}
