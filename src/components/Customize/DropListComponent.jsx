import { collection, getDocs } from "firebase/firestore";
import { Dropdown } from "flowbite-react/lib/esm/components/";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { db } from "../../utils/firebaseAuth";

function DropListComponent({ label, title, data, dbName, setData }) {
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      const dataSnapshots = await getDocs(collection(db, dbName));
      setItems(dataSnapshots.docs.map((doc) => ({ ...doc.data() })));
    };
    getData();
  }, [dbName]);

  const handlingSelect = (e) => {
    dispatch(setData(e.target.value));
  };
  return (
    <main className="flex gap-2 text-white font-semibold items-center">
      <span className="text-lg">{title}</span>
      <select
        className="bg-transparent rounded-sm font-semibold"
        onChange={handlingSelect}
      >
        <option value={null} className="text-black">
          Default
        </option>
        {items.length >= 1 &&
          items.map((element) => (
            <option className="bg-transparent text-black" value={element.type}>
              {element.type}
            </option>
          ))}
      </select>
      {/* <Dropdown label={label} inline={true} onClick={handlingSelect}>
        <Dropdown.Item value={null}>Default</Dropdown.Item>
        {items.length >= 1 &&
          items?.map((element) => (
            <Dropdown.Item value={element.type}>{element.type}</Dropdown.Item>
          ))}
      </Dropdown> */}
    </main>
  );
}

export default DropListComponent;
