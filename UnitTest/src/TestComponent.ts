module UnitTest {

    class TestComponent extends QE.Component {

        onLoad = function () {
            console.log("UnitTest.TestComponent onLoad");
        }

        onUpdate = function () {
            console.log("UnitTest.TestComponent onUpdate");
        }

    }

    export function testComponent() {

        let mainScene = QE.SceneManager.instance.currentScene;
       
        let emptyNode = mainScene.createNode();

        let testComponent = emptyNode.addComponent<TestComponent>(TestComponent);

        return testComponent;
    }

} 