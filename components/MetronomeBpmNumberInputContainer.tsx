import GLOBALS from "./appConstants";

interface BpmNumberInputContainerInterface {
  bpmTypingEnabled: boolean;
  bpm: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setBpm: (bpm: number) => void;
  setBpmTypingEnabled: (b: boolean) => void;
}

export default function BpmNumberInputContainer({
  bpmTypingEnabled,
  bpm,
  setBpm,
  onChange,
  setBpmTypingEnabled,
}: BpmNumberInputContainerInterface) {
  const handleBpmKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") {
      if (bpm < GLOBALS.BPM_MIN) setBpm(GLOBALS.BPM_MIN);
      if (bpm > GLOBALS.BPM_MAX) setBpm(GLOBALS.BPM_MAX);
      setBpmTypingEnabled(false);
    }
  };

  return (
    <div className="bpm-number-input row">
      {bpmTypingEnabled ? (
        <input
          type="number"
          placeholder={JSON.stringify(bpm)}
          onKeyDown={(e) => handleBpmKeyDown(e)}
          onChange={(e) => onChange(e)}
        ></input>
      ) : (
        <h2 onClick={() => setBpmTypingEnabled(true)}>{bpm}</h2>
      )}
      <h2>BPM</h2>
    </div>
  );
}
