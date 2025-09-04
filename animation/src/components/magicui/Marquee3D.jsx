import React from 'react';


// import image5 from "../../../src/assets/teams/DSC05945.jpg"  // converted from .HEIC
// import image6 from "../../../src/assets/teams/DSC05950.jpg"  // converted from .HEIC
// import image7 from "../../../src/assets/teams/DSC05953.jpg"  // converted from .HEIC
// import image8 from "../../../src/assets/teams/DSC05955.jpg"  // converted from .HEIC
// import image9 from "../../../src/assets/teams/DSC05976.jpg"  // converted from .HEIC
// import image10 from "../../../src/assets/teams/DSC05991.jpg"  // converted from .HEIC
// import image11 from "../../../src/assets/teams/DSC05996.jpg"  // converted from .HEIC
// import image12 from "../../../src/assets/teams/DSC06000.jpg"  // converted from .HEIC
// import image14 from "../../../src/assets/teams/DSC06032.jpg"  // converted from .HEIC
// import image15 from "../../../src/assets/teams/DSC06046.jpg"  // converted from .HEIC



const cn = (...classes) => classes.filter(Boolean).join(' ');

// Function to repeat children multiple times
const repeatChildren = (children, times = 3) => {
  let repeated = [];
  for (let i = 0; i < times; i++) {
    repeated = repeated.concat(children);
  }
  return repeated;
};

// Marquee component
const Marquee = ({ 
  children, 
  pauseOnHover = false, 
  vertical = false, 
  reverse = false, 
  className = '',
  repeat = 6, // Increased default repeat for seamless effect
  duration = 20, // duration in seconds for animation
  ...props 
}) => {
  const marqueeClass = cn(
    'flex',
    vertical ? 'flex-col animate-marquee-vertical' : 'animate-marquee',
    reverse && (vertical ? 'animate-marquee-vertical-reverse' : 'animate-marquee-reverse'),
    pauseOnHover && 'hover:[animation-play-state:paused]',
    className
  );

  return (
    <div className={cn('overflow-hidden', vertical ? 'h-full' : 'w-full')} {...props}>
      <div className={marqueeClass} style={{ '--duration': `${duration}s` }}>
        {repeatChildren(children, repeat)}
      </div>
    </div>
  );
};

// Sample reviews data - FIXED: Removed curly braces around image variables
const reviews = [
  // {  img: image3 },
  // {  img:  image4 },
  // { img: image5},
  {   img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756943193/DSC06058_dz0anu.png" },
  {  img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756943190/DSC06065_rsozex.png" },
  { img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756943188/DSC06055_oud90b.png"},
  {  img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756943173/DSC06053_wi3tn1.png" },
  { img : "https://res.cloudinary.com/drm13zjc5/image/upload/v1756943159/DSC06045_ums4bc.png"},
  {  img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756942035/DSC06023_vgffrn.png" },
  {  img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756942009/DSC06011_zaukof.png" },
  {   img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756941997/DSC06009_sbjgzr.png" },
  {   img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756941973/DSC05999_xulzoc.png" },
  {   img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756941899/DSC05975_ysall6.png" },
   {   img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756941893/DSC05977_vx3bqw.png" },
{   img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756941831/DSC05950_gtcl5x.png" },
 {   img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756941696/DSC05915_ow6cox.png" },
  // {img: image20}

 
];

// Split reviews into rows with more content
const firstRow = reviews.slice(0, 4);
const secondRow = reviews.slice(4, 8);
const thirdRow = reviews.slice(8, 12);

// Hackathon Card
const HackathonCard = ({ img, name, description }) => {
  return (
    <div className="relative w-64 cursor-pointer overflow-hidden rounded-lg bg-purple-800 shadow-md hover:shadow-lg transition-shadow duration-300 mb-4 flex-shrink-0">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          className="w-full h-full object-cover" 
          alt={name} 
          src={img}
          onError={(e) => {
            console.error(`Failed to load image: ${img}`);
            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
          }}
        />
      </div>
      
    </div>
  );
};

// Marquee3D component
export default function Marquee3D() {
  return (
    <div className="relative flex h-[100vh] -mr-16 w-[72vw] flex-row items-center justify-center gap-4 overflow-hidden">
      <style jsx>{`
        @keyframes marquee-vertical {
          0% { 
            transform: translateY(0); 
          }
          100% { 
            transform: translateY(-50%); 
          }
        }

        @keyframes marquee-vertical-reverse {
          0% { 
            transform: translateY(-50%); 
          }
          100% { 
            transform: translateY(0); 
          }
        }

        .animate-marquee-vertical {
          animation: marquee-vertical var(--duration, 20s) linear infinite;
        }

        .animate-marquee-vertical-reverse {
          animation: marquee-vertical-reverse var(--duration, 20s) linear infinite;
        }

        [style*="perspective"] {
          perspective: 300px;
        }
      `}</style>

      <div
        className="flex pl-64 flex-row items-center gap-4"
        style={{
          transform: "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        <Marquee pauseOnHover vertical repeat={8} duration={30} className="h-full">
          {firstRow.map((project, index) => (
            <HackathonCard 
              key={`first-${project.name}-${index}`} 
              img={project.img}
              name={project.name}
              description={project.body}
            />
          ))}
        </Marquee>
        
        <Marquee reverse pauseOnHover vertical repeat={8} duration={30} className="h-full">
          {secondRow.map((project, index) => (
            <HackathonCard 
              key={`second-${project.name}-${index}`} 
              img={project.img}
              name={project.name}
              description={project.body}
            />
          ))}
        </Marquee>
        
        <Marquee pauseOnHover vertical repeat={8} duration={30} className="h-full">
          {thirdRow.map((project, index) => (
            <HackathonCard 
              key={`third-${project.name}-${index}`} 
              img={project.img}
              name={project.name}
              description={project.body}
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
}