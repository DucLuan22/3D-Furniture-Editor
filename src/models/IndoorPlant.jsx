import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function IndoorPlant(props) {
  const { nodes, materials } = useGLTF("./glbFile/indoor_plant.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group scale={1.1}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle_1.geometry}
            material={materials.Indoor_Plant_pot_2}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle_0.geometry}
            material={materials.Indoor_Plant_pot}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle_2.geometry}
            material={materials["Material.005"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle_3.geometry}
            material={materials.Indoor_Plant}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle_4.geometry}
            material={materials.Indoor_Plant_ground}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle_5.geometry}
            material={materials["Material.002"]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./glbFile/indoor_plant.glb");
