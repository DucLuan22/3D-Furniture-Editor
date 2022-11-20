import React, { useState, useRef } from "react";
import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/three";

import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useDispatch, useSelector } from "react-redux";
import { removeModel, updateModelPosAndRot } from "../../slice/modelSlice";

function Obj({
  floorPlane,
  model,
  id,
  setDragging,
  position,
  rotation,
  scale,
}) {
  const Object = require(`../../models/${model}`).default;
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const [movement, setMovement] = useState();
  const [pos, setPos] = useState(position);
  const [rot, setRot] = useState(rotation);
  const dispatch = useDispatch();
  const { isDeleteMode, isDragMode, isRotateMode, isLiftMode } = useSelector(
    (state) => state.customize
  );

  let planeIntersectPoint = new THREE.Vector3();

  const [spring, api] = useSpring(() => ({
    position: pos,
    scale: 1,
    rotation: rot,
    config: { friction: 20 },
  }));

  const bind = useDrag(
    ({ active, timeStamp, event, movement: [x, y] }) => {
      if (active && isDragMode) {
        event.ray.intersectPlane(floorPlane, planeIntersectPoint);
        setPos([planeIntersectPoint.x, 0, planeIntersectPoint.z]);
        api.start({
          // position: active ? [x / aspect, -y / aspect, 0] : [0, 0, 0],
          position: pos,
          scale: 1,
          // rotation: [0, x / aspect, 0],
        });
      }

      // if (active && isLiftMode) {
      //   event.ray.intersectPlane(floorPlane, planeIntersectPoint);
      //   setPos([planeIntersectPoint.x, 0, planeIntersectPoint.z]);
      //   api.start({
      //     // position: active ? [x / aspect, -y / aspect, 0] : [0, 0, 0],
      //     position: pos,
      //     scale: 1,
      //     // rotation: [0, x / aspect, 0],
      //   });
      //   console.log(planeIntersectPoint);
      // }

      if (active && isRotateMode) {
        setMovement(x);
        setRot([0, movement / (1.2 * aspect), 0]);
        api.start({
          scale: 1,
          rotation: rot,
        });
      }
      if (isDeleteMode) {
        dispatch(removeModel(id));
      }

      if (!active) {
        dispatch(updateModelPosAndRot({ id, position: pos, rotation: rot }));
      }
      setDragging(active);
      return timeStamp;
    },
    { delay: true }
  );

  return (
    <animated.mesh {...spring} {...bind()} castShadow>
      <Object scale={scale} recieveShadow />
    </animated.mesh>
  );
}

export default Obj;
