import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import GLOBALS from "./appConstants";

interface IncOrDecInterface {
  incOrDec: string;
  bpm: number;
  setBpm: () => void;
  mouseDown: () => void;
  mouseUp: () => void;
}

export default function IncOrDecBpmButton({
  incOrDec,
  bpm,
  setBpm,
  mouseDown,
  mouseUp,
}: IncOrDecInterface) {
  if (incOrDec === GLOBALS.DECREMENT)
    return (
      <button
        onMouseDown={() => {
          bpm > GLOBALS.BPM_MIN ? setBpm() : null;
          mouseDown();
        }}
        onMouseUp={() => {
          mouseUp();
        }}
      >
        <AiOutlineMinus className="icon" />
      </button>
    );
  if (incOrDec === GLOBALS.INCREMENT)
    return (
      <button
        onMouseDown={() => {
          bpm < GLOBALS.BPM_MAX ? setBpm() : null;
          mouseDown();
        }}
        onMouseUp={() => {
          mouseUp();
        }}
      >
        <AiOutlinePlus className="icon" />
      </button>
    );
  return (
    <h3>
      The IncOrDec Button did not properly mount. Perhaps the incOrDec property
      did not match Increment or Decrement.
    </h3>
  );
}
