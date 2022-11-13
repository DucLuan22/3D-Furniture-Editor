import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import {
  setDeleteMode,
  setDragMode,
  setRotateMode,
} from "../../slice/customizeSlice";
import MenuComponent from "./MenuComponent";

function SidePanel() {
  const [isFurniture, setIsFurniture] = useState(true);
  const [isModifier, setIsModifier] = useState(false);
  const [isPanel, setPanel] = useState(true);
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
    <section
      className={`bg-gray-700 opacity-90 absolute z-50 float-left transition-all duration-300 h-full overflow-y-auto scrollbar-hide ${
        isPanel ? "md:w-[380px] lg:w-[500px]" : "w-[55px]"
      }`}
    >
      <span
        className="absolute text rounded-full p-3 -right-1 -translate-x-2  text-2xl top-2 text-white cursor-pointer bg-white"
        onClick={() => setPanel(!isPanel)}
      >
        {isPanel && <AiOutlineArrowLeft className="text-gray-800" />}
        {!isPanel && <AiOutlineArrowRight className="text-gray-800" />}
      </span>

      {isPanel && (
        <div>
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
        </div>
      )}

      {/* Furniture list */}
      {isFurniture && (
        <section className={`flex flex-wrap gap-9 ${!isPanel && "hidden"}`}>
          <MenuComponent model={"Sofa"} />
          <MenuComponent model={"Sofa"} />
          <MenuComponent model={"Sofa"} />
          <MenuComponent model={"Sofa"} />
          <MenuComponent model={"Sofa"} />
          <MenuComponent model={"Sofa"} />
          <MenuComponent model={"Sofa"} />
          <MenuComponent model={"Sofa"} />
          <MenuComponent model={"Sofa"} />
          <MenuComponent model={"Sofa"} />
          <MenuComponent model={"Sofa"} />
        </section>
      )}
      {/* Modifiers  */}
      {isPanel && isModifier && (
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
    </section>
  );
}

export default SidePanel;
