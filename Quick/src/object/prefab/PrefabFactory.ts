namespace QuickEngine {

    /*
       1-------2
      /|      /|
     / |     / |
    5-------4  |
    |  0----|--3
    | /     | /
    |/      |/
    6-------7
    */
    const CUBE_SIZE = 1.0;
    const CUBE_HALF_SIZE = CUBE_SIZE / 2.0;
    const CubeMeshData = {
        vertices: [
            // front side
            -CUBE_HALF_SIZE, -CUBE_HALF_SIZE, CUBE_HALF_SIZE,   // pos
            CUBE_HALF_SIZE, -CUBE_HALF_SIZE, CUBE_HALF_SIZE,
            CUBE_HALF_SIZE, CUBE_HALF_SIZE, CUBE_HALF_SIZE,
            -CUBE_HALF_SIZE, CUBE_HALF_SIZE, CUBE_HALF_SIZE,

            // back side
            CUBE_HALF_SIZE, -CUBE_HALF_SIZE, -CUBE_HALF_SIZE,
            -CUBE_HALF_SIZE, -CUBE_HALF_SIZE, -CUBE_HALF_SIZE,
            -CUBE_HALF_SIZE, CUBE_HALF_SIZE, -CUBE_HALF_SIZE,
            CUBE_HALF_SIZE, CUBE_HALF_SIZE, -CUBE_HALF_SIZE,

            // left side
            -CUBE_HALF_SIZE, -CUBE_HALF_SIZE, -CUBE_HALF_SIZE,
            -CUBE_HALF_SIZE, -CUBE_HALF_SIZE, CUBE_HALF_SIZE,
            -CUBE_HALF_SIZE, CUBE_HALF_SIZE, CUBE_HALF_SIZE,
            -CUBE_HALF_SIZE, CUBE_HALF_SIZE, -CUBE_HALF_SIZE,

            // right side
            CUBE_HALF_SIZE, -CUBE_HALF_SIZE, CUBE_HALF_SIZE,
            CUBE_HALF_SIZE, -CUBE_HALF_SIZE, -CUBE_HALF_SIZE,
            CUBE_HALF_SIZE, CUBE_HALF_SIZE, -CUBE_HALF_SIZE,
            CUBE_HALF_SIZE, CUBE_HALF_SIZE, CUBE_HALF_SIZE,

            // up side
            -CUBE_HALF_SIZE, CUBE_HALF_SIZE, CUBE_HALF_SIZE,
            CUBE_HALF_SIZE, CUBE_HALF_SIZE, CUBE_HALF_SIZE,
            CUBE_HALF_SIZE, CUBE_HALF_SIZE, -CUBE_HALF_SIZE,
            -CUBE_HALF_SIZE, CUBE_HALF_SIZE, -CUBE_HALF_SIZE,

            // down side
            -CUBE_HALF_SIZE, -CUBE_HALF_SIZE, -CUBE_HALF_SIZE,
            CUBE_HALF_SIZE, -CUBE_HALF_SIZE, -CUBE_HALF_SIZE,
            CUBE_HALF_SIZE, -CUBE_HALF_SIZE, CUBE_HALF_SIZE,
            -CUBE_HALF_SIZE, -CUBE_HALF_SIZE, CUBE_HALF_SIZE,
        ],
        colors: [
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,

            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,

            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,

            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,

            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,

            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
            255, 255, 255, 255,
        ],
        indices: [
            // front
            0, 1, 2,
            0, 2, 3,

            // back
            4, 5, 6,
            4, 6, 7,

            // left
            8, 9, 10,
            8, 10, 11,

            // right
            12, 13, 14,
            12, 14, 15,

            // up
            16, 17, 18,
            16, 18, 19,

            // down
            20, 21, 22,
            20, 22, 23
        ],
        normals: [
            0, 0, 1, 
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,

            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,

            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,

            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,

            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,

            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0
        ],
        uvs: [
            0, 1,
            1, 1,
            1, 0,
            0, 0,

            0, 1,
            1, 1,
            1, 0,
            0, 0,

            0, 1,
            1, 1,
            1, 0,
            0, 0,

            0, 1,
            1, 1,
            1, 0,
            0, 0,

            0, 1,
            1, 1,
            1, 0,
            0, 0,

            0, 1,
            1, 1,
            1, 0,
            0, 0
        ]
    };

    export class PrefabFactory {

        public static createCube(mesh: Mesh): void {

            let subMesh = new SubMesh();
            
            mesh.addSubMesh(subMesh);

            let posBuf = WebGLBufferManager.instance.createVertexBuffer(3 * Float32Array.BYTES_PER_ELEMENT, 3, false, BufferUsage.STATIC);
            posBuf.type = gl.FLOAT;
            posBuf.semantic = VertexElementSemantic.POSITION;
            posBuf.vertexCount = CubeMeshData.vertices.length;
            posBuf.writeData((new Float32Array(CubeMeshData.vertices)).buffer);
            posBuf.bindBuffer();

            let colBuf = WebGLBufferManager.instance.createVertexBuffer(4 * Uint8Array.BYTES_PER_ELEMENT, 4, true, BufferUsage.STATIC);
            colBuf.type = gl.UNSIGNED_BYTE;
            colBuf.semantic = VertexElementSemantic.DIFFUSE;
            colBuf.vertexCount = CubeMeshData.colors.length;
            colBuf.writeData((new Uint8Array(CubeMeshData.colors)).buffer);
            colBuf.bindBuffer();

            let normalBuf = WebGLBufferManager.instance.createVertexBuffer(3 * Float32Array.BYTES_PER_ELEMENT, 3, false, BufferUsage.STATIC);
            normalBuf.type = gl.FLOAT;
            normalBuf.semantic = VertexElementSemantic.NORMAL;
            normalBuf.vertexCount = CubeMeshData.normals.length;
            normalBuf.writeData((new Float32Array(CubeMeshData.normals)).buffer);
            normalBuf.bindBuffer();

            let uvBuf = WebGLBufferManager.instance.createVertexBuffer(2 * Float32Array.BYTES_PER_ELEMENT, 2, false, BufferUsage.STATIC);
            uvBuf.type = gl.FLOAT;
            uvBuf.semantic = VertexElementSemantic.TEXTURE_COORDINATES;
            normalBuf.vertexCount = CubeMeshData.uvs.length;
            uvBuf.writeData((new Float32Array(CubeMeshData.uvs)).buffer);
            uvBuf.bindBuffer();

            let vertexData = [];
            vertexData[0] = posBuf;
            vertexData[1] = colBuf;
            vertexData[2] = normalBuf;
            vertexData[3] = uvBuf;
            subMesh.vertexData = vertexData;

            let indicesBuf = WebGLBufferManager.instance.createIndexBuffer(CubeMeshData.indices.length, BufferUsage.STATIC, false);
            indicesBuf.writeData(CubeMeshData.indices);
            indicesBuf.bindBuffer();

            subMesh.indexData = indicesBuf;             
        }

        public static createSphere(mesh: Mesh): void {

            const NUM_SEGMENTS = 24;
            const NUM_RINGS = 24;
            const SPHERE_RADIUS = 1;

            let subMesh = new SubMesh();
            mesh.addSubMesh(subMesh);

            let deltaRingAngle = (Math.PI / NUM_RINGS);
            let deltaSegAngle = (2 * Math.PI / NUM_SEGMENTS);
            let verticeIndex = 0;
            let vertices = [], normals = [], uvs = [], colors = [], indices = [];
            let vCount = 0;

            for (let ring = 0; ring <= NUM_RINGS; ring++) {

                let r0 = SPHERE_RADIUS * Math.sin(ring * deltaRingAngle);
                let y0 = SPHERE_RADIUS * Math.cos(ring * deltaRingAngle);

                // Generate the group of segments for the current ring
                for (let seg = 0; seg <= NUM_SEGMENTS; seg++) {

                    let x0 = r0 * Math.sin(seg * deltaSegAngle);
                    let z0 = r0 * Math.cos(seg * deltaSegAngle);

                    // Add one vertex to the strip which makes up the sphere
                    vertices[vCount * 3 + 0] = x0;
                    vertices[vCount * 3 + 1] = y0;
                    vertices[vCount * 3 + 2] = z0;

                    let vNormal = new Vector3(x0, y0, z0).normalize();
                    normals[vCount * 3 + 0] = vNormal.x;
                    normals[vCount * 3 + 1] = vNormal.y;
                    normals[vCount * 3 + 2] = vNormal.z;

                    colors[vCount * 4 + 0] = 255.0;
                    colors[vCount * 4 + 1] = 255.0;
                    colors[vCount * 4 + 2] = 255.0;
                    colors[vCount * 4 + 3] = 255.0;

                    uvs[vCount * 2 + 0] = seg / NUM_SEGMENTS;
                    uvs[vCount * 2 + 1] = ring / NUM_RINGS;

                    if (ring != NUM_RINGS) {
                        // each vertex (except the last) has six indicies pointing to it
                        indices[verticeIndex * 6 + 0] = verticeIndex + NUM_SEGMENTS + 1;
                        indices[verticeIndex * 6 + 1] = verticeIndex;               
                        indices[verticeIndex * 6 + 2] = verticeIndex + NUM_SEGMENTS;
                        indices[verticeIndex * 6 + 3] = verticeIndex + NUM_SEGMENTS + 1;
                        indices[verticeIndex * 6 + 4] = verticeIndex + 1;
                        indices[verticeIndex * 6 + 5] = verticeIndex;
                        verticeIndex++;
                    }

                    vCount++;
                }; // end for seg
            } // end for ring

            let posBuf = WebGLBufferManager.instance.createVertexBuffer(3 * Float32Array.BYTES_PER_ELEMENT, 3, false, BufferUsage.STATIC);
            posBuf.type = gl.FLOAT;
            posBuf.semantic = VertexElementSemantic.POSITION;
            posBuf.vertexCount = vertices.length;
            posBuf.writeData((new Float32Array(vertices)).buffer);
            posBuf.bindBuffer();

            let colorBuf = WebGLBufferManager.instance.createVertexBuffer(4 * Uint8Array.BYTES_PER_ELEMENT, 4, true, BufferUsage.STATIC);
            colorBuf.type = gl.UNSIGNED_BYTE;
            colorBuf.semantic = VertexElementSemantic.DIFFUSE;
            colorBuf.vertexCount = colors.length;
            colorBuf.writeData((new Uint8Array(colors)).buffer);
            colorBuf.bindBuffer();

            let normalBuf = WebGLBufferManager.instance.createVertexBuffer(3 * Float32Array.BYTES_PER_ELEMENT, 3, false, BufferUsage.STATIC);
            normalBuf.type = gl.FLOAT;
            normalBuf.semantic = VertexElementSemantic.NORMAL;
            normalBuf.vertexCount = normals.length;
            normalBuf.writeData((new Float32Array(normals)).buffer);
            normalBuf.bindBuffer();

            let uvBuf = WebGLBufferManager.instance.createVertexBuffer(2 * Float32Array.BYTES_PER_ELEMENT, 2, false, BufferUsage.STATIC);
            uvBuf.type = gl.FLOAT;
            uvBuf.semantic = VertexElementSemantic.TEXTURE_COORDINATES;
            normalBuf.vertexCount = uvs.length;
            uvBuf.writeData((new Float32Array(uvs)).buffer);
            uvBuf.bindBuffer();

            let vertexData = [];
            vertexData[0] = posBuf;
            vertexData[1] = colorBuf;
            vertexData[2] = normalBuf;
            vertexData[3] = uvBuf;
            subMesh.vertexData = vertexData;

            let indicesBuf = WebGLBufferManager.instance.createIndexBuffer(indices.length, BufferUsage.STATIC, false);
            indicesBuf.writeData(indices);           
            indicesBuf.bindBuffer();

            subMesh.indexData = indicesBuf;  
        }
    }

}