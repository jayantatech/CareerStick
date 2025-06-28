// export const templateThree = (resumeData: string) => {
//   return ` <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Jay's Resume</title>
//   <script src="https://cdn.tailwindcss.com"></script>
// </head>
// <body>
//  ${resumeData}
// </body>
// </html>
// `;
// };

export const templateThree = (
  resumeData: string,
  resumeFont: { url: string; font: string }
) => {
  return ` <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jay's Resume</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="${resumeFont.url}" rel="stylesheet">
  <style>
    body {
      font-family: '${resumeFont.font}', sans-serif;
      ul {
        list-style: disc;
        margin-bottom: 10px;
        padding-left: 20px;
        }      
      ol {
        list-style: decimal;
        padding-left: 20px;
        margin-bottom: 10px;      
        }
    }
  </style>
</head>
<body>
  ${resumeData}
</body>
</html>
`;
};
// <div class="flex flex-col gap-8">
//   <div class="w-[794px] h-[1123px] shadow bg-white p-10 overflow-hidden mx-auto font-inter">
//     <div>
//       <div>
//         <div class="mb-4">
//           <h1 class="text-4xl font-bold capitalize mb-1">Jay Biswas</h1>
//           <h2 class="text-xl mb-2" style="color: rgb(16, 185, 129);">
//             Full Stack Developer
//           </h2>
//           <div class="flex gap-4 mb-1">
//             <div class="flex items-center gap-1">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 stroke-width="2"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 class="lucide lucide-phone w-4 h-4"
//               >
//                 <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
//               </svg>
//               <span class="text-gray-600">8370912947</span>
//             </div>
//             <div class="flex items-center gap-1">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 stroke-width="2"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 class="lucide lucide-mail w-4 h-4"
//               >
//                 <rect width="20" height="16" x="2" y="4" rx="2"></rect>
//                 <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
//               </svg>
//               <span class="text-gray-600">Jayanta@gmail.com</span>
//             </div>
//             <div class="flex items-center gap-1">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 stroke-width="2"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 class="lucide lucide-map-pin w-4 h-4"
//               >
//                 <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
//                 <circle cx="12" cy="10" r="3"></circle>
//               </svg>
//               <span class="text-gray-600">New York, USA</span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div>
//         <div class="flex flex-wrap gap-3 mt-1 mb-4">
//           <a target="_blank" href="https://github.com/jay/">
//             <div class="flex items-center gap-1">
//               <svg
//                 stroke="currentColor"
//                 fill="none"
//                 stroke-width="2"
//                 viewBox="0 0 24 24"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 class="w-4 h-4"
//                 height="1em"
//                 width="1em"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
//                 <polyline points="15 3 21 3 21 9"></polyline>
//                 <line x1="10" x2="21" y1="14" y2="3"></line>
//               </svg>
//               <span class="text-gray-600">https://github.com/jay/</span>
//             </div>
//           </a>
//         </div>
//       </div>
//       <div>
//         <section class="mb-4">
//           <h3
//             class="text-lg font-bold uppercase border-b border-gray-200 pb-1 mb-2"
//             style="color: rgb(31, 41, 55);"
//           >
//             Summary
//           </h3>
//           <p class="text-gray-600">
//             Experienced web developer skilled in creating responsive,
//             user-friendly applications using modern frameworks like Next.js and
//             TypeScript.
//           </p>
//         </section>
//       </div>
//       <div>
//         <section class="mb-4">
//           <h3
//             class="text-lg font-bold uppercase border-b border-gray-200 pb-1 mb-2"
//             style="color: rgb(31, 41, 55);"
//           >
//             Skills
//           </h3>
//           <div class="flex flex-wrap gap-2">
//             <span class="px-2 py-0 bg-gray-100 text-[15px] rounded-[3px] border-[0.1px] text-gray-600">
//               JavaScript
//             </span>
//             <span class="px-2 py-0 bg-gray-100 text-[15px] rounded-[3px] border-[0.1px] text-gray-600">
//               TypeScript
//             </span>
//             <span class="px-2 py-0 bg-gray-100 text-[15px] rounded-[3px] border-[0.1px] text-gray-600">
//               React
//             </span>
//             <span class="px-2 py-0 bg-gray-100 text-[15px] rounded-[3px] border-[0.1px] text-gray-600">
//               Node.js
//             </span>
//             <span class="px-2 py-0 bg-gray-100 text-[15px] rounded-[3px] border-[0.1px] text-gray-600">
//               MongoDB
//             </span>
//             <span class="px-2 py-0 bg-gray-100 text-[15px] rounded-[3px] border-[0.1px] text-gray-600">
//               HTML
//             </span>
//             <span class="px-2 py-0 bg-gray-100 text-[15px] rounded-[3px] border-[0.1px] text-gray-600">
//               CSS
//             </span>
//             <span class="px-2 py-0 bg-gray-100 text-[15px] rounded-[3px] border-[0.1px] text-gray-600">
//               Git
//             </span>
//             <span class="px-2 py-0 bg-gray-100 text-[15px] rounded-[3px] border-[0.1px] text-gray-600">
//               Agile
//             </span>
//             <span class="px-2 py-0 bg-gray-100 text-[15px] rounded-[3px] border-[0.1px] text-gray-600">
//               Scrum
//             </span>
//           </div>
//         </section>
//       </div>
//       <div>
//         <section class="mb-4">
//           <h3
//             class="text-lg font-bold uppercase border-b border-gray-200 pb-1 mb-2"
//             style="color: rgb(31, 41, 55);"
//           >
//             Experience
//           </h3>
//           <div class="mb-4">
//             <h4 class="text-base font-bold" style="color: rgb(31, 41, 55);">
//               ABC Corporation
//             </h4>
//             <div class="text-gray-600">Full Stack Developer</div>
//             <div class="flex justify-between text-sm text-gray-500">
//               <span>January 2020 - December 2022</span>
//               <span>New York, USA</span>
//             </div>
//             <p class="mt-2 text-gray-600">
//               Developed multiple responsive web applications using React and
//               Node.js, resulting in a 30% increase in user engagement.
//             </p>
//           </div>
//         </section>
//       </div>
//       <div>
//         <div
//           class="
//               grid grid-cols-3 gap-6 gap-y-2 w-full
//               grid-cols-3
//             "
//         >
//           <section
//             class="
//                   col-span-1
//                   hidden
//                 "
//           >
//             <h3
//               class="text-lg font-bold uppercase border-b border-gray-200 pb-1 mb-2"
//               style="color: rgb(31, 41, 55);"
//             >
//               Education
//             </h3>
//             <div class="mb-3">
//               <h4 class="text-base font-bold" style="color: rgb(31, 41, 55);">
//                 New York University
//               </h4>
//               <div class="text-gray-600">
//                 Bachelor of Science in Computer Science
//               </div>
//               <div class="text-sm text-gray-500">September 2016 - May 2020</div>
//             </div>
//           </section>
//           <div class="flex gap-6 col-span-3">
//             <section
//               class="
//                     col-span-1 w-full
//                     col-span-1 mb-4

//                     "
//             >
//               <h3
//                 class="text-lg font-bold uppercase border-b border-gray-200 pb-1 mb-2"
//                 style="color: rgb(31, 41, 55);"
//               >
//                 Education
//               </h3>
//               <div class="mb-3">
//                 <h4 class="text-base font-bold" style="color: rgb(31, 41, 55);">
//                   New York University
//                 </h4>
//                 <div class="text-gray-600">
//                   Bachelor of Science in Computer Science
//                 </div>
//                 <div class="text-sm text-gray-500">
//                   September 2016 - May 2020
//                 </div>
//               </div>
//             </section>
//             <section class="mb-4 w-full">
//               <h3
//                 class="text-lg font-bold uppercase border-b border-gray-200 pb-1 mb-2"
//                 style="color: rgb(31, 41, 55);"
//               >
//                 Languages
//               </h3>
//               <div class="flex justify-between mb-1">
//                 <span class="text-gray-600 capitalize">english</span>
//                 <span
//                   class="px-2 py-0.5 bg-gray-100 rounded text-sm capitalize"
//                   style="color: rgb(16, 185, 129);"
//                 >
//                   native
//                 </span>
//               </div>
//               <div class="flex justify-between mb-1">
//                 <span class="text-gray-600 capitalize">spanish</span>
//                 <span
//                   class="px-2 py-0.5 bg-gray-100 rounded text-sm capitalize"
//                   style="color: rgb(16, 185, 129);"
//                 >
//                   intermediate
//                 </span>
//               </div>
//               <div class="flex justify-between mb-1">
//                 <span class="text-gray-600 capitalize">french</span>
//                 <span
//                   class="px-2 py-0.5 bg-gray-100 rounded text-sm capitalize"
//                   style="color: rgb(16, 185, 129);"
//                 >
//                   beginner
//                 </span>
//               </div>
//             </section>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>;

// export const templateThree = () => {
//   return ` <!DOCTYPE html>
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Jay's Resume</title>
//   <script src="https://cdn.tailwindcss.com"></script>
// </head>
// <body>
//   <div class="flex flex-col gap-8">
//     <!-- Page 1 -->
//     <div class="w-[794px] h-[1123px] shadow bg-white p-10 overflow-hidden mx-auto font-inter">
//       <div>
//         <!-- Header Section -->
//         <div class="mb-4">
//           <h1 class="text-4xl font-bold capitalize mb-1">Jay Biswas</h1>
//           <h2 class="text-xl mb-2" style="color: rgb(16, 185, 129);">Full Stack Developer</h2>
//           <div class="flex gap-4 mb-1">
//             <!-- Contact Info -->
//             <div class="flex items-center gap-1">
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
//                 <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
//               </svg>
//               <span class="text-gray-600">8370912947</span>
//             </div>
//             <div class="flex items-center gap-1">
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
//                 <rect width="20" height="16" x="2" y="4" rx="2"></rect>
//                 <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
//               </svg>
//               <span class="text-gray-600">Jayanta@gmail.com</span>
//             </div>
//             <div class="flex items-center gap-1">
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
//                 <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
//                 <circle cx="12" cy="10" r="3"></circle>
//               </svg>
//               <span class="text-gray-600">New York, USA</span>
//             </div>
//           </div>
//         </div>

//         <!-- Summary Section -->
//         <section class="mb-4">
//           <h3 class="text-lg font-bold uppercase border-b border-gray-200 pb-1 mb-2" style="color: rgb(31, 41, 55);">Summary</h3>
//           <p class="text-gray-600">Experienced web developer skilled in creating responsive, user-friendly applications using modern frameworks like Next.js and TypeScript.</p>
//         </section>

//         <!-- Skills Section -->
//         <section class="mb-4">
//           <h3 class="text-lg font-bold uppercase border-b border-gray-200 pb-1 mb-2" style="color: rgb(31, 41, 55);">Skills</h3>
//           <div class="flex flex-wrap gap-2">
//             <span class="px-2 py-0 bg-gray-100 text-[15px] rounded-[3px] border-[0.1px] text-gray-600">JavaScript</span>
//             <span class="px-2 py-0 bg-gray-100 text-[15px] rounded-[3px] border-[0.1px] text-gray-600">TypeScript</span>
//             <span class="px-2 py-0 bg-gray-100 text-[15px] rounded-[3px] border-[0.1px] text-gray-600">React</span>
//             <span class="px-2 py-0 bg-gray-100 text-[15px] rounded-[3px] border-[0.1px] text-gray-600">Node.js</span>
//             <span class="px-2 py-0 bg-gray-100 text-[15px] rounded-[3px] border-[0.1px] text-gray-600">MongoDB</span>
//             <span class="px-2 py-0 bg-gray-100 text-[15px] rounded-[3px] border-[0.1px] text-gray-600">HTML</span>
//             <span class="px-2 py-0 bg-gray-100 text-[15px] rounded-[3px] border-[0.1px] text-gray-600">CSS</span>
//             <span class="px-2 py-0 bg-gray-100 text-[15px] rounded-[3px] border-[0.1px] text-gray-600">Git</span>
//           </div>
//         </section>

//         <!-- Experience Section -->
//         <section class="mb-4">
//           <h3 class="text-lg font-bold uppercase border-b border-gray-200 pb-1 mb-2" style="color: rgb(31, 41, 55);">Experience</h3>
//           <div class="mb-4">
//             <h4 class="text-base font-bold" style="color: rgb(31, 41, 55);">ABC Corporation</h4>
//             <div class="text-gray-600">Full Stack Developer</div>
//             <div class="flex justify-between text-sm text-gray-500">
//               <span>January 2020 - December 2022</span>
//               <span>New York, USA</span>
//             </div>
//             <p class="mt-2 text-gray-600">Developed multiple responsive web applications using React and Node.js, resulting in a 30% increase in user engagement.</p>
//           </div>
//         </section>

//         <!-- Projects Section -->
//         <section class="mb-4">
//           <h3 class="text-lg font-bold uppercase border-b border-gray-200 pb-1 mb-2" style="color: rgb(31, 41, 55);">Projects</h3>
//           <div class="mb-4">
//             <h4 class="text-base font-bold" style="color: rgb(31, 41, 55);">Personal Website</h4>
//             <div class="text-gray-600">Developer</div>
//             <p class="mt-2 text-gray-600">Developed a responsive website with a 25% increase in page views.</p>
//             <div class="flex flex-wrap gap-2 mt-2">
//               <span class="px-2 py-0.5 bg-gray-100 rounded-sm text-sm text-gray-600">React</span>
//               <span class="px-2 py-0.5 bg-gray-100 rounded-sm text-sm text-gray-600">Node.js</span>
//               <span class="px-2 py-0.5 bg-gray-100 rounded-sm text-sm text-gray-600">MongoDB</span>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>

//     <!-- Page 2 -->
//     <div class="w-[794px] h-[1123px] shadow bg-white p-10 overflow-hidden mx-auto font-inter">
//       <div class="grid grid-cols-2 gap-6">
//         <!-- Education Section -->
//         <section class="col-span-1">
//           <h3 class="text-lg font-bold uppercase border-b border-gray-200 pb-1 mb-2" style="color: rgb(31, 41, 55);">Education</h3>
//           <div class="mb-3">
//             <h4 class="text-base font-bold" style="color: rgb(31, 41, 55);">New York University</h4>
//             <div class="text-gray-600">Bachelor of Science in Computer Science</div>
//             <div class="text-sm text-gray-500">September 2016 - May 2020</div>
//           </div>
//         </section>

//         <!-- Languages Section -->
//         <section class="col-span-1">
//           <h3 class="text-lg font-bold uppercase border-b border-gray-200 pb-1 mb-2" style="color: rgb(31, 41, 55);">Languages</h3>
//           <div class="flex justify-between mb-1">
//             <span class="text-gray-600 capitalize">english</span>
//             <span class="px-2 py-0.5 bg-gray-100 rounded text-sm capitalize" style="color: rgb(16, 185, 129);">native</span>
//           </div>
//           <div class="flex justify-between mb-1">
//             <span class="text-gray-600 capitalize">spanish</span>
//             <span class="px-2 py-0.5 bg-gray-100 rounded text-sm capitalize" style="color: rgb(16, 185, 129);">intermediate</span>
//           </div>
//           <div class="flex justify-between mb-1">
//             <span class="text-gray-600 capitalize">french</span>
//             <span class="px-2 py-0.5 bg-gray-100 rounded text-sm capitalize" style="color: rgb(16, 185, 129);">beginner</span>
//           </div>
//         </section>
//       </div>
//     </div>
//   </div>
// </body>
// </html>
// `;
// };
