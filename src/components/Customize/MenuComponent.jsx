import { Canvas } from "@react-three/fiber";
import React from "react";

import ItemModel from "./ItemModel";

function MenuComponent({ model }) {
  return (
    <section className="w-[200px] hover:bg-slate-400 flex mt-10">
      <Canvas className="item-container block ">
        <ItemModel model={model} />
      </Canvas>
    </section>
  );
}

export default MenuComponent;
