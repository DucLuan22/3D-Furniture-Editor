import { Dropdown } from "flowbite-react/lib/esm/components/";
import React from "react";

function DropListComponent({ label, title, data }) {
  return (
    <main className="flex gap-2 text-white font-semibold items-center">
      <span className="text-lg">{title}</span>
      <Dropdown label={label} inline={true}>
        {data?.map((element) => (
          <Dropdown.Item>1</Dropdown.Item>
        ))}
      </Dropdown>
    </main>
  );
}

export default DropListComponent;
