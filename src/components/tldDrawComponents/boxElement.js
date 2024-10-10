// import React, { useRef } from "react";
// import Moveable from "react-moveable";

// export const BoxElement = (props) => {
//   //console.log(props);
//   //   const node = useRef();

//   //   if (node && node.current && node.current.contains()) {
//   //     console.log("current accessed");
//   //   }

//   //   return <div ref={node}></div>;
//   // eslint-disable-next-line no-mixed-operators
//   const targetRef = useRef(document.createElement("div"));
//   const moveableRef = useRef(document.createElement("moveable"));

//   return (
//     <div className="root">
//       <div
//         className="container"
//         style={{
//           border: "1px solid #ccc",
//         }}
//       >
//         <div
//           className="target"
//           ref={targetRef}
//           style={{
//             width: "200px",
//             height: "150px",
//             backgroundColor: "white",
//           }}
//         ></div>
//         <Moveable
//           ref={moveableRef}
//           target={targetRef}
//           draggable={true}
//           throttleDrag={1}
//           edgeDraggable={false}
//           startDragRotate={0}
//           throttleDragRotate={0}
//           scalable={false}
//           keepRatio={false}
//           throttleScale={0}
//           snappable={true}
//           bounds={{
//             left: 0,
//             top: props.boundRef,
//             right: 0,
//             bottom: 0,
//             position: "css",
//           }}
//           onDrag={(e) => {
//             e.target.style.transform = e.transform;
//           }}
//           onScale={(e) => {
//             e.target.style.transform = e.drag.transform;
//           }}
//           onBound={(e) => {
//             //console.log(e);
//             //console.log(props);
//           }}
//         />
//       </div>
//     </div>
//   );
// };
