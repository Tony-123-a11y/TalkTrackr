import {motion} from 'motion/react'
export default function ConcentricCircles({
  size = 320,
  rings = 6,
}) {
  
  const gap = Math.floor(size / (rings * 2));
  const ringsArr = Array.from({ length: rings }).map((_, i) => {
    const ringSize = size - i * gap;
    return { idx: i, w: ringSize };
  });


  return (
    <div className={`   mx-auto w-full h-full p-6 max-sm:p-4  fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}>
   <div className="absolute left-0 top-0 h-full w-full bg-black/30 z-10"/>
      <div className="relative bg-transparent h-full w-full mx-auto">
        {/* center wrapper */}
      
        {ringsArr.map((r, i) => (
         
          <motion.div
          initial={{scale:0}}
          animate={{scale:1}}
          transition={{
            delay: i*0.2,
            duration:0.5,
            type:'spring',
            stiffness:80
          }}
            key={r.idx}
            className={`absolute c${i}  left-1/2 rings   top-1/2 -translate-x-1/2  overflow-hidden -translate-y-1/2 shadow-md  flex items-center justify-center rounded-full`}
            style={{
              width: ` ${370 + i * 300}px`,
              height: ` ${370 + i * 300}px`,
              zIndex: -i
            }}
          >
      
      
          <div
      
           style={{ width: 280 * (i+1), height: 250 *(i+1),zIndex:i,transform:`translate(-80%,-25%)`}} className="absolute innerCircleLeft blur-3xl   rounded-full "/>
          <div
           style={{ width: 280 * (i+1), height: 250 *(i+1),zIndex:i,transform:`translate(80%,-25%)`}} className="absolute innerCircleRight blur-3xl   rounded-full "/>
            </motion.div>
         
        ))}


      </div>


    </div>
    
  );
}
