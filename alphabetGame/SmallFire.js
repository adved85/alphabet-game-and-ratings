import React, { Component } from 'react';


var i = 0;
var id;
var canvas, ctx, cw, ch;

var listFire = [];
var listFirework = [];
var fireNumber = 8;
var center;
var range = 100;

var imago, spacego, imaTo, imaLe, imaWi, imaHe;
var imgWrap;

class SmallFire extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
        justRender: 'blabla',
      };
    this.updateCanvas = this.updateCanvas.bind(this);
    this.f1 = this.f1.bind(this);
    this.randColor = this.randColor.bind(this);
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
    this.stopFire = this.stopFire.bind(this);
    this.startFire = this.startFire.bind(this);
  }


    componentDidMount(prevProps, prevState) {
      imago = document.getElementsByClassName('bet-robot-image')[0];
      spacego = document.getElementsByClassName('bet-this-user')[0];

      imaTo = imago.offsetTop;
      imaLe = imago.offsetLeft-1;

      imaWi = imago.offsetWidth;
      imaHe = imago.offsetHeight;

      console.log(imaTo , " | ", imaLe);
      console.log(imaWi, " | ", imaHe);

          canvas = document.getElementsByClassName('canvas-small')[0];
          ctx = this.refs.canvas_small.getContext('2d'); //  ctx = canvas.getContext('2d');(+)

          canvas.width = imaWi;
          canvas.height = imaHe;

          cw = imaWi;
          ch = imaHe;
          ctx.fillRect(0, 0, 0, canvas.height);

          /* for full screen ---------->
          canvas.width = window.innerWidth;
              cw = window.innerWidth;
          canvas.height = window.innerHeight;
               ch = window.innerHeight;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          /* --------------> for full screen */
          ctx.fillStyle = 'rgba(200,200,200, 0.5)';//'rgba(200,200,200, 0.5)';   // first color [on-open] ----------------------------- //
          center = {
            x: canvas.width / 2 + canvas.width/4,   // canvas.width / 2
            y: canvas.height / 1.7                  // canvas.height / 2
          };
          for (var i = 0; i < fireNumber; i++) {
              var fire = {
                x: Math.random() * range / 2 - range / 4 + center.x,
                y: Math.random() * range * 2 + canvas.height,
                size: Math.random() + 0.5, // trnoxneri chap@
                fill: '#fd1',//'#fd1',   // trnoxneri guyn@
                vx: Math.random() - 0.9,
                vy: -(Math.random() + 8),
                ax: Math.random() * 0.02 - 0.01,
                far: Math.random() * range + (center.y - range)
              };
            fire.base = {
              x: fire.x,
              y: fire.y,
              vx: fire.vx
            };
            //
            listFire.push(fire);
          }// end for //
          //this.f1();   // autostartFire //
          this.stopFire(); // ինձ պետքա width-ը սկզբում փոքր լինի, helper-diamonds->վրադիր չլինի

    }

    componentWillUnmount() {
      this.stopFire();
    }

    stopFire() {
      /* any operation with state and canvas-style */
      window.clearInterval(id);
      canvas.width = 100;
    }

    startFire() {
      this.f1();
    }

    f1(){
      /* any operation with state and canvas-style */
      canvas.width = cw;
      id = setInterval(()=>{
            this.updateCanvas();
      },10);
    }

    updateCanvas() {
      i++;
      this.update();
      this.draw();
    }


    update() {
      for (var i = 0; i < listFire.length; i++) {
        var fire = listFire[i];
        //
        if (fire.y <= fire.far) {
            // case add firework
            var color = this.randColor();
            for (var i = 0; i < fireNumber * 5; i++) {
                var firework = {
                    x: fire.x,
                    y: fire.y,
                    size: Math.random() + 1.5,
                    fill: color,
                    vx: Math.random() * 5 - 2.5,
                    vy: Math.random() * -5 + 1.5,
                    ay: 0.05,
                    alpha: 1,
                    life: Math.round(Math.random() * range / 2) + range / 100
                };
                firework.base = {
                  life: firework.life,
                  size: firework.size
                };
                listFirework.push(firework);
            } // end for fireNumber //
            // reset
            fire.y = fire.base.y;
            fire.x = fire.base.x;
            fire.vx = fire.base.vx;
              fire.ax = Math.random() * 0.02 - 0.01;
        }
        //
        fire.x += fire.vx;
        fire.y += fire.vy;
        fire.vx += fire.ax;
      } // end for listFire //

      for (var i = listFirework.length - 1; i >= 0; i--) {
        var firework = listFirework[i];
          if (firework) {
            firework.x += firework.vx;
            firework.y += firework.vy;
            firework.vy += firework.ay;
            firework.alpha = firework.life / firework.base.life;
            firework.size = firework.alpha * firework.base.size;
            firework.alpha = firework.alpha > 0.6 ? 1 : firework.alpha;
            //
            firework.life--;
            if (firework.life <= 0) {
                listFirework.splice(i, 1);
            }
          }
       }
    }

    draw() {
        // clear
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 0.18; // trqelu aragutyun@
        ctx.fillStyle = '';
        // background-animation dynamic: '' or this.randColor() ||  static: 'green' ---------------- //

        ctx.fillRect(0, 0, canvas.width, canvas.height);
        /* for full screen --------------->
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        /* ---------------> for full screen */
        // re-draw
        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha = 1;
        for (var i = 0; i < listFire.length; i++) {
          var fire = listFire[i];
          ctx.beginPath();
          ctx.arc(fire.x, fire.y, fire.size, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fillStyle = fire.fill;
          ctx.fill();
        }
        for (var i = 0; i < listFirework.length; i++) {
          var firework = listFirework[i];
          ctx.globalAlpha = firework.alpha;
          ctx.beginPath();
          ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fillStyle = firework.fill;
          ctx.fill();
        }
    }

    randColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        var color = 'rgb($r, $g, $b)';
        color = color.replace('$r', r);
        color = color.replace('$g', g);
        color = color.replace('$b', b);
        return color;
    }

    render() {
      //console.log('small-fire rendered');
      /* buttons for controlling */
      // <button onClick={this.startFire}>click to startFire</button>
      // <button onClick={this.stopFire}>click to stopFire</button>
      return (
        <div>
          <canvas className="canvas-small" ref="canvas_small" style={{top: imaTo, left: imaLe}}></canvas>
        </div>
      );
    }
}
export default SmallFire;
