import React, { useState } from "react";
import { OrthographicCamera, Plane } from "@react-three/drei";
import * as THREE from "three";
import { angleToRadians } from "../../utils/angleToRadians";
import { useSelector } from "react-redux";
import { useTexture } from "@react-three/drei/";
import Obj from "./Obj";

import Control from "./Control";

function CustomizePlane() {
  const textureWall = useTexture("./wall-texture/White-Concrete.jpg");
  const textureFloor = useTexture("./floor-texture/Basketball-Floor.jpg");
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.0001);
  const [isDragging, setDragging] = useState(false);
  const { roomSize, lightLevel, isGridHelper } = useSelector(
    (state) => state.environment
  );
  const { models } = useSelector((state) => state.models);
  return (
    <>
      <ambientLight intensity={lightLevel.ambient} />
      <directionalLight
        intensity={lightLevel.directional}
        shadow-mapSize-height={roomSize}
        shadow-mapSize-width={roomSize}
      />

      <mesh
        position={[roomSize.x / 2, 3.5, 0]}
        rotation={[0, -angleToRadians(90), 0]}
      >
        <Plane args={[roomSize.x, 7, 3]}>
          <meshStandardMaterial map={textureWall} />
        </Plane>
      </mesh>

      <mesh
        position={[-roomSize.x / 2, 3.5, 0]}
        rotation={[0, angleToRadians(90), 0]}
      >
        <Plane args={[roomSize.x, 7, 3]}>
          <meshStandardMaterial map={textureWall} />
        </Plane>
      </mesh>

      <mesh
        position={[0, 3.5, roomSize.x / 2]}
        rotation={[0, angleToRadians(180), 0]}
      >
        <Plane args={[roomSize.x, 7, 3]}>
          <meshStandardMaterial map={textureWall} />
        </Plane>
      </mesh>

      <mesh
        position={[0, 3.5, -roomSize.x / 2]}
        rotation={[0, angleToRadians(0), 0]}
      >
        <Plane args={[roomSize.x, 7, 3]}>
          <meshStandardMaterial map={textureWall} />
        </Plane>
      </mesh>

      <planeHelper args={[floorPlane, 1, "red"]} />

      {isGridHelper && (
        <gridHelper
          args={[roomSize.x, roomSize.grid]}
          add
          position={[0, 0.001, 0]}
        >
          <meshStandardMaterial map={textureWall} />
        </gridHelper>
      )}
      <mesh rotation={[-angleToRadians(90), 0, 0]}>
        <Plane args={[roomSize.x, roomSize.x, 1]}>
          <meshStandardMaterial map={textureFloor} />
        </Plane>
      </mesh>

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

      <Control isDragging={isDragging} />
    </>
  );
}

export default CustomizePlane;
