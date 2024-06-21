import {
  useGLTF,
  MeshTransmissionMaterial,
  ContactShadows,
  Environment,
  PerspectiveCamera,
  OrbitControls,
  PresentationControls,
  useFBX,
  MeshDistortMaterial ,
  MeshStandardMaterial,
  sphereBufferGeometry,
  InstancedMesh,
  Sphere
} from "@react-three/drei";
import { View } from "react-native";
import { Canvas ,useFrame} from "@react-three/fiber";
import styles, { colors } from "../styles/styles";
import { useRef, forwardRef } from 'react'
import { useLoader ,useThree } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import * as THREE from "three";
import { useGesture } from '@use-gesture/react';
import { DoubleSide } from 'three'







function MyCamera(){

return (<>
   <PerspectiveCamera
        
        fov={50}
        position={[0, 0, 5]} // Set the camera's position
        rotation={[0, 0, 0]} // Set the camera's rotation
        near={0.1} // Set the near clipping plane
        far={1000} // Set the far clipping plane
        makeDefault
      />
        <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0, 0.3, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
        {/*<CustomVase/>*/}
        
      </PresentationControls>
      <CustomVase/>
      <OrbitControls/>
      <axesHelper args={[5]} />
      
     
</>);
  }

export default function MyCanvas() {
  return (
    <Canvas style={styles.canvas} shadows>
      <MyCamera/>
      <ambientLight intensity={2} />
      <directionalLight position={[5, 10, 5]} intensity={4} castShadow />
      <Shadows/>
     <Ground/>
     
    </Canvas>

   

  );
}

function Ground() {
  return(
<>
 {/* Ground Plane */}
 <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={colors.teal} />
        {/* Set the plane's color to match the background */}
      </mesh>
</>
      );
}

function Shadows()  {return(<><ContactShadows
  resolution={512}
  position={[0, -44.8, 0]}
  opacity={0}
  scale={100}
  blur={0}
  far={0.8}
/></>);
}

function Object(){
 

  return(<>
        {/* BOX */}
        <mesh position={[-1, -0.4, 0]} rotation={[0.1, -0.4, 0]} castShadow>
        <boxGeometry />
        <meshStandardMaterial color={colors.orange} />
      </mesh>
     
  </>);
}
const Model = () => {
  const fbx = useLoader(FBXLoader, './vase.fbx')
  return <primitive object={fbx} scale={3} />
};



const Vase = () => {
  const vaseRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
   // vaseRef.current.rotation.y = elapsedTime * 0.1; // Slow rotation
  });

  // Function to create the vase geometry
  const createVaseGeometry = () => {
    //CylinderGeometry(radiusTop , radiusBottom : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : 
    //Boolean, thetaStart : Float, thetaLength : Float)
    const geometry = new THREE.CylinderGeometry(2 , 1, 1, 20,30,true); // Adjust parameters for shape
    //geometry.rotateX(Math.PI / 2); // Rotate to stand upright
    return geometry;
  };

  return (
    <mesh ref={vaseRef} geometry={createVaseGeometry()} >
      <meshStandardMaterial color={colors.orange} />
      
    </mesh>
  );
};

function calculateCircleVertices(radius, numPoints,layers,layerheight) {
  const vertices = [];
  for (let layer = 0; layer < layers; layer++) {
  for (let i = 0; i < numPoints; i++) {
    const angleDegrees = i*(360/numPoints) ;
    const angleRadians = THREE.MathUtils.degToRad(angleDegrees);
    const x = radius * Math.cos(angleRadians);
    const y = 0+layer*layerheight;
    const z = radius * Math.sin(angleRadians); // Assuming 2D circle in the xy-plane
    vertices.push(x, y, z); // Push x, y, z coordinates individually
  }
}

  return new Float32Array(vertices); // Convert to Float32Array
}

function calculateIndicies(vertices,width) {
  const loop = vertices.length/3/width;
  var indices = [];
  for (let layer = 0; layer < loop; layer++) {
   // console.log(`layer ${layer} :`)
    for (let x = 0; x < width; x++) {
     // console.log(`Point NO = ${(x%width)+width*layer} `)
      if(layer+1<loop.length){
        // point above exist you can make a connection
        let px1 =(x%width)+width*layer;
        let px2 = (x+1%width)+width*layer;
        let pl1 = (x%width)+width*layer+1
        indices.push(px1); 
        indices.push(px2);
        indices.push(pl1);
      }
      if(layer-1>0){
        //point below has to exist you can make a connection
        let px1 =(x%width)+width*layer;
        let px2 = (x+1%width)+width*layer;
        let pl0 = (x+1%width)+width*layer+1
        indices.push(px1); 
        indices.push(px2);
        indices.push(pl0);
      }
    }
  }
 
  return new Uint16Array(indices); 
}


function CustomVase() {
  const points = [];
  const meshRef = useRef();
  const width =4
  const radius = 1
  const layers = 2
  const layerheight = 0.85;
  // Create your vertex positions (example: 3D points)
  const vertices = calculateCircleVertices(radius,width,layers,layerheight)
 
   pos = new THREE.Vector3(0, 0, 0);
  for (let i = 0; i < vertices.length; i += 3) { // Increment by 3 for x, y, z groups
    pos.x = vertices[i];
    pos.y = vertices[i+1];
    pos.z = vertices[i+2];
  }

  // Create a BufferGeometry and add the positions
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3)); // 3 components per vertex (x, y, z)

  // Index BufferAttribute
const indices =  calculateIndicies(vertices,width);
geometry.setIndex(new THREE.BufferAttribute(indices, 1)); // 1 index per value

  const vertexArray = Array.from(vertices); 

  // return (
  //   <>
  // {drawColoredPoint([0,0,0], 0.5,0.5)}
  //     {/* Render Points */}
  //     {vertexArray.map((_, index) => {
  //       if (index % 3 === 0) { // Only draw a point every 3rd element (x, y, z)
  //         const position = vertexArray.slice(index, index + 3); // Get [x,y,z]
  //         return drawColoredPoint(position, index,index);
  //       } else {
  //         return null; // Don't render anything for y and z components
  //       }
  //     })}
  //   </>
  // );
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }); // Red wireframe

  // Create mesh
  const mesh = new THREE.Mesh(geometry, material);
return(
<mesh>
        <bufferGeometry>
            <bufferAttribute
                attach='attributes-position'
                array={vertices}
                count={vertices.length / 3}
                itemSize={3}
            />

            <bufferAttribute
                attach="index"
                array={indices}
                count={indices.length}
                itemSize={1}
            />
        </bufferGeometry>
        <meshStandardMaterial
            vertexColors
            side={DoubleSide}
        />
    </mesh>
);

}

function drawPoint(position, key) {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16); // Generate random hex color
  return (
    <Sphere key={key} position={new THREE.Vector3(...position)} args={[0.1, 8, 8]}>
       <meshStandardMaterial color={"#" + randomColor} /> {/* Apply random color */}
    </Sphere>
  );
}

function drawColoredPoint(position, key, hueValue = 120) { // Start with green hue (120 degrees)
  const colors = ["#5386E4","#4C4B63" , "#690500","#56EEF4","#BB6B00","#11151C","#212D40" , "#83BCA9","#7D4E57","#D66853"]
  const saturation = 100; // Constant saturation for consistent color type
  const lightness = 50 ; // Decrease lightness with each call (darker)

  // Ensure lightness stays within valid range (0-100)
  const validLightness = Math.max(0, Math.min(100, lightness));

  const color = `hsl(${hueValue}, ${saturation}%, ${validLightness}%)`;
  
  return (
    <Sphere key={key} position={new THREE.Vector3(...position)} args={[0.1, 8, 8]}>
      
      <meshStandardMaterial color={colors[(key/3)%8]} />
    </Sphere>
  );
}