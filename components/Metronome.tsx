"use client";
import React, { useState, useEffect, useRef } from "react";
import IncOrDecBpmButton from "./MetronomeIncOrDecBpmButton";
import BpmRangeInput from "./MetronomeBpmRangeInput";
import MetronomePlayPauseButton from "./MetronomePlayPauseButton";
import BpmNumberInputContainer from "./MetronomeBpmNumberInputContainer";
import TimeSignatureButton from "./MetronomeTimeSignatureButton";
import GLOBALS from "./appConstants";
import metronomeDownbeatUrl from "../public/assets/sounds/MetronomeTick_1.wav";
import metronomeOffbeatUrl from "../public/assets/sounds/MetronomeTick_2.wav";

export default function Metronome() {
  const [bpm, setBpm] = useState(100);
  const [mouseDown, setMouseDown] = useState({ add: false, sub: false });
  const [metronomeIsOn, setMetronomeIsOn] = useState(false);
  const [bpmTypingEnabled, setBpmTypingEnabled] = useState(false);
  const [beatsPerBar, setBeatsPerBar] = useState(4);
  const cycleRef: any = useRef(null);
  const bpmInMs = GLOBALS.MINUTE_IN_MS / bpm;

  const playMetronomeSounds = (arr: HTMLAudioElement[], bpm: number) => {
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

  const stopMetronome = () => {
    clearInterval(cycleRef.current);
    cycleRef.current = null;
  };

  const handleMetronomeAudioSettings = (
    beatPerBar: number,
    firstBeatIsAccented: boolean
  ) => {
    const METRONOME_DOWNBEAT = new Audio(metronomeDownbeatUrl);
    const METRONOME_OFFBEAT = new Audio(metronomeOffbeatUrl);

    let finalSounds: HTMLAudioElement[];

    let i = 0;
    if (firstBeatIsAccented) {
      finalSounds = [METRONOME_DOWNBEAT];
      while (i < beatPerBar - 1) {
        finalSounds.push(METRONOME_OFFBEAT);
        i++;
      }
      return finalSounds;
    }

    finalSounds = [];
    while (i < beatPerBar) {
      finalSounds.push(METRONOME_OFFBEAT);
      i++;
    }

    return finalSounds;
  };

  function handleMetronomeAudio(
    isOn: boolean,
    bpmInMs: number,
    sounds: HTMLAudioElement[]
  ) {
    // ? this cleans up any previous tempo interval
    stopMetronome();

    if (isOn) {
      playMetronomeSounds(sounds, bpmInMs);
    }
    if (!isOn) {
      stopMetronome();
    }
  }

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    if (mouseDown.add) {
      bpm < GLOBALS.BPM_MAX
        ? (interval = setInterval(() => {
            setBpm(bpm + 1);
          }, GLOBALS.CLICK_SENSITIVITY))
        : null;
    }
    if (mouseDown.sub) {
      bpm > GLOBALS.BPM_MIN
        ? (interval = setInterval(() => {
            setBpm(bpm - 1);
          }, GLOBALS.CLICK_SENSITIVITY))
        : null;
    }
    return () => clearInterval(interval);
  }, [mouseDown, bpm]);

  useEffect(() => {
    if (bpm < GLOBALS.BPM_MIN || bpm > GLOBALS.BPM_MAX) return;
    let audioForMetronome = handleMetronomeAudioSettings(beatsPerBar, true);
    handleMetronomeAudio(metronomeIsOn, bpmInMs, audioForMetronome);
  }, [metronomeIsOn, bpm, beatsPerBar, handleMetronomeAudio, bpmInMs]);

  return (
    <div className="metronome-container">
      <BpmNumberInputContainer
        bpmTypingEnabled={bpmTypingEnabled}
        bpm={bpm}
        onChange={(e) => setBpm(+e.target.value)}
        setBpm={(bpm) => setBpm(bpm)}
        setBpmTypingEnabled={(bool) => setBpmTypingEnabled(bool)}
      ></BpmNumberInputContainer>
      <div className="bpm-range row">
        <IncOrDecBpmButton
          incOrDec={GLOBALS.DECREMENT}
          bpm={bpm}
          setBpm={() => setBpm(bpm - 1)}
          mouseDown={() => setMouseDown({ add: false, sub: true })}
          mouseUp={() => setMouseDown({ add: false, sub: false })}
        ></IncOrDecBpmButton>
        <BpmRangeInput
          bpm={bpm}
          onChange={(e) => setBpm(+e.target.value)}
          setBpmOnWheel={(n) => setBpm(n)}
        />
        <IncOrDecBpmButton
          incOrDec={GLOBALS.INCREMENT}
          bpm={bpm}
          setBpm={() => setBpm(bpm + 1)}
          mouseDown={() => setMouseDown({ add: true, sub: false })}
          mouseUp={() => setMouseDown({ add: false, sub: false })}
        ></IncOrDecBpmButton>
      </div>
      <MetronomePlayPauseButton
        handleClick={(bool) => setMetronomeIsOn(bool)}
        metronomeIsOn={metronomeIsOn}
      ></MetronomePlayPauseButton>
      <div className="time-signature-and-tap row">
        <TimeSignatureButton
          beatsPerBar={beatsPerBar}
          parentSetBpb={(childBpb) => setBeatsPerBar(childBpb)}
        ></TimeSignatureButton>
        {/* 
        //! TO ADD TAP FUNCTIONALITY LATER
         */}
        <button>TAP</button>
      </div>
    </div>
  );
}
