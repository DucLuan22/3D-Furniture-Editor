import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomizePlane from "../components/Customize/CustomizePlane";
import MenuComponent from "../components/Customize/MenuComponent";
import {
  setDeleteMode,
  setDragMode,
  setRotateMode,
} from "../slice/customizeSlice";

const Customization = () => {
  const [isFurniture, setIsFurniture] = useState(true);
  const [isModifier, setIsModifier] = useState(false);
  const dispatch = useDispatch();
  const { isDeleteMode, isDragMode, isRotateMode } = useSelector(
    (state) => state.customize
  );
  const openFurnitures = () => {
    setIsFurniture(true);
    setIsModifier(false);
  };

  const openModifiers = () => {
    setIsFurniture(false);
    setIsModifier(true);
  };

  return (
    <main className="w-screen h-screen bg-gray-400">
      <div className="bg-gray-700 opacity-90 absolute z-50 md:w-[380px] lg:w-[500px] h-full">
        <h1 className="text-white text-3xl font-semibold text-center my-3">
          Customization Menu
        </h1>
        <hr />
        <section className="flex justify-evenly text-2xl font-semibold">
          <button
            className="py-2 hover:bg-slate-200 hover:opacity-70 w-full"
            onClick={openFurnitures}
          >
            Furnitures
          </button>
          <div className="border-r-[1px] border-white" />
          <button
            className="py-2 w-full hover:bg-slate-200 cursor-pointer hover:opacity-70"
            onClick={openModifiers}
          >
            Modifiers
          </button>
        </section>
        <hr />
        {/* Furniture list */}
        {isFurniture && (
          <section className="flex gap-2 flex-wrap justify-center">
            <MenuComponent model={"Sofa"} />
          </section>
        )}
        {/* Modifiers  */}
        {isModifier && (
          <section className="flex flex-col gap-2 flex-wrap justify-center">
            <button
              className={`hover:bg-slate-500 opacity-90 py-2 ${
                isDragMode && "bg-slate-100 hover:bg-slate-100"
              }`}
              onClick={() => dispatch(setDragMode())}
            >
              Drag Mode
            </button>
            <button
              className={`hover:bg-slate-500 opacity-90 py-2 ${
                isDeleteMode && "bg-slate-100 hover:bg-slate-100"
              }`}
              onClick={() => dispatch(setDeleteMode())}
            >
              Delete Mode
            </button>
            <button
              className={`hover:bg-slate-500 opacity-90 py-2 ${
                isRotateMode && "bg-slate-100 hover:bg-slate-100"
              }`}
              onClick={() => dispatch(setRotateMode())}
            >
              Rotate Mode
            </button>
          </section>
        )}
      </div>
      <Canvas id="three-canvas-container" shadows>
        <Suspense fallback={null}>
          <CustomizePlane />
        </Suspense>
      </Canvas>
    </main>
  );
};

export default Customization;
