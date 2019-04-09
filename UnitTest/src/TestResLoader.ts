module UnitTest {

	import ResourceManager = QuickEngine.ResourceManager;
	import TextResource = QuickEngine.TextResource;
	import Type = QuickEngine.Reflection.Type;
	import QuickListener1 = QuickEngine.QuickListener1;

    class TextAsset {
		_onLoaded(textRes: TextResource) {
			console.log(textRes.data);
		}
	}

	export function testTextLoader() {
		let res = ResourceManager.instance.load<TextResource>('assets/res/test.txt', Type.typeOf(TextResource));

		let asset = new TextAsset();

		let listener = new QuickListener1<TextAsset, TextResource>(this, TextAsset.prototype._onLoaded);
		res._loadedEvent.add(listener);
	}

}