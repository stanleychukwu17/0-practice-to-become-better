import * as THREE from "three"
import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useHelper, OrbitControls } from '@react-three/drei';
import './Task7.css'

const Cube = () => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const lightRef = useRef<THREE.Mesh>(null!)

  useHelper(meshRef, THREE.BoxHelper, "red")
  useHelper(lightRef, THREE.DirectionalLightHelper, 1)

  useFrame((_state, delta) => {
    meshRef.current.rotation.x = meshRef.current.rotation.y += delta
  })

  return (
    <group>
      <directionalLight ref={lightRef} position={[0, 2, 5]} intensity={Math.PI} />

      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
      >
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color={"hotpink"} />
      </mesh>
    </group>
  )
}

export default function Task7() {

  return (
    <div className="three_Canvas">
      <Canvas
        camera={{position: [-5,5,10], fov:60}}
      >
        {/* Enable soft light on the scene */}
        <ambientLight intensity={0.5} />

        {/* Enable axesHelper */}
        <axesHelper args={[5]} />

        {/* Enable gridHelper, position it just below the axesHelper, i.e y position -0.1 */}
        <gridHelper position={[0, -0.1, 0]} args={[15]} />

        <Cube />

        <OrbitControls />
      </Canvas>
    </div>
  )
}