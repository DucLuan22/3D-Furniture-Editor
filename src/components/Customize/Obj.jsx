import React, { useState } from "react";
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
  const [xValue, setX] = useState(0);
  const [yValue, setY] = useState(0);
  const [zValue, setZ] = useState(0);
  const [pos, setPos] = useState(position);
  const [rot, setRot] = useState(rotation);
  const dispatch = useDispatch();
  const { isDeleteMode, isDragMode, isRotateMode, isLiftMode } = useSelector(
    (state) => state.customize
  );
  const { roomSize } = useSelector((state) => state.environment);
  let planeIntersectPoint = new THREE.Vector3();

  const [spring, api] = useSpring(() => ({
    position: pos,
    scale: 1,
    rotation: rot,
    config: { friction: 19 },
  }));

  const bind = useDrag(
    ({ active, timeStamp, event, movement: [x, y] }) => {
      if (active && isDragMode) {
        event.ray.intersectPlane(floorPlane, planeIntersectPoint);
        if (
          Math.abs(xValue) >= roomSize.x / 2 - scale + 0.8 ||
          Math.abs(zValue) >= roomSize.x / 2 - scale + 1.5
        ) {
          setPos([planeIntersectPoint.x, yValue, planeIntersectPoint.z]);
        } else {
          setPos([planeIntersectPoint.x, yValue, planeIntersectPoint.z]);
          api.start({
            position: pos,
            scale: 1,
          });
        }

        setX(planeIntersectPoint.x);
        setZ(planeIntersectPoint.z);
      }

      if (active && isLiftMode) {
        if (-y / aspect >= 0) {
          event.ray.intersectPlane(floorPlane, planeIntersectPoint);
          setPos([xValue, -y / aspect, zValue]);
          api.start({
            position: pos,
            scale: 1,
          });
          setY(-y / aspect);
        }
      }

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
      <Object scale={scale} />
    </animated.mesh>
  );
}

export default Obj;
