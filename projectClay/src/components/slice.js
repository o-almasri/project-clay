class Slice {

    /*
    position vector 3 : position for the slice
    width : how many vertices per slice
    Raduis : how far each vertix form the slice center
    Closed : boolean for logic of closed or not 
    vertices : flaot32 array
    
 
    
    */




    calculateVertices(position, radius, numPoints) {


        for (let i = 0; i < numPoints; i++) {
            const angleDegrees = i * (360 / numPoints);
            // Remove THREE.MathUtils: Convert degrees to radians manually
            const angleRadians = angleDegrees * (Math.PI / 180);

            const x = position[0] + radius * Math.cos(angleRadians);
            const y = position[1];
            const z = position[2] + radius * Math.sin(angleRadians);

            this.vertices.push(x, y, z);

        }


    }




    constructor(position = { x: 0, y: 0, z: 0 }, width = 8, radius = 1, closed = false,) {
        this.position = position;
        this.width = width;
        this.radius = radius;
        this.closed = closed;
        this.vertices = [];
        this.calculateVertices(this.position, this.radius, this.width);

    }

    moveVertices(amount = { x: 0, y: 0, z: 0 }) {
        if (!amount || typeof amount !== 'object') {
            throw new Error('Invalid amount argument. Expected an object with x, y, z properties.');
        }

        if (this.vertices && this.vertices.length > 0) {
            for (let i = 0; i < this.vertices.length; i += 3) {
                this.vertices[i] += amount.x;
                this.vertices[i + 1] += amount.y;
                this.vertices[i + 2] -= amount.z;  // Inverted if camera points towards -z
            }
        }
    }

    getVertices() {

        return this.vertices;
    }




}//class slice

export default Slice;