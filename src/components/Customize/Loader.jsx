import { Html } from "@react-three/drei/web";
import { useProgress } from "@react-three/drei/core/useProgress";
import { Progress } from "flowbite-react/lib/esm/components";
export default function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="w-[100px] text-sm">
        <Progress
          progress={progress.toFixed(2)}
          label={`${progress.toFixed(2)}%`}
          labelPosition="inside"
          size="md"
        />
      </div>
    </Html>
  );
}
