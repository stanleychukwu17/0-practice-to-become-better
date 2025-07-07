import { Canvas } from "@react-three/fiber"
import {Html} from "@react-three/drei"
import Section from "./components/Section/Section"
import Header from "./components/Header/Header"
import './App.css'

const HtmlComponent = () => {
  return(
    <Section offset={0} factor={1}>
      <group position={[0, -20, 0]}>
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
        <HtmlComponent />
      </Canvas>
    </div>
  )
}
