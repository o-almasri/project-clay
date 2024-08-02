import Slice from "./slice";
import * as THREE from "three";
import { DoubleSide } from 'three'
import { useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useTexture, Sphere, Cylinder } from "@react-three/drei";
import { PLYExporter } from 'three/examples/jsm/exporters/PLYExporter';
import React, { useRef, useEffect, createRef } from 'react';
import { BufferGeometry, BufferAttribute, MeshBasicMaterial, Mesh } from 'three';
import { Helper } from '@react-three/drei'; // Correct import from the library
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper'; // Import the helper itself
import { normalMap } from "three/examples/jsm/nodes/Nodes.js";





class Vase {

    constructor([x = 0, y = 0, z = 0], width = 10, slices = []) {
        this.position = [x, y, z];
        this.slices = slices;
        this.vertices = [];
        this.width = width;
        this.UVs = []
        this.meshRef = createRef();

        this.state = {
            currentTexture: null
        };
    }


    componentDidMount() {
        // Set the initial texture after the component mounts
        this.setState({ currentTexture: this.texture });
    }

    updateTexture(newTexture) {
        this.setState({ currentTexture: newTexture });
    }


    render() {

        // useFrame hook still works in class components
        useFrame(({ clock }) => {
            this.meshRef.current.rotation.z = 0.1;

            if (this.meshRef.current) { // Always check for existence
                this.meshRef.current.rotation.y -= 0.001;

                this.meshRef.current.position.x = -1;
                this.meshRef.current.position.y = this.oscillate(-0.4, -0.3, 1, clock.getElapsedTime()); // Sine

            }
        })
    }
    oscillate(min, max, frequency, time) {
        const mid = (min + max) / 2;
        const amplitude = (max - min) / 2;
        return mid + amplitude * Math.sin(frequency * time);
    }

    //TODO::add a function to adjust slice radius and position and recalculate vertices

    addSlice(position, radius, height) {

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


    MOve(position) {
        if (this.meshRef.current) { // Always check for existence
            this.meshRef.current.position.x += position[0];
            this.meshRef.current.position.y += position[1];
            this.meshRef.current.position.z += position[2];
        }
    }



    removeSlice() {
        if (this.slices.length > 0) {
            this.slices.pop();
            this.calculateVerticesFromSlices(); // Update vertices after removing a slice
        }
    }


    calculateVerticesFromSlices() {
        this.vertices = []; // Reset vertices before recalculating

        for (const slice of this.slices) {

            this.vertices.push(...slice.getVertices()); // Use getVertices method
        }

        return new Float32Array(this.vertices);
    }

    //triangle faces
    calculateIndicies() {
        /*
        Upward-Facing Triangle: indices.push(px1, px2, pl1);
        Downward-Facing Triangle: indices.push(px2, px1, pl0); flips normal
        both have Counter-clockwise winding but with different starting point to ensure proper consistent normals
        */
        let width = this.width;
        const loop = this.vertices.length / 3 / width;
        var indices = [];

        for (let layer = 0; layer < loop; layer++) {
            // console.log(`layer ${ layer } : `)
            for (let x = 0; x < width; x++) {
                // console.log(`Point NO = ${ (x % width) + width * layer } `)
                if (layer + 1 < loop) {
                    // point above exist you can make a connection
                    var px1 = (x % width) + width * layer;
                    var px2 = ((x + 1) % width) + width * layer;
                    var pl1 = (x % width) + width * (layer + 1)
                    indices.push(pl1);
                    indices.push(px2);
                    indices.push(px1);
                }
                if (layer - 1 >= 0) {
                    //point below has to exist you can make a connection
                    var px1 = (x % width) + width * layer;
                    var px2 = ((x + 1) % width) + width * layer;
                    var pl0 = ((x + 1) % width) + width * (layer - 1)
                    indices.push(pl0);
                    indices.push(px1);
                    indices.push(px2);


                }
            }
        }

        return new Uint32Array(indices);
    }



    // normals for lighting and other 
    calculateNormals(vertices, indices) {
        const normals = new Float32Array(vertices.length); // Same size as vertices

        for (let i = 0; i < indices.length; i += 3) {
            const ia = indices[i];
            const ib = indices[i + 1];
            const ic = indices[i + 2];

            const vA = new THREE.Vector3(vertices[ia * 3], vertices[ia * 3 + 1], vertices[ia * 3 + 2]);
            const vB = new THREE.Vector3(vertices[ib * 3], vertices[ib * 3 + 1], vertices[ib * 3 + 2]);
            const vC = new THREE.Vector3(vertices[ic * 3], vertices[ic * 3 + 1], vertices[ic * 3 + 2]);

            const cb = new THREE.Vector3().subVectors(vC, vB);
            const ab = new THREE.Vector3().subVectors(vA, vB);
            const normal = new THREE.Vector3().crossVectors(cb, ab).normalize(); // Calculate face normal

            normals[ia * 3] += normal.x;
            normals[ia * 3 + 1] += normal.y;
            normals[ia * 3 + 2] += normal.z;

            normals[ib * 3] += normal.x;
            normals[ib * 3 + 1] += normal.y;
            normals[ib * 3 + 2] += normal.z;

            normals[ic * 3] += normal.x;
            normals[ic * 3 + 1] += normal.y;
            normals[ic * 3 + 2] += normal.z;
        }

        for (let i = 0; i < normals.length; i += 3) {
            const n = new THREE.Vector3(normals[i], normals[i + 1], normals[i + 2]).normalize();
            normals[i] = n.x;
            normals[i + 1] = n.y;
            normals[i + 2] = n.z;
        }
        return normals;
    }
    //TODO::add calculate UV


    calculateUVs() {
        // do some error handling 
        if (!isFinite(this.width) || !isFinite(this.vertices.length) || this.width <= 0 || this.vertices.length <= 0) {
            console.error(`Invalid width or vertices data: width=${this.width}, vertices.length=${this.vertices.length}`);
        }
        this.UVs = [];
        const verticesPerLayer = this.vertices.length / 3; // Total vertices per layer
        const numLayers = verticesPerLayer / this.width;

        for (let y = 0; y < numLayers; y++) {
            for (let x = 0; x < this.width; x++) {
                const u = x / (this.width - 1);   // Normalize U to [0, 1]
                const v = 1 - (y / (numLayers - 1)); // Normalize V to [0, 1]

                this.UVs.push(u);
                this.UVs.push(1 - v);
            }
        }

        return new Float32Array(this.UVs); // Return the calculated UVs
    } // CalculateUVs

    calculateUVs2() {
        // do some error handling 
        if (!isFinite(this.width) || !isFinite(this.vertices.length) || this.width <= 0 || this.vertices.length <= 0) {
            console.error(`Invalid width or vertices data: width=${this.width}, vertices.length=${this.vertices.length}`);
        }
        this.UVs = [];
        const verticesPerLayer = this.vertices.length / 3; // Total vertices per layer
        const numLayers = verticesPerLayer / this.width;

        for (let y = 0; y < numLayers; y++) {
            for (let x = 0; x < this.width; x++) {
                const u = (x + 1) % 2; // Normalize U to[0, 1]
                // const u = 0.1 + x * 0.8 / (this.width - 1);

                let v = (y / (numLayers - 1)); // Normalize V to [0, 1]
                this.UVs.push(u);
                this.UVs.push(v);
            }

        }

        return new Float32Array(this.UVs); // Return the calculated UVs
    } // CalculateUVs


    calculateUVs3() {
        // do some error handling 
        if (!isFinite(this.width) || !isFinite(this.vertices.length) || this.width <= 0 || this.vertices.length <= 0) {
            console.error(`Invalid width or vertices data: width=${this.width}, vertices.length=${this.vertices.length}`);
        }
        this.UVs = [];
        const verticesPerLayer = this.vertices.length / 3; // Total vertices per layer
        const numLayers = verticesPerLayer / this.width;

        //  console.log(`postion.x = ${this.position[0]}`)
        for (let i = 0; i < this.vertices.length; i += 3) {
            const x = this.vertices[i];
            const y = this.vertices[i + 1];

            const u = (x + 1) / 2;
            let v = (y / (numLayers - 1)); // Normalize V to [0, 1]

            this.UVs.push(u);
            this.UVs.push(v);

            //  console.log(`uvs :${u} ${v}`);
        }

        return new Float32Array(this.UVs); // Return the calculated UVs
    } // CalculateUVs


    calculateUVs4() {
        // do some error handling 
        if (!isFinite(this.width) || !isFinite(this.vertices.length) || this.width <= 0 || this.vertices.length <= 0) {
            console.error(`Invalid width or vertices data: width=${this.width}, vertices.length=${this.vertices.length}`);
        }
        this.UVs = [];
        const verticesPerLayer = this.vertices.length / 3; // Total vertices per layer
        const numLayers = verticesPerLayer / this.width;



        for (let y = 0; y < numLayers; y++) {
            // console.log(`width :${this.width}`);
            for (let x = 0; x < this.width; x++) {
                let u = x % 2;
                let v = (y / (numLayers - 1)); // Normalize V to [0, 1]
                this.UVs.push(u);
                this.UVs.push(v);
                // console.log(`uvs :${u} ${v}`);
            }

        }



        // radian_delta = 2*PI / num_slices;
        // height_delta = height / num_segments;

        // u_coord = (slice_index * radian_delta) / (2*PI);
        // v_coord = (segment_index * height_delta) / height;

        return new Float32Array(this.UVs); // Return the calculated UVs
    } // CalculateUVs


    calculateUVs5() {
        // do some error handling 
        if (!isFinite(this.width) || !isFinite(this.vertices.length) || this.width <= 0 || this.vertices.length <= 0) {
            console.error(`Invalid width or vertices data: width=${this.width}, vertices.length=${this.vertices.length}`);
        }
        this.UVs = [];
        const verticesPerLayer = this.vertices.length / 3; // Total vertices per layer
        const numLayers = verticesPerLayer / this.width;

        for (let y = 0; y < numLayers; y++) {
            for (let x = 0; x < this.width; x++) {
                let u = (x + 1) % 2; // Normalize U to[0, 1]
                // const u = 0.1 + x * 0.8 / (this.width - 1);
                u = 1 / this.width * x;
                let v = (y / (numLayers - 1)); // Normalize V to [0, 1]
                this.UVs.push(u);
                this.UVs.push(v);
            }

        }

        return new Float32Array(this.UVs); // Return the calculated UVs
    } // CalculateUVs

    calculateUVs6() {
        // do some error handling 
        if (!isFinite(this.width) || !isFinite(this.vertices.length) || this.width <= 0 || this.vertices.length <= 0) {
            console.error(`Invalid width or vertices data: width=${this.width}, vertices.length=${this.vertices.length}`);
        }
        this.UVs = [];
        const verticesPerLayer = this.vertices.length / 3; // Total vertices per layer
        const numLayers = verticesPerLayer / this.width;

        for (let y = 0; y < numLayers; y++) {
            for (let x = this.width - 1; x >= 0; x--) { // Start from the rightmost vertex


                const u = this.getReflectionValue(x, this.width);
                let v = (y / (numLayers - 1));
                this.UVs.push(u);
                this.UVs.push(v);
            }

        }

        return new Float32Array(this.UVs); // Return the calculated UVs
    } // CalculateUVs


    getReflectionValue(x, width) {
        const midpoint = width / 2;
        const distanceFromMidpoint = Math.abs(x - midpoint);
        const output = (midpoint - distanceFromMidpoint) / midpoint;

        return output;
    }


    //get obj where it returns R3F mesh

    getMesh() {

        let vertices = this.calculateVerticesFromSlices();


        let geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3)); // 3 components per vertex (x, y, z)


        //console.log(`Vertix ${ vertices }`)

        // Index BufferAttribute
        let indices = this.calculateIndicies(vertices, this.width);
        geometry.setIndex(new THREE.BufferAttribute(indices, 1)); // 1 index per value

        // console.log(`indecies ${ indices }`)
        //create colors
        let indexcolors = new Float32Array(vertices.length); // Match number of vertices
        indexcolors.fill(0.5); // Fill with white (1, 1, 1) for each vertex


        //calculate normals
        let objectnormals = this.calculateNormals(vertices, indices);

        this.calculateUVs();
        geometry.setAttribute('uv', this.UVs);


        //const colorMap = useLoader(TextureLoader, './Textures/Clay002_1K-JPG_Color.jpg')
        const objtexture = useTexture(
            {
                map: 'Textures/Clay002_1K-JPG_Color.jpg',
                // map: 'Textures/check.jpg',
                //displacement map cause alot of weird issues 
                displacementMap: 'Textures/Clay002_1K-JPG_Displacement.jpg',
                normalMap: 'Textures/Clay002_1K-JPG_NormalGL.jpg',
                aoMap: 'Textures/Clay002_1K-JPG_AmbientOcclusion.jpg',
                roughnessMap: 'Textures/Clay002_1K-JPG_Roughness.jpg',
            });
        //calculate UVs

        //this.UVs = this.calculateUVs2(vertices, this.width);

        // exportMeshData(vertices, indices, objectnormals, this.UVs)
        //  console.log(`UVS ${this.UVs}`)



        async function exportMeshData(verticess, indicess, objectnormalss, UVss) {
            let vertices = verticess;
            let indices = indicess;
            let objectnormals = objectnormalss;
            let UVs = UVss;
            let plyData = `ply
          format ascii 1.0
          element vertex ${vertices.length / 3}
          property float x
          property float y
          property float z
          property float nx
          property float ny
          property float nz
          property float s
          property float t
          element face ${indices.length / 3}
          property list uchar int vertex_indices
          end_header
          `;
            for (let i = 0; i < vertices.length; i += 3) {
                plyData += `${vertices[i]} ${vertices[i + 1]} ${vertices[i + 2]} `; // Vertex coordinates
                plyData += `${objectnormals[i]} ${objectnormals[i + 1]} ${objectnormals[i + 2]} `; // Normals
                plyData += `${UVs[i / 3 * 2]} ${UVs[i / 3 * 2 + 1]}\n`; // UVs
            }
            for (let i = 0; i < indices.length; i += 3) {
                plyData += `3 ${indices[i]} ${indices[i + 1]} ${indices[i + 2]}\n`; // Triangle faces
            }
            const blob = new Blob([plyData], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'mesh_data.ply'; // Use .ply extension
            link.click();
            URL.revokeObjectURL(url);
        }


        /*geometry.setAttribute('uv', new BufferAttribute(wedgeUVs, 2));
          geometry.attributes.uv.needsUpdate = true; */
        return (
            <>
                <Cylinder position={[2, 0, 0]}  >
                    <meshStandardMaterial {...objtexture}
                    />
                </Cylinder >
                {/* <Sphere position={[0, 0, 0]} args={[1, 10, 10]} >
                    <meshStandardMaterial {...objtexture}
                    />
                </Sphere> */}
                < mesh ref={this.meshRef}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach='attributes-position'
                            array={vertices}
                            count={vertices.length / 3}
                            itemSize={3}
                        />
                        {/* Attach the UV buffer attribute */}
                        <bufferAttribute
                            attachObject={['attributes', 'uv']} // Attach to the 'uv' attribute
                            array={this.UVs}
                            count={this.UVs.length / 2} // Two values per UV pair
                            itemSize={2} // 2 components (u, v) per item
                        />

                        <bufferAttribute
                            attach="index"
                            array={indices}
                            count={indices.length}
                            itemSize={1}
                        />
                        <bufferAttribute
                            attach='attributes-normal'
                            array={objectnormals}
                            count={objectnormals.length / 3}
                            itemSize={3}
                        />



                    </bufferGeometry>
                    <meshStandardMaterial
                        attach="material"
                        map={objtexture.map}
                        normalMap={objtexture.normalMap}
                        roughnessMap={objtexture.roughnessMap}
                        aoMap={objtexture.aoMap}
                        color={0xffffff}
                        roughness={0.5}
                        metalness={0.5}
                        side={DoubleSide}
                        wireframe={true}          // Enable wireframe mode
                        wireframeLinewidth={2}
                    />


                </mesh >
            </>
        );
    }

    getMesh2() {
        const vertices = this.calculateVerticesFromSlices();
        const indices = this.calculateIndicies();
        const objectnormals = this.calculateNormals(vertices, indices);

        this.calculateUVs6();

        const geometry = new BufferGeometry();
        const verticesArray = new Float32Array(vertices);
        geometry.setAttribute('position', new BufferAttribute(verticesArray, 3));

        const indicesArray = new Uint16Array(indices);
        geometry.setIndex(new BufferAttribute(indicesArray, 1));

        const uvsArray = new Float32Array(this.UVs);
        geometry.setAttribute('uv', new BufferAttribute(uvsArray, 2));

        const objectnormalsArray = new Float32Array(objectnormals);;
        geometry.setAttribute('normal', new BufferAttribute(objectnormalsArray, 3));


        //console.log(`vertices ${verticesArray.length} indices ${indicesArray.length} uvs ${uvsArray} uvs ${objectnormalsArray.length}`);

        // Texture
        const objtexture = useTexture(
            {
                map: 'Textures/Clay002_1K-JPG_Color.jpg',
                //map: 'Textures/512x512 Texel Density Texture 1.png',
                //map: 'Textures/Marble/marble_0008_color_1k.jpg',
                //map: 'Textures/4096x4096 Texel Density Texture 5.png',
                //map: 'Textures/check.jpg',
                //map: 'Textures/Marble/marble_0008_color_1k.jpg',
                //displacement map cause alot of weird issues 
                //displacementMap: 'Textures/Clay002_1K-JPG_Displacement.jpg',
                //normalMap: 'Textures/Clay002_1K-JPG_NormalGL.jpg',
                //normalMap: 'Textures/Marble/marble_0008_normal_opengl_1k.png',
                //normalMap: 'Textures/concrete_0025_normal_opengl_4k.png',
                // normalMap: 'Textures/Clay_001_normal.jpg',
                aoMap: 'Textures/Clay002_1K-JPG_AmbientOcclusion.jpg',
                roughnessMap: 'Textures/Clay002_1K-JPG_Roughness.jpg',
            });


        // objtexture.map.magFilter = THREE.LinearFilter;
        // objtexture.map.minFilter = THREE.LinearMipmapLinearFilter;

        return (
            <mesh ref={this.meshRef} geometry={geometry} castShadow >
                <meshStandardMaterial
                    attach="material"
                    map={objtexture.map}
                    normalMap={objtexture.normalMap}
                    roughnessMap={objtexture.roughnessMap}
                    aoMap={objtexture.aoMap}
                    color={0xffffff}
                    roughness={0.2}//0.5
                    metalness={0.2}//0.5
                    side={DoubleSide}
                // wireframe={true}          // Enable wireframe mode
                // wireframeLinewidth={4}

                />
                {/*   <Helper type={VertexNormalsHelper} args={[1, 0xff0000]} /> */}


            </mesh>

        );
    }

    getRekt() {
        const vertices = [0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0];
        const indices = [0, 1, 2, 0, 2, 3];
        const uvs = [0, 0, 1, 0, 1, 1, 0, 1]; // Basic UVs for a square
        const objtexture = useTexture(
            {
                // map: 'Textures/Clay002_1K-JPG_Color.jpg',
                map: 'Textures/check.jpg',
                //displacement map cause alot of weird issues 
                // displacementMap: 'Textures/Clay002_1K-JPG_Displacement.jpg',
                //   normalMap: 'Textures/Clay002_1K-JPG_NormalGL.jpg',
                //   aoMap: 'Textures/Clay002_1K-JPG_AmbientOcclusion.jpg',
                // roughnessMap: 'Textures/Clay002_1K-JPG_Roughness.jpg',
            });
        const geometry = new BufferGeometry();

        // Set vertices
        const verticesArray = new Float32Array(vertices);
        geometry.setAttribute('position', new BufferAttribute(verticesArray, 3));

        // Set indices
        const indicesArray = new Uint16Array(indices);
        geometry.setIndex(new BufferAttribute(indicesArray, 1));

        // Set UVs
        const uvsArray = new Float32Array(uvs);
        geometry.setAttribute('uv', new BufferAttribute(uvsArray, 2));

        // Texture
        const texture = useTexture('Textures/check.jpg');

        return (
            <mesh geometry={geometry}>
                <meshBasicMaterial map={texture}

                />
            </mesh>
        );
    }
}//class slice

export default Vase;