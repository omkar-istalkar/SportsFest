import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function ParallaxContainer({ children }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Convert mouse position to small rotations/translations
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);
  const translateX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const translateY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

  useEffect(() => {
    const handleMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        x: translateX,
        y: translateY
      }}
      className="relative w-full h-full flex items-center justify-center"
    >
      {children}
    </motion.div>
  );
}