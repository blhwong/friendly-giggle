import React, { Component } from 'react';
import Video from 'twilio-video';
import './App.css';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzM1YWQ2YjA0NTA1NmQwOGI0MDI2ZmYyNTBlZjk1ODliLTE1Mjc1NDgxMDMiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJQZXJzb24gMiIsInZpZGVvIjp7InJvb20iOiJSb29tIDEifX0sImlhdCI6MTUyNzU0ODEwMywiZXhwIjoxNTI3NTUxNzAzLCJpc3MiOiJTSzM1YWQ2YjA0NTA1NmQwOGI0MDI2ZmYyNTBlZjk1ODliIiwic3ViIjoiQUMyY2IxNzM3OWNkMTBiODQxNzgxMTM1MTkyOGJkMzk0YiJ9.twRyg3ER0rZBQaRKbXsIcseJkTyu5BeemYlnqXEtjmQ';

class App extends Component {
  state = {
    participants: {},
  };

  componentDidMount() {
    Video.connect(token, { name: 'Room 1' })
      .then((room) => {
        room.participants.forEach((participant) => {
          this.setListener(participant);
        });
      }, console.error);
  }

  setListener = (participant) => {
    participant.on('trackAdded', (track) => {
      this.updateParticipant(participant, track);
    });
  }

  updateParticipant = (participant, track) => {
    const media = track.attach();
    let state = { ...participant, ...this.state.participants[participant.sid] };
    if (track.kind === 'audio') {
      state = { ...participant, media, isMuted: true };
      media.pause();
    }
    this.setState({ participants: { [participant.sid]: state } });
    document.getElementById('remote-media-div').appendChild(media);
  }

  renderButton = ([sid, entry]) => {
    const action = entry.media.paused ? 'Unmute' : 'Mute';
    return (
      <button
        key={`Participant-${sid}`}
        onClick={() => {
          const { isMuted } = this.state.participants[sid];
          if (isMuted) {
            entry.media.play();
          } else {
            entry.media.pause();
          }
          this.setState({
            participants: {
              [sid]: {
                ...this.state.participants[sid],
                isMuted: !isMuted,
              },
            },
          });
        }}
      >
        {`${action} ${entry.identity}`}
      </button>
    );
  }


  render() {
    return (
      <div>
        <div id="remote-media-div" />
        <div className="mute">
          {Object.entries(this.state.participants).map(this.renderButton)}
        </div>
      </div>
    );
  }
}

export default App;
