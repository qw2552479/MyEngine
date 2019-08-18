module UnitTest {

    export interface ITestCase {
        name: string;
        desc: string;
        call: (params?: any) => void;
    }

    // TODO: 重构测试框架
    export function run() {

        const div = document.getElementById('gameDiv');
        QE.run({
            width: 720,
            height: 1280,
            div: div,
            debugMode: false,
            onEnginePrepared: () => {
                // testTextLoader();
                // testEvent();
                // TestGetSet.run();
                // testMinHeap();
                // UnitTest.TestMatrix.run();
                testSprite();
                // testAnimation();
                // testGeometry();
                // testFbxModel();
            }
        });
    }
}

window.onload = () => {
    UnitTest.run();
};

function dumpSceneHierarchy() {

    const obj = {};

    let animator: QE.Animator;

    const currScene = QE.SceneManager.instance.currentScene;
    for (let i = 0; i < currScene.children.length; i++) {
        const rootChild: QE.GameObject = currScene.children[i];

        const childObj = obj[rootChild.name] = {};
        childObj['pos'] = [rootChild.transform.localPosition.x, rootChild.transform.localPosition.y, rootChild.transform.localPosition.z];

        animator = rootChild.getComponent<QE.Animator>(QE.Animator);

        function searchChild(rootNode: QE.Transform, dict) {


            for (let ii = 0; ii < rootNode.childCount; ii++) {

                const subChild = rootNode.getChildByIndex(ii);

                const subChildObj = dict[subChild.node.name] = {};
                subChildObj['node'] = subChild.node;
                subChildObj['pos'] = [subChild.localPosition.x, subChild.localPosition.y, subChild.localPosition.z];
                searchChild(subChild, subChildObj);
            }
        }

        searchChild(rootChild.transform, childObj);
    }

    return obj;
}

function step(timePos: number) {

    const rootChild: QE.GameObject = QE.SceneManager.instance.currentScene.children[1].transform.getChildByIndex(0).node;
    const animator = QE.SceneManager.instance.currentScene.children[1].transform.getChildByIndex(0).node.getComponent<QE.Animator>(QE.Animator);

    animator.animController.animationClips[0].apply(rootChild, timePos);
}

function play() {
    const rootChild: QE.GameObject = QE.SceneManager.instance.currentScene.children[1].transform.node;
    const animator = QE.SceneManager.instance.currentScene.children[1].getComponent<QE.Animator>(QE.Animator);

    animator.play('Take 001');
}

function findChild(name: string) {
    const rootChild: QE.GameObject = QE.SceneManager.instance.currentScene.children[1].transform.node;
    return rootChild.transform.find(name);
}
