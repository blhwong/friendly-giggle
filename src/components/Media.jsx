import React, { Component } from 'react';
import Video from 'twilio-video';
import { Layout, Button, Col } from 'antd';
import 'antd/dist/antd.css';
import { getToken } from '../service';
import './Media.css';

const { Header, Content } = Layout;

class Media extends Component {
  state = {
    participants: {},
    room: '',
  };

  async componentDidMount() {
    const { token, room: name } = await getToken();
    Video.connect(token, { name })
      .then((room) => {
        room.participants.forEach((participant) => {
          this.setListener(participant, room.name);
        });
      }, console.error);
  }

  setListener = (participant, room) => {
    this.setState({ room });
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
      <Button
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
      </Button>
    );
  }


  render() {
    return (
      <div className="Media">
        <Header>
          <Col>Media</Col>
        </Header>
        <Content className="container">
          <div id="remote-media-div">
            {this.state.room && (
              <div className="room">
                {`Room: ${this.state.room}`}
              </div>
            )}
          </div>
          <div className="mute">
            {Object.entries(this.state.participants).map(this.renderButton)}
          </div>
        </Content>
      </div>
    );
  }
}

export default Media;
