module UnitTest {

    import TextResource = QE.TextResource;

    export function testTextLoader() {
        QE.ResourceManager.load<QE.TextResource>('assets/assets/test.txt').then(function (textRes: TextResource) {
            console.log(textRes.text);
        });
    }
}
