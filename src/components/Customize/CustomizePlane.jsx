import React, { useState } from "react";
import { OrbitControls, OrthographicCamera, Plane } from "@react-three/drei";
import * as THREE from "three";
import { angleToRadians } from "../../utils/angleToRadians";
import { useSelector } from "react-redux";
import Obj from "./Obj";

function CustomizePlane() {
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const [isDragging, setDragging] = useState(false);
  const { roomSize, lightLevel } = useSelector((state) => state.environment);
  const { models } = useSelector((state) => state.models);
  return (
    <>
      <ambientLight intensity={lightLevel.ambient} />
      <directionalLight
        intensity={lightLevel.directional}
        castShadow
        shadow-mapSize-height={300}
        shadow-mapSize-width={300}
      />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
        receiveShadow
      ></mesh>

      <mesh
        position={[roomSize.x / 2, 3.5, 0]}
        rotation={[0, -angleToRadians(90), 0]}
      >
        <Plane args={[roomSize.x, 7, 3]} />
      </mesh>

      <mesh
        position={[-roomSize.x / 2, 3.5, 0]}
        rotation={[0, angleToRadians(90), 0]}
      >
        <Plane args={[roomSize.x, 7, 3]} />
      </mesh>

      <mesh
        position={[0, 3.5, roomSize.x / 2]}
        rotation={[0, angleToRadians(180), 0]}
      >
        <Plane args={[roomSize.x, 7, 3]} />
      </mesh>

      <mesh
        position={[0, 3.5, -roomSize.x / 2]}
        rotation={[0, angleToRadians(0), 0]}
      >
        <Plane args={[roomSize.x, 7, 3]} />
      </mesh>

      <planeHelper args={[floorPlane, 1, "red"]} />

      <gridHelper args={[roomSize.x, roomSize.grid]} />

      {models.map((model) => (
        <Obj
          floorPlane={floorPlane}
          model={model.name}
          id={model.id}
          key={model.id}
          setDragging={setDragging}
          position={model.position}
          rotation={model.rotation}
          scale={model.scale}
          receiveShadow
        />
      ))}

      <OrthographicCamera makeDefault zoom={50} position={[0, 40, 100]} />

      <OrbitControls
        minZoom={10}
        maxZoom={100}
        enabled={!isDragging}
        maxPolarAngle={angleToRadians(80)}
        minPolarAngle={angleToRadians(30)}
      />
    </>
  );
}

export default CustomizePlane;
