import GLOBALS from "./appConstants";
import { useState } from "react";

interface TimeSignatureButtonInterface {
  beatsPerBar: number;
  parentSetBpb: (n: number) => void;
}

export default function TimeSignatureButton({
  beatsPerBar,
  parentSetBpb,
}: TimeSignatureButtonInterface) {
  const [active, setActive] = useState(false);
  return (
    <div className="dropdown">
      <button onClick={() => (active ? setActive(false) : setActive(true))}>
        {beatsPerBar}/4
      </button>

      <ul className={active ? "menu" : "menu hidden"}>
        {Object.values(GLOBALS.TIME_SIGNATURES).map((timeSignature: any) => {
          return (
            <li onClick={() => parentSetBpb(timeSignature)} key={timeSignature}>
              {timeSignature}/4
            </li>
          );
        })}
      </ul>
    </div>
  );
}
