import { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      document_tone: null,
      sentences_tone: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: this.state.value })
    };

    const response = await fetch('https://is714522-cloud-foundry.us-south.cf.appdomain.cloud/tone', requestOptions);
    const data = await response.json();
    this.setState({ 
      document_tone: data.document_tone.tones[0],
      sentences_tone: data.sentences_tone
    });
    console.log(data);
    console.log(this.state.document_tone)
    console.log(this.state.sentences_tone)
  }

  render() {
    return (
      <div className="app-container">
        <form onSubmit={this.handleSubmit}>        <label>
          Texto:
          <input type="text" value={this.state.value} onChange={this.handleChange} />        </label>
          <input type="submit" value="Submit" />
        </form>
        { this.state.document_tone ? (
          <div>
            <h2>Overrall Tone: {this.state.document_tone.tone_name}</h2>
            <h4>Score: {this.state.document_tone.score}</h4>
          </div>
        ) : null}
        { this.state.sentences_tone ? (
          <div>
            { this.state.sentences_tone.map((tone, index) => {
              return (
                <div>
                  { tone.text} | Tone: {tone.tones[0] ? tone.tones[0].tone_name : 'No individual tone found.'}
                </div>
              )
            })}
          </div>
        ) : null}
        </div>
    );
  }
}

export default App;
