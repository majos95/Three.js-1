class Robot{
  constructor(x, y, z, scene){ 'use strict';
    // Position
    this.x = x, this.y = y, this.z = z;
    this.scene = scene;

    // Robot WHOLE body
    this.robotBody = new THREE.Group();
    this.wireframe = false;

    // Componentes do robot
    this.base = new THREE.Object3D();
    this.armMesh = new THREE.Mesh();
    this.foreArmMesh = new THREE.Mesh();
    this.handBaseMesh = new THREE.Mesh();
    this.handFingersMesh = new THREE.Mesh();


    // Articulacoes que ligam as componentes do robot
    this.baseArmArticulation = new THREE.Group();
    this.armArt = new THREE.Group();
    this.armForearmArticulation = new THREE.Group();

    // Constroi o robot e posiciona na cena
    this.build();
  }

  build(){ 'use strict';
    var mesh, material, segments = 15;

    // Build the base
    this.base.add(this.buildCubicShape(0, 0, 0, 30, 4, 20));
    this.base.add(this.buildSphericShape(13, -4,- 8, 2, 0, 2 * Math.PI, 0, 2 * Math.PI, segments, segments));
    this.base.add(this.buildSphericShape(13, -4, 8, 2, 0, 2 * Math.PI, 0, 2 * Math.PI, segments, segments));
    this.base.add(this.buildSphericShape(- 13, - 4, 8, 2, 0, 2 * Math.PI, 0, 2 * Math.PI, segments, segments));
    this.base.add(this.buildSphericShape(- 13, - 4, - 8, 2, 0, 2 * Math.PI, 0, 2 * Math.PI, segments, segments));
    this.baseArmArticulation.add(this.buildSphericShape(0, 2, 0, 4, 0, 2 * Math.PI, 0, Math.PI / 2, segments, segments));

    // Build the arm
    this.armMesh = this.buildCubicShape(0,0,0, 2, 2, 20);
    this.base.add(this.armMesh);
    this.armMesh.rotateX(Math.PI/2);
    this.armMesh.position.set(0, 13, 0);

    this.base.add(this.armArt);
    this.armArt.position.set(0, 3 , 0);
    this.armArt.attach(this.armMesh);
    this.baseArmArticulation.add(this.armArt);

    //Build the forearm
    this.foreArmMesh = this.buildCubicShape(0, 0, 0, 2, 2, 20);
    this.armForearmArticulation.add(this.buildSphericShape(0, 0, 0, 2, 0, 2 * Math.PI, 0, 2 * Math.PI, segments, segments));
    this.armMesh.add(this.armForearmArticulation);
    this.armForearmArticulation.position.set(0, 0, -10);
    this.foreArmMesh.position.set(0, 0, -10);
    this.armForearmArticulation.add(this.foreArmMesh);

    // Build the hand base
    this.handBaseMesh = this.buildCubicShape(0, 0 ,0, 1, 2, 8);
    this.foreArmMesh.add(this.handBaseMesh);
    this.handBaseMesh.rotateY(Math.PI/2);
    this.handBaseMesh.position.set(0,0,0);

    // Build the hand fingers
    this.handFingersMesh = this.buildCubicShape(2.5, 0, 2.5, 1, 1, 4);
    this.handFingersMesh.add(this.buildCubicShape(-5, 0, 0, 1, 1, 4));
    this.handBaseMesh.add(this.handFingersMesh);
    this.handFingersMesh.rotateY(-Math.PI/2);
    this.handBaseMesh.position.set(0,0,-10);


  
    // Add all built bodyparts to robot body and articulates them
    this.robotBody.add(this.base);
    this.robotBody.add(this.baseArmArticulation);

    // Add whole thing to the scene
    this.robotBody.position.set(this.x, this.y, this.z);
    this.rotateForeArm(Math.PI/2);
    this.scene.add(this.robotBody);
  }

  buildCubicShape(x, y, z, width, height, depth){ 'use strict';
    var geometry = new THREE.CubeGeometry(width, height, depth);
    var mesh = new THREE.Mesh(geometry, this.getMaterial("green"));
    mesh.position.set(x, y, z);
    return mesh;
  }

  buildSphericShape(x, y, z, radius, phiStart, phiEnd, thetaStart, thetaEnd, widthSegments, heightSegments){ 'use strict';
    var geometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments, phiStart, phiEnd, thetaStart, thetaEnd);
    var mesh = new THREE.Mesh(geometry, this.getMaterial("red"));
    mesh.position.set(x, y, z);
    return mesh;
  }

  getMaterial(color){ 'use strict';
    if(color == "red"){
      return new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: this.wireframe});
    }
    else if(color == "green"){
      return new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: this.wireframe });
    }
    else if(color == "blue"){
      return new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: this.wireframe });
    }
  }

  getRobot(){ 'use strict';
    return this.robotBody;
  }

  rotateBase(angle){'use strict'
    this.baseArmArticulation.rotateY(angle);
  }

  rotateArm(angle){'use strict'
    this.armArt.rotateZ(angle);
  }

  rotateForeArm(angle){'use strict'
    this.armForearmArticulation.rotateY(angle);
  }
}
