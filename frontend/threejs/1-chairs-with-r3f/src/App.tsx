import { Canvas } from "@react-three/fiber"
import {Html, useGLTF} from "@react-three/drei"
import Section from "./components/Section/Section"
import Header from "./components/Header/Header"
import './App.css'

const ModelComp = () => {
  const gltf = useGLTF("/grey.gltf", true)
  return (
    <primitive object={gltf.scene} />
  )
}

const LightsComp = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={Math.PI/2} position={[10, 10, 5]} />
      <directionalLight intensity={Math.PI/2} position={[-10, 10, 0]} />
    </>
  )
}


const HtmlComponent = () => {
  return(
    <Section offset={0} factor={1}>
      <group position={[0, -20, 0]}>
        <ModelComp />
        <Html fullscreen>
          <div className="title">Hello</div>
        </Html>
      </group>
    </Section>
  )
}


export default function App() {
  return (
    <div className="App">
      <Header />
      <Canvas
        camera={{ position: [0, 0, 120], fov: 70 }}
      >
        <LightsComp />
        <HtmlComponent />
      </Canvas>
    </div>
  )
}
