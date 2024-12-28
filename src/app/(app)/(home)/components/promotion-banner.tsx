// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// export default function PromotionBanner() {
//   return (
//     <div className="mt-2 py-6">
//       <AspectRatio ratio={1} className=" md:aspect-[12/2]">
//         <div className="flex h-full w-full items-center justify-center bg-zinc-900">
//           {/* Conteúdo futuro aqui */}
//         </div>
//       </AspectRatio>
//       <div className="px-4 pt-4 md:hidden">
//         <Carousel
//           opts={{
//             align: "center",
//           }}
//         >
//           <CarouselContent className="-ml-4 ">
//             {[1, 2, 3].map((item) => (
//               <CarouselItem
//                 key={item}
//                 className="basis-[72%] pl-2 sm:basis-1/2 md:basis-2/4 lg:basis-1/4"
//               >
//                 <AspectRatio ratio={1} className="">
//                   <div className="flex h-full w-full items-center justify-center bg-zinc-900">
//                     {/* Conteúdo futuro aqui */}
//                   </div>
//                 </AspectRatio>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <CarouselPrevious />
//         </Carousel>
//       </div>
//       <div className="hidden grid grid-cols-3 md:block">
//         <div>oi</div>
//         <div>oi</div>
//         <div></div>
//       </div>
//     </div>
//   );
// }
