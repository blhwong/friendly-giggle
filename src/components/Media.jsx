import React, { Component } from 'react';
import Video from 'twilio-video';
import { getToken } from '../service';
import './Media.css';

class Media extends Component {
  state = {
    participants: {},
  };

  async componentDidMount() {
    const { token, room: name } = await getToken();
    Video.connect(token, { name })
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
        Caller View
        <div id="remote-media-div" />
        <div className="mute">
          {Object.entries(this.state.participants).map(this.renderButton)}
        </div>
      </div>
    );
  }
}

export default Media;
