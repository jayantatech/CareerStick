// "use client";

// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { v4 as uuidv4 } from "uuid";
// // import HeroImageBlock from "./HeroImageBlock";

// // import TitleBlock from "./TitleBlock";

// // import SectionBlock from "./SectionBlock";

// import AuthorBlock from "./AuthorBlock";
// // import RelatedPostsBlock from "./RelatedPostsBlock";

// // import StatusSelector from "./StatusSelector";

// import HeroImageBlock from "./HeroImageBlock";
// import TitleBlock from "./TitleBlock";
// import SectionBlock from "./SectionBlock";
// import RelatedPostsBlock from "./RelatedPostsBlock";
// import StatusSelector from "./StatusSelector";

// interface Block {
//   id: string;
//   type: string;
//   content: any;
// }

// export default function BlogEditor() {
//   const [blocks, setBlocks] = useState<Block[]>([
//     { id: uuidv4(), type: "heroImage", content: { url: "", alt: "" } },
//     { id: uuidv4(), type: "title", content: "" },
//   ]);
//   const [author, setAuthor] = useState({ name: "", bio: "", avatar: "" });
//   const [relatedPosts, setRelatedPosts] = useState<string[]>([]);
//   const [status, setStatus] = useState("draft");

//   const onDragEnd = (result: any) => {
//     if (!result.destination) return;

//     const newBlocks = Array.from(blocks);
//     const [reorderedItem] = newBlocks.splice(result.source.index, 1);
//     newBlocks.splice(result.destination.index, 0, reorderedItem);

//     setBlocks(newBlocks);
//   };

//   const addSection = () => {
//     const newSection: Block = {
//       id: uuidv4(),
//       type: "section",
//       content: { title: "", blocks: [] },
//     };
//     setBlocks([...blocks, newSection]);
//   };

//   const updateBlockContent = (id: string, content: any) => {
//     setBlocks(
//       blocks.map((block) => (block.id === id ? { ...block, content } : block))
//     );
//   };

//   const handleSave = () => {
//     const blogData = {
//       blocks,
//       author,
//       relatedPosts,
//       status,
//     };
//     console.log("Saving blog data:", blogData);
//     // Here you would typically send this data to your backend API
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">Blog Editor</h1>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="blog-content">
//           {(provided) => (
//             <div
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               className="space-y-4"
//             >
//               {blocks.map((block, index) => (
//                 <Draggable key={block.id} draggableId={block.id} index={index}>
//                   {(provided) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       className="border p-4 rounded shadow-sm"
//                     >
//                       {block.type === "heroImage" && (
//                         <HeroImageBlock
//                           content={block.content}
//                           onChange={(content) =>
//                             updateBlockContent(block.id, content)
//                           }
//                         />
//                       )}
//                       {block.type === "title" && (
//                         <TitleBlock
//                           content={block.content}
//                           onChange={(content) =>
//                             updateBlockContent(block.id, content)
//                           }
//                         />
//                       )}
//                       {block.type === "section" && (
//                         <SectionBlock
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
//       <button
//         onClick={addSection}
//         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Add Section
//       </button>
//       <div className="mt-8 space-y-4">
//         <AuthorBlock author={author} onChange={setAuthor} />
//         <RelatedPostsBlock
//           relatedPosts={relatedPosts}
//           onChange={setRelatedPosts}
//         />
//         <StatusSelector status={status} onChange={setStatus} />
//       </div>
//       <button
//         onClick={handleSave}
//         className="mt-8 bg-green-500 text-white px-6 py-3 rounded font-bold"
//       >
//         Save Blog Post
//       </button>
//     </div>
//   );
// }'use client'
"use client";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import HeroImageBlock from "./HeroImageBlock";
import TitleBlock from "./TitleBlock";
import SectionBlock from "./SectionBlock";
import AuthorBlock from "./AuthorBlock";
import RelatedPostsBlock from "./RelatedPostsBlock";
import StatusSelector from "./StatusSelector";

interface Block {
  id: string;
  type: string;
  content: any;
}

export default function BlogEditor() {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: uuidv4(), type: "heroImage", content: { url: "", alt: "" } },
    { id: uuidv4(), type: "title", content: "" },
  ]);
  const [author, setAuthor] = useState({ name: "", bio: "", avatar: "" });
  const [relatedPosts, setRelatedPosts] = useState<string[]>([]);
  const [status, setStatus] = useState("draft");

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const newBlocks = Array.from(blocks);
    const [reorderedItem] = newBlocks.splice(result.source.index, 1);
    newBlocks.splice(result.destination.index, 0, reorderedItem);

    setBlocks(newBlocks);
  };

  const addSection = () => {
    const newSection: Block = {
      id: uuidv4(),
      type: "section",
      content: { title: "", blocks: [] },
    };
    setBlocks([...blocks, newSection]);
  };

  // const updateBlockContent = (id: string, content: any) => {
  //   setBlocks(
  //     blocks.map((block) =>
  //       block.id === id
  //         ? {
  //             ...block,
  //             content: { ...content, navTitle: content.navTitle || "" },
  //           }
  //         : block
  //     )
  //   );
  // };

  const updateBlockContent = (id: string, content: any) => {
    setBlocks(
      blocks.map((block) => {
        if (block.id === id) {
          // For title blocks, directly use the string content
          if (block.type === "title") {
            return {
              ...block,
              content: content,
            };
          }
          // For other blocks, maintain the existing structure
          return {
            ...block,
            content: { ...content },
          };
        }
        return block;
      })
    );
  };
  const deleteSection = (id: string) => {
    setBlocks(blocks.filter((block) => block.id !== id));
  };

  const handleSave = () => {
    const blogData = {
      blocks,
      author,
      relatedPosts,
      status,
    };
    console.log("Saving blog data:", blogData);
    // Here you would typically send this data to your backend API
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blog Editor</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="blog-content">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {blocks.map((block, index) => (
                <Draggable key={block.id} draggableId={block.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="border p-4 rounded shadow-sm"
                    >
                      {block.type === "heroImage" && (
                        <HeroImageBlock
                          content={block.content}
                          onChange={(content) =>
                            updateBlockContent(block.id, content)
                          }
                        />
                      )}
                      {block.type === "title" && (
                        <TitleBlock
                          content={block.content}
                          onChange={(content) =>
                            updateBlockContent(block.id, content)
                          }
                        />
                      )}
                      {block.type === "section" && (
                        <SectionBlock
                          content={block.content}
                          onChange={(content) =>
                            updateBlockContent(block.id, content)
                          }
                          // onDelete={() => deleteSection(block.id)}
                        />
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button
        onClick={addSection}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Section
      </button>
      <div className="mt-8 space-y-4">
        <AuthorBlock author={author} onChange={setAuthor} />
        <RelatedPostsBlock
          relatedPosts={relatedPosts}
          onChange={setRelatedPosts}
        />
        <StatusSelector status={status} onChange={setStatus} />
      </div>
      <button
        onClick={handleSave}
        className="mt-8 bg-green-500 text-white px-6 py-3 rounded font-bold"
      >
        Save Blog Post
      </button>
    </div>
  );
}
