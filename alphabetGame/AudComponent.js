/* Clean JS: no libs!!! */
// .REMEMBER. binary files must to be imported ! (img; audio; video) //
import React, { Component } from 'react';

/* U can use any players for React

@ import ReactPlayer from 'react-player';
@ import FilePlayer from 'react-player/lib/players/FilePlayer';
@ https://www.npmjs.com/package/react-player

 */

import soundYes from './sounds/yes.mp3';
import soundNop from './sounds/no.mp3';
const sounds = [
	soundYes,
	soundNop,
];

// https://www.npmjs.com/package/react-player //

class AudComponent extends Component {
	constructor(props) {
		super(props);
		this.state = { toxLini: false};
	}

	playAudio=(letFlag)=>{
		let audioWrap = document.getElementsByClassName('audio-wrap')[0];
		let audioYes = audioWrap.getElementsByClassName('o-Yes')[0];
		let audioNop = audioWrap.getElementsByClassName('o-Nop')[0];
		// console.log(audioYes);
		// console.log(audioNop);
		if(letFlag === 'yes') {
			audioYes.currentTime= 0;
			audioYes.play();
		}else if(letFlag === 'nop') {
			audioNop.currentTime= 0;
			audioNop.play();
		}
	}

	playYes=()=>{
		this.playAudio('yes');
	}
	playNop=()=>{
		this.playAudio('nop');
	}
	render() {


	// <FilePlayer
	//  	ref={this.ref}
	//   	className='react-player'
	//  	url= {this.state.url}
	//  	loop = {false}
	//  	controls = {false}
	//		playing
	//  />

	/* buttons for controlling */
// <button onClick={this.playYes}>PLayYes</button>
// <button onClick={this.playNop}>PLayNop</button>
	return(
		<div className='audio-wrap'>
			<audio className='o-Yes' src={sounds[0]}></audio>
			<audio className='o-Nop' src={sounds[1]}></audio>
		</div>
	);
	}
}

export default AudComponent;
