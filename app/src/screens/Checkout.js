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
import { View, Platform, ScrollView, TextInput, Text, Pressable, useWindowDimensions } from "react-native";
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
import axios from 'axios';


function getToken() {
    return localStorage.getItem('authToken');
}

function loadobject() {
    //localStorage.removeItem('jsonarray');
    let storedData = localStorage.getItem('jsonarray');

    if (!storedData) {
        console.log('error no object found');
        //route user to new design
    } else {
        const parsedObject = JSON.parse(storedData);
        return parsedObject;
    }
    return null;

}

export default function Checkout() {
    const canvasRef = useRef(null);
    const [slices, setSlices] = useState([]);
    const [userId, setUserId] = useState(null);
    const [radio, setradio] = useState(2);
    const [quantity, setquantity] = useState(1);
    const [price, setprice] = useState(0);

    const { width } = useWindowDimensions();
    const [size, setSize] = useState(20); // Default to 20 for larger screens

    const cameraRef = useRef();
    const [texture, settexture] = useState(0);
    const [textureName, settextureName] = useState(0);
    const [res, setres] = useState(64);
    const [materialindex, setmeterialindex] = useState(1); // 1 or 2 or 3
    const [orderstatus, setorderstatus] = useState(0); // order number to disable options and make this behave like order tracking
    const shippingprice = 5;
    const baseprice = 2;
    useEffect(() => {
        const session = getToken();
        if (session === null) {
            // Redirect to login page
            setTimeout(() => {
                router.navigate('');
            }, 100); // Adjust the timeout as needed
        } else {
            setUserId(session)

        }
    }, [userId]);

    useEffect(() => {
        let obj = loadobject();
        setSlices(obj.data);
        settexture(obj.texture);
        setmeterialindex(obj.materialindex);
        setres(obj.res);
        let ordernumber = localStorage.getItem('ordernumber');
        if (ordernumber) {
            setorderstatus(ordernumber);
        }

    }, []);
    useEffect(() => {
        setTimeout(() => {
            if (slices.length > 0)
                setprice(quantity * slices.length * baseprice * radio + shippingprice);
        }, 100); // Adjust the timeout as needed

    }, [quantity, baseprice, shippingprice, radio, slices.length]);
    useEffect(() => {
        // Adjust the size based on screen width
        if (width < 768) {
            setSize(60);
        }
        if (width <= 512) {
            setSize(60);
        }
        if (width >= 768) {
            setSize(20);
        }
    }, [width]);



    function Myvase({ slices }) {
        let pos = [0, 0, 0];
        const vase = new Vase(pos, res, []);
        vase.addSlice([0, 0, 0], 0, 0);
        // Add slices based on the state
        if (slices && slices.length > 0)
            slices.forEach(slice => {
                // console.log(slice)
                vase.addSlice([0, 0, 0], slice.width, slice.height);
            });


        vase.setTextureindex(texture);
        settextureName(vase.getTextureName(texture));
        vase.sethovermode(0);
        vase.render();

        return vase.getMesh2();
    }


    function createorder() {

        /*
        $userid = $conn->real_escape_string($data['userid']);
        $date = date(format,timestamp);
        $status = 1;
        $total = $conn->real_escape_string($data['total']); */




        const data = {
            userid: userId,
            price: price,
            quantity: quantity,
            texture: texture,
            size: radio * 5,
            resolution: res,
            type: 1, // 1 for vase , 2 for sandvase , 3 for shirt
            data: JSON.stringify(slices), // parse data as JSON
        };

        console.log('data sent');
        console.log(data);
        axios.post('http://localhost/glazeit/order.php', data)
            .then(response => {
                console.log('response');
                console.log(response.data);
                if (response.data == -1) {
                    console.log(response.data);
                } else {
                    //success and we should have order number 
                    setorderstatus(response.data);
                    localStorage.setItem('ordernumber', JSON.stringify(response.data));
                }


            })
            .catch(error => {
                console.error("Error sending data: ", error);
            });

    }

    return (


        <>

            <NavMenu />

            <View style={[styles.container, {
                alignItems: 'center'
            }]}>

                <View style={[styles.checkoutrowcontainer, {}]}>



                    <View style={[styles.checkoutrowcontainer, styles.checkoutContainer, { height: `${size}vw`, width: `${size}vw`, margin: 10, borderRadius: 10, borderWidth: 10 }]}>

                        <Canvas style={styles.canvas} ref={canvasRef} shadows >


                            <MyCamera />
                            <ambientLight intensity={1} />
                            <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
                            <group position={[0, -1, 0]}>
                                <Myvase slices={slices} />
                            </group>
                            <Shadows />
                            <Ground />

                            {/* <OrbitControls /> */}
                            <Environment preset="warehouse" background backgroundBlurriness={0.5} />
                        </Canvas>



                    </View>



                    <View>




                        <View style={[styles.checkoutrowcontainer, styles.checkoutContainer]}>
                            <View style={[styles.checkoutContainer, { alignItems: 'Left', flexGrow: '10', borderWidth: 0 }]}>
                                <Text style={[styles.checkoutTitle, { marginBottom: 3 }]}>
                                    {`Custom Vase ${orderstatus === 0 ? "" : `Order #${orderstatus}`}`}
                                </Text>
                                <Text style={styles.checkoutSubtitle}>Finish : {textureName}</Text>

                                <View style={{}}>
                                    <Text style={[styles.checkoutSubtitle]}>Price : {slices.length} layers * {baseprice * radio} JOD </Text>
                                    <Text style={[styles.checkoutSubtitle]}>Shipping : 5 JOD</Text>
                                    <Text style={[styles.checkoutSubtitle]}>Shipping ETA : 2 - 6 Days</Text>
                                </View>
                            </View >
                            <View style={[styles.checkoutContainer, styles.checkoutsizecontainer, { borderWidth: 0, flexGrow: '1' }]}>
                                <Pressable onPress={() => {
                                    if (quantity > 1) {
                                        if (orderstatus == 0)
                                            setquantity(quantity - 1);
                                    }
                                }}>
                                    <Text style={[styles.checkoutTitle, styles.checkoutsizeitem]}>-</Text>
                                </Pressable>
                                <Text style={[styles.checkoutTitle]}>{quantity}</Text>
                                <Pressable onPress={() => {
                                    if (quantity <= 5) {
                                        if (orderstatus == 0)
                                            setquantity(quantity + 1);
                                    }
                                }}>
                                    <Text style={[styles.checkoutTitle, styles.checkoutsizeitem]}>+</Text>
                                </Pressable>
                            </View >
                        </View>
                        <View style={[styles.checkoutContainer, styles.checkoutsizecontainer]}>
                            <Pressable onPress={() => {
                                if (orderstatus == 0)
                                    setradio(1);
                            }}>
                                <Text style={[radio == 1 ? [styles.checkoutSubtitleSelected] : [styles.checkoutSubtitle], { padding: 10 }]}>5cm</Text>
                            </Pressable>


                            <Pressable onPress={() => {
                                if (orderstatus == 0)
                                    setradio(2);
                            }}>
                                <Text style={[radio == 2 ? [styles.checkoutSubtitleSelected] : [styles.checkoutSubtitle], { padding: 10 }]}>10cm</Text>
                            </Pressable>


                            <Pressable onPress={() => {
                                if (orderstatus == 0)
                                    setradio(3);
                            }}>
                                <Text style={[radio == 3 ? [styles.checkoutSubtitleSelected] : [styles.checkoutSubtitle], { padding: 10 }]}>15cm</Text>
                            </Pressable>
                        </View >


                        <View style={[styles.checkoutContainer, { alignItems: 'center' }]}>
                            <Text style={[styles.checkoutTitle]}>Price : {price} JOD</Text>
                        </View >
                        <View style={[styles.checkoutContainer, { borderWidth: 1 }]}>

                            {orderstatus == 0 ? (
                                <Pressable style={styles.btn} onPress={() => {
                                    createorder();
                                }}>
                                    <Text style={[styles.buttonText, styles.checkoutsizeitem]}>Confirm Order</Text>
                                </Pressable>
                            ) : (

                                <Text style={[styles.formText]}>Thank You For your Order # {orderstatus}</Text>

                            )}


                            {/* //TODO:: SAVE BUTTON FOR LATER  
                            <View style={[styles.checkoutrowcontainer, styles.checkoutContainer]}>
                                <View style={[styles.checkoutContainer, { alignItems: 'center', flexGrow: '1', borderWidth: 0 }]}>
                                </View >
                                <View style={[styles.checkoutContainer, { alignItems: 'Left', flexGrow: '10', borderWidth: 0 }]}>
                                    <TextInput placeholder="Save Your Object" style={[styles.input, { borderWidth: 1 }]} />
                                </View >
                                <View style={[styles.checkoutContainer, styles.checkoutsizecontainer, { borderWidth: 0, flexGrow: '1' }]}>
                                    <Pressable onPress={() => {
                                        if (quantity > 1) {
                                            setquantity(quantity - 1);
                                        }
                                    }}>
                                        <Text style={[styles.checkoutTitle, styles.checkoutsizeitem]}>Save</Text>
                                    </Pressable>

                                </View >
                            </View> */}
                        </View >

                    </View>



                </View >
            </View >
            <Footer />




        </>
    );
}


function MyCamera() {



    return (<>
        <PerspectiveCamera

            fov={50}
            position={[0, 1, 2.5]} // Set the camera's position
            rotation={[-0.4, 0, 0]} // Set the camera's rotation
            near={0.1} // Set the near clipping plane
            far={1000} // Set the far clipping plane
            makeDefault
        />

    </>);
}





function Ground() {
    return (
        <>
            {/* Ground Plane */}
            <mesh position={[0, -1.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
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






