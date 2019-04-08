module UnitTest {

    class TestComponent extends QuickEngine.Component {

        public static __ClassName__ = "UnitTest.TestComponent";
        public static __ClassID__ = 0;

        onLoad = function () {
            console.log("UnitTest.TestComponent onLoad");
        }

        onUpdate = function () {
            console.log("UnitTest.TestComponent onUpdate");
        }

    }

    export function testComponent() {

        let mainScene = QuickEngine.SceneManager.instance.currentScene;
       
        let emptyNode = mainScene.createNode();

        let testComponent = emptyNode.addComponent<TestComponent>(TestComponent);

        return testComponent;
    }

} 