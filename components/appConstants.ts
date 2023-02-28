// "use client";
import ClaveDownbeat from "../public/assets/sounds/Clave1.wav";
import ClaveOffbeat from "../public/assets/sounds/Clave2.wav";
import HiHatDownbeat from "../public/assets/sounds/HiHat1.wav";
import HiHatOffbeat from "../public/assets/sounds/HiHat2.wav";
import ShakerDownbeat from "../public/assets/sounds/Shaker1.wav";
import ShakerOffbeat from "../public/assets/sounds/Shaker2.wav";
import SideStickDownbeat from "../public/assets/sounds/SideStick1.wav";
import SideStickOffbeat from "../public/assets/sounds/SideStick2.wav";
import SynthDownbeat from "../public/assets/sounds/Synth1.wav";
import SynthOffbeat from "../public/assets/sounds/Synth2.wav";

const GLOBALS = {
  INCREMENT: "Increment",
  DECREMENT: "Decrement",
  BPM_MIN: 20,
  BPM_MAX: 250,
  CLICK_SENSITIVITY: 75,
  MINUTE_IN_MS: 60000,
  TIME_SIGNATURES: {
    ONE_FOUR: 1,
    TWO_FOUR: 2,
    THREE_FOUR: 3,
    FOUR_FOUR: 4,
    FIVE_FOUR: 5,
    SIX_FOUR: 6,
    SEVEN_FOUR: 7,
    EIGHT_FOUR: 8,
    NINE_FOUR: 9,
    TEN_FOUR: 10,
    ELEVEN_FOUR: 11,
    TWELVE_FOUR: 12,
  },
  METRONOME_SAMPLES: {
    CLAVE_DOWNBEAT: ClaveDownbeat,
    CLAVE_OFFBEAT: ClaveOffbeat,
    HI_HAT_DOWNBEAT: HiHatDownbeat,
    HI_HAT_OFFBEAT: HiHatOffbeat,
    SHAKER_DOWNBEAT: ShakerDownbeat,
    SHAKER_OFFBEAT: ShakerOffbeat,
    SIDE_STICK_DOWNBEAT: SideStickDownbeat,
    SIDE_STICK_OFFBEAT: SideStickOffbeat,
    SYNTH_DOWNBEAT: SynthDownbeat,
    SYNTH_OFFBEAT: SynthOffbeat,
  },
};

export default GLOBALS;
