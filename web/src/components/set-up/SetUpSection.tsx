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
    notifications_enabled,
    error_notification,
  } = config;

  return (
    <div className="section-card">
      <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3">
        <Cog className="text-primary" />
        Set-Up
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <label className="flex flex-row gap-2 h-fit items-center cursor-pointer">
          <span className="font-base">
            Sleep Time Multiplier
          </span>
          <Input className="w-24" step={0.1} type="number"
            value={sleep_time_multiplier}
            onChange={(e) => updateConfig("sleep_time_multiplier", e.target.valueAsNumber)} />
        </label>
        <label className="flex gap-2 items-center cursor-pointer">
          <Checkbox
            checked={use_adb}
            onCheckedChange={() => updateConfig("use_adb", !use_adb)}
          />
          <span className="font-base">Use ADB</span>
        </label>
        {!use_adb && (
          <label className="flex flex-row gap-2 h-fit items-center cursor-pointer">
            <div className="flex gap-2 items-center">
              <span className="font-base">
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
        )}
        {use_adb && (
          <label className="flex flex-row gap-2 h-fit items-center cursor-pointer">
            <span className="font-base">Device ID</span>
            <Input
              type="text"
              className="w-48"
              value={device_id}
              onChange={(e) => updateConfig("device_id", e.target.value)}
            />
          </label>
        )}
        <label className="flex gap-2 items-center cursor-pointer">
          <Checkbox
            checked={notifications_enabled}
            onCheckedChange={() => updateConfig("notifications_enabled", !notifications_enabled)}
          />
          <span className="font-base">Enable notification sounds</span>
        </label>
        {notifications_enabled && (
          <label className="flex flex-row gap-2 h-fit items-center cursor-pointer">
            <div className="flex gap-2 items-center">
              <span className="font-base">
                Error sound
              </span>
            </div>
            <Input
              className="w-48"
              value={error_notification}
              onChange={(e) => updateConfig("error_notification", e.target.value)}
            />
          </label>
        )}
      </div>
    </div>
  );
}
