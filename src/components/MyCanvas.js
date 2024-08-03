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
  MeshStandardMaterial 
} from "@react-three/drei";
import { View } from "react-native";
import { Canvas ,useFrame} from "@react-three/fiber";
import styles, { colors } from "../styles/styles";
import { useRef, forwardRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import * as THREE from "three";

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
        <Vase/>
      </PresentationControls>
     
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
        <meshStandardMaterial color={colors.white} />
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
  const fbx = useLoader(FBXLoader, './Big_Vase.fbx')
  return <primitive object={fbx} scale={0.01} />
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
