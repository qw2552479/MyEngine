module UnitTest {

	import ResourceManager = QuickEngine.ResourceManager;
	import TextResource = QuickEngine.TextResource;
	import Type = QuickEngine.Reflection.Type;
	import QuickListener1 = QuickEngine.QuickListener1;

	export function testTextLoader() {
        let p = QuickEngine.ResourceManager.instance.loadAsync<QuickEngine.TextResource>('assets/res/test.txt', Type.typeOf(TextResource));
        p.then(function (textRes: TextResource) {
            console.log(textRes.data);
        })
	}

}