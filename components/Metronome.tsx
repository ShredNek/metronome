"use client";
import React, { useState, useEffect, useRef } from "react";
import IncOrDecBpmButton from "./MetronomeIncOrDecBpmButton";
import BpmRangeInput from "./MetronomeBpmRangeInput";
import MetronomePlayPauseButton from "./MetronomePlayPauseButton";
import BpmNumberInputContainer from "./MetronomeBpmNumberInputContainer";
import TimeSignatureButton from "./MetronomeTimeSignatureButton";
import GLOBALS from "./appConstants";
import {
  bpmNumberToBpmInMs,
  bpmCycleTimer,
  controlMetronomeAudio,
  handleEachMetronomeBeatSounds,
  handleTapButtonClick,
} from "./utilityFunctions";
import MetronomeSamplePicker from "./MetronomeSamplePicker";

export default function Metronome() {
  const [bpm, setBpm] = useState(100);
  const [mouseDown, setMouseDown] = useState({ add: false, sub: false });
  const [isLongPress, setIsLongPress] = useState(false);
  const [metronomeIsOn, setMetronomeIsOn] = useState(false);
  const [bpmTypingEnabled, setBpmTypingEnabled] = useState(false);
  const [beatsPerBar, setBeatsPerBar] = useState(4);
  const [tapBpm, setTapBpm] = useState(0);
  const [clickSample, setClickSample] = useState({
    downBeat: GLOBALS.METRONOME_SAMPLES.CLAVE_DOWNBEAT,
    offBeat: GLOBALS.METRONOME_SAMPLES.CLAVE_OFFBEAT,
  });
  const bpmCycleThroughSoundsRef: bpmCycleTimer = useRef();
  const timerRef: React.MutableRefObject<NodeJS.Timeout | undefined> = useRef();

  const onTapButtonClick = () => {
    handleTapButtonClick(
      tapBpm,
      GLOBALS.BPM_MAX,
      GLOBALS.BPM_MIN,
      setTapBpm,
      setBpm
    );
  };

  const handleMouseDown = (incOrDec: string) => {
    incOrDec === GLOBALS.INCREMENT
      ? setMouseDown({ add: true, sub: false })
      : incOrDec === GLOBALS.DECREMENT
      ? setMouseDown({ add: false, sub: true })
      : null;

    handleOnMouseDown();
  };

  const handleMouseUp = () => {
    setMouseDown({ add: false, sub: false });
    handleOnMouseUp();
  };

  // ?
  // ?
  // ? Stuff
  // ?
  // ?

  function startPressTimer() {
    timerRef.current = setTimeout(() => {
      setIsLongPress(true);
    }, 500);
  }

  function handleOnMouseDown() {
    startPressTimer();
  }

  function handleOnMouseUp() {
    clearTimeout(timerRef.current);
    setIsLongPress(false);
  }

  // ? this code is run every time the bpm changes
  useEffect(() => {
    let interval: NodeJS.Timer;

    if (mouseDown.add) {
      if (bpm < GLOBALS.BPM_MAX && isLongPress) {
        interval = setInterval(() => {
          setBpm(bpm + 1);
        }, GLOBALS.CLICK_SENSITIVITY);
      }
    }
    if (mouseDown.sub) {
      if (bpm > GLOBALS.BPM_MIN && isLongPress) {
        interval = setInterval(() => {
          setBpm(bpm - 1);
        }, GLOBALS.CLICK_SENSITIVITY);
      }
    }

    return () => clearInterval(interval);
  }, [mouseDown, bpm, isLongPress]);

  useEffect(() => {
    if (bpm < GLOBALS.BPM_MIN || bpm > GLOBALS.BPM_MAX) return;
    const audioForMetronome = handleEachMetronomeBeatSounds(
      beatsPerBar,
      clickSample.downBeat,
      clickSample.offBeat
    );
    const bpmInMs = bpmNumberToBpmInMs(bpm);
    controlMetronomeAudio(
      metronomeIsOn,
      bpmInMs,
      audioForMetronome,
      bpmCycleThroughSoundsRef
    );
  }, [metronomeIsOn, beatsPerBar, bpm, clickSample]);

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
          mouseDown={() => handleMouseDown(GLOBALS.DECREMENT)}
          mouseUp={() => handleMouseUp()}
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
          mouseDown={() => handleMouseDown(GLOBALS.INCREMENT)}
          mouseUp={() => handleMouseUp()}
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
        <button onClick={onTapButtonClick}>TAP</button>
      </div>
      <MetronomeSamplePicker
        parentSetSample={(childSamples) => setClickSample(childSamples)}
      />
    </div>
  );
}
