import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";

import ItemModel from "./ItemModel";

function MenuComponent({ model }) {
  return (
    <section className="w-[130px] hover:bg-slate-400 flex flex-col">
      <Canvas className="item-container block">
        <ItemModel model={model} />
      </Canvas>
    </section>
  );
}

export default MenuComponent;
