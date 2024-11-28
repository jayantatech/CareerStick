// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import HeroImageBlock from "./HeroImageBlock";
// import TitleBlock from "./TitleBlock";
// import SectionBlock from "./SectionBlock";
// import AuthorBlock from "./AuthorBlock";
// import RelatedPostsBlock from "./RelatedPostsBlock";
// import StatusSelector from "./StatusSelector";

// const BlogPostEditor: React.FC = () => {
//   const [sections, setSections] = useState([
//     { id: "title", type: "title", content: "" },
//     { id: "heroImage", type: "heroImage", content: "" },
//     { id: "section1", type: "text", content: "" },
//   ]);
//   const [author, setAuthor] = useState({ name: "", bio: "", avatar: "" });
//   const [relatedPosts, setRelatedPosts] = useState([]);
//   const [status, setStatus] = useState("draft");

//   const handleDragEnd = (result: any) => {
//     if (!result.destination) return;

//     const items = Array.from(sections);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     setSections(items);
//   };

//   const handleSectionUpdate = (index: number, updatedSection: any) => {
//     const newSections = [...sections];
//     newSections[index] = updatedSection;
//     setSections(newSections);
//   };

//   const handleAddSection = (type: string) => {
//     const newSection = {
//       id: `section${sections.length + 1}`,
//       type,
//       content: "",
//     };
//     setSections([...sections, newSection]);
//   };

//   const handleRemoveSection = (index: number) => {
//     const newSections = sections.filter((_, i) => i !== index);
//     setSections(newSections);
//   };

//   const handleSave = () => {
//     const postData = {
//       title: sections.find((s) => s.type === "title")?.content || "",
//       heroImage: sections.find((s) => s.type === "heroImage")?.content || "",
//       sections: sections.filter(
//         (s) => !["title", "heroImage"].includes(s.type)
//       ),
//       author,
//       relatedPosts,
//       status,
//     };
//     console.log("Saving post data:", postData);
//     // Here you would typically send this data to your backend API
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">Blog Post Editor</h1>
//       <DragDropContext onDragEnd={handleDragEnd}>
//         <Droppable droppableId="sections">
//           {(provided) => (
//             <div {...provided.droppableProps} ref={provided.innerRef}>
//               {sections.map((section, index) => (
//                 <Draggable
//                   key={section.id}
//                   draggableId={section.id}
//                   index={index}
//                 >
//                   {(provided) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       className="mb-4"
//                     >
//                       {section.type === "title" && (
//                         <TitleBlock
//                           content={section.content}
//                           onChange={(newTitle) =>
//                             handleSectionUpdate(index, {
//                               ...section,
//                               content: newTitle,
//                             })
//                           }
//                         />
//                       )}
//                       {section.type === "heroImage" && (
//                         <HeroImageBlock
//                           content={section.content}
//                           onChange={(newImage) =>
//                             handleSectionUpdate(index, {
//                               ...section,
//                               content: newImage,
//                             })
//                           }
//                         />
//                       )}
//                       {!["title", "heroImage"].includes(section.type) && (
//                         <SectionBlock
//                           section={section}
//                           onUpdate={(updatedSection) =>
//                             handleSectionUpdate(index, updatedSection)
//                           }
//                         />
//                       )}
//                       <button
//                         onClick={() => handleRemoveSection(index)}
//                         className="mt-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                       >
//                         Remove Section
//                       </button>
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//       <div className="mb-4">
//         <button
//           onClick={() => handleAddSection("text")}
//           className="mr-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Add Text Section
//         </button>
//         <button
//           onClick={() => handleAddSection("image")}
//           className="mr-2 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//         >
//           Add Image Section
//         </button>
//         <button
//           onClick={() => handleAddSection("list")}
//           className="mr-2 px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//         >
//           Add List Section
//         </button>
//         <button
//           onClick={() => handleAddSection("faq")}
//           className="mr-2 px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
//         >
//           Add FAQ Section
//         </button>
//         <button
//           onClick={() => handleAddSection("callout")}
//           className="mr-2 px-3 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
//         >
//           Add Callout Section
//         </button>
//         <button
//           onClick={() => handleAddSection("heading")}
//           className="px-3 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
//         >
//           Add Heading Section
//         </button>
//       </div>
//       <AuthorBlock author={author} onChange={setAuthor} />
//       <RelatedPostsBlock
//         relatedPosts={relatedPosts}
//         onChange={(newRelatedPosts) => ""}
//       />
//       <StatusSelector status={status} onChange={setStatus} />
//       <button
//         onClick={handleSave}
//         className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//       >
//         Save Post
//       </button>
//     </div>
//   );
// };

// export default BlogPostEditor;
