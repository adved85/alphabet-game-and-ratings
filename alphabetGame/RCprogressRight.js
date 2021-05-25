import React, { Component } from 'react';
import { Line, Circle } from 'rc-progress';

const lineStyle = {
    width: '15vmin',
    height: '1.8vmin'
}

const progressColor = {

  'green':'#00dd2d',
  'orange':'#dda100',
  'red':'#ea0202',
};


class RCprogressRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      strokeColor1:"#0d0",
      strokeColor2:"#0d0",
      percent1: 100,
      percent2: 100,
      delta: (100/6)
    };
  }

  // Line2
  addProgress=()=>{
    this.setState({ percent2: this.state.percent2 + this.state.delta });
   // console.log(this.state.percent2 + this.state.delta);
    this.chcolor(this.state.percent2 + this.state.delta, 2);
  }

  // Line1
  subtractProgress=()=>{
    this.setState({ percent1: this.state.percent1 - this.state.delta });
    //console.log(this.state.percent1 - this.state.delta);
    this.chcolor(this.state.percent1 - this.state.delta, 1);
  }

  chcolor=(proc, num)=>{
      if (num === 1) {
        if(proc > 70) {
          this.setState({ strokeColor1: progressColor.green });
        }else if (proc < 70 && proc > 40) {
          this.setState({ strokeColor1: progressColor.orange });
        }else {
          this.setState({ strokeColor1: progressColor.red });
        }

      }else {
       // console.log(proc , 'proc2');
        if(proc < 135) {
          this.setState({ strokeColor2: progressColor.green });
        }else if (proc < 167 && proc > 130) {
          this.setState({ strokeColor2: progressColor.orange });
        }else if(proc > 167) {
          this.setState({ strokeColor2: progressColor.red });
        }
      }
  }

  resetProgress=()=>{
    this.setState({ percent1: 100, percent2: 100, strokeColor1: progressColor.green, strokeColor2: progressColor.green });

  }


  render() {
    let strokeColor1 = this.state.strokeColor1;
    let strokeColor2 = this.state.strokeColor2;
    let percent1 = this.state.percent1;
    let percent2 = this.state.percent2;

    /*
    <button onClick={this.subtractProgress}>subtractProgress</button>
    <button onClick={this.addProgress}>addProgres</button>
    <button onClick={this.resetProgress}>reset</button><br/>
    <Line style={lineStyle} percent={percent1} strokeWidth="4" strokeColor={strokeColor1} trailWidth="4" trailColor="#dedede" />
    <span> || </span>
    */

    return (
      <span>
        {/* hello progress: stroke-zapolnenie | trial-fon */}
        <Line style={lineStyle} percent={percent2} strokeWidth="4" strokeColor={strokeColor2} trailWidth="4" trailColor="#dedede" />
      </span>
    );
  }

}

export default RCprogressRight;
