import GLOBALS from "./appConstants";

interface BpmRangeInputInterface {
  bpm: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setBpmOnWheel: (n: number) => void;
}

export default function BpmRangeInput({
  bpm,
  onChange,
  setBpmOnWheel,
}: BpmRangeInputInterface) {
  const handleWheelEvent = (e: React.WheelEvent) => {
    if (bpm >= GLOBALS.BPM_MIN + 1 && bpm <= GLOBALS.BPM_MAX - 1) {
      e.deltaY < 0 ? setBpmOnWheel(bpm + 1) : setBpmOnWheel(bpm - 1);
    }
    if (bpm === GLOBALS.BPM_MIN) {
      e.deltaY < 0 ? setBpmOnWheel(bpm + 1) : null;
    }
    if (bpm === GLOBALS.BPM_MAX) {
      e.deltaY > -1 ? setBpmOnWheel(bpm - 1) : null;
    }
  };

  return (
    <input
      type="range"
      min={GLOBALS.BPM_MIN}
      value={bpm}
      max={GLOBALS.BPM_MAX}
      step="1"
      onChange={(e) => {
        onChange(e);
      }}
      onWheel={(e) => {
        handleWheelEvent(e);
      }}
    />
  );
}
