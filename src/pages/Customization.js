import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import CustomizePlane from "../components/Customize/CustomizePlane";

import SidePanel from "../components/Customize/SidePanel";

const Customization = () => {
  return (
    <main className="w-screen h-screen scrollbar-hide overflow-clip">
      <SidePanel />
      <Canvas id="three-canvas-container" shadows>
        <Suspense fallback={<h1>Loading profile...</h1>}>
          <CustomizePlane />
        </Suspense>
      </Canvas>
    </main>
  );
};

export default Customization;
