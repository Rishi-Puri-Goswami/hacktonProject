import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useHelper, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, motion } from 'framer-motion';
import ue from '../../src/assets/ueue.png';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

const Star = () => {
    const [opa, setOpa] = useState(0);
    const [contextLost, setContextLost] = useState(false);

    const [showText, setShowText] = useState(false);
    // let tex = useTexture("../assets/ueue.png");


    // Opacity animation for canvas with requestAnimationFrame
    useEffect(() => {
        let i = 0;
        let rafId;
        const animateOpacity = () => {
            if (i <= 100) {
                setOpa(i);
                i++;
                rafId = requestAnimationFrame(animateOpacity);
            }
        };
        rafId = requestAnimationFrame(animateOpacity);
        return () => cancelAnimationFrame(rafId);
    }, []);

    // Spring for smooth zoom and text animation
    const springConfig = { damping: 30, stiffness: 100 };
    const zSpring = useSpring(1000, springConfig); // Initial Z for zoom
    const textSpring = useSpring(-10, springConfig); // Initial Y at top

    // Scroll handler for zoom and text
    useEffect(() => {
        const handleScroll = () => {
            const section = document.querySelector('.star-section');
            if (section) {
                const rect = section.getBoundingClientRect();
                const animationHeight = rect.height - window.innerHeight;
                const progress = Math.max(0, Math.min(-rect.top / animationHeight, 1));
                const newZ = 1000 - progress * 950; // From 1000 (zoomed out) to 50 (zoomed in)
                const newTextY = 0 + progress * 50; // From 0 (top) to 50 (slightly below top)
                zSpring.set(newZ);
                textSpring.set(newTextY);

                if (newZ < 200) { // tweak this number as needed
                    setShowText(true);
                } else {
                    setShowText(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call
        return () => window.removeEventListener('scroll', handleScroll);
    }, [zSpring, textSpring]);

    // Fallback UI for context loss
    if (contextLost) {
        return (
            <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h1>WebGL rendering failed. Please refresh the page.</h1>
            </div>
        );
    }

    return (
        <div 
   
        //  data-scroll data-scroll-speed="1"
        className='bg-black ' style={{ width: '100vw', height: '100vh', opacity: opa / 100, position: 'relative' }}>
            <Canvas
                camera={{ position: [0, 0, 1000] }} // Initial Z matches zSpring
                gl={{
                    antialias: true,
                    preserveDrawingBuffer: false,
                    powerPreference: 'default',
                    alpha: true,
                }}
            >
                <ContextLossHandler setContextLost={setContextLost} />
                <CameraUpdater zSpring={zSpring} />

{
    window.innerWidth >= 640 ? <Stars count={30000} speed={1} saturation={10} />
    : <Stars count={10000} speed={1} saturation={10} />
}

                
            </Canvas>

            <motion.div
                className="absolute top-1 flex justify-center font-loadfont w-full text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-loadFont whitespace-nowrap"
                style={{ y: textSpring }}
                initial={{ opacity: 0 }}
                animate={{ opacity: showText ? 1 : 0 }}
                transition={{ duration: 0.5 }}
            >
                THEMES
            </motion.div>

            <motion.div
                className="absolute md:top-[-40px] top-[-65px] left-1/2 -translate-x-1/2 h-[110vh] w-full bg-rd-200/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: showText ? 1 : 0 }}
                transition={{ duration: 0.5 }}
            >
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <TexturedCylinder />
                    <EffectComposer>
                        <Bloom
                            intensity={5.0}
                            mipmapBlur
                            luminanceThreshold={0}
                            luminanceSmoothing={0}
                        />
                    </EffectComposer>
                </Canvas>
            </motion.div>

        </div>
    );
};

function TexturedCylinder() {
    const tex = useTexture(ue);
    const meshRef = useRef();
    const [scale, setScale] = useState([1, 1, 1]);

    useEffect(() => {
        const updateScale = () => {
            if (window.innerWidth < 640) { // sm
                setScale([0.7, 0.7, 0.7]);
            } else if (window.innerWidth < 1024) { // md
                setScale([0.85, 0.85, 0.85]);
            } else {
                setScale([1, 1, 1]); // default (laptop/desktop)
            }
        };

        updateScale();
        window.addEventListener("resize", updateScale);
        return () => window.removeEventListener("resize", updateScale);
    }, []);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.003; // rotate smoothly
        }
    });

    return (
        <mesh ref={meshRef} rotation={[-6.15, 2, -0.04]} position={[0, 0, 0]} scale={scale}>
            {/* <OrbitControls/> */}
            <cylinderGeometry args={[3.5, 3.5, 1, 40, 40, true]} />
            <meshStandardMaterial map={tex} transparent side={THREE.DoubleSide} />
        </mesh>
    );
}

// Camera updater using useFrame for smooth updates
function CameraUpdater({ zSpring }) {
    const { camera } = useThree();

    useFrame(() => {
        camera.position.z = zSpring.get();
    });

    return null;
}

// Handle WebGL context loss
function ContextLossHandler({ setContextLost }) {
    const { gl } = useThree();

    useEffect(() => {
        const handleContextLost = (event) => {
            console.warn('WebGL context lost, attempting to restore...');
            event.preventDefault();
            setContextLost(true);
        };

        const handleContextRestored = () => {
            console.log('WebGL context restored');
            setContextLost(false);
        };

        gl.domElement.addEventListener('webglcontextlost', handleContextLost);
        gl.domElement.addEventListener('webglcontextrestored', handleContextRestored);

        return () => {
            gl.domElement.removeEventListener('webglcontextlost', handleContextLost);
            gl.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
        };
    }, [gl, setContextLost]);

    return null;
}



export default Star;