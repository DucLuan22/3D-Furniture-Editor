import { Html } from "@react-three/drei/web";
import { useProgress } from "@react-three/drei/core/useProgress";
export default function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}
