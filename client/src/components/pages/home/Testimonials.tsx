// "use client";

// import { useEffect, useState } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import { Star } from "lucide-react";
// import Autoplay from "embla-carousel-autoplay";

// const testimonials = [
//   {
//     rating: 5,
//     text: "Absolutely Brilliant! The interface is so easy to use, and the changes are live. I'm really impressed with how smoothly it works.",
//     author: "Sarah M.",
//     date: "about 1 hour ago",
//   },
//   {
//     rating: 5,
//     text: "This is absolutely the best resume builder I've ever used! Easy to customize and helping with relevant career tips.",
//     author: "Michael D.",
//     date: "about 2 hours ago",
//   },
//   {
//     rating: 5,
//     text: "The Best Resume Editor! I've tried several platforms when I struggled to find the right words. This professional tool exceeded my expectations.",
//     author: "Emma L.",
//     date: "about 14 hours ago",
//   },
//   {
//     rating: 5,
//     text: "Game changer for job seekers! The templates are modern and the AI suggestions are incredibly helpful.",
//     author: "James R.",
//     date: "about 1 day ago",
//   },
// ];

// export default function Testimonials() {
//   const [emblaRef, emblaApi] = useEmblaCarousel(
//     { loop: true, align: "start" }
//     // [Autoplay()]
//   );
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   useEffect(() => {
//     if (emblaApi) {
//       emblaApi.on("select", () => {
//         setSelectedIndex(emblaApi.selectedScrollSnap());
//       });
//     }
//   }, [emblaApi]);

//   return (
//     <section className="w-full bg-white py-16 md:py-24">
//       <div className="container px-4 md:px-6">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-heading capitalize">
//             Reviewed by the community.{" "}
//             <span className="block">Trusted by professionals</span>
//           </h2>
//         </div>

//         <div className="relative max-w-6xl mx-auto px-4">
//           <div className="overflow-hidden" ref={emblaRef}>
//             <div className="flex gap-6">
//               {testimonials.map((testimonial, index) => (
//                 <div
//                   key={index}
//                   className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] select-none"
//                 >
//                   <div className="bg-white rounded-xl p-6 h-full border border-gray-100 shadow-sm">
//                     <div className="flex items-center gap-1 mb-4">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-5 h-5 ${
//                             i < testimonial.rating
//                               ? "text-green-500 fill-green-500"
//                               : "text-gray-200 fill-gray-200"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <p className="text-gray-700 mb-4">{testimonial.text}</p>
//                     <div className="flex items-center justify-between text-sm text-gray-500">
//                       <span>{testimonial.author}</span>
//                       <span>{testimonial.date}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex justify-center gap-2 mt-8">
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 className={`w-2.5 h-2.5 rounded-full transition-colors ${
//                   index === selectedIndex ? "bg-blue-600" : "bg-gray-200"
//                 }`}
//                 onClick={() => emblaApi?.scrollTo(index)}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>

//         <div className="flex flex-wrap justify-center items-center gap-8 mt-16 opacity-70">
//           {["Forbes", "The Muse", "Entrepreneur", "Lifehack", "Inc."].map(
//             (brand) => (
//               <span key={brand} className="text-gray-400 font-semibold">
//                 {brand}
//               </span>
//             )
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import { Star } from "lucide-react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/autoplay";

// const testimonials = [
//   {
//     rating: 5,
//     text: "Absolutely Brilliant! The interface is so easy to use, and the changes are live. I'm really impressed with how smoothly it works.",
//     author: "Sarah M.",
//     date: "about 1 hour ago",
//   },
//   {
//     rating: 5,
//     text: "This is absolutely the best resume builder I've ever used! Easy to customize and helping with relevant career tips.",
//     author: "Michael D.",
//     date: "about 2 hours ago",
//   },
//   {
//     rating: 5,
//     text: "The Best Resume Editor! I've tried several platforms when I struggled to find the right words. This professional tool exceeded my expectations.",
//     author: "Emma L.",
//     date: "about 14 hours ago",
//   },
//   {
//     rating: 5,
//     text: "Game changer for job seekers! The templates are modern and the AI suggestions are incredibly helpful.",
//     author: "James R.",
//     date: "about 1 day ago",
//   },
// ];

// export default function Testimonials() {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return null;
//   }

//   return (
//     <section className="w-full bg-white py-8 sm:py-12 md:py-16 lg:py-24">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="text-center mb-8 sm:mb-12">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter font-heading capitalize">
//             Reviewed by the community.{" "}
//             <span className="block mt-2">Trusted by professionals</span>
//           </h2>
//         </div>

//         <div className="relative max-w-6xl mx-auto">
//           <Swiper
//             modules={[Autoplay, Pagination]}
//             spaceBetween={24}
//             slidesPerView={1}
//             autoplay={{
//               delay: 4000,
//               disableOnInteraction: false,
//               pauseOnMouseEnter: true,
//             }}
//             pagination={{
//               clickable: true,
//               bulletActiveClass: "bg-blue-600",
//               bulletClass:
//                 "inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gray-200 mx-1 cursor-pointer transition-colors duration-200 hover:bg-blue-400",
//             }}
//             loop={true}
//             breakpoints={{
//               640: {
//                 slidesPerView: 2,
//               },
//               1024: {
//                 slidesPerView: 3,
//               },
//             }}
//             className="pb-12"
//           >
//             {testimonials.map((testimonial, index) => (
//               <SwiperSlide key={index}>
//                 <div className="h-[248px]">
//                   <div className="bg-white rounded-xl p-4 sm:p-6 h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
//                     <div className="flex items-center gap-1 mb-4">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-4 h-4 sm:w-5 sm:h-5 ${
//                             i < testimonial.rating
//                               ? "text-green-500 fill-green-500"
//                               : "text-gray-200 fill-gray-200"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <p className="text-sm sm:text-base text-gray-700 mb-4 line-clamp-4">
//                       {testimonial.text}
//                     </p>
//                     <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
//                       <span className="font-medium">{testimonial.author}</span>
//                       <span>{testimonial.date}</span>
//                     </div>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>

//         <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mt-8 sm:mt-16 opacity-70">
//           {["Forbes", "The Muse", "Entrepreneur", "Lifehack", "Inc."].map(
//             (brand) => (
//               <span
//                 key={brand}
//                 className="text-sm sm:text-base text-gray-400 font-semibold"
//               >
//                 {brand}
//               </span>
//             )
//           )}
//         </div>
//       </div>

//       <style jsx global>{`
//         .swiper-pagination {
//           position: relative;
//           margin-top: 1.5rem;
//         }
//       `}</style>
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Star } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import ContentWrapper from "@/components/ContentWrapper";

// const testimonials = [
//   {
//     rating: 4.5,
//     text: "Absolutely Brilliant! The interface is so easy to use, and the changes are live. I'm really impressed with how smoothly it works.",
//     author: "Sarah M.",
//     date: "about 1 hour ago",
//   },
//   {
//     rating: 5,
//     text: "This is absolutely the best resume builder I've ever used! Easy to customize and helping with relevant career tips.",
//     author: "Michael D.",
//     date: "about 2 hours ago",
//   },
//   {
//     rating: 5,
//     text: "The Best Resume Editor! I've tried several platforms when I struggled to find the right words. This professional tool exceeded my expectations.",
//     author: "Emma L.",
//     date: "about 14 hours ago",
//   },
//   {
//     rating: 5,
//     text: "Game changer for job seekers! The templates are modern and the AI suggestions are incredibly helpful.",
//     author: "James R.",
//     date: "about 1 day ago",
//   },
// ];

// const testimonials = [
//   {
//     rating: 5,
//     text: "AI builder turned my messy experience into a perfect tech resume in minutes. Got 3 interviews already!",
//     author: "Priya Patel",
//     location: "San Francisco, CA",
//     role: "Senior Full Stack Developer",
//   },
//   {
//     rating: 5,
//     text: "ATS optimizer is a game-changer. My resume finally gets past the screening systems!",
//     author: "Brandon Chen",
//     location: "Austin, TX",
//     role: "Machine Learning Engineer",
//   },
//   {
//     rating: 4.5,
//     text: "Modern templates and smart suggestions helped me land my dream Android role.",
//     author: "Arun Sharma",
//     location: "Seattle, WA",
//     role: "Android Developer",
//   },
//   {
//     rating: 5,
//     text: "Perfectly organized my 15+ years of experience. Best resume builder for tech leads!",
//     author: "Maria Rodriguez",
//     location: "Chicago, IL",
//     role: "DevOps Engineering Manager",
//   },
//   {
//     rating: 5,
//     text: "Quick, smart, and effective. Built a winning resume in one click!",
//     author: "Raj Malhotra",
//     location: "Boston, MA",
//     role: "Cloud Solutions Architect",
//   },
// ];
const testimonials = [
  {
    rating: 4.5,
    text: "The AI-powered resume builder is incredible! I had a polished resume ready in minutes, and it was so easy to use.",
    author: "Aarav P.",
    jobRole: "Web Developer",
  },
  {
    rating: 5,
    text: "The ATS optimizer is a game changer. It’s so simple to use, and now I won’t apply for jobs without running my resume through it first.",
    author: "Jessica T.",
    jobRole: "Data Analyst",
  },
  {
    rating: 5,
    text: "The templates are sleek, and the AI suggestions made tailoring my resume so effortless. Perfect for career switches!",
    author: "Rohan K.",
    jobRole: "Android Developer",
  },
  {
    rating: 5,
    text: "This app helped me create a professional resume that stood out. A recruiter even mentioned how impressive it was!",
    author: "Priya S.",
    jobRole: "Software Engineer",
  },
  {
    rating: 4.8,
    text: "From building to optimizing, this tool does everything I need. I’ve already landed interviews thanks to it!",
    author: "Daniel W.",
    jobRole: "Full Stack Developer",
  },
];

export default function Testimonials() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ContentWrapper>
      <section className="w-full bg-white py-8 sm:py-14 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter font-heading capitalize">
              Loved by Users.
              <span className="block mt-2">Trusted by professionals</span>
            </h2>
            {/* <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter font-heading capitalize">
              Reviewed by the community.{" "}
              <span className="block mt-2">Trusted by professionals</span>
            </h2> */}
          </div>

          <div className="relative max-w-6xl mx-auto">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                // bulletActiveClass: "bg-blue-600",
                // bulletClass: "swiper-pagination-bullet",
                // bulletActiveClass: "swiper-pagination-bullet",
                // bulletClass:
                //   "inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gray-200 mx-1 cursor-pointer transition-colors duration-200 hover:bg-blue-400",
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
              }}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="pb-12"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="h-[228px] max-md:h-[188px]">
                    <div className="bg-white rounded-md p-4 sm:p-6 h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${
                              i < testimonial.rating
                                ? "text-green-500 fill-green-500"
                                : "text-gray-200 fill-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm sm:text-base text-gray-700 line-clamp-4 flex-grow">
                        {testimonial.text}
                      </p>
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 pt-4 mt-auto border-t border-gray-100">
                        <span className="font-medium">
                          {testimonial.author}
                        </span>
                        <span>{testimonial.jobRole}</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mt-8 sm:mt-16 opacity-70">
            {["Forbes", "The Muse", "Entrepreneur", "Lifehack", "Inc."].map(
              (brand) => (
                <span
                  key={brand}
                  className="text-sm sm:text-base text-gray-400 font-semibold"
                >
                  {brand}
                </span>
              )
            )}
          </div> */}
        </div>

        <style jsx global>{`
          .swiper-pagination {
            position: relative;
            margin-top: 1.5rem;
          }

          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            display: inline-block;
            border-radius: 50%;
            background: #d1d5db;
            margin: 0 4px;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .swiper-pagination-bullet-active {
            background: #2563eb;
            transform: scale(1.1);
          }
        `}</style>
        {/* <style jsx global>{`
          .swiper-pagination {
            position: relative;
            margin-top: 1.5rem;
          }
          .swiper-pagination-bullet-active {
            background: #000;
            transform: scale(1.2);
          }
        `}</style> */}

        {/* <style jsx global>{`
          .swiper-pagination {
            position: relative;
            margin-top: 1.5rem;
          }

          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            display: inline-block;
            border-radius: 50%;
            background: #d1d5db;
            margin: 0 4px;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .swiper-pagination-bullet-active {
            background: #2563eb;
            transform: scale(1.2);
          }
        `}</style> */}
      </section>
    </ContentWrapper>
  );
}
// "use client";
// import { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import { Star } from "lucide-react";
// import ContentWrapper from "@/components/ContentWrapper";

// const testimonials = [
//   {
//     rating: 5,
//     text: "Absolutely Brilliant! The interface is so easy to use, and the changes are live. I'm really impressed with how smoothly it works.",
//     author: "Sarah M.",
//     date: "about 1 hour ago",
//   },
//   {
//     rating: 5,
//     text: "This is absolutely the best resume builder I've ever used! Easy to customize and helping with relevant career tips.",
//     author: "Michael D.",
//     date: "about 2 hours ago",
//   },
//   {
//     rating: 5,
//     text: "The Best Resume Editor! I've tried several platforms when I struggled to find the right words. This professional tool exceeded my expectations.",
//     author: "Emma L.",
//     date: "about 14 hours ago",
//   },
//   {
//     rating: 5,
//     text: "Game changer for job seekers! The templates are modern and the AI suggestions are incredibly helpful.",
//     author: "James R.",
//     date: "about 1 day ago",
//   },
// ];

// export default function Testimonials() {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return null;
//   }

//   return (
//     <ContentWrapper>
//       <section className="w-full bg-white py-8 sm:py-12 md:py-16 lg:py-24">
//         <div className="container mx-auto px-4 md:px-6">
//           <div className="text-center mb-8 sm:mb-12">
//             <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter font-heading capitalize">
//               Reviewed by the community.{" "}
//               <span className="block mt-2">Trusted by professionals</span>
//             </h2>
//           </div>

//           <div className="relative max-w-6xl mx-auto">
//             <Swiper
//               modules={[Autoplay, Pagination]}
//               spaceBetween={24}
//               slidesPerView={1}
//               autoplay={{
//                 delay: 2000,
//                 disableOnInteraction: false,
//                 pauseOnMouseEnter: true,
//               }}
//   pagination={{
//     clickable: true,
//     bulletClass: "swiper-pagination-bullet",
//     bulletActiveClass: "swiper-pagination-bullet-active",
//   }}
//               loop={true}
//               breakpoints={{
//                 640: {
//                   slidesPerView: 2,
//                 },
//                 1024: {
//                   slidesPerView: 3,
//                 },
//               }}
//               className="pb-12"
//             >
//               {testimonials.map((testimonial, index) => (
//                 <SwiperSlide key={index}>
//                   <div className="h-[228px]">
//                     <div className="bg-white rounded-xl p-4 sm:p-6 h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
//                       <div className="flex items-center gap-1 mb-4">
//                         {[...Array(5)].map((_, i) => (
//                           <Star
//                             key={i}
//                             className={`w-4 h-4 sm:w-5 sm:h-5 ${
//                               i < testimonial.rating
//                                 ? "text-green-500 fill-green-500"
//                                 : "text-gray-200 fill-gray-200"
//                             }`}
//                           />
//                         ))}
//                       </div>
//                       <p className="text-sm sm:text-base text-gray-700 line-clamp-4 flex-grow">
//                         {testimonial.text}
//                       </p>
//                       <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 pt-4 mt-auto border-t border-gray-100">
//                         <span className="font-medium">
//                           {testimonial.author}
//                         </span>
//                         <span>{testimonial.date}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>

//           <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mt-8 sm:mt-16 opacity-70">
//             {["Forbes", "The Muse", "Entrepreneur", "Lifehack", "Inc."].map(
//               (brand) => (
//                 <span
//                   key={brand}
//                   className="text-sm sm:text-base text-gray-400 font-semibold"
//                 >
//                   {brand}
//                 </span>
//               )
//             )}
//           </div>
//         </div>

//         <style jsx global>{`
//           .swiper-pagination {
//             position: relative;
//             margin-top: 1.5rem;
//           }

//           .swiper-pagination-bullet {
//             width: 10px;
//             height: 10px;
//             display: inline-block;
//             border-radius: 50%;
//             background: #d1d5db;
//             margin: 0 4px;
//             cursor: pointer;
//             transition: all 0.3s ease;
//           }

//           .swiper-pagination-bullet-active {
//             background: #2563eb;
//             transform: scale(1.2);
//           }
//         `}</style>
//       </section>
//     </ContentWrapper>
//   );
// }
