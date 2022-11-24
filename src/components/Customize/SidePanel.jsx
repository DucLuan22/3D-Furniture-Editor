import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiFillDelete,
} from "react-icons/ai";
import { FiFile, FiRotateCcw, FiSave } from "react-icons/fi";
import { FaFileExport, FaFileImport, FaMousePointer } from "react-icons/fa";
import { BsArrowBarUp } from "react-icons/bs";
import {
  setDeleteMode,
  setDragMode,
  setLiftMode,
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
  resetModel,
  saveDesign,
  setSaveFile,
  updateSaveFile,
} from "../../slice/modelSlice";
import SaveFile from "./SaveFile";
import { Tooltip } from "flowbite-react";
import {
  setLightIntensity,
  setResetEnvironment,
  setRoomCoordinate,
} from "../../slice/environmentSlice";
import GridModifier from "./GridModifier";
import LightSettings from "./LightSettings";
import { Dropdown } from "flowbite-react/lib/esm/components";
import DropListComponent from "./DropListComponent";
function SidePanel() {
  const [isFurniture, setIsFurniture] = useState(true);
  const [roomSize, setRoomSize] = useState({
    x: 15,
    grid: 10,
  });
  const [isSave, setIsSave] = useState(false);
  const [isOptions, setOptions] = useState(false);
  const [isPanel, setPanel] = useState(true);
  const [models, setModels] = useState([]);
  const [lightLevel, setLightLevel] = useState({
    ambient: 1,
    directional: 1,
  });
  const dispatch = useDispatch();
  const { isLogin, loggedUser } = useSelector((state) => state.auth);
  const modelList = useSelector((state) => state.models);
  const { isDeleteMode, isDragMode, isRotateMode, isLiftMode } = useSelector(
    (state) => state.customize
  );
  const environment = useSelector((state) => state.environment);
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
            environment: {
              roomSize: environment.roomSize,
              lightLevel: environment.lightLevel,
            },
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
          environment: {
            roomSize: environment.roomSize,
            lightLevel: environment.lightLevel,
          },
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
  }, [loggedUser.uid, dispatch]);

  const handlingRoomResize = (e) => {
    const { value, name } = e.target;
    setRoomSize((prevState) => ({
      ...prevState,
      [name]: parseInt(value),
    }));
    dispatch(setRoomCoordinate(roomSize));
  };

  const handlingLightLevel = (e) => {
    const { value, name } = e.target;
    setLightLevel((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    dispatch(setLightIntensity(lightLevel));
  };
  const handlingNewDesign = () => {
    if (window.confirm("Do you want to create a new design?")) {
      dispatch(resetModel());
      dispatch(setResetEnvironment());
    }
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
          <section className="flex items-center justify-center flex-wrap px-2">
            <span className="text-white font-bold mr-auto">
              {/* <TfiSave className="text-3xl" onClick={handlingSave} /> */}
              <Dropdown label="Options" inline={true}>
                <Dropdown.Item onClick={handlingNewDesign}>
                  <FiFile className="mr-1" />
                  <p>New Design</p>
                </Dropdown.Item>
                <Dropdown.Item onClick={handlingSave}>
                  <FiSave className="mr-1" />
                  <p>Save Design</p>
                </Dropdown.Item>
                <Dropdown.Item>
                  <FaFileImport className="mr-1" />
                  <p>Import</p>
                </Dropdown.Item>
                <Dropdown.Item>
                  <FaFileExport className="mr-1" />
                  <p>Export</p>
                </Dropdown.Item>
              </Dropdown>
            </span>
            <h1 className="text-white text-3xl font-semibold text-center my-3 mr-[43%]">
              Menu
            </h1>
          </section>
          {/* <span className="p-2 bg-white absolute rounded-full -translate-y-2">
            <TfiSave className="text-3xl" onClick={handlingSave} />
          </span> */}

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
            <span
              className={`text-3xl bg-gray-800  hover:bg-slate-600 p-2 text-white rounded-full ${
                isLiftMode && "bg-slate-600"
              }`}
            >
              <Tooltip content="Lift Mode">
                <BsArrowBarUp onClick={() => dispatch(setLiftMode())} />
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
              <span key={save.id}>
                <SaveFile data={save} index={index} key={save.id} />
              </span>
            ))}
        </section>
      )}
      {isOptions && (
        <section className={`flex flex-col gap-5 ${!isPanel && "hidden"} mx-6`}>
          <GridModifier
            handlingRoomResize={handlingRoomResize}
            roomSize={environment.roomSize}
            setRoomSize={setRoomSize}
          />
          <LightSettings
            handlingLightLevel={handlingLightLevel}
            lightLevel={environment.lightLevel}
          />
          <DropListComponent label={"Select Wall"} title={"Wall type: "} />
          <DropListComponent label={"Select Floor"} title={"Floor type: "} />
        </section>
      )}
    </section>
  );
}

export default SidePanel;
