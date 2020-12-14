//@flow
import './App.css';
import * as React from 'react';

type State = {
  inputValue: number,
  hours: number,
  minutes: number,
  seconds: number,
  errorMessage: string,
}

type Props = { }

class App extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      inputValue: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      errorMessage: ""
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.inputValue !== this.state.inputValue) {
      this.formatDuration();
    }
  }

  onChange(event: Event): void {
    const inputValue = event.currentTarget.value;
    this.setState({inputValue: inputValue});
  }

  formatDuration(): void {
    if (this.state.inputValue < 0) {
      this.setState({errorMessage: "Now"})
    } else {
      this.setState({errorMessage: ""})
      const hours: number = Math.floor(this.state.inputValue / 3600) % 24;
      const minutes: number = Math.floor(this.state.inputValue / 60) % 60;
      const seconds: number = Math.floor(this.state.inputValue % 60);
      this.setState({hours: hours, minutes: minutes, seconds: seconds});
    }
  }

  render() {
    const hoursMessage = `${this.state.hours} hour${this.state.hours > 1 ? 's' : ''}, `;
    const minuteMessage = `${this.state.minutes} minute${this.state.minutes > 1 ? 's' : ''} `;
    const and: string = " and ";
    const secondsMessage = `${this.state.seconds} second${this.state.seconds > 1 ? 's' : ''} `;

    return (
      <div className="App">
        <section>
          <p>Write seconds into the input field to convert</p>
          <input onChange={this.onChange} />
        </section>

        <main>
          <p>
            {this.state.errorMessage && this.state.errorMessage}
            {this.state.hours > 0 && hoursMessage}
            {this.state.hours && this.state.minutes && !this.state.seconds ? and : null}
            {this.state.minutes > 0 && minuteMessage}
            {this.state.minutes && this.state.seconds ? and : null}
            {this.state.seconds > 0 && secondsMessage}
          </p>
        </main>
      </div>
    );
  }
}

export default App;
