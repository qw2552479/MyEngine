module UnitTest {

    class TestComponent extends QE.Component {

        onLoad = function () {
            console.log('UnitTest.TestComponent onLoad');
        };

        onUpdate = function () {
            console.log('UnitTest.TestComponent onUpdate');
        };

    }

    export function testComponent() {

        const mainScene = QE.SceneManager.instance.currentScene;

        const emptyNode = mainScene.createNode();

        const testComponent = emptyNode.addComponent<TestComponent>(TestComponent);

        return testComponent;
    }

}
