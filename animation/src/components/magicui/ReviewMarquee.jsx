import React from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import Marquee3D from "./Marquee3D";



import image5 from "../../assets/teams/DSC05945.jpg"  // converted from .HEIC
import image6 from "../../assets/teams/DSC05950.jpg"  // converted from .HEIC
import image7 from "../../assets/teams/DSC05953.jpg"  // converted from .HEIC
import image8 from "../../assets/teams/DSC05955.jpg"  // converted from .HEIC
import image9 from "../../assets/teams/DSC05976.jpg"  // converted from .HEIC
import image10 from "../../assets/teams/DSC05991.jpg"  // converted from .HEIC
import image11 from "../../assets/teams/DSC05996.jpg"  // converted from .HEIC
import image12 from "../../assets/teams/DSC06000.jpg"  // converted from .HEIC
import image14 from "../../assets/teams/DSC06032.jpg"  // converted from .HEIC
import image15 from "../../assets/teams/DSC05951.jpg"  // converted from .HEIC
import image16 from "../../assets/teams/DSC05954.jpg"  // converted from .HEIC
import image17 from "../../assets/teams/DSC05974.jpg"  // converted from .HEIC
import image18 from "../../assets/teams/DSC05971.jpg"  // converted from .HEIC
import image19 from "../../assets/teams/DSC05968.jpg"  // converted from .HEIC
import image20 from "../../assets/teams/DSC06061.jpg"  // converted from .HEIC
import image21 from "../../assets/teams/DSC06058.jpg"  // converted from .HEIC
import image22 from "../../assets/teams/DSC06052.jpg"  // converted from .HEIC
import image23 from "../../assets/teams/DSC06060.jpg"  // converted from .HEIC
import image24 from "../../assets/teams/DSC06078.jpg"  // converted from .HEIC
import image25 from "../../assets/teams/DSC06079.jpg"  // converted from .HEIC
import image26 from "../../assets/teams/DSC06101.jpg"  // converted from .HEIC
  // converted from .HEIC

  

// Sample reviews data

const reviews = [
 
  {   img: image5 },
  {  img: image6 },
  { img: image7},
  {  img: image8 },
  { img : image9},
  {  img: image10 },
  {  img: image11 },
  {   img: image12 },
  {   img: image14 },
  {   img: image15 },
  {   img: image16 },
  {   img: image17 },
  {   img: image18 },
  {   img: image19 },
  {   img: image20 },
  {   img: image21 },
  {   img: image22 },
  {   img: image23 },
  {   img: image24 },
  {   img: image25 },
  {   img: image26 },


 
];
 

;


const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-30 w-36 ml-3 cursor-pointer overflow-hidden rounded-xl border shadow-md transition-transform duration-300 hover:scale-105",
        "border-gray-950/[.1] bg-gray-100 dark:border-gray-50/[.1] dark:bg-gray-800"
      )}
    >
      {/* Image section - covers most of the card */}
      <div className="h-3/4 w-full">
        <img
          className="h-full w-full object-cover"
          src={img}
          alt={name}
        />
      </div>
      {/* Bottom section for name and description */}
      <div className="h-1/4 w-full p-3 bg-white dark:bg-gray-900">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
          {name}
        </h3>
      </div>
    </figure>
  );
};

export function ReviewMarquee() {
  // Create conditional scroll props
  const scrollProps = window.innerWidth > 625 ? {
    'data-scroll': true,
    'data-scroll-speed': '-.9'
  } : {};

  return (
    <>
      {window.innerWidth <= 908 ? (
        <div
          {...scrollProps}
          className="relative flex w-full flex-col gap-3 mt-3 items-center justify-center overflow-hidden"
        >
          <Marquee pauseOnHover className="[--duration:20s] flex">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:10s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
      ) : (
        <div {...scrollProps}>
          <Marquee3D />
        </div>
      )}
    </>
  );
}