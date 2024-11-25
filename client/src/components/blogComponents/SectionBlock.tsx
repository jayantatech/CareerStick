// import React from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { v4 as uuidv4 } from "uuid";
// // import TextBlock from "./TextBlock";

// import ImageBlock from "./ImageBlock";
// import ListBlock from "./ListBlock";
// import FAQBlock from "./FAQBlock";
// import CalloutBlock from "./CalloutBlock";
// import TextBlock from "./TextBlock";

// interface SectionBlockProps {
//   content: { title: string; blocks: any[] };
//   onChange: (content: { title: string; blocks: any[] }) => void;
// }

// export default function SectionBlock({ content, onChange }: SectionBlockProps) {
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
//           ? ""
//           : type === "image"
//           ? { url: "", alt: "" }
//           : type === "list"
//           ? { type: "bullet", items: [] }
//           : type === "faq"
//           ? { question: "", answer: "" }
//           : { type: "info", title: "", content: "", icon: "", links: [] },
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

//   return (
//     <div className="space-y-4">
//       <input
//         type="text"
//         value={content.title}
//         onChange={(e) => onChange({ ...content, title: e.target.value })}
//         className="w-full p-2 border rounded font-bold text-xl"
//         placeholder="Section Title"
//       />
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
//       </div>
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
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </div>
//   );
// }
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import TextBlock from "./TextBlock";
import ImageBlock from "./ImageBlock";
import ListBlock from "./ListBlock";
import FAQBlock from "./FAQBlock";
import CalloutBlock from "./CalloutBlock";
import HeadingBlock from "./HeadingBlock";

interface SectionBlockProps {
  content: { title: string; blocks: any[] };
  onChange: (content: { title: string; blocks: any[] }) => void;
}

export default function SectionBlock({ content, onChange }: SectionBlockProps) {
  const [navTitle, setNavTitle] = useState("");

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const newBlocks = Array.from(content.blocks);
    const [reorderedItem] = newBlocks.splice(result.source.index, 1);
    newBlocks.splice(result.destination.index, 0, reorderedItem);

    onChange({ ...content, blocks: newBlocks });
  };

  const addBlock = (type: string) => {
    const newBlock = {
      id: uuidv4(),
      type,
      content:
        type === "text"
          ? ""
          : type === "image"
          ? { url: "", alt: "" }
          : type === "list"
          ? { type: "bullet", items: [] }
          : type === "faq"
          ? { question: "", answer: "" }
          : type === "callout"
          ? { type: "info", title: "", content: "", icon: "", links: [] }
          : { level: "h2", text: "" },
    };
    onChange({ ...content, blocks: [...content.blocks, newBlock] });
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

  const onDelete = () => {
    // Implement your delete section logic here
    console.log("Delete section");
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={content.title}
        onChange={(e) => onChange({ ...content, title: e.target.value })}
        className="w-full p-2 border rounded font-bold text-xl"
        placeholder="Section Title"
      />
      <input
        type="text"
        value={navTitle}
        onChange={(e) => setNavTitle(e.target.value)}
        className="w-full p-2 border rounded font-bold text-lg"
        placeholder="Section Nav Title (optional)"
      />
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => addBlock("text")}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
        >
          Add Text
        </button>
        <button
          onClick={() => addBlock("image")}
          className="bg-green-500 text-white px-3 py-1 rounded text-sm"
        >
          Add Image
        </button>
        <button
          onClick={() => addBlock("list")}
          className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
        >
          Add List
        </button>
        <button
          onClick={() => addBlock("faq")}
          className="bg-purple-500 text-white px-3 py-1 rounded text-sm"
        >
          Add FAQ
        </button>
        <button
          onClick={() => addBlock("callout")}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm"
        >
          Add Callout
        </button>
        <button
          onClick={() => addBlock("heading")}
          className="bg-indigo-500 text-white px-3 py-1 rounded text-sm"
        >
          Add Heading
        </button>
      </div>
      <button
        onClick={() => onDelete()}
        className="px-3 py-1 bg-red-500 text-white rounded text-sm"
      >
        Delete Section
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={`section-${content.title}`}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {content.blocks.map((block, index) => (
                <Draggable key={block.id} draggableId={block.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="border w-full bg-redd-600 p-4  rounded flex items-start justify-start flex-col"
                    >
                      {block.type === "text" && (
                        <TextBlock
                          content={block.content}
                          onChange={(content) =>
                            updateBlockContent(block.id, content)
                          }
                        />
                      )}
                      {block.type === "image" && (
                        <div className="w-full">
                          <ImageBlock
                            content={block.content}
                            onChange={(content) =>
                              updateBlockContent(block.id, content)
                            }
                          />
                        </div>
                      )}
                      {block.type === "list" && (
                        <div className="w-full">
                          <ListBlock
                            content={block.content}
                            onChange={(content) =>
                              updateBlockContent(block.id, content)
                            }
                          />
                        </div>
                      )}
                      {block.type === "faq" && (
                        <div className="w-full">
                          <FAQBlock
                            content={block.content}
                            onChange={(content) =>
                              updateBlockContent(block.id, content)
                            }
                          />
                        </div>
                      )}
                      {block.type === "callout" && (
                        <div className="w-full">
                          <CalloutBlock
                            content={block.content}
                            onChange={(content) =>
                              updateBlockContent(block.id, content)
                            }
                          />
                        </div>
                      )}
                      {block.type === "heading" && (
                        <div className="w-full">
                          <HeadingBlock
                            content={block.content}
                            onChange={(content) =>
                              updateBlockContent(block.id, content)
                            }
                          />
                        </div>
                      )}
                      <div className="w-full h-[44px] flex items-center justify-end">
                        <button
                          onClick={() => deleteBlock(block.id)}
                          className="px-2 top-0 right-0 py-1 bg-red-500 text-white rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
