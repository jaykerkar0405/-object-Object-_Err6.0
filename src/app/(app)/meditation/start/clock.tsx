"use client";
import * as React from "react";

interface ClockProps {
  duration: number;
  audioSrc?: string;
}

interface ClockState {
  remainingMinutes: number;
  seconds: number;
  running: boolean;
}

export default class Clock extends React.Component<ClockProps, ClockState> {
  private clockInterval: NodeJS.Timeout | null = null;
  private timerTimeout: NodeJS.Timeout | null = null;
  private audioRef: React.RefObject<HTMLAudioElement>;

  constructor(props: ClockProps) {
    super(props);
    this.audioRef = React.createRef();
    this.handleDate = this.handleDate.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.state = {
      remainingMinutes: props.duration,
      seconds: 0,
      running: false,
    };
  }

  componentDidMount() {
    this.setState({
      remainingMinutes: this.props.duration,
      seconds: 0,
    });
  }

  componentDidUpdate(prevProps: ClockProps) {
    if (prevProps.duration !== this.props.duration && !this.state.running) {
      this.setState({
        remainingMinutes: this.props.duration,
        seconds: 0,
      });
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer() {
    if (this.props.duration <= 0) return;

    if (this.clockInterval) clearInterval(this.clockInterval);
    if (this.timerTimeout) clearTimeout(this.timerTimeout);

    this.setState({
      remainingMinutes: this.props.duration,
      seconds: 0,
      running: true,
    });

    if (this.audioRef.current) {
      this.audioRef.current.play();
    }

    this.clockInterval = setInterval(this.handleDate, 1000);
    this.timerTimeout = setTimeout(() => {
      this.stopTimer();
    }, this.props.duration * 60 * 1000);
  }

  stopTimer() {
    if (this.clockInterval) clearInterval(this.clockInterval);
    if (this.timerTimeout) clearTimeout(this.timerTimeout);

    if (this.audioRef.current) {
      this.audioRef.current.pause();
    }

    this.setState({ running: false });
  }

  handleDate() {
    this.setState((prevState) => {
      let { remainingMinutes, seconds } = prevState;
      if (seconds === 0) {
        if (remainingMinutes === 0) {
          this.stopTimer();
          return { running: false };
        }
        return { remainingMinutes: remainingMinutes - 1, seconds: 59 };
      }
      return { seconds: seconds - 1 };
    });
  }

  render() {
    const { remainingMinutes, seconds, running } = this.state;
    const secondsStyle = { transform: `rotate(${seconds * 6}deg)` };
    const minutesStyle = { transform: `rotate(${remainingMinutes * 6}deg)` };

    return (
      <div className="clock">
        <audio
          ref={this.audioRef}
          loop
          src={this.props.audioSrc || "/sounds/finish.mp3"}
        />

        <div className="analog-clock">
          <div className="dial seconds" style={secondsStyle} />
          <div className="dial minutes" style={minutesStyle} />
        </div>

        <div className="digital-clock">
          {remainingMinutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>

        {!running &&
          this.props.duration > 0 &&
          remainingMinutes === this.props.duration && <div>Ready to start</div>}
        {!running && this.props.duration === 0 && (
          <div>Set duration and press Start</div>
        )}
        {!running &&
          remainingMinutes === 0 &&
          seconds === 0 &&
          this.props.duration > 0 && <div>Time's up!</div>}
      </div>
    );
  }
}
