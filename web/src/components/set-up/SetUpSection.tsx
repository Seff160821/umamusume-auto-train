import { Cog } from "lucide-react";
import type { Config, UpdateConfigType } from "@/types";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import Tooltips from "@/components/_c/Tooltips";

type Props = {
  config: Config;
  updateConfig: UpdateConfigType;
};

export default function SetUpSection({ config, updateConfig }: Props) {
  const {
    window_name,
    sleep_time_multiplier,
    use_adb,
    device_id,
  } = config;

  return (
    <div className="w-full bg-card p-6 rounded-xl shadow-lg border border-border/80">
      <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3">
        <Cog className="text-primary" />
        Set-Up
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <label htmlFor="window-name" className="flex flex-col gap-2 cursor-pointer group">
          <div className="flex gap-2 items-center">
            <span className="text-lg font-medium group-hover:text-primary transition-colors">
              Window Name
            </span>
            <Tooltips>
              If you're using an emulator, set this to your emulator's window name
              (case-sensitive).
            </Tooltips>
          </div>
          <Input
            id="window-name"
            className="w-48"
            value={window_name}
            onChange={(e) => updateConfig("window_name", e.target.value)}
          />
        </label>
        <label htmlFor="sleep-multiplier" className="flex flex-col gap-2 cursor-pointer group">
          <span className="text-lg font-medium group-hover:text-primary transition-colors">
            Sleep Time Multiplier
          </span>
          <Input
            id="sleep-multiplier"
            className="w-24"
            step={0.1}
            type="number"
            value={sleep_time_multiplier}
            onChange={(e) =>
              updateConfig("sleep_time_multiplier", e.target.valueAsNumber)
            }
          />
        </label>
        <label className="flex gap-2 items-center cursor-pointer">
          <Checkbox
            checked={use_adb}
            onCheckedChange={() => updateConfig("use_adb", !use_adb)}
          />
          <span className="text-lg font-medium">Use ADB</span>
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-lg font-medium">Device ID</span>
          <Input
            type="text"
            className="w-48"
            value={device_id}
            onChange={(e) => updateConfig("device_id", e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}
