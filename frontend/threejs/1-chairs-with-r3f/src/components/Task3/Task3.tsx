import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { SoftShadows, OrbitControls, MeshWobbleMaterial} from '@react-three/drei'
import {a, useSpring} from '@react-spring/three'
import { useRef, useState } from 'react'

type BoxProps = {
  position: [number, number, number]
  args: ConstructorParameters<typeof THREE.BoxGeometry>
  color: string
  hoverColor: string
  speed: number
}
const Box = ({position, args, color, hoverColor, speed}: BoxProps) => {
  const boxRef = useRef<THREE.Mesh>(null!)
  const [active, setActive] = useState<boolean>(false)
  const [hovered, setHovered] = useState<boolean>(false)
  const props = useSpring({
    scale: active ? 1.5 : 1,
  })

  useFrame((_state, delta) => {
    boxRef.current.rotation.x = boxRef.current.rotation.y += delta
  })

  return (
    <a.mesh
      ref={boxRef}
      position={position}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={props.scale}
      castShadow
    >
      <boxGeometry args={args} />
      <meshStandardMaterial color={color}></meshStandardMaterial>
      <MeshWobbleMaterial
        color={hovered? hoverColor : color}
        speed={speed}
        factor={0.6}
      />
    </a.mesh>
  )
}

function Task3 () {
  return (
    <div className="three_Canvas">
      <Canvas
        shadows
        camera={{ position: [-5, 2, 10], fov: 80 }}
      >
        {/* Enable soft shadows in the scene */}
        <SoftShadows />

        {/* this light makes things to look pretty */}
        <ambientLight intensity={0.3} />

        {/* our main source of light, also casting the shadows */}
        <directionalLight
          castShadow
          position={[0, 10, 0]} 
          intensity={Math.PI/3}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-radius={10}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        {/* both pointLights will help to illuminate the spinning boxes */}
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />

        <group>
          <mesh
            rotation={[-Math.PI/2, 0, 0]}
            position={[0, -3, 0]}
            receiveShadow
          >
            <planeGeometry args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>

          <Box position={[0,0,0]} args={[2,3,1.5]} color='hotpink' hoverColor='yellow' speed={2} />
          <Box position={[-5,0,-1]} args={[2,3,1.5]} color='purple' hoverColor='yellow' speed={2} />
          <Box position={[5,0,3]} args={[2,3,1.5]} color='yellowgreen' hoverColor='yellow' speed={2} />
        </group>

        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default Task3