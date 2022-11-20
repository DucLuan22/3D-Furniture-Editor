import React from "react";
import { Tooltip } from "flowbite-react";
function GridModifier({ roomSize, handlingRoomResize }) {
  return (
    <div className="w-full ml-6 flex flex-col gap-3">
      <span className="text-white text-lg font-semibold">Plane Settings:</span>

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
