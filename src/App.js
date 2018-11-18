// eslint-disable-next-line
import React, { Component } from 'react';
import './App.css';
const bank = require('./soundBank.json');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getDisplayKey = this.getDisplayKey.bind(this);
    this.state = {
      displayKey: ''
    }
  }

  getDisplayKey(val) {
    this.setState({
      displayKey: val
    });
  }

  render() {
    return (
      <div id="drum-machine" className="App">
        <div className="BankRow">
          <Sound value="Q" sendDisplayKey={this.getDisplayKey} />
          <Sound value="W" sendDisplayKey={this.getDisplayKey} />
          <Sound value="E" sendDisplayKey={this.getDisplayKey} />
        </div>
        <div className="BankRow">
          <Sound value="A" sendDisplayKey={this.getDisplayKey} />
          <Sound value="S" sendDisplayKey={this.getDisplayKey} />
          <Sound value="D" sendDisplayKey={this.getDisplayKey} />
        </div>
        <div className="BankRow">
          <Sound value="Z" sendDisplayKey={this.getDisplayKey} />
          <Sound value='X' sendDisplayKey={this.getDisplayKey} />
          <Sound value="C" sendDisplayKey={this.getDisplayKey} />
        </div>

        <div id="display" className="Display">
          <p>{this.state.displayKey}</p>
        </div>

      </div>
    );
  }
}


class Sound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeClass: 'drum-pad'
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.bankObject = bank.find(x => this.props.value === x.keyTrigger);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  handleKeyUp(event) {
    this.setState({activeClass: 'drum-pad'});
  }

  handleKeyPress(event) {
    let keyPressed = event.key;
    if (keyPressed === this.bankObject.keyTrigger.toLowerCase()) {
      let snd = document.getElementById(this.bankObject.keyTrigger);
      snd.play();
      snd.currentTime = 0;
      this.setState({ activeClass: 'drum-pad BtnKeydown' });
      this.props.sendDisplayKey(this.bankObject.id);

    }
  }

  handleClick(event) {
    let snd = document.getElementById(this.bankObject.keyTrigger);
    snd.play();
    snd.currentTime = 0;
    this.props.sendDisplayKey(this.bankObject.keyTrigger);
  }

  render() {
    return (
      <button className={this.state.activeClass} value={this.props.value}
        onClick={this.handleClick} id={this.bankObject.id}>
        <audio src={this.bankObject.url} className="clip"
          id={this.bankObject.keyTrigger} />
        {this.props.value}
      </button>
    )
  }
}


export default App;
