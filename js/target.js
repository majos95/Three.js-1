class Target {
	constructor(x, y, z, scene){ 'use strict';
    this.x = x, this.y = y, this.z = z;
    this.scene = scene;

    this.target = new THREE.Object3D();
    this.wireframe = false;

    this.build();
  }

  build(){'use strict';

  	var segments = 10;

  	this.target = new THREE.Group();
  	this.addCylinder(this.x + 30, this.y + 7.5, this.z, 4, 4, 35, segments, 1);
  	this.addTorus(this.x + 30, this.y + 29, this.z, 3.5, 1, segments, segments);

  	
  	scene.add(this.target);

  }

  addCylinder(x, y, z, radiusTop, radiusBottom, height, rsegments, hsegments){
  	'use strict';
  	var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, rsegments, hsegments);
  	var mesh = new THREE.Mesh(geometry, this.getMaterial("green"));
  	mesh.position.set(x,y,z);
  	this.target.add(mesh);
  }

  addTorus(x, y, z, radiusBig, radiusTube, rsegments, tubeSegments){
  	'use strict';
  	var geometry = new THREE.TorusGeometry(radiusBig, radiusTube, rsegments, tubeSegments);
  	var mesh = new THREE.Mesh(geometry, this.getMaterial("red"));
  	mesh.position.set(x,y,z);
  	this.target.add(mesh);
  }

  getMaterial(color){ 'use strict';
    // Cria um novo material a cada chamada!
    if(color == "red"){
      return new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: this.wireframe});
    }
    else if(color == "green"){
      return new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: this.wireframe });
    }
  }
}
