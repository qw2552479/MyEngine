module UnitTest {

    export interface ITestCase {
        name: string;
        desc: string;
        call: (params?: any) => void;
    }

    // TODO: 重构测试框架
    export function run() {

        let div = document.getElementById('gameDiv');
        QuickEngine.run({
            width: 720,
            height: 1280,
            div: div,
            debugMode: false,
            onEnginePrepared: function () {
                // testTextLoader();
                // testEvent();
                // TestPerformenceArrayBufferAndArray.run();
                // TestGetSet.run();
                // testMinHeap();
                //  UnitTest.TestMatrix.run();
                // testSprite();
                // testAnimation();
                testGeometry();
                // testFbxModel();
            }
        });
    }
}

window.onload = () => {
    UnitTest.run();
};

function dumpSceneHierarchy() {

    let obj = {};

    let animator: QuickEngine.Animator;

    let currScene = QuickEngine.SceneManager.instance.currentScene;
    for (let i = 0; i < currScene.children.length; i++) {
        let rootChild: QuickEngine.Node = currScene.children[i];

        let childObj = obj[rootChild.name] = {};
        childObj['pos'] = [rootChild.transform.localPosition.x, rootChild.transform.localPosition.y, rootChild.transform.localPosition.z];

        animator = rootChild.getComponent<QuickEngine.Animator>(QuickEngine.Animator);

        function searchChild(rootNode: QuickEngine.Transform, dict) {


            for (let ii = 0; ii < rootNode.childCount; ii++) {

                let subChild = rootNode.getChildByIndex(ii);

                let subChildObj = dict[subChild.node.name] = {};
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

    let rootChild: QuickEngine.Node = QuickEngine.SceneManager.instance.currentScene.children[1].transform.getChildByIndex(0).node;
    let animator = QuickEngine.SceneManager.instance.currentScene.children[1].transform.getChildByIndex(0).node.getComponent<QuickEngine.Animator>(QuickEngine.Animator);
    ;
    animator.animController.animationClips[0].apply(rootChild, timePos);
}

function play() {
    let rootChild: QuickEngine.Node = QuickEngine.SceneManager.instance.currentScene.children[1].transform.node;
    let animator = QuickEngine.SceneManager.instance.currentScene.children[1].getComponent<QuickEngine.Animator>(QuickEngine.Animator);
    ;
    animator.play('Take 001');
}

function findChild(name: string) {
    let rootChild: QuickEngine.Node = QuickEngine.SceneManager.instance.currentScene.children[1].transform.node;
    return rootChild.transform.find(name);
}