import Slice from "./slice";
import * as THREE from "three";
import { DoubleSide } from 'three'
import { useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useTexture, Sphere, Cylinder, MeshTransmissionMaterial } from "@react-three/drei";
import { PLYExporter } from 'three/examples/jsm/exporters/PLYExporter';
import React, { useRef, useEffect, createRef } from 'react';
import { BufferGeometry, BufferAttribute, MeshPhysicalMaterial, MeshBasicMaterial, Mesh } from 'three';
import { Helper } from '@react-three/drei'; // Correct import from the library
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper'; // Import the helper itself


export default function EVase() {

    const [position, setPosition] = useState([x, y, z]);
    const [vertices, setVertices] = useState([]);

    const [slices, setSlices] = useState([]);
    const [UVs, setUVs] = useState([]);
    const meshRef = useRef();
    const [currentTexture, setCurrentTexture] = useState(null);


    function addSlice(position, radius, height) {

        let start = 0;
        if (this.slices.length > 0)
            start = this.slices[this.slices.length - 1].getVertices()[1];


        // add height on top of previous slice
        position[1] += height + start;
        let slice = new Slice(position, this.width, radius, false);


        this.slices.push(slice); // Push to the array
        // Update vertices whenever a slice is added
        this.calculateVerticesFromSlices(); // If you want vertices updated automatically
        this.calculateIndicies()
    }





}