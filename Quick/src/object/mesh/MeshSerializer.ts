namespace QE {

    export interface SubMeshData {

    }

    export interface MeshData {

        id: number;
        parent: number;
        name: string;

        normal: number[];
        uv: number[];
        position: number[];

        subMeshes: SubMeshData[];

        skinInfo?: any;
    }

    export interface SkinData {

    }

    export interface SkinnedMeshData extends MeshData {
        skins: SkinData[];
    }

    export interface BoneData {
        name: string;
        id: number;
        parentId: number;
        position: Number3;
        eulerAngle: Number3;
        scale: Number3;
    }

    export interface SkeletonData {
        id: number;
        size: number;
        type: number;
    }

    export interface PoseItem {
        eNodeId: number;
        id: number;
        isLocalMatrix: boolean;
        matrix: number[];
    }

    export interface PoseData {
        isBindPose: boolean;
        isCharacter: boolean;
        items: PoseItem[];
    }

    export interface ModelData {
        metadata: string;
        materials?: string[];
        textures?: string[];
        skeleton?: SkeletonData[];
        poses?: PoseData[];
        hierarchy?: BoneData[];
        meshes: MeshData[];
        animations?: Object[];
    }

    export class MeshSerializer {

        public static exportMeshWithJson(mesh: Mesh, filename: string) {

        }

        public static exportMeshWithBinary(mesh: Mesh, filename: string) {

        }

        public static importMeshWithJson(meshData: MeshData, mesh: Mesh) {

            mesh.id = meshData.id;
            mesh.name = meshData.name;

            const vertices: number[] = [];
            const colors: number[] = [];
            const normals: number[] = [];
            const uvs: number[] = [];
            const indices: number[] = [];

            // load mesh info
            const position = meshData['position'] || [];
            for (let i = 0; i < position.length; i += 3) {
                vertices.push(position[i]);
                vertices.push(position[i + 1]);
                vertices.push(-position[i + 2]);
            }

            const color = meshData['color'] || [];
            for (let i = 0; i < Math.floor(position.length / 3); i++) {
                colors.push(255);
                colors.push(255);
                colors.push(255);
                colors.push(255);
            }

            const normal = meshData['normal'] || [];
            for (let i = 0; i < normal.length; i += 3) {
                const p = normal[i];
                normals.push(normal[i]);
                normals.push(normal[i + 1]);
                normals.push(normal[i + 2]);
            }

            const uv = meshData['uv'] || [];
            for (let i = 0; i < uv.length; i += 2) {
                uvs.push(uv[i]);
                uvs.push(uv[i + 1]);
            }

            const posBuf = QE.WebGLBufferManager.instance.createVertexBuffer(3 * Float32Array.BYTES_PER_ELEMENT, 3, false, QE.BufferUsage.STATIC);
            posBuf.type = QE.gl.FLOAT;
            posBuf.semantic = QE.VertexElementSemantic.POSITION;
            posBuf.vertexCount = vertices.length / 3;
            posBuf.writeData((new Float32Array(vertices)).buffer);
            posBuf.bindBuffer();

            const colBuf = QE.WebGLBufferManager.instance.createVertexBuffer(4 * Uint8Array.BYTES_PER_ELEMENT, 4, true, QE.BufferUsage.STATIC);
            colBuf.type = QE.gl.UNSIGNED_BYTE;
            colBuf.semantic = QE.VertexElementSemantic.DIFFUSE;
            colBuf.vertexCount = colors.length;
            colBuf.writeData((new Uint8Array(colors)).buffer);
            colBuf.bindBuffer();

            const normalBuf = QE.WebGLBufferManager.instance.createVertexBuffer(3 * Float32Array.BYTES_PER_ELEMENT, 3, false, QE.BufferUsage.STATIC);
            normalBuf.type = QE.gl.FLOAT;
            normalBuf.semantic = QE.VertexElementSemantic.NORMAL;
            normalBuf.vertexCount = normals.length;
            normalBuf.writeData((new Float32Array(normals)).buffer);
            normalBuf.bindBuffer();

            const uvBuf = QE.WebGLBufferManager.instance.createVertexBuffer(2 * Float32Array.BYTES_PER_ELEMENT, 2, false, QE.BufferUsage.STATIC);
            uvBuf.type = QE.gl.FLOAT;
            uvBuf.semantic = QE.VertexElementSemantic.TEXTURE_COORDINATES;
            uvBuf.vertexCount = uvs.length;
            uvBuf.writeData((new Float32Array(uvs)).buffer);
            uvBuf.bindBuffer();

            const sharedVertexData: WebGLVertexBuffer[] = [];
            sharedVertexData[0] = posBuf;
            sharedVertexData[1] = colBuf;
            sharedVertexData[2] = normalBuf;
            sharedVertexData[3] = uvBuf;

            mesh.sharedVertexData = sharedVertexData;

            const subMeshes = meshData['subMeshes'];

            for (let i = 0, len = subMeshes.length; i < len; i++) {
                const indicesData = meshData['subMeshes'][0]['indices'];
                for (let i = 0; i < indicesData.length; i++) {
                    indices.push(indicesData[i]);
                }

                const subMesh = new QE.SubMesh();
                // 共享mesh顶点数据
                subMesh.useSharedVertices = true;

                // TODO: 解析material
                const defmaterial = QE.Material.getDefaultCubeMaterial();

                // 子网格索引数据
                const indicesBuf = QE.WebGLBufferManager.instance.createIndexBuffer(indices.length, QE.BufferUsage.STATIC, false);
                indicesBuf.writeData(indices);
                indicesBuf.bindBuffer();

                subMesh.indexData = indicesBuf;

                mesh.addSubMesh(subMesh);
            }
        }

        public static importMeshWithBinary(data: ArrayBuffer, mesh: Mesh) {

        }

        public static loadModel(modelData: ModelData): GameObject {

            const currentScene = SceneManager.instance.currentScene;

            const rootNodes: GameObject[] = [];
            // export interface ModelData {
            //    metadata: string;
            //    materials?: string[];
            //    textures?: string[];
            //    skeleton?: SkeletonData[];
            //    poses?: PoseData[];
            //    hierarchy?: BoneData[];
            //    meshes: MeshData[];
            //    animations?: Object[];
            // }
            const hierarchyData = modelData.hierarchy;
            const hierarchy: { [key: number]: GameObject } = {};
            for (let i = 0, len = hierarchyData.length; i < len; i++) {

                const boneData = hierarchyData[i];

                console.assert(!!!hierarchy[boneData.id], '重复的骨骼id: ' + boneData.id);

                const parentBoneNode = hierarchy[boneData.parentId];

                let boneNode: GameObject;
                // 存在父节点
                if (parentBoneNode) {
                    boneNode = currentScene.createNode(parentBoneNode.transform);
                } else {
                    boneNode = currentScene.createNode();
                    // root node
                    rootNodes.push(boneNode);
                }

                boneNode.name = boneData.name;

                hierarchy[boneData.id] = boneNode;

                const boneTransform = boneNode.transform;

                boneTransform.localPosition = new QE.Vector3(boneData.position[0], boneData.position[1], boneData.position[2]);
                boneTransform.localScale = new QE.Vector3(boneData.scale[0], boneData.scale[1], boneData.scale[2]);
                const eulerAngle = new QE.Vector3(boneData.eulerAngle[0], boneData.eulerAngle[1], boneData.eulerAngle[2]);
                const tempQ = boneTransform.localRotation.fromEulerAngle(eulerAngle);
                boneTransform.localRotation = tempQ;
            }

            // bind pose
            const poseDatas = modelData.poses || [];
            for (let i = 0, len = poseDatas.length; i < len; i++) {
                const poseData = poseDatas[i];
                if (poseData.isBindPose) {

                    const isCharacter = poseData.isCharacter;

                    const poseItems = poseData.items;
                    const poseItemDict: { [key: number]: PoseItem } = {};
                    for (let ii = 0, len2 = poseItems.length; ii < len2; ii++) {
                        poseItemDict[poseItems[ii].id] = poseItems[ii];
                    }

                    for (let ii = 0, len2 = hierarchyData.length; ii < len2; ii++) {
                        const data = hierarchyData[ii];

                        const poseItem = poseItemDict[data.id];
                        if (!poseItem) {
                            continue;
                        }

                        const bindNode = hierarchy[data.id];
                        if (!bindNode) {
                            console.error('bind pose error. bone not find: ' + poseItem.id);
                            continue;
                        }

                        const matrix = poseItem.matrix;
                        const mat = new Matrix4();
                        mat.set(
                            matrix[0], matrix[4], matrix[8], matrix[12],
                            matrix[1], matrix[5], matrix[9], matrix[13],
                            matrix[2], matrix[6], matrix[10], matrix[14],
                            matrix[3], matrix[7], matrix[11], matrix[15]
                        );

                        if (poseItem.isLocalMatrix) {
                           // bindNode.transform.position = mat.getTrans();
                            const q = new Quaternion();
                            q.FromRotationMatrix(mat);
                           // bindNode.transform.localRotation = bindNode.transform.localRotation.multiply(q);
                        } else {
                           // bindNode.transform.position = mat.getTrans();
                            const q = new Quaternion();
                            q.FromRotationMatrix(mat);
                            bindNode.transform.rotation = bindNode.transform.localRotation.multiply(q);
                        }
                    }
                }
            }

            for (let i = 0, len = hierarchyData.length; i < len; i++) {
                const boneData = hierarchyData[i];
                const boneNode: GameObject = hierarchy[boneData.id];
                const boneTransform = boneNode.transform;
                console.log('load bone {' + boneData.name + '}. pos: ' + JSON.stringify(boneTransform.localPosition) +
                    '  \n euler: ' + JSON.stringify(boneTransform.localEulerAngle) +
                    '  \n rot: ' + JSON.stringify(boneTransform.localRotation));
            }

            // add mesh component
            const meshes = modelData.meshes;
            for (let i = 0, len = meshes.length; i < len; i++) {

                const meshData = meshes[i];

                const meshNode = hierarchy[meshData.id];
                if (!meshNode) {
                    console.error('bind pose error. bone not find: ' + meshData.id);
                    continue;
                }

                meshNode.name = meshData.name;

                const mesh = new Mesh();

                MeshSerializer.importMeshWithJson(meshData, mesh);

                const meshFilter = meshNode.addComponent<MeshFilter>(MeshFilter);
                meshFilter.mesh = mesh;

                const meshRender = meshNode.addComponent<MeshRender>(MeshRender);
                meshRender.mesh = mesh;
                meshRender.setMaterial(Material.getDefaultCubeMaterial());
            }

            // load animation
            const animations = modelData.animations || [];
            if (animations && animations.length > 0) {

                // 创建动画控制器
                const animController = new AnimatorController();

                for (let i = 0, len = animations.length; i < len; i++) {

                    const animData = animations[i];
                    const clip = parseAnimationClip(animData);

                    animController.addClip(clip);
                }

                // 添加Animator组件
                const animator = rootNodes[0].addComponent<Animator>(Animator);
                animator.animController = animController;
            }

            // animator.play("Take 001");

            return rootNodes[0];
        }

    }

    function parseAnimationClip(animData: Object): AnimationClip {

        // 创建动画片段
        const posClip = new AnimationClip();
        posClip.name = 'Take 001';

        let maxTime = 0;

        for (const nodePath in animData) {
            const nodeCurveData = animData[nodePath];

            for (const curveName in nodeCurveData) {

                if (curveName === '') {
                    continue;
                }

                const curveData = nodeCurveData[curveName];

                const curve = new AnimationCurve();
                for (let i = 0, len = curveData.length; i < len; i++) {
                    const keyFrameData = curveData[i];
                    let reverse = 1;
                    if (curveName.indexOf('localEulerAngle.z') > -1 || curveName.indexOf('localPosition.z') > -1) {
                        reverse = -1;
                    }
                    curve.addKeyFrameByValue(keyFrameData['time'], reverse * keyFrameData['value']);

                    if (keyFrameData['time'] > maxTime) {
                        maxTime = keyFrameData['time'];
                    }
                }

                if (nodePath != '') {
                    posClip.addCurve(nodePath, QE.Reflection.Type.typeOf(Transform), curveName, curve);
                } else {
                    posClip.addCurve('RootNode', QE.Reflection.Type.typeOf(Transform), curveName, curve);
                }
            }
        }

        posClip.length = maxTime;

        return posClip;
    }
}
