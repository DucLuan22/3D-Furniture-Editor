import React from "react";
import { Tooltip } from "flowbite-react";
function LightSettings({ handlingLightLevel, lightLevel }) {
  return (
    <section className="w-full flex flex-col gap-3">
      <span className="text-white text-lg font-semibold">Light Settings:</span>
      <article>
        <Tooltip content={lightLevel.ambient}>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-sm text-white">
              Ambient Light
            </span>
            <input
              type="range"
              className=" w-[250px] sm:w-[330px]"
              name="ambient"
              value={lightLevel.ambient}
              min={0.05}
              step={0.05}
              max={3}
              onChange={handlingLightLevel}
            />
          </div>
        </Tooltip>
      </article>
      <article>
        <Tooltip content={lightLevel.directional}>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-sm text-white">
              Directional Light
            </span>
            <input
              type="range"
              className=" w-[250px] sm:w-[330px]"
              name="directional"
              value={lightLevel.directional}
              min={0.05}
              step={0.05}
              max={3}
              onChange={handlingLightLevel}
            />
          </div>
        </Tooltip>
      </article>
    </section>
  );
}

export default LightSettings;
