import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiFillDelete,
} from "react-icons/ai";
import { TfiSave } from "react-icons/tfi";
import { FiRotateCcw } from "react-icons/fi";
import { FaMousePointer } from "react-icons/fa";
import {
  setDeleteMode,
  setDragMode,
  setRotateMode,
} from "../../slice/customizeSlice";
import MenuComponent from "./MenuComponent";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebaseAuth";
import { v4 as uuidv4 } from "uuid";
import {
  addSaveFile,
  saveDesign,
  setSaveFile,
  updateSaveFile,
} from "../../slice/modelSlice";
import SaveFile from "./SaveFile";
import { Tooltip } from "flowbite-react";

function SidePanel() {
  const [isFurniture, setIsFurniture] = useState(true);
  const [roomSize, setRoomSize] = useState({
    x: 5,
    y: 5,
  });
  const [isSave, setIsSave] = useState(false);
  const [isOptions, setOptions] = useState(false);
  const [isPanel, setPanel] = useState(true);
  const [models, setModels] = useState([]);
  const dispatch = useDispatch();
  const { isLogin, loggedUser } = useSelector((state) => state.auth);
  const modelList = useSelector((state) => state.models);
  const { isDeleteMode, isDragMode, isRotateMode } = useSelector(
    (state) => state.customize
  );
  const navigate = useNavigate();
  const openFurnitures = () => {
    setIsFurniture(true);
    setIsSave(false);
    setOptions(false);
  };
  const openModifiers = () => {
    setIsFurniture(false);
    setIsSave(true);
    setOptions(false);
  };

  const openOptions = () => {
    setIsFurniture(false);
    setIsSave(false);
    setOptions(true);
  };
  const handlingSave = async () => {
    if (!isLogin) {
      navigate("/login");
      return 0;
    }

    if (window.confirm("Do you want to save this design?")) {
      const data = query(
        collection(db, "users"),
        where("uid", "==", loggedUser?.uid)
      );
      const user_id = (await getDocs(data)).docs.map((doc) => doc.id);
      const docRef = doc(db, "users", user_id[0]);

      if (modelList.isLoaded) {
        const saveFile = dispatch(
          saveDesign({
            models: [...modelList.models],
            id: modelList.loadedDesign.id,
          })
        ).payload;

        let updatedSaveFileList = [...modelList.saveFileList];

        const index = updatedSaveFileList.findIndex(
          (file) => file.id === saveFile.id
        );

        updatedSaveFileList[index] = { ...saveFile };

        await dispatch(updateSaveFile(saveFile)).payload;
        await updateDoc(docRef, {
          customization: updatedSaveFileList,
        });
        return 0;
      }

      const savedFile = dispatch(
        saveDesign({
          models: [...modelList.models],
          id: uuidv4(),
        })
      ).payload;

      dispatch(addSaveFile(savedFile));
      const handlingSaveDesign = async () => {
        await updateDoc(docRef, {
          customization: arrayUnion(savedFile),
          currnent_loaded: savedFile.id,
        });
      };
      handlingSaveDesign();
    }
  };

  useEffect(() => {
    const getModels = async () => {
      const modelSnapshots = await getDocs(collection(db, "models"));
      setModels(
        modelSnapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    const getSavedFiles = async () => {
      if (loggedUser) {
        const data = query(
          collection(db, "users"),
          where("uid", "==", loggedUser?.uid)
        );
        const user_id = (await getDocs(data)).docs.map((doc) => doc.id);
        const docRef = doc(db, "users", user_id[0]);
        const saveFileSnapshots = await getDoc(docRef);
        dispatch(setSaveFile(saveFileSnapshots.data().customization));
      }
    };
    getModels();
    getSavedFiles();
  }, [loggedUser.uid]);

  const handlingRoomResize = (e) => {
    const { value, name } = e.target;
    setRoomSize((prevState) => ({
      ...prevState,
      [name]: parseInt(value),
    }));
  };
  return (
    <section
      className={`bg-gray-700 opacity-90 absolute z-50 float-left transition-all duration-300 h-full overflow-y-auto scrollbar-hide ${
        isPanel ? "md:w-[380px] lg:w-[500px]" : "w-[55px]"
      }`}
    >
      <span
        className="absolute text rounded-full p-3 -right-1 -translate-x-2 -translate-y-1 text-2xl top-2 text-white cursor-pointer bg-white"
        onClick={() => setPanel(!isPanel)}
      >
        {isPanel && <AiOutlineArrowLeft className="text-gray-800" />}
        {!isPanel && <AiOutlineArrowRight className="text-gray-800" />}
      </span>

      {isPanel && (
        <div>
          <span className="p-2 bg-white absolute translate-x-2 rounded-full -translate-y-2">
            <TfiSave className="text-3xl" onClick={handlingSave} />
          </span>

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
              Load Saved Designs
            </button>
            <div className="border-r-[1px] border-white" />
            <button
              className="py-2 w-full hover:bg-slate-200 cursor-pointer hover:opacity-70"
              onClick={openOptions}
            >
              Options
            </button>
          </section>
          <hr />

          <section className="flex flex-wrap justify-evenly mt-3 mb-3">
            <span
              className={`text-3xl bg-gray-800 p-2 hover:bg-slate-600 text-white rounded-full ${
                isDragMode && "bg-slate-600"
              }`}
            >
              <Tooltip content="Drag Mode">
                <FaMousePointer onClick={() => dispatch(setDragMode())} />
              </Tooltip>
            </span>

            <span
              className={`text-3xl hover:bg-slate-600 bg-gray-800 p-2 text-white rounded-full ${
                isDeleteMode && "bg-slate-600"
              }`}
            >
              <Tooltip content="Delete Mode">
                <AiFillDelete onClick={() => dispatch(setDeleteMode())} />
              </Tooltip>
            </span>

            <span
              className={`text-3xl bg-gray-800  hover:bg-slate-600 p-2 text-white rounded-full ${
                isRotateMode && "bg-slate-600"
              }`}
            >
              <Tooltip content="Rotate Mode">
                <FiRotateCcw onClick={() => dispatch(setRotateMode())} />
              </Tooltip>
            </span>
          </section>
        </div>
      )}

      {/* Furniture list */}
      {isFurniture && (
        <section className={`flex flex-wrap gap-9 ${!isPanel && "hidden"}`}>
          {models.length !== 0 &&
            models.map((product) => (
              <div key={product.id}>
                <MenuComponent model={product} />
              </div>
            ))}
        </section>
      )}
      {isSave && (
        <section className={`flex  flex-col gap-9 ${!isPanel && "hidden"}`}>
          {modelList &&
            modelList.saveFileList.map((save, index) => (
              <SaveFile data={save} index={index} />
            ))}
        </section>
      )}
      {isOptions && (
        <section className={`flex flex-col gap-9 ${!isPanel && "hidden"}`}>
          <div className="w-full ml-6">
            <span className="text-white text-lg font-semibold">Room Size:</span>
            <Tooltip content={roomSize.x}>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-xl text-white">X </span>
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
            <Tooltip content={roomSize.y}>
              <div className="flex items-center gap-3 mt-3">
                <span className="font-semibold text-xl text-white">Y </span>
                <input
                  type="range"
                  name="y"
                  value={roomSize.y}
                  className=" w-[250px] sm:w-[380px]"
                  min={5}
                  max={50}
                  onChange={handlingRoomResize}
                />
              </div>
            </Tooltip>
          </div>
        </section>
      )}
    </section>
  );
}

export default SidePanel;
