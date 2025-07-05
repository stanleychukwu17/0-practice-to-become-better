import { useThree } from "@react-three/fiber";
import { useContext } from "react";

function useSection() {
  // const {sections, pages, zoom} = state;
  const {size, viewport} = useThree();
  // const offset = useContext(offsetContext)
  const {width, height} = size
  const viewportWidth = viewport.width
  const viewportHeight = viewport.height
  const canvasWidth = viewportWidth / zoom
  const canvasHeight = viewportHeight / zoom
  const mobile = size.width < 768
  const margin = canvasWidth * (mobile ? 0.2 : 0.1)
  const contentMaxWidth = canvasWidth * (mobile ? 0.8 : 0.6)
  const sectionHeight = canvasHeight * ((pages - 1) / (sections - 1))
  const aspect = size.height / viewportHeight


  return {
    size,
    viewport
  }
}

export {
  useSection
}