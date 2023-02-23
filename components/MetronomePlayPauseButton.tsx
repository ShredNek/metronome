import { BsPlayFill, BsPauseFill } from "react-icons/bs";

interface MetronomePlayPauseButtonInterface {
  metronomeIsOn: boolean;
  handleClick: (bool: boolean) => void;
}

export default function MetronomePlayPauseButton({
  metronomeIsOn,
  handleClick,
}: MetronomePlayPauseButtonInterface) {
  const handlePlayStopClick = () => {
    metronomeIsOn === false ? handleClick(true) : handleClick(false);
  };

  return (
    <div className="play-button row">
      <button onClick={handlePlayStopClick}>
        {metronomeIsOn ? (
          <BsPauseFill className="icon bigger"></BsPauseFill>
        ) : (
          <BsPlayFill className="icon bigger"></BsPlayFill>
        )}
      </button>
    </div>
  );
}
