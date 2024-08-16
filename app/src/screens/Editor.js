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
    ScrollControls, useScroll,

} from "@react-three/drei";
import { FontLoader } from 'three/src/loaders/TextureLoader';
import { suspend } from 'suspend-react'
import { View, Platform, ScrollView, Button } from "react-native";
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
import EVase from "../components/EVase";





export default function Editor() {

    const canvasRef = useRef(null);
    const [slices, setSlices] = useState([]);

    const addSlice = () => {
        if (slices.length <= 1) {
            setSlices(() => [
                { position: [0, 0, 0], width: 0, height: 0 },
                { position: [0, 0, 0], width: Math.random() * 0.5 + 0.1, height: 0 },
            ]);
        } else
            if (slices.length < 11) {
                setSlices(prevSlices => [
                    ...prevSlices,
                    { position: [0, 0, 0], width: Math.random() * 0.5 + 0.1, height: 0.125 }

                ]);
            } else if (slices.length == 11) {
                setSlices(prevSlices => prevSlices.slice(0, -1));
                setSlices(prevSlices => [
                    ...prevSlices,
                    { position: [0, 0, 0], width: Math.random() * 0.6 + 0.1, height: 0.125 }

                ]);
            }
    };

    const removeSlice = () => {
        setSlices(prevSlices => prevSlices.slice(0, -1));
    };

    const randomize = () => {
        setSlices(() => [
            { position: [0, 0, 0], width: Math.random() * 0.5 + 0.1, height: 0 },
            { position: [0, 0, 0], width: Math.random() * 0.5 + 0.1, height: 0 },
            { position: [0, 0, 0], width: Math.random() * 0.5 + 0.1, height: 0.125 },
            { position: [0, 0, 0], width: Math.random() * 0.5 + 0.1, height: 0.125 },
            { position: [0, 0, 0], width: Math.random() * 0.5 + 0.1, height: 0.125 },
            { position: [0, 0, 0], width: Math.random() * 0.5 + 0.1, height: 0.125 },
            { position: [0, 0, 0], width: Math.random() * 0.5 + 0.1, height: 0.125 },
            { position: [0, 0, 0], width: Math.random() * 0.5 + 0.1, height: 0.125 },
            { position: [0, 0, 0], width: Math.random() * 0.5 + 0.1, height: 0.125 },
            { position: [0, 0, 0], width: Math.random() * 0.5 + 0.1, height: 0.125 }
        ]);
    };


    const loadpreset = () => {
        setSlices(() => [
            { position: [0, 0, 0], width: 0, height: 0 },
            { position: [0, 0, 0], width: 0.25, height: 0 },
            { position: [0, 0, 0], width: 0.25, height: 0.125 },
            { position: [0, 0, 0], width: 0.51, height: 0.125 },
            { position: [0, 0, 0], width: 0.72, height: 0.125 },
            { position: [0, 0, 0], width: 0.78, height: 0.125 },
            { position: [0, 0, 0], width: 0.84, height: 0.125 },
            { position: [0, 0, 0], width: 0.9, height: 0.125 },
            { position: [0, 0, 0], width: 0.4, height: 0.125 },
            { position: [0, 0, 0], width: 0.125, height: 0.125 },
            { position: [0, 0, 0], width: 0.25, height: 0.125 },


        ]);
        /*
        
                { position: [0, 0, 0], width: 0, height: 0 },
                    { position: [0, 0, 0], width: 0.8, height: 0 },
                    { position: [0, 0, 0], width: 1, height: 0.5 },
                    { position: [0, 0, 0], width: 0.8, height: 0.25 },
                    { position: [0, 0, 0], width: 0.25, height: 0.25 },
                    { position: [0, 0, 0], width: 0.5, height: 0.25 },

          { position: [0, 0, 0], width: 0, height: 0 },
            { position: [0, 0, 0], width: 0.25, height: 0 },
            { position: [0, 0, 0], width: 0.5, height: 0.75 },
            { position: [0, 0, 0], width: 0.4, height: 0.125 },
            { position: [0, 0, 0], width: 0.125, height: 0.125 },
            { position: [0, 0, 0], width: 0.25, height: 0.125 },


                  { position: [0, 0, 0], width: 0, height: 0 },
            { position: [0, 0, 0], width: 0.4, height: 0 },
            { position: [0, 0, 0], width: 0.95, height: 0.9 },
            { position: [0, 0, 0], width: 0.4, height: 0.8 },
            { position: [0, 0, 0], width: .2, height: 1 },
            { position: [0, 0, 0], width: .2, height: 1 },
            { position: [0, 0, 0], width: .2, height: 1 },
            { position: [0, 0, 0], width: .2, height: 1 },
            { position: [0, 0, 0], width: .2, height: 1 },
            { position: [0, 0, 0], width: .2, height: 1 },
            { position: [0, 0, 0], width: .2, height: 1 },
            { position: [0, 0, 0], width: .2, height: 1 },
            { position: [0, 0, 0], width: 0.9, height: 0.5 },

        */
        // vase.addSlice([0, 0, 0], .0, 0);
        // vase.addSlice([0, 0, 0], .4, 0);
        // vase.addSlice([0, 0, 0], .95, .9);
        // vase.addSlice([0, 0, 0], .2, 0.8);
        // vase.addSlice([0, 0, 0], .2, 1);
        // vase.addSlice([0, 0, 0], .2, 1);
        // vase.addSlice([0, 0, 0], .2, 1);
        // vase.addSlice([0, 0, 0], .2, 1);
        // vase.addSlice([0, 0, 0], .2, 1);
        // vase.addSlice([0, 0, 0], .2, 1);
        // vase.addSlice([0, 0, 0], .2, 1);
        // vase.addSlice([0, 0, 0], .2, 1);
        // vase.addSlice([0, 0, 0], .9, 0.5);
    }



    return (


        <>

            <NavMenu />
            <Button title="Add Slice" onPress={addSlice} />
            <Button title="Remove Slice" color={colors.orange} onPress={removeSlice} />
            <Button title="Randomise" color={colors.teal} onPress={randomize} />
            <Button title="Load Defaults" color={colors.teal} onPress={loadpreset} />
            <View style={[styles.Center, { width: '100vw', height: '100vh' }]}>
                <View style={[{ width: '100%', height: '100%' }]}>
                    <Canvas style={styles.canvas} ref={canvasRef} shadows >
                        <OrbitControls />
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
                        <PresentationControls
                            global
                            cursor={true}
                            zoom={1.5}
                            speed={1} // Speed factor
                            config={{ mass: 2, tension: 500 }}
                            snap={{ mass: 4, tension: 1500 }}
                            rotation={[0, 0.3, 0]}
                            polar={[-Math.PI / 3, Math.PI / 3]}
                            azimuth={[-Infinity, Infinity]} // Horizontal limits

                        >
                            {/*<CustomVase/>*/}


                        </PresentationControls>
                        <Myvase slices={slices} />

                        <Shadows />
                        <Ground />



                        <Environment preset="warehouse" background backgroundBlurriness={0.5} />
                    </Canvas>

                </View>
            </View>
            {/* <Footer /> */}



        </>
    );
}



// function Myvase() {

//     //41703 max number of valeus 
//     let pos = [0, 0, 0];
//     let vase = new Vase(pos, 128, []);



//     //vase
//     vase.addSlice([0, 0, 0], 0, 0);
//     vase.addSlice([0, 0, 0], 0.8, 0);
//     vase.addSlice([0, 0, 0], 1, 0.5);
//     vase.addSlice([0, 0, 0], 0.8, 0.25);
//     vase.addSlice([0, 0, 0], 0.25, 0.25);
//     vase.addSlice([0, 0, 0], 0.5, 0.25);

//     let offset = [-1, 0.1, 0];
//     // vase.MOve(offset)

//     vase.render();

//     return (
//         //vase.getMesh()
//         //vase.getRekt()
//         vase.getMesh2()


//     )

// }

function Myvase({ slices }) {
    let pos = [0, 0, 0];
    const vase = new Vase(pos, 128, []);
    vase.addSlice([0, 0, 0], 0, 0);
    // Add slices based on the state
    if (slices && slices.length > 0)
        slices.forEach(slice => {
            console.log(slice)
            vase.addSlice([0, 0, 0], slice.width, slice.height);
        });

    vase.render();

    return vase.getMesh2();
}

function Ground() {
    return (
        <>
            {/* Ground Plane */}
            <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[10, 10]} />
                {/* <meshStandardMaterial color={colors.teal} /> */}
                <shadowMaterial transparent opacity={0.4} />
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

