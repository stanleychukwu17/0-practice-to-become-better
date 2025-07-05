import { Canvas } from "@react-three/fiber"
import {Html} from "@react-three/drei"
import Header from "./components/Header/Header"
import './App.css'


export default function App() {
  return (
    <div className="App">
      <Header />
      <Canvas
        camera={{ position: [0, 0, 120], fov: 70 }}
      >
        <Html fullscreen>
          <div className="title">Hello</div>
        </Html>

      </Canvas>
    </div>
  )
}
