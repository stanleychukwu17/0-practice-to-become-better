import * as THREE from "three"
import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { MeshWobbleMaterial, SoftShadows, OrbitControls } from "@react-three/drei"
import { useControls } from "leva"

const colors = ['hotpink', 'purple']

const DirectLightComp = () => {
  const directionalLightRef = useRef<THREE.Mesh>(null!) // reference to the directional light

  // use leva to control the light color and intensity
  const {lightColor, lightIntensity} = useControls("Direct Light Settings", {
    lightColor: "#ffffff",
    lightIntensity: {value: Math.PI, min: 0, max: 10}
  })

  return (
    <directionalLight
      ref={directionalLightRef}
      color={lightColor}
      intensity={lightIntensity}
      position={[2, 10, 10]}
      castShadow
    />
  )
}

type CubeProps = {
  name: string,
  color: string,
  position: [number, number, number]
  args: [number, number, number]
}
const Cube = ({name, color, position, args}: CubeProps) => {
  const meshRef = useRef<THREE.Mesh>(null!)

  const {boxColor, xSize, ySize, zSize} = useControls(name, {
    boxColor: color,
    xSize: {value: args[0], min: 0, max: 5, step: 0.25},
    ySize: {value: args[1], min: 0, max: 5, step: 0.25},
    zSize: {value: args[2], min: 0, max: 5, step: 0.25},
  })

  // rotate the cube every frame on the x and y axis
  useFrame((state) => {
    meshRef.current.rotation.x = meshRef.current.rotation.y = state.clock.getElapsedTime()
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      castShadow
    >
      <boxGeometry args={[xSize, ySize, zSize]} />
      <MeshWobbleMaterial color={boxColor} factor={0.8} speed={1.5} />
    </mesh>
  )
}


export default function Task8() {

  return (
    <div className="three_Canvas">

      {/* the 3D canvas */}
      <Canvas
        shadows
        camera={{position:[0,0,10], fov: 40}}
      >
        {/* enable soft shadows */}
        <SoftShadows />

        {/* enable ambient light, creates a soft glow */}
        <ambientLight intensity={0.5} />

        {/* directional light for the shadows */}
        <DirectLightComp />

        {/* plane to receive the shadows */}
        <mesh
          receiveShadow
          rotation={[-Math.PI/2, 0, 0]}
          position={[0, -4, 0]}
        >
          <planeGeometry args={[100, 100]} />
          <shadowMaterial attach={"material"} opacity={0.7} />
        </mesh>

        {/* group to hold the cubes */}
        <group>
          <Cube name={`${colors[0]} cube`} position={[2,0,0]} color={`${colors[0]}`} args={[1.5,2,1.5]} />
          <Cube name={`${colors[1]} cube`} position={[-2,0,0]} color={`${colors[1]}`} args={[1.5,2,1.5]} />
        </group>

        {/* enable orbit controls */}
        <OrbitControls />

      </Canvas>
    </div>
  )
}
