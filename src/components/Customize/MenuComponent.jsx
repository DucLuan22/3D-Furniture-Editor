import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";

import ItemModel from "./ItemModel";
import Loader from "./Loader";

function MenuComponent({ model }) {
  return (
    <section className="w-[130px] hover:bg-slate-400 flex mt-10">
      <Canvas className="item-container block">
        <ItemModel model={model} />
      </Canvas>
    </section>
  );
}

export default MenuComponent;
