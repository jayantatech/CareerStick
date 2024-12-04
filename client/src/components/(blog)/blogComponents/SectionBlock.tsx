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
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

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
//         <Input
//           type="text"
//           value={content.title}
//           onChange={(e) => onChange({ ...content, title: e.target.value })}
//           className="flex-grow font-bold text-xl"
//           placeholder="Section Title"
//         />
//         <Input
//           type="text"
//           value={content.navTitle}
//           onChange={(e) => onChange({ ...content, navTitle: e.target.value })}
//           className="flex-grow font-bold text-lg"
//           placeholder="Section Nav Title (optional)"
//         />
//       </div>
//       <div className="flex flex-wrap gap-2">
//         <Button onClick={() => addBlock("text")} variant="outline" size="sm">
//           Add Text
//         </Button>
//         <Button onClick={() => addBlock("image")} variant="outline" size="sm">
//           Add Image
//         </Button>
//         <Button onClick={() => addBlock("list")} variant="outline" size="sm">
//           Add List
//         </Button>
//         <Button onClick={() => addBlock("faq")} variant="outline" size="sm">
//           Add FAQ
//         </Button>
//         <Button onClick={() => addBlock("callout")} variant="outline" size="sm">
//           Add Callout
//         </Button>
//         <Button onClick={() => addBlock("heading")} variant="outline" size="sm">
//           Add Heading
//         </Button>
//       </div>
//       <Button onClick={handleDeleteSection} variant="destructive" size="sm">
//         Delete Section
//       </Button>
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
//                     <Button
//                       onClick={() => deleteBlock(block.id)}
//                       variant="destructive"
//                       size="sm"
//                     >
//                       Delete
//                     </Button>
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
//               <Button
//                 onClick={() => setShowDeleteConfirmation(false)}
//                 variant="outline"
//               >
//                 Cancel
//               </Button>
//               <Button onClick={confirmDelete} variant="destructive">
//                 Delete
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

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
  DragEndEvent,
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

type BlockType = "text" | "image" | "list" | "faq" | "callout" | "heading";

interface BlockContent {
  html?: string;
  url?: string;
  alt?: string;
  type?: string;
  items?: string[];
  question?: string;
  answer?: string;
  level?: string;
  text?: string;
  title?: string;
  links?: { text: string; url: string }[];
}

interface Block {
  id: string;
  type: BlockType;
  content: BlockContent;
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
interface Link {
  text: string;
  url: string;
  type: "internal" | "external";
  doFollow: boolean;
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
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

  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: uuidv4(),
      type,
      content: getDefaultBlockContent(type),
    };

    onChange({
      ...content,
      blocks: [...content.blocks, newBlock],
    });
  };

  const getDefaultBlockContent = (type: BlockType): BlockContent => {
    const defaultContent: Record<BlockType, BlockContent> = {
      text: { html: "", links: [] },
      image: { url: "", alt: "" },
      list: { type: "bullet", items: [] },
      faq: { question: "", answer: "" },
      callout: { type: "info", title: "", text: "" },
      heading: { level: "h2", text: "" },
    };

    return defaultContent[type];
  };

  const updateBlockContent = (id: string, blockContent: BlockContent) => {
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
                      content={block.content as { html: string; links: Link[] }}
                      onChange={(content) =>
                        updateBlockContent(block.id, content)
                      }
                    />
                  )}
                  {block.type === "image" && (
                    <ImageBlock
                      content={block.content as { url: string; alt: string }}
                      onChange={(content) =>
                        updateBlockContent(block.id, content)
                      }
                    />
                  )}
                  {block.type === "list" && (
                    <ListBlock
                      content={
                        block.content as {
                          type: "bullet" | "numbered" | "checklist";
                          items: string[];
                        }
                      }
                      onChange={(content) =>
                        updateBlockContent(block.id, content)
                      }
                    />
                  )}
                  {block.type === "faq" && (
                    <FAQBlock
                      content={
                        block.content as { question: string; answer: string }
                      }
                      onChange={(content) =>
                        updateBlockContent(block.id, content)
                      }
                    />
                  )}
                  {block.type === "callout" && (
                    <CalloutBlock
                      content={
                        block.content as {
                          type: "info" | "warning" | "tip" | "note";
                          title: string;
                          content: string;
                          icon: string;
                          links: {
                            text: string;
                            url: string;
                            type: "internal" | "external";
                            openInNewTab: boolean;
                          }[];
                        }
                      }
                      onChange={(content) =>
                        updateBlockContent(block.id, content)
                      }
                    />
                  )}
                  {block.type === "heading" && (
                    <HeadingBlock
                      content={
                        block.content as {
                          level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
                          text: string;
                        }
                      }
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
