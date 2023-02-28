import { MdPiano } from "react-icons/md";
import { FaDrum } from "react-icons/fa";
import { GiDrumKit, GiDrum, GiSaltShaker } from "react-icons/gi";
import GLOBALS from "./appConstants";

interface MetronomeSamplePickerInterface {
  parentSetSample: (s: { downBeat: string; offBeat: string }) => void;
}

export default function MetronomeSamplePicker({
  parentSetSample,
}: MetronomeSamplePickerInterface) {
  return (
    <div className="sample-selector row">
      <h2>Pick Your Sample!</h2>
      <nav className="sample-nav">
        <button
          onClick={() =>
            parentSetSample({
              downBeat: GLOBALS.METRONOME_SAMPLES.CLAVE_DOWNBEAT,
              offBeat: GLOBALS.METRONOME_SAMPLES.CLAVE_OFFBEAT,
            })
          }
        >
          <FaDrum />
        </button>
        <button
          onClick={() =>
            parentSetSample({
              downBeat: GLOBALS.METRONOME_SAMPLES.SIDE_STICK_DOWNBEAT,
              offBeat: GLOBALS.METRONOME_SAMPLES.SIDE_STICK_OFFBEAT,
            })
          }
        >
          <GiDrum />
        </button>
        <button
          onClick={() =>
            parentSetSample({
              downBeat: GLOBALS.METRONOME_SAMPLES.HI_HAT_DOWNBEAT,
              offBeat: GLOBALS.METRONOME_SAMPLES.HI_HAT_OFFBEAT,
            })
          }
        >
          <GiDrumKit />
        </button>
        <button
          onClick={() =>
            parentSetSample({
              downBeat: GLOBALS.METRONOME_SAMPLES.SHAKER_DOWNBEAT,
              offBeat: GLOBALS.METRONOME_SAMPLES.SHAKER_OFFBEAT,
            })
          }
        >
          <GiSaltShaker />
        </button>
        <button
          onClick={() =>
            parentSetSample({
              downBeat: GLOBALS.METRONOME_SAMPLES.SYNTH_DOWNBEAT,
              offBeat: GLOBALS.METRONOME_SAMPLES.SYNTH_OFFBEAT,
            })
          }
        >
          <MdPiano />
        </button>
      </nav>
    </div>
  );
}
