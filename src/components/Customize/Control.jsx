import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { angleToRadians } from "../../utils/angleToRadians";

const Control = ({ isDragging }) => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();
  useFrame(() => {
    orbitRef.current.update();
  });

  return (
    <OrbitControls
      enabled={!isDragging}
      minZoom={10}
      maxZoom={100}
      maxPolarAngle={angleToRadians(80)}
      minPolarAngle={angleToRadians(30)}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
};
export default Control;
