import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeSaveFile,
  saveDesign,
  setModel,
  unLoadSaveFile,
} from "../../slice/modelSlice";
import { BsFillTrashFill, BsFillCloudUploadFill } from "react-icons/bs";
import {
  arrayRemove,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebaseAuth";
import {
  setFloorType,
  setLightIntensity,
  setResetEnvironment,
  setRoomCoordinate,
  setWallType,
} from "../../slice/environmentSlice";
function SaveFile({ data, index, key }) {
  const dispatch = useDispatch();
  const { loadedDesign, isLoaded } = useSelector((state) => state.models);
  const { loggedUser } = useSelector((state) => state.auth);
  const handlingLoadingSaveFile = () => {
    if (window.confirm(`Do you want to load save file ${index}`)) {
      dispatch(setModel(data.models));
      dispatch(saveDesign(data));
      dispatch(setLightIntensity(data.environment.lightLevel));
      dispatch(setRoomCoordinate(data.environment.roomSize));
      dispatch(setWallType(data.environment.wallType));
      dispatch(setFloorType(data.environment.floorType));
    }
  };
  const deleteSavefile = async () => {
    if (window.confirm(`Do you want to load delete file ${index}`)) {
      const queryData = query(
        collection(db, "users"),
        where("uid", "==", loggedUser.uid)
      );
      const user_id = (await getDocs(queryData)).docs.map((doc) => doc.id);
      const docRef = doc(db, "users", user_id[0]);

      dispatch(removeSaveFile(data));
      if (loadedDesign.id === data?.id && isLoaded == true) {
        dispatch(unLoadSaveFile());
        dispatch(setModel([]));
        dispatch(setResetEnvironment());
      }
      await updateDoc(docRef, {
        customization: arrayRemove(data),
      });
    }
  };
  return (
    <div className="border-[1px] p-10">
      <h1 className="text-xl font-bold text-white hover">
        Save File - {index}
      </h1>
      <span>ID: {data.id}</span>
      <div className="flex gap-6 mt-4 text-2xl">
        <BsFillTrashFill onClick={deleteSavefile} />
        <BsFillCloudUploadFill onClick={handlingLoadingSaveFile} />
      </div>
    </div>
  );
}

export default SaveFile;
