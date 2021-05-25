import React, { Component } from 'react';

import './styles/BetStyles.css';
import './styles/animate.css';
import MyClock from './MyClock';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ModalDialog from './ModalDialog';
import './styles/BetDemo.css';
import './styles/animate.css';

import betBackImg from './images/background.png';
import mouseImg from './images/mouse.png';
import lettOpener from './images/helpers/lettOpener.png';
import timeFreezer from './images/helpers/timeFreezer.png';
import lessViewer from './images/helpers/lessViewer.png';

import image0 from './images/static.gif';

const openNormalStyle = {
  backgroundImage: `url(${ lettOpener }),
                    url(/static/media/diamond.86fd6816.png),
                    linear-gradient(to bottom, #6de4184f 5%, #2ea95d 100%)`
}
const freezeNormalStyle = {
  backgroundImage: `url(${ timeFreezer }),
                    url(/static/media/diamond.86fd6816.png),
                    linear-gradient(to bottom, #6de4184f 5%, #2ea95d 100%)`
}
const lessonNormalStyle = {
  backgroundImage: `url(${ lessViewer }),
                    url(/static/media/diamond.86fd6816.png),
                    linear-gradient(to bottom, #6de4184f 5%, #2ea95d 100%)`
}
const gameBackStyle = {
  backgroundImage: `url(${ betBackImg })`,
  height:`100vmin`
}
const mouseStyle = {
  backgroundImage: `url(${mouseImg}),
                    url(/static/media/diamond.86fd6816.png)`
}

class BetDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oneData: this.props.takeGameData[5],
    };
  }

  componentDidMount() {

    console.log(this.state.oneData);
    console.log(this.props.takeGameData);
    let step = 0;
    let curtain = document.querySelector('.grey-curtain'); // curtain.style.display = "none";
    let parts = document.getElementsByClassName('select-for-show');
    let mods = document.getElementsByClassName('demo-modal');
    let clock_showWithScores = document.getElementsByClassName('show-with-scores')[0];
    let finalMod = document.querySelector('.demo-modal.final');

        this.showReady=()=>{
          finalMod.classList.remove('hide');
          finalMod.classList.add('show');
        }

        this.handleNext=()=>{
          if(step === parts.length-1 ){
            console.log('verj', step);
            setTimeout(()=> {
              parts[step].classList.remove('red-border');
              parts[step].classList.add('yell');

              mods[step].classList.remove('show');
              mods[step].classList.add('hide');
              this.showReady();
            }, 600);
          }else {
              console.log('step-> ', step);
              console.log('len-> ', parts.length);

              setTimeout(()=> {
                // for show only once, with scores
                // if (step === 2) {
                //   clock_showWithScores.classList.add('red-border');
                // }else{
                //   clock_showWithScores.classList.remove('red-border');
                // }

                // for show each step //
                parts[step].classList.add('yell');
                parts[step].classList.remove('red-border');
                parts[step+1].classList.add('red-border');

                mods[step].classList.remove('show');
                mods[step].classList.add('hide');
                mods[step+1].classList.remove('hide');
                mods[step+1].classList.add('show');
                step++;
              },600);
          }
        }

        this.dropCurtain=()=> {

          // fetch-update //
          let gameId = this.props.gameId;
          // https://developers.google.com/web/updates/2015/03/introduction-to-fetch?hl=en
          let url = 'https://omegacoding.com/android_test/userProgressManager.php';
          let method = 'post';
          let headers = {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"};

          let oper = 7;
          let type= 2;
          let unique_id = this.props.unique_id;
          let body = `unique_id=${encodeURI(unique_id)}&operation=${encodeURI(oper)}&game_type=${encodeURI(type)}`;

          fetch(url, {
              method: method,
              headers: headers,
              body: body
          })
          .then(res=>res.json())
          .then(data=>{
            console.log(data);
            if (data == true) {
              console.log(`data is-- ${data}`);
              curtain.style.display = 'none';
              this.props.closeShowDemoState(false);
            }
          })
          .catch(function (error) {
              console.log('Request failed', error);
          });
        }

  }

  render() {
    console.log('--------------------- << BetDemo >> ----------------------');
    let showKeyboard = {display: 'inline-block'};
    let showSpecials = {display: 'none'};
    let oneData = (this.state.oneData);

    //console.log(oneData);
    console.log('unique_id-> ', this.props.unique_id);
    return (
      <div className="bet-demo-wrap" style={gameBackStyle}>

        <div className="single-window select-for-show red-border">
          <h2 className="bet-question select-for-show ">
              <span className="bet-question-text"> {oneData.question} </span>
          </h2>
          <div className="bet-user-space">
              <div className="bet-this-user">
                  <span className="bet-user-name"> answer -> {oneData.answer}</span><br/>
                  <div className="bet-rob-image-wrap select-for-show">
                      <img src={image0} alt="image1" className="bet-robot-image"/>
                  </div>
                  <div className="bet-scores select-for-show">
                      <span className="bet-score-image"></span>
                      <span className="bet-coins-count">
                        <span className="bet-coins-a-span">186</span>
                            <span className="divider"> / </span>
                        <span className="bet-score-a-span">{171} <span className="grow-step"></span> </span>
                            <span className="divider"> / </span>
                        <span className="bet-time-a-span" style={{opacity: 1}}>time bounses +{15}</span>
                       </span>
                  </div>
              </div>

              <div className="bet-round-and-timer select-for-show">
                  <div className="bet-timer show-with-scores">
                    <MyClock
                        sec = {15}
                        timeLimit = {60}
                    />
                  </div>

                    <div className="bet-helpers">
                      <button className="bet-let-opener bet-helper-btn"
                                      style={openNormalStyle}>
                                      Open Letter
                      </button>

                      <button className="bet-time-freezer bet-helper-btn" onClick={this.timeHelper}
                                      style= {freezeNormalStyle}>
                                      Freeze Time
                      </button>

                      <button className="bet-lesson-viewer bet-helper-btn" onClick={ this.videoHelper }
                                      style={lessonNormalStyle}>
                                      Lesson Fragment
                      </button>
                    </div>
              </div>
          </div>

          <div className="bet-word-space">
                <span className="guess select-for-show">
                  <span className={'fired'}>{oneData.answer}</span>
                </span>
          </div>

          <div className="game-foot">

            <div className="bet-more-btn-wrap select-for-show">
              <button className="bet-special-simbols" onClick={this.toggleSpecials}>?123.</button><br/>
              <button className="bet-exit-game"       onClick={this.goToLevelList}>exit</button><br/>
            </div>

            <div className="bet-keyboard select-for-show" onClick={this.handleClick} style={showKeyboard}>
              <div className="kb-first-row">
                  <button className="kb-btn" name="Q"  >Q</button>
                  <button className="kb-btn" name="W"  >W</button>
                  <button className="kb-btn" name="E"  >E</button>
                  <button className="kb-btn" name="R"  >R</button>
                  <button className="kb-btn" name="T"  >T</button>
                  <button className="kb-btn" name="Y"  >Y</button>
                  <button className="kb-btn" name="U"  >U</button>
                  <button className="kb-btn" name="I"  >I</button>
                  <button className="kb-btn" name="O"  >O</button>
                  <button className="kb-btn" name="P"  >P</button>
              </div>
              <div className="kb-second-row">
                  <button className="kb-btn" name="A"  >A</button>
                  <button className="kb-btn" name="S"  >S</button>
                  <button className="kb-btn" name="D"  >D</button>
                  <button className="kb-btn" name="F"  >F</button>
                  <button className="kb-btn" name="G"  >G</button>
                  <button className="kb-btn" name="H"  >H</button>
                  <button className="kb-btn" name="J"  >J</button>
                  <button className="kb-btn" name="K"  >K</button>
                  <button className="kb-btn" name="L"  >L</button>
              </div>
              <div className="kb-third-row">
                  <button className="kb-btn" name="Z"  >Z</button>
                  <button className="kb-btn" name="X"  >X</button>
                  <button className="kb-btn" name="C"  >C</button>
                  <button className="kb-btn" name="V"  >V</button>
                  <button className="kb-btn" name="B"  >B</button>
                  <button className="kb-btn" name="N"  >N</button>
                  <button className="kb-btn" name="M"  >M</button>
              </div>
            </div>

            <div className="mouse-ads-wrapper ">
                <div style={mouseStyle}></div>
            </div>


            <div className="grey-curtain">

                <div className="demo-modal first show">
                    <div className="modal-header">
                        <h2>Start Demonstration</h2>
                    </div>
                    <div className="modal-body">
                      <p>Welcome to AlphabetCoding game!</p>
                      <p>If you carefully watched video tutorial you can easily play and pass the game.</p>
                      <p>Now you can see how to play AlphabetCoding game.</p>
                      <p>For starting game's Demonstration push the "START DEMO" button.</p>
                    </div>
                    <div className="modal-footer">
                        <span className=" modal-close-button" onClick={this.handleNext}>
                          <MuiThemeProvider>
                              <FlatButton
                                label="Start Demo"
                                style = {{border:'1px dotted grey'}}
                                primary={true}/>
                          </MuiThemeProvider>
                        </span>
                    </div>
                </div>

                <div className="demo-modal pos1 hide">
                    <div className="modal-header">
                        <span className="close-modal" onClick={this.handleNext}>×</span>
                        <span>Question.</span>
                    </div>
                    <div className="modal-body">
                      <p>Here you can see the question.</p>
                      <p>You should guess the answer as fast as possible to gain more scores.</p>
                    </div>
                    <div className="modal-footer">
                        <span className=" modal-close-button" onClick={this.handleNext}>
                          <MuiThemeProvider>
                              <RaisedButton
                                label="NEXT"
                                style = {{border:'1px dotted grey'}}
                                primary={true}/>
                          </MuiThemeProvider>
                        </span>
                    </div>
                </div>

                <div className="demo-modal pos2 hide">
                    <div className="modal-header">
                        <span className="close-modal" onClick={this.handleNext}>×</span>
                        <span>Action Screen.</span>
                    </div>
                    <div className="modal-body">
                      <p>Here is struggle and the white hero will succeed if you answer right, otherwise he will fail.</p>
                    </div>
                    <div className="modal-footer">
                        <span className=" modal-close-button" onClick={this.handleNext}>
                          <MuiThemeProvider>
                              <RaisedButton
                                label="NEXT"
                                style = {{border:'1px dotted grey'}}
                                primary={true}/>
                          </MuiThemeProvider>
                        </span>
                    </div>
                </div>

                <div className="demo-modal pos3 hide">
                    <div className="modal-header">
                        <span className="close-modal" onClick={this.handleNext}>×</span>
                        <span>Scores.</span>
                    </div>
                    <div className="modal-body">
                      <p>Аt the bottom of the picture, in the selected area will be shown scores you earned.</p>
                      <p>Scores will be higher if you answer to the question faster.</p>
                    </div>
                    <div className="modal-footer">
                        <span className=" modal-close-button" onClick={this.handleNext}>
                          <MuiThemeProvider>
                              <RaisedButton
                                label="NEXT"
                                style = {{border:'1px dotted grey'}}
                                primary={true}/>
                          </MuiThemeProvider>
                        </span>
                    </div>
                </div>

                <div className="demo-modal pos4 hide">
                    <div className="modal-header">
                        <span className="close-modal" onClick={this.handleNext}>×</span>
                        <span>Timer and Hints.</span>
                    </div>
                    <div className="modal-body">
                      <p>On the right side you can see the timer. When time expires you will see the next question.</p>
                      <p>Аt the bottom of the timer hints are placed to help you guess the answer.</p>
                    </div>
                    <div className="modal-footer">
                        <span className=" modal-close-button" onClick={this.handleNext}>
                          <MuiThemeProvider>
                              <RaisedButton
                                label="NEXT"
                                style = {{border:'1px dotted grey'}}
                                primary={true}/>
                          </MuiThemeProvider>
                        </span>
                    </div>
                </div>

                <div className="demo-modal pos5 hide">
                    <div className="modal-header">
                        <span className="close-modal" onClick={this.handleNext}>×</span>
                        <span>Response space.</span>
                    </div>
                    <div className="modal-body">
                      <p>During the game, the guessed letters appear in the response area.</p>
                    </div>
                    <div className="modal-footer">
                        <span className=" modal-close-button" onClick={this.handleNext}>
                          <MuiThemeProvider>
                              <RaisedButton
                                label="NEXT"
                                style = {{border:'1px dotted grey'}}
                                primary={true}/>
                          </MuiThemeProvider>
                        </span>
                    </div>
                </div>

                <div className="demo-modal pos6 hide">
                    <div className="modal-header">
                        <span className="close-modal" onClick={this.handleNext}>×</span>
                        <span>Control buttons</span>
                    </div>
                    <div className="modal-body">
                      <p>In the lower left corner there are buttons for switching the symbols of the keyboard and leaving the game.</p>
                    </div>
                    <div className="modal-footer">
                        <span className=" modal-close-button" onClick={this.handleNext}>
                          <MuiThemeProvider>
                              <RaisedButton
                                label="NEXT"
                                style = {{border:'1px dotted grey'}}
                                primary={true}/>
                          </MuiThemeProvider>
                        </span>
                    </div>
                </div>

                <div className="demo-modal pos7 hide">
                    <div className="modal-header">
                        <span className="close-modal" onClick={this.handleNext}>×</span>
                        <span>Virtual keyboard.</span>
                    </div>
                    <div className="modal-body">
                      <p>You can use this keyboard by mouse or press your computer keyboard for answering the question.</p>
                    </div>
                    <div className="modal-footer">
                        <span className=" modal-close-button" onClick={this.handleNext}>
                          <MuiThemeProvider>
                              <RaisedButton
                                label="NEXT"
                                style = {{border:'1px dotted grey'}}
                                primary={true}/>
                          </MuiThemeProvider>
                        </span>
                    </div>
                </div>
                {/*<div className="demo-modal pos8 hide">
                    <div className="modal-header">
                        <span className="close-modal" onClick={this.handleNext}>×</span>
                        <span>This is Question.</span>
                    </div>
                    <div className="modal-body">
                      <p>Question is a question.</p>
                    </div>
                </div>*/}

              <div className="demo-modal final hide">
                  <div className="modal-header">
                      <span className="close-modal" onClick={this.dropCurtain}>×</span>
                      <span>Are you ready?</span>
                  </div>
                  <div className="modal-body">
                    <p>For starting game push the "Let's Play" button.</p>
                  </div>
                  <div className="modal-footer">
                      <span className=" modal-close-button" onClick={this.dropCurtain}>
                        <MuiThemeProvider>
                            <FlatButton
                              label="Let's Play"
                              style = {{border:'1px dotted grey'}}
                              primary={true}/>
                        </MuiThemeProvider>
                      </span>
                  </div>
              </div>

            </div>


          </div>
        </div>
      </div>
    );
  }
}
export default BetDemo;
