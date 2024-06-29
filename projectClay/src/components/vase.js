import Slice from "./slice";
import * as THREE from "three";
import { DoubleSide } from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useTexture, Sphere, Cylinder } from "@react-three/drei";

class Vase {


    constructor(position = { x: 0, y: 0, z: 0 }, width = 10, slices = []) {
        this.position = position;
        this.slices = slices;
        this.vertices = []; // Initialize vertices array here
        this.width = width;
        this.UVs = []
    }

    //TODO::add a function to adjust slice radius and position and recalculate vertices

    addSlice(position, radius, height) {

        let start = 0;
        if (this.slices.length > 0)
            start = this.slices[this.slices.length - 1].getVertices()[1];


        position[1] += height + start;
        let slice = new Slice(position, this.width, radius, false);


        this.slices.push(slice); // Push to the array
        // Update vertices whenever a slice is added
        this.calculateVerticesFromSlices(); // If you want vertices updated automatically
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
    calculateIndicies(vertices, width) {
        /*
        Upward-Facing Triangle: indices.push(px1, px2, pl1);
        Downward-Facing Triangle: indices.push(px2, px1, pl0); flips normal
        both have Counter-clockwise winding but with different starting point to ensure proper consistent normals
        */


        const loop = vertices.length / 3 / width;

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
                    indices.push(px1);
                    indices.push(px2);
                    indices.push(pl1);
                }
                if (layer - 1 >= 0) {
                    //point below has to exist you can make a connection
                    var px1 = (x % width) + width * layer;
                    var px2 = ((x + 1) % width) + width * layer;
                    var pl0 = ((x + 1) % width) + width * (layer - 1)
                    indices.push(px2);
                    indices.push(px1);
                    indices.push(pl0);


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
                const v = y / (numLayers - 1); // Normalize V to [0, 1]

                this.UVs.push(u);
                this.UVs.push(v);
            }
        }

        return new Float32Array(this.UVs); // Return the calculated UVs
    } // CalculateUVs
    calculateUVs2(vertices, width) {
        const height = vertices.length / 3 / width;
        const uvs = [];

        for (let layer = 0; layer < height; layer++) {
            for (let x = 0; x < width; x++) {
                const u = x / (width - 1);
                const v = layer / (height - 1);
                uvs.push(u, v);
            }
        }

        return new Float32Array(uvs);
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

        //const colorMap = useLoader(TextureLoader, './Textures/Clay002_1K-JPG_Color.jpg')
        const objtexture = useTexture(
            {
                map: 'Textures/Clay002_1K-JPG_Color.jpg',
                //displacement map cause alot of weird issues 
                displacementMap: 'Textures/Clay002_1K-JPG_Displacement.jpg',
                normalMap: 'Textures/Clay002_1K-JPG_NormalGL.jpg',
                aoMap: 'Textures/Clay002_1K-JPG_AmbientOcclusion.jpg',
                roughnessMap: 'Textures/Clay002_1K-JPG_Roughness.jpg',
            });
        //calculate UVs
        this.calculateUVs();
        //this.UVs = this.calculateUVs2(vertices, this.width);

        exportMeshData(vertices, indices, objectnormals, this.UVs)

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



        return (
            <>
                <Cylinder position={[0, 0, 0]}  >
                    <meshStandardMaterial {...objtexture}
                    />
                </Cylinder >
                {/* <Sphere position={[0, 0, 0]} args={[1, 10, 10]} >
                    <meshStandardMaterial {...objtexture}
                    />
                </Sphere> */}
                < mesh >
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
                    // side={DoubleSide}

                    />


                </mesh >
            </>
        );
    }




}//class slice

export default Vase;