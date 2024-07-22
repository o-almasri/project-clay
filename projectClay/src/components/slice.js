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






    constructor(position = [0, 0, 0], width = 8, radius = 1, closed = false,) {
        this.position = position;
        this.width = width;
        this.radius = radius;
        this.closed = closed;
        this.vertices = [];
        // console.log(`position ` + position)
        // console.log(`this position ` + this.position)
        this.calculateVertices(this.position, this.radius, this.width);

    }

    moveVertices(amount = [0, 0, 0]) {

        if (this.vertices && this.vertices.length > 0) {
            for (let i = 0; i < this.vertices.length; i += 3) {
                this.vertices[i] += amount[0];
                this.vertices[i + 1] += amount[1];
                this.vertices[i + 2] -= amount[2];  // Inverted if camera points towards -z
            }
        }
    }

    getVertices() {

        return this.vertices;
    }




}//class slice

export default Slice;