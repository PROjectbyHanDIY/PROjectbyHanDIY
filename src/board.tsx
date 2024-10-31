import React, { useState, useRef } from "react";
import { Box } from "@mui/material";
import { flushSync } from "react-dom";
//import { BoxElement } from "./moveableComponents/boxElement";
import { TLShape, Tldraw, track, useEditor  } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import "./components/tldDrawComponents/custom-ui.css"
//import { CustomUi } from "./tldDrawComponents/customUi";
//import {CustomUi} from "./components/tldDrawComponents/customUi"
import { components, uiOverrides } from "./components/tldDrawComponents/ui-overrides";
import { CardShapeUtil } from "./components/tldDrawComponents/card/cardShapeUtil";
import { CardShapeTool } from "./components/tldDrawComponents/card/cardShapeTool";
import { CustomUi } from "./components/tldDrawComponents/projectMenu/menu";


export const Board = (props: any) => {
  const boundRef = useRef(document.createElement("div"));

  const customShapeUtils = [CardShapeUtil]
  const customTools = [CardShapeTool]

  return (
    <>
      <div
        style={{
          position: "fixed",
          marginTop: 3.5,
          inset: "0,0,0,0",
          height: '95%',
          width: "100%",
        }}
        className="draw-container"
      >
          <Tldraw 
            persistenceKey="tldraw__editor" 
            // Pass in the array of custom shape classes
            shapeUtils={customShapeUtils}
            // Pass in the array of custom tool classes 
            tools={customTools}
            // Pass in any overrides to the user interface
            overrides={uiOverrides}
            // Pass in the new Keybaord Shortcuts component
            components={components}
            //add additional starting properties to any shape 
            onMount={(editor) => {
              editor.getInitialMetaForShape = (shape) => {
                return {
                  updatedBy: editor.user.getId(),
                  updatedAt: Date.now(),
                  label: shape.type
                }
              }
              // [2]
              // editor.sideEffects.registerAfterChangeHandler('shape', (_prev, next, source) => {
              //   if (source !== 'user') return next
              //   return {
              //     ...next,
              //     meta: {
              //       updatedBy: editor.user.getId(),
              //       updatedAt: Date.now(),
              //     },
              //   }
              // })

            }}
                    
          >
            <MetaUiHelper />
            <CustomUi />
            </Tldraw>
      </div>
    </>
  );
};

// [2]
type ShapeWithMyMeta = TLShape & { meta: { label: string, updatedBy: string, updatedAt: string, url: string, notes: string } }

// [4]
export const MetaUiHelper = track(function MetaUiHelper() {
	const editor = useEditor()
	const onlySelectedShape = editor.getOnlySelectedShape() as ShapeWithMyMeta | null


  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (onlySelectedShape) {
			const { id, type, meta } = onlySelectedShape

			editor.updateShapes<ShapeWithMyMeta>([
				{ id, type, meta: { ...meta, label: e.currentTarget.value } },
			])
		}
	}

	return (
		<pre style={{ position: 'absolute', zIndex: 300, top: 64, left: 12, margin: 0 }}>
			{onlySelectedShape
				? JSON.stringify(onlySelectedShape.meta, null, '\t')
				: 'Select one shape to see its meta data.'}
		</pre>
	)
})


// // [3]
// export const ShapeLabelUiWithHelper = track(function ShapeLabelUiWithHelper() {
// 	const editor = useEditor()
// 	const onlySelectedShape = editor.getOnlySelectedShape() as ShapeWithMyMeta | null

// 	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
// 		if (onlySelectedShape) {
// 			const { id, type, meta } = onlySelectedShape

// 			editor.updateShapes<ShapeWithMyMeta>([
// 				{ id, type, meta: { ...meta, label: e.currentTarget.value } },
// 			])
// 		}
// 	}

// 	return (
// 		<div style={{ position: 'absolute', zIndex: 300, top: 64, left: 12 }}>
// 			<pre style={{ margin: '0 0 16px 0' }}>
// 				{onlySelectedShape
// 					? JSON.stringify(onlySelectedShape.meta, null, '\t')
// 					: 'Select one shape to see / edit its meta data.'}
// 			</pre>
// 			{onlySelectedShape && <input value={onlySelectedShape.meta.label} onChange={onChange} />}
// 		</div>
// 	)
// })