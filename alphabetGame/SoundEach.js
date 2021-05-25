import React from 'react';

let SoundEach = function statelessFunction(props) {
  let soundSource = require('./sounds/questSounds/' + props.source);
  // <audio className="question-voice" src={soundSource} controls="true"></audio>
  return (
    <audio className="question-voice" src={soundSource} ></audio>
  );
}

export default SoundEach;
