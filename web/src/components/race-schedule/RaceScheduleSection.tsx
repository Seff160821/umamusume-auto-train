import { Trophy } from "lucide-react";
import type { Config, UpdateConfigType } from "@/types";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { POSITION } from "@/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  config: Config;
  updateConfig: UpdateConfigType;
};

const RANK = ["s", "a", "b", "c", "d", "e", "f", "g"];

export default function RaceScheduleSection({ config, updateConfig }: Props) {
  const {
    use_race_schedule,
    cancel_consecutive_race,
    race_turn_threshold,
    do_mission_races_if_possible,
    prioritize_missions_over_g1,
    position_selection_enabled,
    preferred_position,
    enable_positions_by_race,
    positions_by_race,
    minimum_aptitudes: { surface, distance, style },
  } = config;


  return (
    <div className="section-card">
      <h2 className="text-3xl font-semibold mb-4 flex items-center gap-3">
        <Trophy className="text-primary" />
        Racing
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">

        <div className="flex flex-col gap-2">
          <label className="flex flex-row gap-2 w-fit items-center cursor-pointer">
            <span className="shrink-0 mr-2">Race Turn Treshold</span>
            <Input className="w-18" type="number" step={1} value={race_turn_threshold} onChange={(e) => updateConfig("race_turn_threshold", e.target.valueAsNumber)} />
          </label>

          <label className="flex gap-2 items-center cursor-pointer">
            <Checkbox checked={use_race_schedule} onCheckedChange={() => updateConfig("use_race_schedule", !use_race_schedule)} />
            <span className="shrink-0">
              Run Race Schedule
            </span>
          </label>
          {use_race_schedule && (
            <label className="flex gap-2 items-center cursor-pointer animate-in fade-in slide-in-from-top-1 duration-200">
              <Checkbox checked={cancel_consecutive_race} onCheckedChange={() => updateConfig("cancel_consecutive_race", !cancel_consecutive_race)} />
              <span className="shrink-0">Cancel Consecutive Races</span>
            </label>
          )}
          <label className="flex gap-2 items-center cursor-pointer">
            <Checkbox checked={do_mission_races_if_possible} onCheckedChange={() => updateConfig("do_mission_races_if_possible", !do_mission_races_if_possible)} />
            <span className="shrink-0">Do Mission Races if Possible</span>
          </label>
          {do_mission_races_if_possible && (
            <label className="flex gap-2 items-center cursor-pointer animate-in fade-in slide-in-from-top-1 duration-200">
              <Checkbox checked={prioritize_missions_over_g1} onCheckedChange={() => updateConfig("prioritize_missions_over_g1", !prioritize_missions_over_g1)} />
              <span className="shrink-0">Prioritize Missions Over G1</span>
            </label>
          )}
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-2 w-fit content-start ">
          <div className="items-center font-semibold col-span-2">Minimum Aptitutes:</div>

          <label htmlFor="aptitude_surface" className="flex gap-2 justify-self-start items-center cursor-pointer">Surface</label>
          <Select value={surface} onValueChange={(val) => updateConfig("minimum_aptitudes", { ...config.minimum_aptitudes, surface: val, })} >
            <SelectTrigger id="aptitude_surface">
              <SelectValue placeholder="surface" />
            </SelectTrigger>
            <SelectContent>{RANK.map((r) => (<SelectItem key={r} value={r}>{r.toUpperCase()}</SelectItem>))}</SelectContent>
          </Select>

          <label htmlFor="aptitude_distance" className="flex gap-2 justify-self-start items-center cursor-pointer">Distance</label>
          <Select value={distance} onValueChange={(val) => updateConfig("minimum_aptitudes", { ...config.minimum_aptitudes, distance: val, })} >
            <SelectTrigger id="aptitude_distance">
              <SelectValue placeholder="distance" />
            </SelectTrigger>
            <SelectContent>{RANK.map((r) => (<SelectItem key={r} value={r}>{r.toUpperCase()}</SelectItem>))}
            </SelectContent>
          </Select>

          <label htmlFor="aptitude_style" className="flex gap-2 justify-self-start items-center cursor-pointer">Style</label>
          <Select value={style} onValueChange={(val) => updateConfig("minimum_aptitudes", { ...config.minimum_aptitudes, style: val, })} >
            <SelectTrigger id="aptitude_style">
              <SelectValue placeholder="style" />
            </SelectTrigger>
            <SelectContent>{RANK.map((r) => (<SelectItem key={r} value={r}>{r.toUpperCase()}</SelectItem>))}</SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="flex gap-2 items-center shrink cursor-pointer">
            <Checkbox checked={position_selection_enabled} onCheckedChange={() => updateConfig("position_selection_enabled", !position_selection_enabled)} />
            Enable Position Selection
          </label>
          {position_selection_enabled && (
            <>
              <label className="flex gap-2 items-center shrink cursor-pointer">
                <Checkbox
                  disabled={!position_selection_enabled}
                  checked={enable_positions_by_race}
                  onCheckedChange={() => updateConfig("enable_positions_by_race", !enable_positions_by_race)} />
                Position By Race
              </label>
              {!enable_positions_by_race ? (
                <label className="flex gap-2 items-center">Preferred Position:
                  <Select
                    disabled={!(position_selection_enabled && !enable_positions_by_race)}
                    value={preferred_position}
                    onValueChange={(val) => updateConfig("preferred_position", val)}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Position" />
                    </SelectTrigger>
                    <SelectContent>
                      {POSITION.map((pos) => (
                        <SelectItem key={pos} value={pos}>
                          {pos.toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </label>
              ) : (
                <div className="flex flex-col gap-2">
                  {Object.entries(positions_by_race).map(([key, val]) => (
                    <label
                      key={key}
                      htmlFor={key}
                      className="flex gap-2 items-center w-44 justify-between cursor-pointer"
                    >
                      <span className="capitalize">{key}</span>
                      <Select
                        disabled={!(enable_positions_by_race && position_selection_enabled)}
                        value={val}
                        onValueChange={(newVal) => updateConfig("positions_by_race", { ...positions_by_race, [key]: newVal, })} >
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="Position" />
                        </SelectTrigger>
                        <SelectContent>
                          {POSITION.map((pos) => (<SelectItem key={pos} value={pos}> {pos.toUpperCase()} </SelectItem>))}
                        </SelectContent>
                      </Select>
                    </label>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>

  );
}


