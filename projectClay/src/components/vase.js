import Slice from "./slice";
import * as THREE from "three";
import { DoubleSide } from 'three'
class Vase {


    constructor(position = { x: 0, y: 0, z: 0 }, width = 10, slices = []) {
        this.position = position;
        this.slices = slices;
        this.vertices = []; // Initialize vertices array here
        this.width = width;
    }

    //TODO::add a function to adjust slice radius and position and recalculate vertices

    addSlice(position, radius, height) {

        position[1] += 0.25 * this.slices.length + height;
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
    //get obj where it returns R3F mesh

    getMesh() {

        let vertices = this.calculateVerticesFromSlices();


        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3)); // 3 components per vertex (x, y, z)


        //console.log(`Vertix ${vertices}`)

        // Index BufferAttribute
        const indices = this.calculateIndicies(vertices, this.width);
        geometry.setIndex(new THREE.BufferAttribute(indices, 1)); // 1 index per value


        // console.log(`indecies ${indices}`)
        //create colors
        const indexcolors = new Float32Array(vertices.length); // Match number of vertices
        indexcolors.fill(0.5); // Fill with white (1, 1, 1) for each vertex


        //calculate normals
        const objectnormals = this.calculateNormals(vertices, indices);


        return (
            <mesh>
                <bufferGeometry>
                    <bufferAttribute
                        attach='attributes-position'
                        array={vertices}
                        count={vertices.length / 3}
                        itemSize={3}

                    />
                    <bufferAttribute
                        attach='attributes-normal'
                        array={objectnormals}
                        count={objectnormals.length / 3}
                        itemSize={3}
                    />
                    <bufferAttribute // <-- Add this buffer attribute for color
                        attachObject={['attributes', 'color']} // Specify it's a color attribute
                        array={indexcolors}
                        itemSize={3} // 3 values per color (RGB)
                    />
                    <bufferAttribute
                        attach="index"
                        array={indices}
                        count={indices.length}
                        itemSize={1}
                    />
                </bufferGeometry>
                <meshStandardMaterial
                    indexcolors
                    side={DoubleSide}
                />

            </mesh>
        );
    }




}//class slice

export default Vase;