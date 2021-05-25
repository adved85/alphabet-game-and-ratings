import React from 'react';
import './styles/MyClock.css';

class MyClock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        params:{
          'x': 100,
          'y': 100,
          'radius': 40,
          'alpha': 0
        },
        timeLimit:this.props.timeLimit
      };
    };

    componentDidMount() {
        // we have grey circle before drawing //
        this.grayCanvasBack();
    };

    grayCanvasBack=()=> {
      let params = this.state.params;

        var c2 = document.getElementsByClassName("canvasBack")[0];
        var ctx2 = c2.getContext("2d");
        ctx2.beginPath();
        ctx2.font = "25px Arial";
        ctx2.fillStyle = '#e6e6e6';
        //ctx2.fillText("Middle", 68,112);
        ctx2.lineWidth = 6;
        ctx2.strokeStyle = "#e6e6e6";
        ctx2.arc(params.x/2, params.y/2, params.radius, params.alpha, (2) * Math.PI);
        ctx2.stroke();
    };

    drawClock=(seconds, ctx, betSec)=>{
        let params = this.state.params;
              let x = params.x;
              let y = params.y;
         let radius = params.radius;
          let alpha = params.alpha;
          let timeLimit = this.state.timeLimit;

        ctx.clearRect(x - radius - ctx.lineWidth, y - radius - ctx.lineWidth, radius * 2 + (ctx.lineWidth*2), radius * 2 + (ctx.lineWidth*2));

        ctx.beginPath();
        ctx.font = "25px Arial";
        ctx.fillStyle = 'blue';
        //ctx.fillText("Middle", 70,110);

        let delta = timeLimit - seconds;
        // if(delta < 0) {
				// 	delta = delta*(-1);
				// }
        betSec.innerHTML = delta;

        ctx.lineWidth = 6;
        ctx.strokeStyle = "red";
        ctx.lineCap = "round";
        ctx.arc(x/2, y/2, radius, alpha, (seconds/30) * Math.PI);
        ctx.stroke();
        ctx.closePath();
    };

    clearClock=(ctx, betSec, c)=>{
        betSec.innerHTML = 0;
        ctx.beginPath();
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.closePath();
    };

  render() {

      var seconds = this.props.sec;
      var c = document.getElementsByClassName("myCanvas")[0];
      if (c) {
        var betSec = document.getElementsByClassName('bet-seconds')[0];
        var ctx = c.getContext("2d");
        this.clearClock(ctx,betSec,c);
        this.drawClock(seconds, ctx, betSec);
      }

      return (
            <div className="bet-clock">
                <canvas className="canvasBack" width={100} height={100}></canvas>
                <canvas className="myCanvas" width={100} height={100} ></canvas>
                <span className="bet-seconds">60</span>
            </div>
            );
      }
};

export default MyClock;
