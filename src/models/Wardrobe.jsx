

import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Wardrobe(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("./glbFile/WardrobeModel.glb");
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="fa46d619c16d465ca479f075041ae5a4fbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <group
                    name="Object_6"
                    position={[0, 990, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    name="Object_8"
                    position={[0, 990, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    name="Object_10"
                    position={[0, 990, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    name="Object_12"
                    position={[0, 990, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    name="Object_14"
                    position={[0, 990, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    name="Object_16"
                    position={[0, 48, 56.07]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    name="Object_18"
                    position={[0, 258, 56.07]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    name="Object002"
                    position={[0, 990, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <mesh
                      name="Object002_Wardrobe_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Object002_Wardrobe_0.geometry}
                      material={materials.Wardrobe}
                    />
                  </group>
                  <group
                    name="Object"
                    position={[628, 4, 275.02]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    name="Object004"
                    position={[-628, 4, 275.02]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    name="Object006"
                    position={[0, 106, 81.5]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    name="Object008"
                    position={[0, 316, 81.5]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    name="Object010"
                    position={[208, 424, 275.02]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    name="Object090"
                    position={[0, 48, 56.07]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <mesh
                      name="Object090_Napr_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Object090_Napr_0.geometry}
                      material={materials.Napr}
                    />
                  </group>
                  <group
                    name="Object091"
                    position={[0, 48, 56.07]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    name="Object092"
                    position={[0, 258, 56.07]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <mesh
                      name="Object092_Napr_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Object092_Napr_0.geometry}
                      material={materials.Napr}
                    />
                  </group>
                  <group
                    name="Object093"
                    position={[0, 258, 56.07]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.Wardrobe}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <skinnedMesh
                    name="Object_9"
                    geometry={nodes.Object_9.geometry}
                    material={materials.Wardrobe}
                    skeleton={nodes.Object_9.skeleton}
                  />
                  <skinnedMesh
                    name="Object_11"
                    geometry={nodes.Object_11.geometry}
                    material={materials.Wardrobe}
                    skeleton={nodes.Object_11.skeleton}
                  />
                  <skinnedMesh
                    name="Object_13"
                    geometry={nodes.Object_13.geometry}
                    material={materials.Wardrobe}
                    skeleton={nodes.Object_13.skeleton}
                  />
                  <skinnedMesh
                    name="Object_15"
                    geometry={nodes.Object_15.geometry}
                    material={materials.Wardrobe}
                    skeleton={nodes.Object_15.skeleton}
                  />
                  <skinnedMesh
                    name="Object_17"
                    geometry={nodes.Object_17.geometry}
                    material={materials.Napr}
                    skeleton={nodes.Object_17.skeleton}
                  />
                  <skinnedMesh
                    name="Object_19"
                    geometry={nodes.Object_19.geometry}
                    material={materials.Napr}
                    skeleton={nodes.Object_19.skeleton}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./glbFile/WardrobeModel.glb");