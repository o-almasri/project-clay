import {
    useGLTF,
    MeshTransmissionMaterial,
    ContactShadows,
    Environment,
    PerspectiveCamera,
    OrbitControls,
    PresentationControls,
    useFBX,
    MeshDistortMaterial,
    MeshStandardMaterial,
    sphereBufferGeometry,
    InstancedMesh,
    Sphere,
    Helper,
    VertexNormalsHelper,
    useTexture, Text as DreiText,
    RenderTexture,
    ScrollControls,
    useScroll,
    PLYLoader

} from "@react-three/drei";


import { FontLoader } from 'three/src/loaders/TextureLoader';
import { suspend } from 'suspend-react'
import { View, Platform, ScrollView, Text } from "react-native";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import styles, { colors } from "../styles/styles";
import { useRef, forwardRef, useState, useEffect } from 'react'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import * as THREE from "three";
import { useGesture } from '@use-gesture/react';
import { DoubleSide } from 'three'

import { easing } from 'maath'

import { router } from 'expo-router';
import NavMenu from "../components/navMenu";
import Footer from "../components/Footer";
import Vase from "../components/vase";

export default function Selection() {
    const canvasRef = useRef(null);
    const [slices, setSlices] = useState([]);
    const [slices2, setSlices2] = useState([]);
    const [slices3, setSlices3] = useState([]);
    const numCubes = 3; // Number of cubes
    const radius = 1.5; // Radius of the circle


    const loadpreset = (num) => {
        if (num == 1) {
            setSlices(() => [
                { position: [0, 0, 0], width: 0, height: 0 },
                { position: [0, 0, 0], width: 0.25, height: 0 },
                { position: [0, 0, 0], width: 0.27, height: 0.125 },
                { position: [0, 0, 0], width: 0.35, height: 0.125 },
                { position: [0, 0, 0], width: 0.43, height: 0.125 },
                { position: [0, 0, 0], width: 0.51, height: 0.125 },
                { position: [0, 0, 0], width: 0.59, height: 0.125 },
                { position: [0, 0, 0], width: 0.60, height: 0.125 },
                { position: [0, 0, 0], width: 0.4, height: 0.125 },
                { position: [0, 0, 0], width: 0.125, height: 0.125 },
                { position: [0, 0, 0], width: 0.25, height: 0.125 },
            ]);
        } else {
            // vase.addSlice([0, 0, 0], 0, 0);
            // vase.addSlice([0, 0, 0], 0.15, 0);
            // vase.addSlice([0, 0, 0], 0.2, 0.125);
            // vase.addSlice([0, 0, 0], 0.2, 0.125);
            // vase.addSlice([0, 0, 0], 0.15, 0.125);
            // vase.addSlice([0, 0, 0], 0.05, 0.06);
            // vase.addSlice([0, 0, 0], 0.05, 0.06);
            // vase.addSlice([0, 0, 0], 0.1, 0.06);

            //add scale variable to 1.5x scale them for viewing purposes 
            let scale = 1.5;
            setSlices2(() => [
                { position: [0, 0, 0], width: 0 * scale, height: 0 * scale },
                { position: [0, 0, 0], width: 0.15 * scale, height: 0 * scale },
                { position: [0, 0, 0], width: 0.2 * scale, height: 0.125 * scale },
                { position: [0, 0, 0], width: 0.2 * scale, height: 0.125 * scale },
                { position: [0, 0, 0], width: 0.15 * scale, height: 0.125 * scale },
                { position: [0, 0, 0], width: 0.05 * scale, height: 0.06 * scale },
                { position: [0, 0, 0], width: 0.05 * scale, height: 0.06 * scale },
                { position: [0, 0, 0], width: 0.1 * scale, height: 0.06 * scale },

            ]);

            setSlices3(() => [
                { position: [0, 0, 0], width: 0 * scale, height: 0 * scale },
                { position: [0, 0, 0], width: 0.16 * scale, height: 0 * scale },
                { position: [0, 0, 0], width: 0.21 * scale, height: 0.125 * scale },
                { position: [0, 0, 0], width: 0.21 * scale, height: 0.125 * scale },
                { position: [0, 0, 0], width: 0.16 * scale, height: 0.125 * scale },
                { position: [0, 0, 0], width: 0.06 * scale, height: 0.06 * scale },
                { position: [0, 0, 0], width: 0.06 * scale, height: 0.06 * scale },
                { position: [0, 0, 0], width: 0.11 * scale, height: 0.06 * scale },
            ]);
        }

    }

    useEffect(() => {
        loadpreset(1);
        loadpreset(2);
    }, []);
    return (


        <>

            <NavMenu />
            <View style={[styles.guidecontainer]}>
                <Text style={styles.footerText}>Select a template</Text>
            </View >
            <View style={[styles.Center, { width: '100vw', flex: 1 }]}>
                <View style={[{ width: '100%', height: '100%' }]}>
                    <Canvas style={styles.canvas} ref={canvasRef} shadows >
                        <PerspectiveCamera

                            fov={50}
                            position={[0, 0.5, 6]} // Set the camera's position
                            rotation={[-0.2, 0, 0]} // Set the camera's rotation
                            near={0.1} // Set the near clipping plane
                            far={1000} // Set the far clipping plane
                            makeDefault
                        />
                        <ambientLight intensity={1} />
                        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

                        <Shadows />
                        <Ground />

                        <ScrollControls pages={4} infinite>
                            <Rig rotation={[0, 0, 0]}>
                                {[...Array(numCubes)].map((_, index) => {
                                    const angle = (index / numCubes) * Math.PI * 2; // Calculate angle for each cube
                                    const x = radius * Math.cos(angle);
                                    const z = radius * Math.sin(angle);
                                    if (index == 0) {
                                        return (
                                            <group key={index} position={[x, 0, z]}>
                                                <mesh onClick={() => { router.navigate('/src/screens/Editor'); }}>
                                                    <Myvase slices={slices} texture={1} hover={2} />
                                                </mesh>
                                            </group>
                                        )


                                    } else if (index == 1) {
                                        return <Cube2 key={index} position={[x, 0, z]} />;
                                    } else if (index == 2) {
                                        return (
                                            <group key={index} position={[x, 0, z]}>
                                                <mesh onClick={() => { router.navigate('/src/screens/Editor'); }}>
                                                    <Myvase slices={slices2} texture={6} hover={2} />
                                                    <Myvase slices={slices3} texture={1} materialmode={2} hover={2} />
                                                </mesh>
                                            </group>
                                        )
                                    } else {
                                        return <Dodecahedron key={index} position={[x, 0, z]} />;
                                    }

                                })}


                            </Rig>

                        </ScrollControls>

                        {/* <OrbitControls /> */}
                        <Environment preset="warehouse" background backgroundBlurriness={0.5} />
                    </Canvas>
                </View>
            </View>
            <Footer />




        </>
    );
}




function Rig(props) {
    const ref = useRef()
    const scroll = useScroll()
    const { camera } = useThree();
    useFrame((state, delta) => {

        ref.current.rotation.y = -scroll.offset * (Math.PI * 4) // Rotate contents
        ref.current.children.forEach((child) => {
            // Calculate the camera's position relative to the rotating group
            const cameraPositionInGroupSpace = new THREE.Vector3();

            let pos =
                ref.current.worldToLocal(cameraPositionInGroupSpace.copy(camera.position));

            // Calculate the direction from the child to the camera's position in group space
            const direction = new THREE.Vector3().subVectors(cameraPositionInGroupSpace, child.position).normalize();

            // Calculate the quaternion for the rotation needed to face the camera
            const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 1), direction);

            // Smoothly rotate the child towards the camera
            child.quaternion.slerp(targetQuaternion, 0.1); // Adjust 0.1 for rotation speed
        });


        state.events.update() // Raycasts every frame rather than on pointer-move
        // easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y + 1.5, 10], 0.3, delta) // Move camera
        // state.camera.lookAt(0, 0, 0) // Look at center
    })
    return <group ref={ref} {...props} />
}


function Myvase({ slices, texture, materialmode = 1, hover = 1 }) {


    if (!texture) {
        texture = 1;
    }
    let pos = [0, 0, 0];
    const vase = new Vase(pos, 128, []);
    vase.addSlice(pos, 0, 0);
    //loadpreset();
    // Add slices based on the state
    if (slices && slices.length > 0)
        slices.forEach(slice => {
            // console.log(slice)
            vase.addSlice([0, 0, 0], slice.width, slice.height);
        });
    // vase.addSlice(pos, 0, 0);
    // vase.addSlice(pos, 0.08, 0);
    // vase.addSlice(pos, 0.1, 0.04);
    // vase.addSlice(pos, 0.08, 0.06);
    // vase.addSlice(pos, 0.025, 0.03);
    // vase.addSlice(pos, 0.05, 0.03);

    vase.setTextureindex(texture);
    vase.setmeterialindex(materialmode);
    vase.sethovermode(hover);
    // vase.MOve([position[0], 0, position[2]]);
    vase.render();

    return vase.getMesh2();
}


function Cube({ position }) {


    return (
        <mesh position={position} >
            <boxGeometry />

            <meshStandardMaterial>
                <RenderTexture attach="map" anisotropy={16}>
                    <PerspectiveCamera makeDefault manual aspect={1 / 1} position={[0, 0, 10]} />
                    <color attach="background" args={['green']} />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} />
                </RenderTexture>

            </meshStandardMaterial>

        </mesh>
    )
}




function Cube2(props, { position }) {
    const meshRef = useRef();

    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)

    return (
        <group {...props}>
            <mesh ref={meshRef}
                position={position}
                scale={clicked ? 1 : 0.5}
                onClick={() => { click(!clicked), router.navigate('/src/screens/Editor'); }}
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}>
                <boxGeometry />

                <meshStandardMaterial color={hovered ? colors.orange : colors.teal} />
                {/* <meshStandardMaterial>
                    <RenderTexture attach="map" anisotropy={16}>
                        <PerspectiveCamera makeDefault manual aspect={1 / 1} position={[0, 0,
                            10]} />
                        <color attach="background" args={['green']} />
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} />
                    </RenderTexture>
                </meshStandardMaterial> */}



            </mesh>
        </group>

    );
}

function Ground() {
    return (
        <>
            {/* Ground Plane */}
            <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color={colors.black} />
                {/* <meshStandardMaterial color={colors.white} /> */}
                {/* Set the plane's color to match the background */}
            </mesh>
        </>
    );
}



function Shadows() {
    return (<><ContactShadows
        resolution={512}
        position={[0, -44.8, 0]}
        opacity={0}
        scale={100}
        blur={0}
        far={0.8}
    /></>);
}


function Dodecahedron(props) {
    const meshRef = useRef()
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // useFrame(() => (meshRef.current.rotation.x += 0.01))
    return (
        <group {...props}>
            <mesh
                ref={meshRef}
                scale={clicked ? 1 : 0.5}
                onClick={() => click(!clicked)}
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}>
                <dodecahedronGeometry args={[0.75]} />
                <meshStandardMaterial color={hovered ? colors.orange : colors.teal} />
            </mesh>
        </group>
    )
}




