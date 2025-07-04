import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { GradientTexture, MeshDistortMaterial, useCursor } from "@react-three/drei"
import { useSpring, a } from "@react-spring/three"

// Flag component with hover and click interactions
const Flag = () => {
  const [hovered, setHovered] = useState<boolean>(false) // State to track hover
  const [active, setActive] = useState<boolean>(false) // Change cursor to a pointer when hovered
  const animate = useSpring({
    scale: active ? 1.3 : 1
  }) 

  useCursor(hovered) // Change cursor to a pointer when this component is hovered on

  return (
    <a.mesh
      position={[0,0,0]}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={animate.scale}
    >
      <planeGeometry args={[5,5]} />
      {
        hovered ? ( // Apply distortion effect when hovered
          <MeshDistortMaterial factor={0.5} speed={1.5}>
            <GradientTexture
              stops={[0, 0.5, 1]}
              colors={["#fffcfd", "#f2cafb", "#dcb1f3"]}
              size={1024}
            />
          </MeshDistortMaterial>
        ) : (
          <meshStandardMaterial color="hotpink" /> // Apply solid color if not hovered
        )
      }
    </a.mesh>
  )
}

// Main component that renders the 3D canvas
export default function Task6() {
  return (
    <div className="three_Canvas">
      <Canvas
        camera={{position: [0,0,10], fov: 45}}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 0, 5]} intensity={Math.PI/2} />
        <Flag />
      </Canvas>
    </div>
  )
}