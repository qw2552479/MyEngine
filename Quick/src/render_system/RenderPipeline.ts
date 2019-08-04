namespace QuickEngine {

	/**
	 * 队列渲染管道
	 */
	export class RenderPipeline {

		public renderQueue: RenderQueue;

		public constructor() {
			this.renderQueue = new RenderQueue();
		}

		public doRender(renderContext: RenderContext): void {

			let camera = renderContext.camera;
			let renderQueue = this.renderQueue;
			let renderSystem = RenderSystem.instance;

			// 清除渲染队列
			renderQueue.clear();

			// TODO: 封装裁剪
			function doCull() {

				let outArr: Node[] = [];

				function cull(transfrom: Transform, outNodeArr: Node[]) {

					outNodeArr.push(transfrom.node);

					for (let ii = 0, len = transfrom.childCount; ii < len; ii++) {
						cull(transfrom.getChildByIndex(ii), outNodeArr);
					}
				}

				let children = SceneManager.instance.currentScene.children;
				for (let i = 0, len = children.length; i < len; i++) {
					cull(children[i].transform, outArr);
				}

				return outArr;
			}

			// 裁剪
			let visibleList = doCull();
			let len = visibleList.length;
			// 节点加入渲染队列
			for (let i = 0; i < len; i++) {
				let child = visibleList[i];
				if (child) {
					child.updateRenderQueue(renderQueue);
				}
			}

			// 设置视图矩阵,投影矩阵,裁剪面
			renderSystem.setViewMatrix(camera.getViewMatrix());
			renderSystem.setProjectionMatrix(camera.getProjMatrix());

			// #1 渲染不透明物体(完成后渲染透明物体)
			// 设置shader pass
			const solidObjs = renderQueue.solidObjects;

			if (len > 0) {
				// 排序
			}

			// 设置光照
			renderSystem.setLight();

			// 渲染
			for (let i = 0, len = solidObjs.length; i < len; i++) {
				const solidObj = solidObjs[i];
				renderSystem.render(solidObj.getMaterial().shader, solidObj);
			}

			// 执行光照
			this.doLighting();

			// #2 渲染不透明物体完成后, 开始渲染透明物体)
			const alphaObjs = renderQueue.alphaObjects;

			if (len > 0) {
				// 排序
			}

			// 渲染
			for (let i = 0, len = alphaObjs.length; i < len; i++) {
				const alphaObj = alphaObjs[i];
				renderSystem.render(alphaObj.getMaterial().shader, alphaObj);
			}
		}

		// 不透明物体绘制完成后, 执行光照.每个物体可以创建一个renderbuffer,避免多次渲染,但是会增加内存.
		public doLighting() {

		}
	}

}