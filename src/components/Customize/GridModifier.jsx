import React from "react";
import { Tooltip } from "flowbite-react";
import { Checkbox } from "flowbite-react/lib/esm/components";
import { useDispatch, useSelector } from "react-redux";
import { setGridHelper } from "../../slice/environmentSlice";
function GridModifier({ roomSize, handlingRoomResize }) {
  const dispatch = useDispatch();
  const { isGridHelper } = useSelector((state) => state.environment);
  return (
    <div className="w-full flex flex-col gap-3">
      <span className="text-white text-lg font-semibold">Plane Settings:</span>
      <span className="text-white flex items-center gap-1">
        <Checkbox
          checked={isGridHelper}
          onChange={(e) => dispatch(setGridHelper(e.target.checked))}
        />
        <label className="font-semibold" htmlFor="remember">
          Grid Helper
        </label>
      </span>
      <article>
        <Tooltip content={roomSize.x}>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-sm text-white">Size</span>
            <input
              type="range"
              className=" w-[250px] sm:w-[380px] "
              name="x"
              value={roomSize.x}
              min={5}
              max={50}
              onChange={handlingRoomResize}
            />
          </div>
        </Tooltip>
      </article>

      <article>
        <Tooltip content={roomSize.grid}>
          <div className="flex items-center gap-3 mr-8">
            <span className="font-semibold text-sm text-white">Grid</span>
            <input
              type="range"
              name="grid"
              value={roomSize.grid}
              className=" w-[250px] sm:w-[380px]"
              min={5}
              max={50}
              onChange={handlingRoomResize}
            />
          </div>
        </Tooltip>
      </article>
    </div>
  );
}

export default GridModifier;
