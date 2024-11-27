// "use client";
// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { v4 as uuidv4 } from "uuid";
// import dynamic from "next/dynamic";

// const TextBlock = dynamic(() => import("./TextBlock"), { ssr: false });
// import ImageBlock from "./ImageBlock";
// import ListBlock from "./ListBlock";
// import FAQBlock from "./FAQBlock";
// import CalloutBlock from "./CalloutBlock";
// import HeadingBlock from "./HeadingBlock";

// interface Link {
//   text: string;
//   url: string;
//   type: "internal" | "external";
//   openInNewTab: boolean;
// }

// interface TextBlockContent {
//   html: string;
//   links: Link[];
// }

// interface SectionBlockProps {
//   content: { title: string; navTitle: string; blocks: any[] };
//   onChange: (content: {
//     title: string;
//     navTitle: string;
//     blocks: any[];
//   }) => void;
//   onDelete: () => void;
// }

// export default function SectionBlock({
//   content,
//   onChange,
//   onDelete,
// }: SectionBlockProps) {
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

//   const onDragEnd = (result: any) => {
//     if (!result.destination) return;

//     const newBlocks = Array.from(content.blocks);
//     const [reorderedItem] = newBlocks.splice(result.source.index, 1);
//     newBlocks.splice(result.destination.index, 0, reorderedItem);

//     onChange({ ...content, blocks: newBlocks });
//   };

//   const addBlock = (type: string) => {
//     const newBlock = {
//       id: uuidv4(),
//       type,
//       content:
//         type === "text"
//           ? { html: "", links: [] }
//           : type === "image"
//           ? { url: "", alt: "" }
//           : type === "list"
//           ? { type: "bullet", items: [] }
//           : type === "faq"
//           ? { question: "", answer: "" }
//           : type === "callout"
//           ? { type: "info", title: "", content: "", icon: "", links: [] }
//           : { level: "h2", text: "" },
//     };
//     onChange({ ...content, blocks: [...content.blocks, newBlock] });
//   };

//   const updateBlockContent = (id: string, blockContent: any) => {
//     onChange({
//       ...content,
//       blocks: content.blocks.map((block) =>
//         block.id === id ? { ...block, content: blockContent } : block
//       ),
//     });
//   };

//   const deleteBlock = (id: string) => {
//     onChange({
//       ...content,
//       blocks: content.blocks.filter((block) => block.id !== id),
//     });
//   };

//   const handleDeleteSection = () => {
//     if (content.blocks.length > 0 || content.title || content.navTitle) {
//       setShowDeleteConfirmation(true);
//     } else {
//       onDelete();
//     }
//   };

//   const confirmDelete = () => {
//     onDelete();
//     setShowDeleteConfirmation(false);
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex space-x-4">
//         <input
//           type="text"
//           value={content.title}
//           onChange={(e) => onChange({ ...content, title: e.target.value })}
//           className="flex-grow p-2 border rounded font-bold text-xl"
//           placeholder="Section Title"
//         />
//         <input
//           type="text"
//           value={content.navTitle}
//           onChange={(e) => onChange({ ...content, navTitle: e.target.value })}
//           className="flex-grow p-2 border rounded font-bold text-lg"
//           placeholder="Section Nav Title (optional)"
//         />
//       </div>
//       <div className="flex flex-wrap gap-2">
//         <button
//           onClick={() => addBlock("text")}
//           className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
//         >
//           Add Text
//         </button>
//         <button
//           onClick={() => addBlock("image")}
//           className="bg-green-500 text-white px-3 py-1 rounded text-sm"
//         >
//           Add Image
//         </button>
//         <button
//           onClick={() => addBlock("list")}
//           className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
//         >
//           Add List
//         </button>
//         <button
//           onClick={() => addBlock("faq")}
//           className="bg-purple-500 text-white px-3 py-1 rounded text-sm"
//         >
//           Add FAQ
//         </button>
//         <button
//           onClick={() => addBlock("callout")}
//           className="bg-red-500 text-white px-3 py-1 rounded text-sm"
//         >
//           Add Callout
//         </button>
//         <button
//           onClick={() => addBlock("heading")}
//           className="bg-indigo-500 text-white px-3 py-1 rounded text-sm"
//         >
//           Add Heading
//         </button>
//       </div>
//       <button
//         onClick={handleDeleteSection}
//         className="px-3 py-1 bg-red-500 text-white rounded text-sm"
//       >
//         Delete Section
//       </button>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId={`section-${content.title}`}>
//           {(provided) => (
//             <div
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               className="space-y-4"
//             >
//               {content.blocks.map((block, index) => (
//                 <Draggable key={block.id} draggableId={block.id} index={index}>
//                   {(provided) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       className="border p-4 rounded"
//                     >
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="font-bold">
//                           {block.type.charAt(0).toUpperCase() +
//                             block.type.slice(1)}
//                         </span>
//                         <button
//                           onClick={() => deleteBlock(block.id)}
//                           className="px-2 py-1 bg-red-500 text-white rounded text-sm"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                       {block.type === "text" && (
//                         <TextBlock
//                           content={block.content}
//                           onChange={(content) =>
//                             updateBlockContent(block.id, content)
//                           }
//                         />
//                       )}
//                       {block.type === "image" && (
//                         <ImageBlock
//                           content={block.content}
//                           onChange={(content) =>
//                             updateBlockContent(block.id, content)
//                           }
//                         />
//                       )}
//                       {block.type === "list" && (
//                         <ListBlock
//                           content={block.content}
//                           onChange={(content) =>
//                             updateBlockContent(block.id, content)
//                           }
//                         />
//                       )}
//                       {block.type === "faq" && (
//                         <FAQBlock
//                           content={block.content}
//                           onChange={(content) =>
//                             updateBlockContent(block.id, content)
//                           }
//                         />
//                       )}
//                       {block.type === "callout" && (
//                         <CalloutBlock
//                           content={block.content}
//                           onChange={(content) =>
//                             updateBlockContent(block.id, content)
//                           }
//                         />
//                       )}
//                       {block.type === "heading" && (
//                         <HeadingBlock
//                           content={block.content}
//                           onChange={(content) =>
//                             updateBlockContent(block.id, content)
//                           }
//                         />
//                       )}
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//       {showDeleteConfirmation && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-4 rounded-lg">
//             <p className="mb-4">
//               This section contains content. Are you sure you want to delete it?
//             </p>
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => setShowDeleteConfirmation(false)}
//                 className="px-4 py-2 bg-gray-300 rounded"
//               >
//                 Cancel
//               </button>
//               {/* <button
//                 onClick={confirmDelete}
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//               >
//                 Delete
//               </button> */}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import dynamic from "next/dynamic";
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";

// const TextBlock = dynamic(() => import("./TextBlock"), { ssr: false });
// import ImageBlock from "./ImageBlock";
// import ListBlock from "./ListBlock";
// import FAQBlock from "./FAQBlock";
// import CalloutBlock from "./CalloutBlock";
// import HeadingBlock from "./HeadingBlock";
// import SortableItem from "./SortableItem";
// // import SortableItem from "./SortableItem";

// interface Link {
//   text: string;
//   url: string;
//   type: "internal" | "external";
//   openInNewTab: boolean;
// }

// interface TextBlockContent {
//   html: string;
//   links: Link[];
// }

// interface SectionBlockProps {
//   content: { title: string; navTitle: string; blocks: any[] };
//   onChange: (content: {
//     title: string;
//     navTitle: string;
//     blocks: any[];
//   }) => void;
//   onDelete: () => void;
// }

// export default function SectionBlock({
//   content,
//   onChange,
//   onDelete,
// }: SectionBlockProps) {
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       const oldIndex = content.blocks.findIndex(
//         (block) => block.id === active.id
//       );
//       const newIndex = content.blocks.findIndex(
//         (block) => block.id === over.id
//       );

//       onChange({
//         ...content,
//         blocks: arrayMove(content.blocks, oldIndex, newIndex),
//       });
//     }
//   };

//   const addBlock = (type: string) => {
//     const newBlock = {
//       id: uuidv4(),
//       type,
//       content:
//         type === "text"
//           ? { html: "", links: [] }
//           : type === "image"
//           ? { url: "", alt: "" }
//           : type === "list"
//           ? { type: "bullet", items: [] }
//           : type === "faq"
//           ? { question: "", answer: "" }
//           : type === "callout"
//           ? { type: "info", title: "", content: "", icon: "", links: [] }
//           : { level: "h2", text: "" },
//     };
//     onChange({ ...content, blocks: [...content.blocks, newBlock] });
//   };

//   const updateBlockContent = (id: string, blockContent: any) => {
//     onChange({
//       ...content,
//       blocks: content.blocks.map((block) =>
//         block.id === id ? { ...block, content: blockContent } : block
//       ),
//     });
//   };

//   const deleteBlock = (id: string) => {
//     onChange({
//       ...content,
//       blocks: content.blocks.filter((block) => block.id !== id),
//     });
//   };

//   const handleDeleteSection = () => {
//     if (content.blocks.length > 0 || content.title || content.navTitle) {
//       setShowDeleteConfirmation(true);
//     } else {
//       onDelete();
//     }
//   };

//   const confirmDelete = () => {
//     onDelete();
//     setShowDeleteConfirmation(false);
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex space-x-4">
//         <input
//           type="text"
//           value={content.title}
//           onChange={(e) => onChange({ ...content, title: e.target.value })}
//           className="flex-grow p-2 border rounded font-bold text-xl"
//           placeholder="Section Title"
//         />
//         <input
//           type="text"
//           value={content.navTitle}
//           onChange={(e) => onChange({ ...content, navTitle: e.target.value })}
//           className="flex-grow p-2 border rounded font-bold text-lg"
//           placeholder="Section Nav Title (optional)"
//         />
//       </div>
//       <div className="flex flex-wrap gap-2">
//         <button
//           onClick={() => addBlock("text")}
//           className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
//         >
//           Add Text
//         </button>
//         <button
//           onClick={() => addBlock("image")}
//           className="bg-green-500 text-white px-3 py-1 rounded text-sm"
//         >
//           Add Image
//         </button>
//         <button
//           onClick={() => addBlock("list")}
//           className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
//         >
//           Add List
//         </button>
//         <button
//           onClick={() => addBlock("faq")}
//           className="bg-purple-500 text-white px-3 py-1 rounded text-sm"
//         >
//           Add FAQ
//         </button>
//         <button
//           onClick={() => addBlock("callout")}
//           className="bg-red-500 text-white px-3 py-1 rounded text-sm"
//         >
//           Add Callout
//         </button>
//         <button
//           onClick={() => addBlock("heading")}
//           className="bg-indigo-500 text-white px-3 py-1 rounded text-sm"
//         >
//           Add Heading
//         </button>
//       </div>
//       <button
//         onClick={handleDeleteSection}
//         className="px-3 py-1 bg-red-500 text-white rounded text-sm"
//       >
//         Delete Section
//       </button>
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={content.blocks.map((block) => block.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           <div className="space-y-4">
//             {content.blocks.map((block) => (
//               <SortableItem key={block.id} id={block.id}>
//                 <div className="border p-4 rounded">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="font-bold">
//                       {block.type.charAt(0).toUpperCase() + block.type.slice(1)}
//                     </span>
//                     <button
//                       onClick={() => deleteBlock(block.id)}
//                       className="px-2 py-1 bg-red-500 text-white rounded text-sm"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                   {block.type === "text" && (
//                     <TextBlock
//                       content={block.content}
//                       onChange={(content) =>
//                         updateBlockContent(block.id, content)
//                       }
//                     />
//                   )}
//                   {block.type === "image" && (
//                     <ImageBlock
//                       content={block.content}
//                       onChange={(content) =>
//                         updateBlockContent(block.id, content)
//                       }
//                     />
//                   )}
//                   {block.type === "list" && (
//                     <ListBlock
//                       content={block.content}
//                       onChange={(content) =>
//                         updateBlockContent(block.id, content)
//                       }
//                     />
//                   )}
//                   {block.type === "faq" && (
//                     <FAQBlock
//                       content={block.content}
//                       onChange={(content) =>
//                         updateBlockContent(block.id, content)
//                       }
//                     />
//                   )}
//                   {block.type === "callout" && (
//                     <CalloutBlock
//                       content={block.content}
//                       onChange={(content) =>
//                         updateBlockContent(block.id, content)
//                       }
//                     />
//                   )}
//                   {block.type === "heading" && (
//                     <HeadingBlock
//                       content={block.content}
//                       onChange={(content) =>
//                         updateBlockContent(block.id, content)
//                       }
//                     />
//                   )}
//                 </div>
//               </SortableItem>
//             ))}
//           </div>
//         </SortableContext>
//       </DndContext>
//       {showDeleteConfirmation && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-4 rounded-lg">
//             <p className="mb-4">
//               This section contains content. Are you sure you want to delete it?
//             </p>
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => setShowDeleteConfirmation(false)}
//                 className="px-4 py-2 bg-gray-300 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import SortableItem from "./SortableItem";
// import TextBlock from "./TextBlock";
// import ImageBlock from "./ImageBlock";
// import ListBlock from "./ListBlock";
// import FAQBlock from "./FAQBlock";
// import CalloutBlock from "./CalloutBlock";
// import HeadingBlock from "./HeadingBlock";

// interface Block {
//   id: string;
//   type: string;
//   content: any;
// }

// interface SectionBlockProps {
//   content: {
//     id: string;
//     title: string;
//     navTitle: string;
//     blocks: Block[];
//   };
//   onChange: (content: {
//     id: string;
//     title: string;
//     navTitle: string;
//     blocks: Block[];
//   }) => void;
//   onDelete: () => void;
// }

// export default function SectionBlock({
//   content,
//   onChange,
//   onDelete,
// }: SectionBlockProps) {
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       const oldIndex = content.blocks.findIndex(
//         (block) => block.id === active.id
//       );
//       const newIndex = content.blocks.findIndex(
//         (block) => block.id === over.id
//       );

//       onChange({
//         ...content,
//         blocks: arrayMove(content.blocks, oldIndex, newIndex),
//       });
//     }
//   };

//   const addBlock = (type: string) => {
//     const newBlock = {
//       id: uuidv4(),
//       type,
//       content:
//         type === "text"
//           ? { html: "", links: [] }
//           : type === "image"
//           ? { url: "", alt: "" }
//           : type === "list"
//           ? { type: "bullet", items: [] }
//           : type === "faq"
//           ? { question: "", answer: "" }
//           : type === "callout"
//           ? { type: "info", title: "", content: "" }
//           : { level: "h2", text: "" },
//     };
//     onChange({
//       ...content,
//       blocks: [...content.blocks, newBlock],
//     });
//   };

//   const updateBlockContent = (id: string, blockContent: any) => {
//     onChange({
//       ...content,
//       blocks: content.blocks.map((block) =>
//         block.id === id ? { ...block, content: blockContent } : block
//       ),
//     });
//   };

//   const deleteBlock = (id: string) => {
//     onChange({
//       ...content,
//       blocks: content.blocks.filter((block) => block.id !== id),
//     });
//   };

//   const handleDeleteSection = () => {
//     if (content.blocks.length > 0 || content.title || content.navTitle) {
//       setShowDeleteConfirmation(true);
//     } else {
//       onDelete();
//     }
//   };

//   const confirmDelete = () => {
//     onDelete();
//     setShowDeleteConfirmation(false);
//   };

//   return (
//     <div className="space-y-4 border p-4 rounded-lg">
//       <div className="flex space-x-4">
//         <input
//           type="text"
//           value={content.title}
//           onChange={(e) => onChange({ ...content, title: e.target.value })}
//           className="flex-grow p-2 border rounded font-bold text-xl"
//           placeholder="Section Title"
//         />
//         <input
//           type="text"
//           value={content.navTitle}
//           onChange={(e) => onChange({ ...content, navTitle: e.target.value })}
//           className="flex-grow p-2 border rounded font-bold text-lg"
//           placeholder="Section Nav Title (optional)"
//         />
//       </div>
//       <div className="flex flex-wrap gap-2">
//         <button
//           onClick={() => addBlock("text")}
//           className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
//         >
//           Add Text
//         </button>
//         <button
//           onClick={() => addBlock("image")}
//           className="bg-green-500 text-white px-3 py-1 rounded text-sm"
//         >
//           Add Image
//         </button>
//         <button
//           onClick={() => addBlock("list")}
//           className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
//         >
//           Add List
//         </button>
//         <button
//           onClick={() => addBlock("faq")}
//           className="bg-purple-500 text-white px-3 py-1 rounded text-sm"
//         >
//           Add FAQ
//         </button>
//         <button
//           onClick={() => addBlock("callout")}
//           className="bg-red-500 text-white px-3 py-1 rounded text-sm"
//         >
//           Add Callout
//         </button>
//         <button
//           onClick={() => addBlock("heading")}
//           className="bg-indigo-500 text-white px-3 py-1 rounded text-sm"
//         >
//           Add Heading
//         </button>
//       </div>
//       <button
//         onClick={handleDeleteSection}
//         className="px-3 py-1 bg-red-500 text-white rounded text-sm"
//       >
//         Delete Section
//       </button>
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={content.blocks.map((block) => block.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           <div className="space-y-4">
//             {content.blocks.map((block) => (
//               <SortableItem key={block.id} id={block.id}>
//                 <div className="border p-4 rounded">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="font-bold">
//                       {block.type.charAt(0).toUpperCase() + block.type.slice(1)}
//                     </span>
//                     <button
//                       onClick={() => deleteBlock(block.id)}
//                       className="px-2 py-1 bg-red-500 text-white rounded text-sm"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                   {block.type === "text" && (
//                     <TextBlock
//                       content={block.content}
//                       onChange={(content) =>
//                         updateBlockContent(block.id, content)
//                       }
//                     />
//                   )}
//                   {block.type === "image" && (
//                     <ImageBlock
//                       content={block.content}
//                       onChange={(content) =>
//                         updateBlockContent(block.id, content)
//                       }
//                     />
//                   )}
//                   {block.type === "list" && (
//                     <ListBlock
//                       content={block.content}
//                       onChange={(content) =>
//                         updateBlockContent(block.id, content)
//                       }
//                     />
//                   )}
//                   {block.type === "faq" && (
//                     <FAQBlock
//                       content={block.content}
//                       onChange={(content) =>
//                         updateBlockContent(block.id, content)
//                       }
//                     />
//                   )}
//                   {block.type === "callout" && (
//                     <CalloutBlock
//                       content={block.content}
//                       onChange={(content) =>
//                         updateBlockContent(block.id, content)
//                       }
//                     />
//                   )}
//                   {block.type === "heading" && (
//                     <HeadingBlock
//                       content={block.content}
//                       onChange={(content) =>
//                         updateBlockContent(block.id, content)
//                       }
//                     />
//                   )}
//                 </div>
//               </SortableItem>
//             ))}
//           </div>
//         </SortableContext>
//       </DndContext>
//       {showDeleteConfirmation && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-4 rounded-lg">
//             <p className="mb-4">
//               This section contains content. Are you sure you want to delete it?
//             </p>
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => setShowDeleteConfirmation(false)}
//                 className="px-4 py-2 bg-gray-300 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";

// import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import SortableItem from "./SortableItem";
// import dynamic from "next/dynamic";

// const TextBlock = dynamic(() => import("./TextBlock"), { ssr: false });
// const ImageBlock = dynamic(() => import("./ImageBlock"), { ssr: false });
// const ListBlock = dynamic(() => import("./ListBlock"), { ssr: false });
// const FAQBlock = dynamic(() => import("./FAQBlock"), { ssr: false });
// const CalloutBlock = dynamic(() => import("./CalloutBlock"), { ssr: false });
// const HeadingBlock = dynamic(() => import("./HeadingBlock"), { ssr: false });

// interface Block {
//   id: string;
//   type: string;
//   content: any;
// }

// interface SectionBlockProps {
//   content: {
//     id: string;
//     title: string;
//     navTitle: string;
//     blocks: Block[];
//   };
//   onChange: (content: {
//     id: string;
//     title: string;
//     navTitle: string;
//     blocks: Block[];
//   }) => void;
//   onDelete: () => void;
// }

// export default function SectionBlock({
//   content,
//   onChange,
//   onDelete,
// }: SectionBlockProps) {
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       const oldIndex = content.blocks.findIndex(
//         (block) => block.id === active.id
//       );
//       const newIndex = content.blocks.findIndex(
//         (block) => block.id === over.id
//       );

//       onChange({
//         ...content,
//         blocks: arrayMove(content.blocks, oldIndex, newIndex),
//       });
//     }
//   };

//   const addBlock = (type: string) => {
//     const newBlock = {
//       id: uuidv4(),
//       type,
//       content:
//         type === "text"
//           ? { html: "", links: [] }
//           : type === "image"
//           ? { url: "", alt: "" }
//           : type === "list"
//           ? { type: "bullet", items: [] }
//           : type === "faq"
//           ? { question: "", answer: "" }
//           : type === "callout"
//           ? { type: "info", title: "", content: "" }
//           : { level: "h2", text: "" },
//     };
//     onChange({
//       ...content,
//       blocks: [...content.blocks, newBlock],
//     });
//   };

//   const updateBlockContent = (id: string, blockContent: any) => {
//     onChange({
//       ...content,
//       blocks: content.blocks.map((block) =>
//         block.id === id ? { ...block, content: blockContent } : block
//       ),
//     });
//   };

//   const deleteBlock = (id: string) => {
//     onChange({
//       ...content,
//       blocks: content.blocks.filter((block) => block.id !== id),
//     });
//   };

//   const handleDeleteSection = () => {
//     if (content.blocks.length > 0 || content.title || content.navTitle) {
//       setShowDeleteConfirmation(true);
//     } else {
//       onDelete();
//     }
//   };

//   const confirmDelete = () => {
//     onDelete();
//     setShowDeleteConfirmation(false);
//   };

//   return (
//     <div className="space-y-4 border p-4 rounded-lg">
//       <div className="flex space-x-4">
//         <input
//           type="text"
//           value={content.title}
//           onChange={(e) => onChange({ ...content, title: e.target.value })}
//           className="flex-grow p-2 border rounded font-bold text-xl"
//           placeholder="Section Title"
//         />
//         <input
//           type="text"
//           value={content.navTitle}
//           onChange={(e) => onChange({ ...content, navTitle: e.target.value })}
//           className="flex-grow p-2 border rounded font-bold text-lg"
//           placeholder="Section Nav Title (optional)"
//         />
//       </div>
//       <div className="flex flex-wrap gap-2">
//         <button
//           onClick={() => addBlock("text")}
//           className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
//         >
//           Add Text
//         </button>
//         <button
//           onClick={() => addBlock("image")}
//           className="bg-green-500 text-white px-3 py-1 rounded text-sm"
//         >
//           Add Image
//         </button>
//         <button
//           onClick={() => addBlock("list")}
//           className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
//         >
//           Add List
//         </button>
//         <button
//           onClick={() => addBlock("faq")}
//           className="bg-purple-500 text-white px-3 py-1 rounded text-sm"
//         >
//           Add FAQ
//         </button>
//         <button
//           onClick={() => addBlock("callout")}
//           className="bg-red-500 text-white px-3 py-1 rounded text-sm"
//         >
//           Add Callout
//         </button>
//         <button
//           onClick={() => addBlock("heading")}
//           className="bg-indigo-500 text-white px-3 py-1 rounded text-sm"
//         >
//           Add Heading
//         </button>
//       </div>
//       <button
//         onClick={handleDeleteSection}
//         className="px-3 py-1 bg-red-500 text-white rounded text-sm"
//       >
//         Delete Section
//       </button>
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={content.blocks.map((block) => block.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           <div className="space-y-4">
//             {content.blocks.map((block) => (
//               <SortableItem key={block.id} id={block.id}>
//                 <div className="border p-4 rounded">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="font-bold">
//                       {block.type.charAt(0).toUpperCase() + block.type.slice(1)}
//                     </span>
//                     <button
//                       onClick={() => deleteBlock(block.id)}
//                       className="px-2 py-1 bg-red-500 text-white rounded text-sm"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                   {block.type === "text" && (
//                     <TextBlock
//                       content={block.content}
//                       onChange={(content) =>
//                         updateBlockContent(block.id, content)
//                       }
//                     />
//                   )}
//                   {block.type === "image" && (
//                     <ImageBlock
//                       content={block.content}
//                       onChange={(content) =>
//                         updateBlockContent(block.id, content)
//                       }
//                     />
//                   )}
//                   {block.type === "list" && (
//                     <ListBlock
//                       content={block.content}
//                       onChange={(content) =>
//                         updateBlockContent(block.id, content)
//                       }
//                     />
//                   )}
//                   {block.type === "faq" && (
//                     <FAQBlock
//                       content={block.content}
//                       onChange={(content) =>
//                         updateBlockContent(block.id, content)
//                       }
//                     />
//                   )}
//                   {block.type === "callout" && (
//                     <CalloutBlock
//                       content={block.content}
//                       onChange={(content) =>
//                         updateBlockContent(block.id, content)
//                       }
//                     />
//                   )}
//                   {block.type === "heading" && (
//                     <HeadingBlock
//                       content={block.content}
//                       onChange={(content) =>
//                         updateBlockContent(block.id, content)
//                       }
//                     />
//                   )}
//                 </div>
//               </SortableItem>
//             ))}
//           </div>
//         </SortableContext>
//       </DndContext>
//       {showDeleteConfirmation && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-4 rounded-lg">
//             <p className="mb-4">
//               This section contains content. Are you sure you want to delete it?
//             </p>
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => setShowDeleteConfirmation(false)}
//                 className="px-4 py-2 bg-gray-300 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// // }

"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TextBlock = dynamic(() => import("./TextBlock"), { ssr: false });
const ImageBlock = dynamic(() => import("./ImageBlock"), { ssr: false });
const ListBlock = dynamic(() => import("./ListBlock"), { ssr: false });
const FAQBlock = dynamic(() => import("./FAQBlock"), { ssr: false });
const CalloutBlock = dynamic(() => import("./CalloutBlock"), { ssr: false });
const HeadingBlock = dynamic(() => import("./HeadingBlock"), { ssr: false });

interface Block {
  id: string;
  type: string;
  content: any;
}

interface SectionBlockProps {
  content: {
    id: string;
    title: string;
    navTitle: string;
    blocks: Block[];
  };
  onChange: (content: {
    id: string;
    title: string;
    navTitle: string;
    blocks: Block[];
  }) => void;
  onDelete: () => void;
}

export default function SectionBlock({
  content,
  onChange,
  onDelete,
}: SectionBlockProps) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = content.blocks.findIndex(
        (block) => block.id === active.id
      );
      const newIndex = content.blocks.findIndex(
        (block) => block.id === over.id
      );

      onChange({
        ...content,
        blocks: arrayMove(content.blocks, oldIndex, newIndex),
      });
    }
  };

  const addBlock = (type: string) => {
    const newBlock = {
      id: uuidv4(),
      type,
      content:
        type === "text"
          ? { html: "", links: [] }
          : type === "image"
          ? { url: "", alt: "" }
          : type === "list"
          ? { type: "bullet", items: [] }
          : type === "faq"
          ? { question: "", answer: "" }
          : type === "callout"
          ? { type: "info", title: "", content: "" }
          : { level: "h2", text: "" },
    };
    onChange({
      ...content,
      blocks: [...content.blocks, newBlock],
    });
  };

  const updateBlockContent = (id: string, blockContent: any) => {
    onChange({
      ...content,
      blocks: content.blocks.map((block) =>
        block.id === id ? { ...block, content: blockContent } : block
      ),
    });
  };

  const deleteBlock = (id: string) => {
    onChange({
      ...content,
      blocks: content.blocks.filter((block) => block.id !== id),
    });
  };

  const handleDeleteSection = () => {
    if (content.blocks.length > 0 || content.title || content.navTitle) {
      setShowDeleteConfirmation(true);
    } else {
      onDelete();
    }
  };

  const confirmDelete = () => {
    onDelete();
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="space-y-4 border p-4 rounded-lg">
      <div className="flex space-x-4">
        <Input
          type="text"
          value={content.title}
          onChange={(e) => onChange({ ...content, title: e.target.value })}
          className="flex-grow font-bold text-xl"
          placeholder="Section Title"
        />
        <Input
          type="text"
          value={content.navTitle}
          onChange={(e) => onChange({ ...content, navTitle: e.target.value })}
          className="flex-grow font-bold text-lg"
          placeholder="Section Nav Title (optional)"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => addBlock("text")} variant="outline" size="sm">
          Add Text
        </Button>
        <Button onClick={() => addBlock("image")} variant="outline" size="sm">
          Add Image
        </Button>
        <Button onClick={() => addBlock("list")} variant="outline" size="sm">
          Add List
        </Button>
        <Button onClick={() => addBlock("faq")} variant="outline" size="sm">
          Add FAQ
        </Button>
        <Button onClick={() => addBlock("callout")} variant="outline" size="sm">
          Add Callout
        </Button>
        <Button onClick={() => addBlock("heading")} variant="outline" size="sm">
          Add Heading
        </Button>
      </div>
      <Button onClick={handleDeleteSection} variant="destructive" size="sm">
        Delete Section
      </Button>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={content.blocks.map((block) => block.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {content.blocks.map((block) => (
              <SortableItem key={block.id} id={block.id}>
                <div className="border p-4 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">
                      {block.type.charAt(0).toUpperCase() + block.type.slice(1)}
                    </span>
                    <Button
                      onClick={() => deleteBlock(block.id)}
                      variant="destructive"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </div>
                  {block.type === "text" && (
                    <TextBlock
                      content={block.content}
                      onChange={(content) =>
                        updateBlockContent(block.id, content)
                      }
                    />
                  )}
                  {block.type === "image" && (
                    <ImageBlock
                      content={block.content}
                      onChange={(content) =>
                        updateBlockContent(block.id, content)
                      }
                    />
                  )}
                  {block.type === "list" && (
                    <ListBlock
                      content={block.content}
                      onChange={(content) =>
                        updateBlockContent(block.id, content)
                      }
                    />
                  )}
                  {block.type === "faq" && (
                    <FAQBlock
                      content={block.content}
                      onChange={(content) =>
                        updateBlockContent(block.id, content)
                      }
                    />
                  )}
                  {block.type === "callout" && (
                    <CalloutBlock
                      content={block.content}
                      onChange={(content) =>
                        updateBlockContent(block.id, content)
                      }
                    />
                  )}
                  {block.type === "heading" && (
                    <HeadingBlock
                      content={block.content}
                      onChange={(content) =>
                        updateBlockContent(block.id, content)
                      }
                    />
                  )}
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <p className="mb-4">
              This section contains content. Are you sure you want to delete it?
            </p>
            <div className="flex justify-end space-x-2">
              <Button
                onClick={() => setShowDeleteConfirmation(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button onClick={confirmDelete} variant="destructive">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// import React from "react";
// import TextBlock from "./TextBlock";
// import ImageBlock from "./ImageBlock";
// import ListBlock from "./ListBlock";
// import FAQBlock from "./FAQBlock";
// import CalloutBlock from "./CalloutBlock";
// import HeadingBlock from "./HeadingBlock";

// interface SectionBlockProps {
//   section: {
//     type: string;
//     content: any;
//   };
//   onUpdate: (updatedSection: any) => void;
// }

// const SectionBlock: React.FC<SectionBlockProps> = ({ section, onUpdate }) => {
//   const handleContentChange = (newContent: any) => {
//     onUpdate({ ...section, content: newContent });
//   };

//   switch (section?.type) {
//     case "text":
//       return (
//         <TextBlock content={section.content} onChange={handleContentChange} />
//       );
//     case "image":
//       return (
//         <ImageBlock content={section.content} onChange={handleContentChange} />
//       );
//     case "list":
//       return (
//         <ListBlock content={section.content} onChange={handleContentChange} />
//       );
//     case "faq":
//       return (
//         <FAQBlock content={section.content} onChange={handleContentChange} />
//       );
//     case "callout":
//       return (
//         <CalloutBlock
//           content={section.content}
//           onChange={handleContentChange}
//         />
//       );
//     case "heading":
//       return (
//         <HeadingBlock
//           content={section.content}
//           onChange={handleContentChange}
//         />
//       );
//     default:
//       return null;
//   }
// };

// export default SectionBlock;
