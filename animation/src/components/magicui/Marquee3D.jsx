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
  {   img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945980/DSC06066_fjkkbr.webp" },
  {  img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945978/image2_hvtr9u.webp" },
  { img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945972/DSC06065_oy5yke.webp"},
  {  img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945968/DSC06062_tidu1s.webp" },
  { img : "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945927/DSC06039_shmwqo.webp"},
  {  img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945915/DSC06032_ygu0ot.webp" },
  {   img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945791/DSC05953_txzd2h.webp" },
  {   img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945878/DSC06011_hvmswk.webp" },
  {  img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945897/DSC06023_je5zte.webp" },
  {   img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945820/DSC05975_ap5fjh.webp" },
  {   img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945814/DSC05968_gerdgk.webp" },
  {   img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945794/DSC05955_blgewh.webp" },
  {   img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945873/DSC05996_ixjbi6.webp" },
  {   img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945770/DSC05930_xullbg.webp" },
  {   img: "https://res.cloudinary.com/drm13zjc5/image/upload/v1756945750/DSC05913_pbk8zg.webp" },
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