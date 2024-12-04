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
// // }'use client'
// "use client";
// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { v4 as uuidv4 } from "uuid";
// import HeroImageBlock from "./HeroImageBlock";
// import TitleBlock from "./TitleBlock";
// import SectionBlock from "./SectionBlock";
// import AuthorBlock from "./AuthorBlock";
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

//   // const updateBlockContent = (id: string, content: any) => {
//   //   setBlocks(
//   //     blocks.map((block) =>
//   //       block.id === id
//   //         ? {
//   //             ...block,
//   //             content: { ...content, navTitle: content.navTitle || "" },
//   //           }
//   //         : block
//   //     )
//   //   );
//   // };

//   const updateBlockContent = (id: string, content: any) => {
//     setBlocks(
//       blocks.map((block) => {
//         if (block.id === id) {
//           // For title blocks, directly use the string content
//           if (block.type === "title") {
//             return {
//               ...block,
//               content: content,
//             };
//           }
//           // For other blocks, maintain the existing structure
//           return {
//             ...block,
//             content: { ...content },
//           };
//         }
//         return block;
//       })
//     );
//   };
//   const deleteSection = (id: string) => {
//     setBlocks(blocks.filter((block) => block.id !== id));
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
//                           onSectionDelete={() => deleteSection(block.id)}
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
// }

// "use client";

// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { v4 as uuidv4 } from "uuid";
// import HeroImageBlock from "./HeroImageBlock";
// import TitleBlock from "./TitleBlock";
// import SectionBlock from "./SectionBlock";
// import AuthorBlock from "./AuthorBlock";
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
//       content: { title: "", navTitle: "", blocks: [] },
//     };
//     setBlocks([...blocks, newSection]);
//   };

//   const updateBlockContent = (id: string, content: any) => {
//     setBlocks(
//       blocks.map((block) => (block.id === id ? { ...block, content } : block))
//     );
//   };

//   const deleteSection = (id: string) => {
//     setBlocks(blocks.filter((block) => block.id !== id));
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
//                           onDelete={() => deleteSection(block.id)}
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
// // }
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
// // import SortableItem from "./SortableItem";

// import SectionBlock from "./SectionBlock";
// import HeroImageBlock from "./HeroImageBlock";
// import TitleBlock from "./TitleBlock";
// import AuthorBlock from "./AuthorBlock";
// import RelatedPostsBlock from "./RelatedPostsBlock";
// import StatusSelector from "./StatusSelector";
// import SortableItem from "./SortableItem";
// // import StatusSelector from "./StatusSelector";

// export default function BlogEditor() {
//   const [blogPost, setBlogPost] = useState({
//     heroImage: { url: "", alt: "" },
//     title: "",
//     sections: [],
//     author: { name: "", bio: "", avatar: "" },
//     relatedPosts: [],
//     status: "draft",
//   });

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       setBlogPost((blogPost) => {
//         const oldIndex = blogPost.sections.findIndex(
//           (section) => section.id === active.id
//         );
//         const newIndex = blogPost.sections.findIndex(
//           (section) => section.id === over.id
//         );

//         return {
//           ...blogPost,
//           sections: arrayMove(blogPost.sections, oldIndex, newIndex),
//         };
//       });
//     }
//   };

//   const addSection = () => {
//     setBlogPost({
//       ...blogPost,
//       sections: [
//         ...blogPost.sections,
//         { id: uuidv4(), title: "", navTitle: "", blocks: [] },
//       ],
//     });
//   };

//   const updateSection = (id: string, content: any) => {
//     setBlogPost({
//       ...blogPost,
//       sections: blogPost.sections.map((section) =>
//         section.id === id ? { ...section, ...content } : section
//       ),
//     });
//   };

//   const deleteSection = (id: string) => {
//     setBlogPost({
//       ...blogPost,
//       sections: blogPost.sections.filter((section) => section.id !== id),
//     });
//   };

//   const saveBlogPost = () => {
//     console.log("Saving blog post:", blogPost);
//     // Here you would typically send the data to your backend API
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4 space-y-6">
//       <HeroImageBlock
//         content={blogPost.heroImage}
//         onChange={(heroImage) => setBlogPost({ ...blogPost, heroImage })}
//       />
//       <TitleBlock
//         content={blogPost.title}
//         onChange={(title) => setBlogPost({ ...blogPost, title })}
//       />
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={blogPost.sections.map((section) => section.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           {blogPost.sections.map((section) => (
//             <SortableItem key={section.id} id={section.id}>
//               <SectionBlock
//                 content={section}
//                 onChange={(content) => updateSection(section.id, content)}
//                 onDelete={() => deleteSection(section.id)}
//               />
//             </SortableItem>
//           ))}
//         </SortableContext>
//       </DndContext>
//       <button
//         onClick={addSection}
//         className="bg-green-500 text-white px-4 py-2 rounded"
//       >
//         Add Section
//       </button>
//       <AuthorBlock
//         content={blogPost.author}
//         onChange={(author) => setBlogPost({ ...blogPost, author })}
//       />
//       <RelatedPostsBlock
//         content={blogPost.relatedPosts}
//         onChange={(relatedPosts) => setBlogPost({ ...blogPost, relatedPosts })}
//       />
//       <StatusSelector
//         status={blogPost.status}
//         onChange={(status) => setBlogPost({ ...blogPost, status })}
//       />
//       <button
//         onClick={saveBlogPost}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Save Blog Post
//       </button>
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
// import SectionBlock from "./SectionBlock";
// import HeroImageBlock from "./HeroImageBlock";
// import TitleBlock from "./TitleBlock";
// import AuthorBlock from "./AuthorBlock";
// import RelatedPostsBlock from "./RelatedPostsBlock";
// import StatusSelector from "./StatusSelector";

// // Define types for our blog post structure
// interface HeroImage {
//   url: string;
//   alt: string;
// }

// interface Author {
//   name: string;
//   bio: string;
//   avatar: string;
// }

// interface Block {
//   id: string;
//   type: string;
//   content: any; // You might want to define more specific types for different block types
// }

// interface Section {
//   id: string;
//   title: string;
//   navTitle: string;
//   blocks: Block[];
// }

// interface BlogPost {
//   heroImage: HeroImage;
//   title: string;
//   sections: Section[];
//   author: Author;
//   relatedPosts: string[]; // Assuming related posts are stored as strings (e.g., post IDs or titles)
//   status: string;
// }

// export default function BlogEditor() {
//   const [blogPost, setBlogPost] = useState<BlogPost>({
//     heroImage: { url: "", alt: "" },
//     title: "",
//     sections: [],
//     author: { name: "", bio: "", avatar: "" },
//     relatedPosts: [],
//     status: "draft",
//   });

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       setBlogPost((blogPost) => {
//         const oldIndex = blogPost.sections.findIndex(
//           (section) => section.id === active.id
//         );
//         const newIndex = blogPost.sections.findIndex(
//           (section) => section.id === over.id
//         );

//         return {
//           ...blogPost,
//           sections: arrayMove(blogPost.sections, oldIndex, newIndex),
//         };
//       });
//     }
//   };

//   const addSection = () => {
//     setBlogPost({
//       ...blogPost,
//       sections: [
//         ...blogPost.sections,
//         { id: uuidv4(), title: "", navTitle: "", blocks: [] },
//       ],
//     });
//   };

//   const updateSection = (id: string, content: Partial<Section>) => {
//     setBlogPost({
//       ...blogPost,
//       sections: blogPost.sections.map((section) =>
//         section.id === id ? { ...section, ...content } : section
//       ),
//     });
//   };

//   const deleteSection = (id: string) => {
//     setBlogPost({
//       ...blogPost,
//       sections: blogPost.sections.filter((section) => section.id !== id),
//     });
//   };

//   const saveBlogPost = () => {
//     console.log("Saving blog post:", blogPost);
//     // Here you would typically send the data to your backend API
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4 space-y-6">
//       <HeroImageBlock
//         content={blogPost.heroImage}
//         onChange={(heroImage) => setBlogPost({ ...blogPost, heroImage })}
//       />
//       <TitleBlock
//         content={blogPost.title}
//         onChange={(title) => setBlogPost({ ...blogPost, title })}
//       />
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={blogPost.sections.map((section) => section.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           {blogPost.sections.map((section) => (
//             <SortableItem key={section.id} id={section.id}>
//               <SectionBlock
//                 content={section}
//                 onChange={(content) => updateSection(section.id, content)}
//                 onDelete={() => deleteSection(section.id)}
//               />
//             </SortableItem>
//           ))}
//         </SortableContext>
//       </DndContext>
//       <button
//         onClick={addSection}
//         className="bg-green-500 text-white px-4 py-2 rounded"
//       >
//         Add Section
//       </button>
//       <AuthorBlock
//         author={blogPost.author}
//         onChange={(author) => setBlogPost({ ...blogPost, author })}
//       />
//       <RelatedPostsBlock
//         relatedPosts={blogPost.relatedPosts}
//         onChange={(relatedPosts) => setBlogPost({ ...blogPost, relatedPosts })}
//       />
//       <StatusSelector
//         status={blogPost.status}
//         onChange={(status) => setBlogPost({ ...blogPost, status })}
//       />
//       <button
//         onClick={saveBlogPost}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Save Blog Post
//       </button>
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
// import SectionBlock from "./SectionBlock";
// import HeroImageBlock from "./HeroImageBlock";
// import TitleBlock from "./TitleBlock";
// import AuthorBlock from "./AuthorBlock";
// import RelatedPostsBlock from "./RelatedPostsBlock";
// import StatusSelector from "./StatusSelector";

// interface HeroImage {
//   url: string;
//   alt: string;
// }

// interface Author {
//   name: string;
//   bio: string;
//   avatar: string;
// }

// interface Block {
//   id: string;
//   type: string;
//   content: any;
// }

// interface Section {
//   id: string;
//   title: string;
//   navTitle: string;
//   blocks: Block[];
// }

// interface BlogPost {
//   heroImage: HeroImage;
//   title: string;
//   sections: Section[];
//   author: Author;
//   relatedPosts: string[];
//   status: string;
// }

// export default function BlogEditor() {
//   const [blogPost, setBlogPost] = useState<BlogPost>({
//     heroImage: { url: "", alt: "" },
//     title: "",
//     sections: [],
//     author: { name: "", bio: "", avatar: "" },
//     relatedPosts: [],
//     status: "draft",
//   });

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       setBlogPost((blogPost) => {
//         const oldIndex = blogPost.sections.findIndex(
//           (section) => section.id === active.id
//         );
//         const newIndex = blogPost.sections.findIndex(
//           (section) => section.id === over.id
//         );

//         return {
//           ...blogPost,
//           sections: arrayMove(blogPost.sections, oldIndex, newIndex),
//         };
//       });
//     }
//   };

//   const addSection = () => {
//     setBlogPost({
//       ...blogPost,
//       sections: [
//         ...blogPost.sections,
//         { id: uuidv4(), title: "", navTitle: "", blocks: [] },
//       ],
//     });
//   };

//   const updateSection = (id: string, content: Section) => {
//     setBlogPost({
//       ...blogPost,
//       sections: blogPost.sections.map((section) =>
//         section.id === id ? { ...section, ...content } : section
//       ),
//     });
//   };

//   const deleteSection = (id: string) => {
//     setBlogPost({
//       ...blogPost,
//       sections: blogPost.sections.filter((section) => section.id !== id),
//     });
//   };

//   const saveBlogPost = () => {
//     console.log("Saving blog post:", blogPost);
//     // Here you would typically send the data to your backend API
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4 space-y-6">
//       <HeroImageBlock
//         content={blogPost.heroImage}
//         onChange={(heroImage) => setBlogPost({ ...blogPost, heroImage })}
//       />
//       <TitleBlock
//         content={blogPost.title}
//         onChange={(title) => setBlogPost({ ...blogPost, title })}
//       />
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={blogPost.sections.map((section) => section.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           {blogPost.sections.map((section) => (
//             <SortableItem key={section.id} id={section.id}>
//               <SectionBlock
//                 content={section}
//                 onChange={(content) => updateSection(section.id, content)}
//                 onDelete={() => deleteSection(section.id)}
//               />
//             </SortableItem>
//           ))}
//         </SortableContext>
//       </DndContext>
//       <button
//         onClick={addSection}
//         className="bg-green-500 text-white px-4 py-2 rounded"
//       >
//         Add Section
//       </button>
//       <AuthorBlock
//         author={blogPost.author}
//         onChange={(author) => setBlogPost({ ...blogPost, author })}
//       />
//       <RelatedPostsBlock
//         relatedPosts={blogPost.relatedPosts}
//         onChange={(relatedPosts) => setBlogPost({ ...blogPost, relatedPosts })}
//       />
//       <StatusSelector
//         status={blogPost.status}
//         onChange={(status) => setBlogPost({ ...blogPost, status })}
//       />
//       <button
//         onClick={saveBlogPost}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Save Blog Post
//       </button>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useCallback } from "react";
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
// import SectionBlock from "./SectionBlock";
// import HeroImageBlock from "./HeroImageBlock";
// import TitleBlock from "./TitleBlock";
// import AuthorBlock from "./AuthorBlock";
// import RelatedPostsBlock from "./RelatedPostsBlock";
// import StatusSelector from "./StatusSelector";

// interface HeroImage {
//   url: string;
//   alt: string;
// }

// interface Author {
//   name: string;
//   bio: string;
//   avatar: string;
// }

// interface Block {
//   id: string;
//   type: string;

//   content: any;
// }

// interface Section {
//   id: string;
//   title: string;
//   navTitle: string;
//   blocks: Block[];
// }

// interface BlogPost {
//   heroImage: HeroImage;
//   title: string;
//   sections: Section[];
//   author: Author;
//   relatedPosts: string[];
//   status: string;
// }

// export default function BlogEditor() {
//   const [blogPost, setBlogPost] = useState<BlogPost>({
//     heroImage: { url: "", alt: "" },
//     title: "",
//     sections: [],
//     author: { name: "", bio: "", avatar: "" },
//     relatedPosts: [],
//     status: "draft",
//   });

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const handleDragEnd = useCallback((event: any) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       setBlogPost((prevBlogPost) => {
//         const oldIndex = prevBlogPost.sections.findIndex(
//           (section) => section.id === active.id
//         );
//         const newIndex = prevBlogPost.sections.findIndex(
//           (section) => section.id === over.id
//         );

//         return {
//           ...prevBlogPost,
//           sections: arrayMove(prevBlogPost.sections, oldIndex, newIndex),
//         };
//       });
//     }
//   }, []);

//   const addSection = useCallback(() => {
//     setBlogPost((prevBlogPost) => ({
//       ...prevBlogPost,
//       sections: [
//         ...prevBlogPost.sections,
//         { id: uuidv4(), title: "", navTitle: "", blocks: [] },
//       ],
//     }));
//   }, []);

//   const updateSection = useCallback((id: string, content: Section) => {
//     setBlogPost((prevBlogPost) => ({
//       ...prevBlogPost,
//       sections: prevBlogPost.sections.map((section) =>
//         section.id === id ? { ...section, ...content } : section
//       ),
//     }));
//   }, []);

//   const deleteSection = useCallback((id: string) => {
//     setBlogPost((prevBlogPost) => ({
//       ...prevBlogPost,
//       sections: prevBlogPost.sections.filter((section) => section.id !== id),
//     }));
//   }, []);

//   const saveBlogPost = useCallback(() => {
//     console.log("Saving blog post:", blogPost);
//     // Here you would typically send the data to your backend API
//   }, [blogPost]);

//   return (
//     <div className="max-w-4xl mx-auto p-4 space-y-6">
//       <HeroImageBlock
//         content={blogPost.heroImage}
//         onChange={(heroImage) =>
//           setBlogPost((prev) => ({ ...prev, heroImage }))
//         }
//       />
//       <TitleBlock
//         content={blogPost.title}
//         onChange={(title) => setBlogPost((prev) => ({ ...prev, title }))}
//       />
//       {/* <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       > */}
//       {/* <SortableContext
//           items={blogPost.sections.map((section) => section.id)}
//           strategy={verticalListSortingStrategy}
//         > */}
//       {blogPost.sections.map((section) => (
//         <SortableItem key={section.id} id={section.id}>
//           <SectionBlock
//             content={section}
//             onChange={(content) => updateSection(section.id, content)}
//             onDelete={() => deleteSection(section.id)}
//           />
//         </SortableItem>
//       ))}
//       {/* </SortableContext> */}
//       {/* </DndContext> */}
//       <button
//         onClick={addSection}
//         className="bg-green-500 text-white px-4 py-2 rounded"
//       >
//         Add Section
//       </button>
//       <AuthorBlock
//         author={blogPost.author}
//         onChange={(author) => setBlogPost((prev) => ({ ...prev, author }))}
//       />
//       <RelatedPostsBlock
//         relatedPosts={blogPost.relatedPosts}
//         onChange={(relatedPosts) =>
//           setBlogPost((prev) => ({ ...prev, relatedPosts }))
//         }
//       />
//       <StatusSelector
//         status={blogPost.status}
//         onChange={(status) => setBlogPost((prev) => ({ ...prev, status }))}
//       />
//       <button
//         onClick={saveBlogPost}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Save Blog Post
//       </button>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useCallback, useEffect } from "react";
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
// import SectionBlock from "./SectionBlock";
// import HeroImageBlock from "./HeroImageBlock";
// import TitleBlock from "./TitleBlock";
// import AuthorBlock from "./AuthorBlock";
// import RelatedPostsBlock from "./RelatedPostsBlock";
// import StatusSelector from "./StatusSelector";
// import { Button } from "@/components/ui/button";
// import api from "@/lib/api";
// import SEOBlock from "./SEOBlock";
// import DescriptionBlock from "./DescriptionBlock";
// import { useParams, useRouter } from "next/navigation";
// import { toast } from "sonner";
// import useAuth from "@/lib/hooks/useAuth";

// interface HeroImage {
//   url: string;
//   alt: string;
// }

// interface Author {
//   name: string;
//   bio: string;
//   avatar: string;
// }

// interface Block {
//   id: string;
//   type: string;
//   content: any;
// }

// interface Section {
//   id: string;
//   title: string;
//   navTitle: string;
//   blocks: Block[];
// }
// interface SEO {
//   title: string;
//   description: string;
//   canonicalUrl: string;
// }
// interface Link {
//   text: string;
//   url: string;
//   type: "internal" | "external";
//   doFollow: boolean;
// }
// interface Description {
//   html: string;
//   links: Link[];
// }
// interface BlogPost {
//   heroImage: HeroImage;
//   title: string;
//   description: Description;
//   sections: Section[];
//   author: Author;
//   relatedPosts: string[];
//   status: string;
//   slug: string;
//   seo: SEO;
//   // readTime: number;
// }

// export default function BlogEditor() {
//   const [blogPost, setBlogPost] = useState<BlogPost>({
//     heroImage: { url: "", alt: "" },
//     title: "",
//     description: { html: "", links: [] }, // Initialize description
//     slug: "",
//     sections: [],
//     author: { name: "", bio: "", avatar: "" },
//     relatedPosts: [],
//     status: "draft",
//     seo: {
//       title: "",
//       description: "",
//       canonicalUrl: "",
//     },
//     // readTime: 0,
//   });
//   const router = useRouter();
//   const param = useParams();
//   console.log("param in BlogEditor", param);
//   const { user, isLoading } = useAuth();
//   if (!param.blog_id || param.blog_id.length !== 24) {
//     router.push("/admin/blog-posts");
//   }
//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const handleDragEnd = useCallback((event: any) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       setBlogPost((prevBlogPost) => {
//         const oldIndex = prevBlogPost.sections.findIndex(
//           (section) => section.id === active.id
//         );
//         const newIndex = prevBlogPost.sections.findIndex(
//           (section) => section.id === over.id
//         );

//         return {
//           ...prevBlogPost,
//           sections: arrayMove(prevBlogPost.sections, oldIndex, newIndex),
//         };
//       });
//     }
//   }, []);

//   const addSection = useCallback(() => {
//     setBlogPost((prevBlogPost) => ({
//       ...prevBlogPost,
//       sections: [
//         ...prevBlogPost.sections,
//         { id: uuidv4(), title: "", navTitle: "", blocks: [] },
//       ],
//     }));
//   }, []);

//   const updateSection = useCallback((id: string, content: Section) => {
//     setBlogPost((prevBlogPost) => ({
//       ...prevBlogPost,
//       sections: prevBlogPost.sections.map((section) =>
//         section.id === id ? { ...section, ...content } : section
//       ),
//     }));
//   }, []);

//   const deleteSection = useCallback((id: string) => {
//     setBlogPost((prevBlogPost) => ({
//       ...prevBlogPost,
//       sections: prevBlogPost.sections.filter((section) => section.id !== id),
//     }));
//   }, []);

//   const saveBlogPost = useCallback(async () => {
//     // Here you would typically send the data to your backend API
//     if (!param.blog_id) return;
//     if (!user?._id) return;
//     if (isLoading) return;
//     try {
//       console.log("Saving blog post:", blogPost);
//       const response = await api.post(`/blog/save/${param.blog_id}`, {
//         blogData: blogPost,
//         userId: user?._id,
//       });
//       console.log("response.data for save click", response.data);
//     } catch (error) {
//       console.error("Error creating blog:", error);
//       toast.error("Failed to get save blog");
//     }
//   }, [blogPost]);

//   useEffect(() => {
//     const getBlogPost = async () => {
//       console.log("trying to get blog post");
//       if (!user?._id) return;
//       if (isLoading) return;
//       if (!param.blog_id) return;
//       try {
//         console.log("trying to send  request");

//         const response = await api.post(`/blog/article/${param.blog_id}`, {
//           userId: user._id,
//         });
//         console.log("made the send  request");

//         console.log("response.data for button click", response.data);
//         if (response.data.success) {
//           const blogData = response.data.data;
//           setBlogPost({
//             heroImage: blogData.heroImage || { url: "", alt: "" },
//             title: blogData.title || "",
//             description: blogData.description || { html: "", links: [] }, // Initialize description
//             slug: blogData.slug || "",
//             sections: blogData.sections,
//             author: blogData.author || { name: "", bio: "", avatar: "" },
//             relatedPosts: blogData.relatedPosts || [],
//             status: blogData.status || "draft",
//             seo: blogData.seo || {
//               title: "",
//               description: "",
//               canonicalUrl: "",
//             },
//             // readTime: blogData.readTime || 0,
//           });
//           // setBlogPost({ ...blogPost, heroImage: blogData.heroImage });
//           console.log("blogPost", blogPost);
//         }
//       } catch (error) {
//         console.error("Error creating blog:", error);
//         toast.error("Failed to get blog");
//       }
//     };
//     getBlogPost();
//   }, [param.blog_id, user?._id, isLoading]);

//   return (
//     <div className="max-w-4xl mx-auto p-4 space-y-6">
//       <HeroImageBlock
//         content={blogPost.heroImage}
//         onChange={(heroImage) =>
//           setBlogPost((prev) => ({ ...prev, heroImage }))
//         }
//       />
//       <TitleBlock
//         content={blogPost.title}
//         onChange={(title) => setBlogPost((prev) => ({ ...prev, title }))}
//       />

//       <DescriptionBlock
//         content={blogPost.description}
//         onChange={(description) =>
//           setBlogPost((prev) => ({ ...prev, description }))
//         }
//       />
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={blogPost.sections.map((section) => section.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           {blogPost.sections.map((section) => (
//             <SortableItem key={section.id} id={section.id}>
//               <SectionBlock
//                 content={section}
//                 onChange={(content) => updateSection(section.id, content)}
//                 onDelete={() => deleteSection(section.id)}
//               />
//             </SortableItem>
//           ))}
//         </SortableContext>
//       </DndContext>
//       <Button onClick={addSection} variant="outline">
//         Add Section
//       </Button>
//       <AuthorBlock
//         author={blogPost.author}
//         onChange={(author) => setBlogPost((prev) => ({ ...prev, author }))}
//       />
//       <RelatedPostsBlock
//         relatedPosts={blogPost.relatedPosts}
//         onChange={(relatedPosts) =>
//           setBlogPost((prev) => ({ ...prev, relatedPosts }))
//         }
//       />
//       <SEOBlock
//         seo={blogPost.seo}
//         onChange={(seo) =>
//           setBlogPost((prev) => ({ ...prev, slug: seo.canonicalUrl, seo }))
//         }
//       />

//       <StatusSelector
//         status={blogPost.status}
//         onChange={(status) => setBlogPost((prev) => ({ ...prev, status }))}
//       />
//       <Button onClick={saveBlogPost} className="text-white" variant="default">
//         Save Blog Post
//       </Button>
//     </div>
//   );
// }

"use client";

import React, { useState, useCallback, useEffect } from "react";
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
import SectionBlock from "./SectionBlock";
import HeroImageBlock from "./HeroImageBlock";
import TitleBlock from "./TitleBlock";
import AuthorBlock from "./AuthorBlock";
import RelatedPostsBlock from "./RelatedPostsBlock";
import StatusSelector from "./StatusSelector";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import SEOBlock from "./SEOBlock";
import DescriptionBlock from "./DescriptionBlock";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import useAuth from "@/lib/hooks/useAuth";

interface HeroImage {
  url: string;
  alt: string;
}
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
interface Author {
  name: string;
  bio: string;
  avatar: string;
}
type BlockType = "text" | "image" | "list" | "faq" | "callout" | "heading";

interface Block {
  id: string;
  type: BlockType;
  content: BlockContent;
}

interface Section {
  id: string;
  title: string;
  navTitle: string;
  blocks: Block[];
}

interface SEO {
  title: string;
  description: string;
  canonicalUrl: string;
}

interface Link {
  text: string;
  url: string;
  type: "internal" | "external";
  doFollow: boolean;
}

interface Description {
  html: string;
  links: Link[];
}

interface BlogPost {
  heroImage: HeroImage;
  title: string;
  description: Description;
  sections: Section[];
  author: Author;
  relatedPosts: string[];
  status: string;
  slug: string;
  seo: SEO;
}

// interface BlockContent {
//   [key: string]: any;
// }
export default function BlogEditor() {
  const router = useRouter();
  const param = useParams();
  const { user, isLoading } = useAuth();

  // Initial state with type annotation
  const [blogPost, setBlogPost] = useState<BlogPost>({
    heroImage: { url: "", alt: "" },
    title: "",
    description: { html: "", links: [] },
    slug: "",
    sections: [],
    author: { name: "", bio: "", avatar: "" },
    relatedPosts: [],
    status: "draft",
    seo: {
      title: "",
      description: "",
      canonicalUrl: "",
    },
  });

  // Add early routing check
  React.useEffect(() => {
    if (!param.blog_id || param.blog_id.length !== 24) {
      router.push("/admin/blog-posts");
    }
  }, [param.blog_id, router]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setBlogPost((prevBlogPost) => {
        const oldIndex = prevBlogPost.sections.findIndex(
          (section) => section.id === active.id
        );
        const newIndex = prevBlogPost.sections.findIndex(
          (section) => section.id === over.id
        );

        return {
          ...prevBlogPost,
          sections: arrayMove(prevBlogPost.sections, oldIndex, newIndex),
        };
      });
    }
  }, []);

  const addSection = useCallback(() => {
    setBlogPost((prevBlogPost) => ({
      ...prevBlogPost,
      sections: [
        ...prevBlogPost.sections,
        { id: uuidv4(), title: "", navTitle: "", blocks: [] },
      ],
    }));
  }, []);

  const updateSection = useCallback((id: string, content: Section) => {
    setBlogPost((prevBlogPost) => ({
      ...prevBlogPost,
      sections: prevBlogPost.sections.map((section) =>
        section.id === id ? { ...section, ...content } : section
      ),
    }));
  }, []);

  // const updateSection = useCallback(
  //   (
  //     id: string,
  //     content: {
  //       id: string;
  //       title: string;
  //       navTitle: string;
  //       blocks: Block[];
  //     }
  //   ) => {
  //     setBlogPost((prevBlogPost) => ({
  //       ...prevBlogPost,
  //       sections: prevBlogPost.sections.map((section) =>
  //         section.id === id ? { ...content } : section
  //       ),
  //     }));
  //   },
  //   []
  // );

  // const updateSection = useCallback((id: string, content: Section) => {
  //   setBlogPost((prevBlogPost) => ({
  //     ...prevBlogPost,
  //     sections: prevBlogPost.sections.map((section) =>
  //       section.id === id ? { ...content } : section
  //     ),
  //   }));
  // }, []);
  const deleteSection = useCallback((id: string) => {
    setBlogPost((prevBlogPost) => ({
      ...prevBlogPost,
      sections: prevBlogPost.sections.filter((section) => section.id !== id),
    }));
  }, []);

  const saveBlogPost = useCallback(async () => {
    if (!param.blog_id || !user?._id || isLoading) return;

    try {
      const response = await api.post(`/blog/save/${param.blog_id}`, {
        blogData: blogPost,
        userId: user._id,
      });
      toast.success("Blog post saved successfully");
      console.log("Save response:", response.data);
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error("Failed to save blog");
    }
  }, [blogPost, param.blog_id, user?._id, isLoading]);

  const getBlogPost = useCallback(async () => {
    if (!user?._id || isLoading || !param.blog_id) return;

    try {
      const response = await api.post(`/blog/article/${param.blog_id}`, {
        userId: user._id,
      });

      if (response.data.success) {
        const blogData = response.data.data;
        setBlogPost({
          heroImage: blogData.heroImage || { url: "", alt: "" },
          title: blogData.title || "",
          description: blogData.description || { html: "", links: [] },
          slug: blogData.slug || "",
          sections: blogData.sections || [],
          author: blogData.author || { name: "", bio: "", avatar: "" },
          relatedPosts: blogData.relatedPosts || [],
          status: blogData.status || "draft",
          seo: blogData.seo || {
            title: "",
            description: "",
            canonicalUrl: "",
          },
        });
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      toast.error("Failed to get blog");
    }
  }, [param.blog_id, user?._id, isLoading]);

  useEffect(() => {
    getBlogPost();
  }, [getBlogPost]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <HeroImageBlock
        content={blogPost.heroImage}
        onChange={(heroImage) =>
          setBlogPost((prev) => ({ ...prev, heroImage }))
        }
      />
      <TitleBlock
        content={blogPost.title}
        onChange={(title) => setBlogPost((prev) => ({ ...prev, title }))}
      />

      <DescriptionBlock
        content={blogPost.description}
        onChange={(description) =>
          setBlogPost((prev) => ({ ...prev, description }))
        }
      />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={blogPost.sections.map((section) => section.id)}
          strategy={verticalListSortingStrategy}
        >
          {blogPost.sections.map((section) => (
            <SortableItem key={section.id} id={section.id}>
              <SectionBlock
                content={{
                  id: section.id,
                  title: section.title,
                  navTitle: section.navTitle,
                  blocks: section.blocks,
                }}
                onChange={(content) => updateSection(section.id, content)}
                onDelete={() => deleteSection(section.id)}
              />
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
      <Button onClick={addSection} variant="outline">
        Add Section
      </Button>
      <AuthorBlock
        author={blogPost.author}
        onChange={(author) => setBlogPost((prev) => ({ ...prev, author }))}
      />
      <RelatedPostsBlock
        relatedPosts={blogPost.relatedPosts}
        onChange={(relatedPosts) =>
          setBlogPost((prev) => ({ ...prev, relatedPosts }))
        }
      />
      <SEOBlock
        seo={blogPost.seo}
        onChange={(seo) =>
          setBlogPost((prev) => ({ ...prev, slug: seo.canonicalUrl, seo }))
        }
      />

      <StatusSelector
        status={blogPost.status}
        onChange={(status) => setBlogPost((prev) => ({ ...prev, status }))}
      />
      <Button onClick={saveBlogPost} className="text-white" variant="default">
        Save Blog Post
      </Button>
    </div>
  );
}