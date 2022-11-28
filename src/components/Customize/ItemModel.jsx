import React, { Suspense, useRef } from "react";
import { useDispatch } from "react-redux";
import { addModel } from "../../slice/modelSlice";
import { angleToRadians } from "../../utils/angleToRadians";
import Loader from "./Loader";

function ItemModel({ model }) {
  const ref = useRef();

  const dispatch = useDispatch();
  // useFrame((state, delta) => (ref.current.rotation.y += 0.01));
  const Model = require(`../../models/${model.name}`).default;
  return (
    <Suspense fallback={<Loader />}>
      <mesh
        ref={ref}
        onClick={() =>
          dispatch(
            addModel({
              position: [0, 0, 0],
              rotation: [0, 0, 0],
              name: model.name,
              scale: model.scale,
              id: Math.floor(Math.random() * 100000),
            })
          )
        }
      >
        <Model scale={model.menu_scale} />
      </mesh>
      <ambientLight args={["#FFFFFF", 0.25]} />
      <spotLight
        args={["#FFFFFF", 1.5, 20, angleToRadians(60), 0.4]}
        position={[-1, 11, 0]}
        castShadow={true}
      />
    </Suspense>
  );
}

export default ItemModel;
