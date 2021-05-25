import React, { Component } from 'react';
import SoundEach from './SoundEach';
import soundData from './soundData.json';

let aud = null;
class SoundList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleSpeach:false,
    };
  }

  createSound = (sound) =>{
    return <SoundEach source={sound} key={sound} />;
  }
  consoleThis = (sound) =>{
    console.log(sound);
  }

  createSounds = (sounds) =>{
      return sounds.map(this.createSound);
  }


  // toggleSpeach=(question)=>{
  //   aud = document.getElementsByClassName('question-voice')[question];
  //   this.setState({
  //     toggleSpeach: !this.state.toggleSpeach,
  //   });
  //   if(!this.state.toggleSpeach) { aud.pause(); }
  //   else{ aud.play(); }
  // }

  playQuestion=(question)=>{
    aud = document.getElementsByClassName('question-voice')[question-1];
    aud.play();

    // let audObject = document.getElementsByClassName('question-voice');
    // let audArray = Array.from(audObject);
    // audArray.map((item, i) =>{
    //   if(i === question-1) {
    //     item.setAttribute('controls', 'true');
    //     item.play();
    //   }else{
    //     item.removeAttribute('controls');
    //   }
    // })
  }

  pauseQuestion=(question)=>{
    if (question > 0) {
      question = question-1;
    }
    aud = document.getElementsByClassName('question-voice')[question];
    aud.pause();
  }

  validate_sounds_json =()=> {
      let gameID = soundData[this.props.game_id];
      if(gameID) {
          let btnContent = this.state.toggleSpeach?"On":"Off";
          return (
            <div>
                {/*<button onClick={this.toggleSpeach}> Speach {btnContent} </button>*/}
                {this.createSounds(soundData[this.props.game_id].voiceNames)}
            </div>
          );
      }else{
          return this.consoleThis(`not available sounds for this game questions. Please, add new sounds names into soundData.json`);
      }
  }

  render() {
    //  this.validate_sounds_json(gameID)

    return (
      <div>
        { this.validate_sounds_json() }
      </div>
    );
  }

}

export default SoundList;
