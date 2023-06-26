import GLOBALS from "./appConstants";

export function bpmNumberToBpmInMs(bpm: number) {
  let bpmInMs = GLOBALS.MINUTE_IN_MS / bpm;
  return bpmInMs;
}

export function bpmInMsToBpmNumber(bpmInMs: number) {
  let bpm = GLOBALS.MINUTE_IN_MS / bpmInMs;
  return Math.floor(bpm);
}

export const playMetronomeSounds = (
  arr: HTMLAudioElement[],
  bpm: number,
  cycleRef: bpmCycleTimer
) => {
  let i = 0;
  const cycleArray = () => {
    let sound = arr[i];
    sound.currentTime = 0;
    sound.play();
    i++;
    if (i === arr.length) {
      i = 0;
    }
  };
  cycleRef.current = setInterval(cycleArray, bpm);
};

export const stopMetronome = (cycleRef: bpmCycleTimer) => {
  clearInterval(cycleRef.current);
  cycleRef.current = undefined;
};

export function controlMetronomeAudio(
  isOn: boolean,
  bpmInMs: number,
  sounds: HTMLAudioElement[],
  bpmCycleThroughSoundsRef: bpmCycleTimer
) {
  // ? this cleans up any previous tempo interval
  stopMetronome(bpmCycleThroughSoundsRef);

  if (isOn) {
    playMetronomeSounds(sounds, bpmInMs, bpmCycleThroughSoundsRef);
  }
  if (!isOn) {
    stopMetronome(bpmCycleThroughSoundsRef);
  }
}

export const handleEachMetronomeBeatSounds = (
  beatPerBar: number,
  downbeatSample: string,
  offbeatSample: string
) => {
  let finalSounds = [new Audio(downbeatSample)];
  for (let i = 0; i < beatPerBar - 1; i++) {
    finalSounds.push(new Audio(offbeatSample));
  }

  return finalSounds;
};

export function handleTapButtonClick(
  tapBpm: number,
  maxBpm: number,
  minBpm: number,
  setTapCallback: (arg1: number) => void,
  setBpmCallback: (arg1: number) => void
) {
  let difference = performance.now() - tapBpm;
  setTapCallback(performance.now());

  let newBpm = bpmInMsToBpmNumber(difference);
  if (newBpm > minBpm && newBpm < maxBpm) {
    setBpmCallback(newBpm);
  } else if (newBpm < minBpm) {
    setBpmCallback(minBpm);
  } else if (newBpm > maxBpm) {
    setBpmCallback(maxBpm);
  }
}

export type bpmCycleTimer = React.MutableRefObject<NodeJS.Timeout | undefined>;

export default {};
