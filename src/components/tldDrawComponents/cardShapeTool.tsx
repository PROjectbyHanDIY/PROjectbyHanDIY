import { BaseBoxShapeTool, StateNode, TLClickEventInfo } from '@tldraw/tldraw'

const OFFSET = 0

export class CardShapeTool extends BaseBoxShapeTool   {
	static override id = 'card';	
	static override initial = 'idle';
	override shapeType = 'card'
	static override isLockable: boolean = true;

	// [a]
	override onEnter() {
		this.editor.setCursor({ type: 'cross', rotation: 0 })
	}

	// [b]
	// override onPointerDown() {
	// 	const { currentPagePoint } = this.editor.inputs
	// 	this.editor.createShape({
	// 		type: 'card',
	// 		x: currentPagePoint.x - OFFSET,
	// 		y: currentPagePoint.y - OFFSET,
	// 		//props: { text: '❤️' },
	// 	})
	// }

	override onDoubleClick(_info: TLClickEventInfo) {
		// you can handle events in handlers like this one;
		// check the BaseBoxShapeTool source as an example
	}
}

/*
This file contains our custom tool. The tool is a StateNode with the `id` "card".

We get a lot of functionality for free by extending the BaseBoxShapeTool. but we can
handle events in out own way by overriding methods like onDoubleClick. For an example 
of a tool with more custom functionality, check out the screenshot-tool example. 

*/