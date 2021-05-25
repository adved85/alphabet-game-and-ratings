/* bet-game: single-mode */
import React from 'react';
import './styles/BetStyles.css';
import './styles/LessonFragment.css';
import './styles/animate.css';

import FlatButton from 'material-ui/FlatButton';
import FetchNver from './FetchNver';
import Socketclient from "./Socketclient";
import MyClock from './MyClock';
import OverallPointsUnity from '../notepadGame/points_for_ unity';

import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ModalDialog from './ModalDialog';
import BetDemo from './BetDemo';

import betBackImg from './images/background.png';
import mouseImg from './images/mouse.png';
import lettOpener from './images/helpers/lettOpener.png';
import timeFreezer from './images/helpers/timeFreezer.png';
import lessViewer from './images/helpers/lessViewer.png';

import image0 from './images/image0.png';
import image1 from './images/image1.png';
import image2 from './images/image2.png';
import image3 from './images/image3.png';
import image4 from './images/image4.png';
import image5 from './images/image5.png';
import image6 from './images/image7.png';

//import gifTrueWord from './images/gif-true-word.gif';
import gifTrueWord from './images/true_word_fast.gif';
import gifStaticPos from './images/static.gif';
import gifTrueLett from './images/let_true_fast_noloop.gif';
import gifFalseLett from './images/let_false_fast_noloop.gif';
//import gifTrueLett from './images/nocam_true.gif';

//import FireWork from './FireWork';
//import './styles/FireWork.css';

import SmallFire from './SmallFire';
import './styles/SmallFire.css';

import AudComponent from './AudComponent';
import '../after_demo';


/* modal-message-zgushacum */
import PayForCoins from '../../use_coins';

import Simbols from './Simbols';
import Keyboard from './Keyboard';
import LessonFragmentModal from './LessonFragmentModal';



const gameBackStyle = {
  backgroundImage: `url(${ betBackImg })`,
  height:`100vmin`
}

const mouseStyle = {
  backgroundImage: `url(${mouseImg}),
                    url(/static/media/diamond.86fd6816.png)`
}
//--------- https://www.bestcssbuttongenerator.com/#/4
const openNormalStyle = {
  backgroundImage: `url(${ lettOpener }),
                    url(/static/media/diamond.86fd6816.png),
                    linear-gradient(to bottom, #6de4184f 5%, #2ea95d 100%)`
}

const openHoverStyle = {
  backgroundImage: `url(${ lettOpener }),
                    url(/static/media/diamond.86fd6816.png),
                    linear-gradient(to bottom, #2ea95d 5%, #6de4184f 100%)`
}
//------------------------
const freezeNormalStyle = {
  backgroundImage: `url(${ timeFreezer }),
                    url(/static/media/diamond.86fd6816.png),
                    linear-gradient(to bottom, #6de4184f 5%, #2ea95d 100%)`
}

const freezeHoverStyle = {
  backgroundImage: `url(${ timeFreezer }),
                    url(/static/media/diamond.86fd6816.png),
                    linear-gradient(to bottom, #2ea95d 5%, #6de4184f 100%)`
}

//-----------------------
const lessonNormalStyle = {
  backgroundImage: `url(${ lessViewer }),
                    url(/static/media/diamond.86fd6816.png),
                    linear-gradient(to bottom, #6de4184f 5%, #2ea95d 100%)`
}

const lessonHoverStyle = {
  backgroundImage: `url(${ lessViewer }),
                    url(/static/media/diamond.86fd6816.png),
                    linear-gradient(to bottom, #2ea95d 5%, #6de4184f 100%)`
}

const robSources = [
  image0,
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  gifTrueWord,
  gifStaticPos,
  gifTrueLett,
  gifFalseLett
];

//const kb_button_list = document.getElementsByClassName('kb-btn');
//const spanAns = document.getElementsByClassName('bet-outAnswer')[0];
//const spanOk = document.getElementsByClassName('bet-outOk')[0];
//let betArray = [];
let scores = 0; // score is for true letter
//let elapsedTime = 0;




class BetGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      /* single mode */
      betArray:null,
      robImages:null,
      quest_id:0,
      question:null,
      answer:null,
      ansArr:null,
      fired:'',
      indexes:[],
      guessArr:[], // null
      nArr:[],
      scores:0,
      picNum:0,
      timeLimit:60,
      timer_id:0,
      seconds:0,
      coins:0,
      timeBonus:0,
      elapsedTime:0,
      isOpenSpecials:false,

      lowCoins:null,
      middleCoins:null,
      highCoins:null,
      star:null,

      openHover:false,
      freezeHover: false,
      lessonHover: false,
      timeFreezed:false,
      diamonds:null,

      /* multiuser */
      multi:this.props.multi,

      /* from gameList */
      gameContinue:[],
      rank:null,
      showDemo: true,

      // for small-fire //
      imgunWidth:0,
      imgunHeight:0,
      imgunTop:0,
      imgunLeft: 0,

      letterFlag:null,

      /* zgushacum */
      show_info:false,
      show_open_info:false,
      show_freeze_info:false,
      show_video_info:false,


    };
  };

  /*  keyboard listener
  keyboardHandle=()=> {
    window.onkeydown = function(e) {
      let key = e.keyCode ? e.keyCode : e.which;
      let n = String.fromCharCode(key);
      let elem = document.getElementsByName(n)[0];
      //elem.setAttribute('disabled', 'true');
      //elem.style.backgroundColor = 'red';
      n = n.toLowerCase();
      console.log(n);
    };
  };
  */

/*** START-> User helper buttons*/
  openHelper=(event)=> {
        // button -> onClick
        this.fetchDiamonds(this.openCallBack);
  }
  openCallBack=()=> {
    // get rand keyboard-key ----
    let ansArr = this.state.ansArr;
    let guessArr = this.state.guessArr;
    let keyName;
    let keyIndexes=[];
    let which;
    guessArr.map((g, gindex)=> {
      if(g === '_') {
        keyIndexes.push(gindex);
      }
    });
    if (keyIndexes.length !== 0) {
          if( keyIndexes.length <= 2 ) {
            which = 0;
          }else if(keyIndexes.length <=4 && keyIndexes.length > 2) {
            which = 1;
          }else if (keyIndexes.length <= 6 && keyIndexes.length > 3) {
            which = 3;
          }else if (keyIndexes.length > 6) {
            which = 5;
          }
          console.log(keyIndexes);
          keyName = ansArr[keyIndexes[which]];
          console.log(keyName);

          let keyBtn = document.getElementsByName(keyName.toUpperCase())[0];
          let n = keyName;
          /* ------------| General |----------------*/
          this.generalLogic(keyBtn, n);
    }
    // get rand keyboard-key ----
  }

  timeHelper=(event)=> {
      // button
      this.fetchDiamonds(this.timeCallBack);
  }
  timeCallBack=()=> {
    // freez timer ----
    this.pauseTimer();
    let timeBtn = document.getElementsByClassName('bet-time-freezer')[0];
    timeBtn.setAttribute('disabled','true');
    timeBtn.style.cursor = 'default';
    //this.setState({ timeFreezed:true });
    // freeze timer ----
  }

  videoHelper=(event)=> {
      // a-tag -> onClick
      this.fetchDiamonds(this.videoCallBack);
  }
  videoCallBack=()=> {

        // show lesson fragment ----
        // https://www.youtube.com/embed/f3QyhSFzVOA?autoplay=1&start=92
        // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal2
        let vSec = this.state.betArray[this.state.quest_id].startAt;
        let videoID = this.props.lessonLink;
        let href = "https://www.youtube.com/embed/" + videoID + "?autoplay=1&start="+vSec;

        /* -- as a link, with click imitation (+) as a new window
          var a = document.createElement('a');
          a.href = href;
          a.target = '_blank';
          a.click();
          // new window
          var vidWindow = window.open(href, 'vidWindow', 'width=800, height=600, top=20, left=200');
          vidWindow.focus();
        */

        let fragModal = document.getElementsByClassName('bet-modal-fragment')[0];
        let fragFrame = document.getElementsByClassName('bet-frag-frame')[0];
            fragFrame.gesture = "media";
            fragFrame.allow = "encrypted-media";
            //gesture="media" allow="encrypted-media"
        let fragBody = document.getElementsByClassName('bet-fragment-modal-body')[0];
        let fragCloseX = document.getElementsByClassName('bet-fragment-close')[0];
        let fragCloseBtn = document.getElementsByClassName('bet-fragment-close-btn')[0];

        this.pauseTimer();
        fragFrame.src = href;
        fragModal.style.display = "block";
        console.log(fragFrame);
        fragCloseX.onclick = ()=> {
            fragFrame.src = "";
            fragModal.style.display = "none";
            this.startTimer();
        }
        fragCloseBtn.onclick = ()=> {
            fragFrame.src = "";
            fragModal.style.display = "none";
            this.startTimer();
        }

        /* window.onclick = function(event) {
            if (event.target == fragModal) {
                fragFrame.src = "";
                fragModal.style.display = "none";
                this.startTimer();
            } }*/
        // show lesson fragment ---
  }

  fetchDiamonds =(funcName)=> {
    let userId = this.props.userId;
    let url = 'https://omegacoding.com/android_test/manageDiamonds.php';
    let method = 'post';
    let headers = {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"};
    let body = "user_id="+userId+"&operation=8";

    fetch(url, {
      method: method,
      headers: headers,
      body: body
    })
    .then(res=>res.json())
    .then((data)=>{
      this.setState({ diamonds:data });
        if(data !== '0') {
            console.log(data, 'diamonds q-ty: true');
            if(data === 'comes_zero') data = 0;
            this.props.addUserDiamonds(data); // remember to change changeUserDiamonds(data);
            return funcName();
        }
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
  }
/*** END-> User helper buttons */

/* START-> helpers addEventListeners */
  onOpenHover=()=> {
    this.setState({ openHover: true });
  }
  onOpenOut=()=> {
    this.setState({ openHover: false });
  }
  onFreezeHover =()=> {
    this.setState({ freezeHover: true });
  }
  onFreezeOut =()=> {
    this.setState({ freezeHover: false });
  }
  onLessHover = ()=>{
    this.setState({ lessonHover: true });
  }
  onLessOut = ()=> {
    this.setState({ lessonHover: false });
  }
  /* END=> helpers addEventListeners */

  generalLogic=(keyBtn, n)=> {
    // Start - getting and checking chars
    keyBtn.setAttribute('disabled', 'true'); // disable pushed btn: more styles into (true-false)
    let nArr = this.state.nArr;
    nArr.push(n);
    this.setState({nArr:nArr});
    console.log('1. ===== nArr', nArr);

    let countRepeats = 0;
    nArr.map((y, indexy)=> {
        if(n === y) {
          countRepeats++;
        }
    });
    console.log('countRepeats - ',countRepeats); // must to be ===1, but not > 1
    // END - getting and checking chars
    // checking dashes into guess-place
    let d = (this.state.guessArr).indexOf("_");
    if(d !==-1 ) {

            /** START - check letter/get his index/put into right position/count scores */
            console.log(' stay on the same question');
            let ansArr = this.state.ansArr;
            let guessArr = this.state.guessArr;

            let indexes = [];
            let drown = false;

            // getting letter's index from answer-array(if exists)
            ansArr.map((x, index)=> {
                if(x === n) {
                    indexes.push(index);
                    drown = true;
                }
            });
            this.setState({indexes:indexes});
            console.log(indexes);

            // put letters into guessArr on their positions
            // growing scores if true-letter clicked only once
            if(drown === true) {
                  // true letter
                  for(let j=0; j < indexes.length; j++) {
                      console.log(indexes[j]);
                      guessArr[indexes[j]] = n;
                  }
                  // counting SCORES only once
                  if(countRepeats === 1) {
                      scores = this.state.scores +(indexes.length*20); // indexes.length -> "avatar", for a-> 3*20
                      this.setState({scores:scores});
                      this.setState({guessArr: guessArr});
                      console.log(guessArr);
                      /*---| keyBtn fire and animate |----*/
                      keyBtn.style.background ='#87fd87'; //'green';
                      keyBtn.classList.add("animated","flip");
                      setTimeout(function() { keyBtn.classList.remove("animated","flip"); }, 300);

                      /* ----| style for bet-score-a-span (+20) |--- */
                      let scoreAspan = document.getElementsByClassName('bet-score-a-span')[0];
                      scoreAspan.classList.add("animated","bounceIn");
                      setTimeout(function() { scoreAspan.classList.remove("animated", "bounceIn"); }, 200);

                      /* ---| grow-step animation |--- */
                      let growStep = document.getElementsByClassName('grow-step')[0];
                      growStep.innerText =`+${indexes.length*20}`;
                      growStep.classList.add('grow-animate');
                      setTimeout(function() { growStep.classList.remove('grow-animate'); }, 300);

                      // ---| set true gif |--- //
                      this.setImageSource(9);
                      this.refs.audioChild.playYes();

                  }

            } else {
                  // false-letter
                  let picNum = this.state.picNum + 1;

                  if(picNum < 6){
                      /* ---| question Animation |--- */
                      let betQuestText = document.getElementsByClassName('bet-question-text')[0];
                      betQuestText.classList.add("animated", "shake");
                      setTimeout(function() { betQuestText.classList.remove("animated", "shake"); }, 400);


                      this.setState({picNum:picNum});
                      console.log('false counter ----> ', picNum);

                  }else{
                      //Game Over: LOSE
                      /* ---| for play-again |----
                      setTimeout(this.gameOver , 2000); // bad answer limits
                      this.setState({picNum:picNum+1});
                      this.gameOverContext();
                      ------| play-again |---- */
                      setTimeout(this.gameEnd, 2000);
                      this.disableAllBtns();
                  }
                  /*--| change rob's image |-- */
                  //this.appendRobImage(picNum);
                  this.setImageSource(10);
                  this.refs.audioChild.playNop();


                  /* --false-keyBtn-styleing-- */
                  keyBtn.style.background = 'rgb(251, 218, 162)';//'orange';
                  keyBtn.style.color = 'red';

                  /* ---| robot's picture animation |--- */
                  // let robosh = document.getElementsByClassName('bet-robot-image')[0];
                  // robosh.classList.add("animated","wobble");
                  // setTimeout(function() { robosh.classList.remove("animated","wobble") }, 250);

                  console.log('98-picNum state-->',this.state.picNum);
                  console.log('98-picNum let-->',picNum);
            }
            /** END - check letter/../../ -------- */

            /* START compare length of answer-&-guess
            (for changing question or finishing game and counting coins)*/
            let guess = this.state.guessArr;
                guess.toString();
            let str_guess = guess.join(""); // console.log("str_guess-> ", str_guess);
            let answer = this.state.answer; // console.log("answer----> ", answer);

            if(str_guess === answer) {
                console.log('<<<---- next question --->>>');
                /*--= count coins =--*/
                // global:scores
                let elapsedTime = this.state.elapsedTime;
                let timeBonus =this.state.timeBonus + (this.state.timeLimit - elapsedTime); // limit - elapsed
                let coins = scores + timeBonus;
                this.setState({coins: coins});
                this.setState({scores:scores});
                this.setState({timeBonus:timeBonus});

                /* ---| animate bet-time-a-span +(60-elapsedTime) |--- */
                let timeAspan = document.getElementsByClassName('bet-time-a-span')[0];
                    timeAspan.style.opacity = 1;
                timeAspan.classList.add("animated","bounceInRight");
                setTimeout(function() { timeAspan.classList.remove("animated","bounceInRight");  }, 500);
                setTimeout(function() { timeAspan.style.opacity = 0; }, 1500);

                /* ---| animate bet-score (all coins) |--- */
                let coinsAspan = document.getElementsByClassName('bet-coins-a-span')[0];
                setTimeout(function() {
                  coinsAspan.innerText = coins;
                  coinsAspan.classList.add('animated','flip');
                }, 700);
                setTimeout(function() {
                  coinsAspan.classList.remove('animated','flip')
                }, 1700);



                let quest_id = this.state.quest_id;
                quest_id++;
                let betArray = this.state.betArray; // console.log(betArray);

                  if(betArray[quest_id] !== undefined) {
                      // Next Question
                      this.setImageSource(7);
                      setTimeout(this.nextQuestion ,3600);
                      this.refs.smallFireChild.startFire();
                      setTimeout(this.refs.smallFireChild.stopFire,2550);



                  } else {
                      // End of Game
                      setTimeout(this.gameEnd, 2000);

                  }
                this.disableAllBtns();
                this.setState({fired:'fired'}); // add class for spanOk(color)
                this.setState({nArr:[]}); // to empty n-array for the next question
                this.pauseTimer();
            } /* END compare length ----------- */

        } /* if(d !==-1) */
  }

  handleClick=(event)=> {
    if(event.target.hasAttribute('name')) {
        //realy pushed button, no empty space into div
        let n = event.target.getAttribute("name"); //let n = event.target.innerText;
        let keyBtn = document.getElementsByName(n)[0];
        n = n.toLowerCase();
        /* ------------| General |----------------*/
        this.generalLogic(keyBtn, n);
    }
  }

  componentDidMount() {
    window.document.addEventListener('keypress', this.keyboardHandle);
  }
  keyboardHandle=(event)=>{
    let n = event.key;
    let N = n.toUpperCase();

    let keyBtn = document.getElementsByName(N)[0];
    console.log(N);
    console.log(keyBtn);
    /* ------------| General |----------------*/
    this.generalLogic(keyBtn, n);
  }

  gameEnd=()=> {
      this.pauseTimer();
      let currCoins = this.state.coins;

      let star = '';
      if(currCoins <= this.state.lowCoins) {
        console.log(`${currCoins} - ${this.state.lowCoins} 'coins are low'`);
        star = 1;
      }else if(this.state.lowCoins < currCoins && currCoins < this.state.highCoins) {
        console.log(`${this.state.lowCoins} - ${currCoins} - ${this.state.highCoins} 'coins are middle'`);
        star = 2;
      }else if(currCoins >= this.state.highCoins) {
        console.log(`${currCoins} - ${this.state.highCoins} 'coins are high'`);
        star = 3;
      }

        // send user's progress to back //
      let getRaiting = `unique_id=${encodeURI(this.props.userProfile.uid)}&level=${this.props.level}
            &course_name=${this.props.course_Name}&mark=${star}
            &points=${currCoins}&operation=5&game_id=${this.props.gameId}`;
            fetch(`https://omegacoding.com/android_test/userProgressManager.php`,{
                method:'POST',
                headers:{"content-type": "application/x-www-form-urlencoded",'Accept':'application/json'},
                body:getRaiting
            }).then(response => {
                if(response.ok){
                    return response.json()
                }
            }).then(response => {
                this.setState({rank: response.rank});
            });

        this.setState({ star: star });  // if star-state isn't 'null' showing 'OverallPointsUnity'-component.
        this.setState({ coins: currCoins });
        this.props.g_over(currCoins);
        /* window.alert(` high - ${this.state.highCoins} \n
                       midd - ${this.state.middleCoins} \n
                        low - ${this.state.lowCoins} \n
                        You have ${currCoins} coins. \n
                        You have ${star} star. `); */
                        console.log('\\\\----------outer-props loging below ----------///');
                        console.log("this.props.userProfile.uid-->> ", this.props.userProfile.uid);
                        console.log("this.props.level-->> " , this.props.level);
                        console.log("this.props.course_Name-->> ", this.props.course_Name);
                        console.log("this.props.gameId-->> ", this.props.gameId);
                        console.log("this.props.count_mark-->> ", this.props.count_mark);
                        console.log("this.props.self_mark-->> ", this.props.self_mark);
                        console.log("this.props.data-->>", this.props.data);
                        console.log("this.props.game-->> ", this.props.game);
                        console.log("this.props.data--> ", this.props.data);
                        console.log("this.props.lessonLink--> ", this.props.lessonLink);
                        console.log("this.state.gameContinue-->> ", this.state.gameContinue);

  }

  gameOver=()=> {
      if (this.state.guessArr[0] === 'Play Again') {

          console.log(this.state.guessArr);
          let againBtn = document.getElementsByClassName('bet-play-again')[0];

          againBtn.addEventListener('click', ()=> {

              setTimeout(()=> {
                  this.disableAllBtns();
                  this.setState({
                      nArr:[],
                      quest_id:0,
                      scores:0,
                      coins:0,
                      seconds:0,
                      elapsedTime:0,
                      timeBonus:0,
                      timeFreezed:false
                  });
              let timeBtn = document.getElementsByClassName('bet-time-freezer')[0];
              timeBtn.removeAttribute('disabled');
              timeBtn.style.cursor = 'pointer';
              this.nextQuestion();
            }, 1000);
          });
      }
  }
  gameOverContext =()=> {
      this.disableAllBtns();
      setTimeout(()=>{
        this.setState({guessArr:['Play Again']});
      },1600);
      this.setState({nArr:[]});
      this.pauseTimer();
  };

  startTimer=()=> {
      //let start = Date.now();
      let seconds = 0;
      if(this.state.seconds) {
        seconds = this.state.seconds;
      }
      let timer_id = setInterval(()=> {
          //let delta = Date.now() - start;
          //const seconds = (Math.floor(delta / 1000));
          //console.log(seconds);
          if(seconds === this.state.timeLimit) {
              this.pauseTimer();
              setTimeout(this.nextQuestion ,2000);
              this.setState({fired:'fired'}); // add class for spanOk(color)
              this.setState({nArr:[]});
          }
          this.setState({ seconds: seconds});
          this.setState({ elapsedTime: seconds });
          //elapsedTime = seconds;
          seconds++;
      }, 1000);
      this.setState({timer_id: timer_id});
  }

  stopTimer=()=> {
      this.setState({seconds: 0});
      clearInterval(this.state.timer_id);
  }

  pauseTimer=() => {
    clearInterval(this.state.timer_id);
  };

  enableAllBtns=()=> {
    let btn = document.getElementsByClassName('kb-btn');
      for(let a = 0; a < btn.length ; a++) {
          btn[a].style.background = '#fff8e9';
          btn[a].style.color = '#373535';
          btn[a].removeAttribute("disabled"); // or btn[i].disabled = false;
      }
      let helpBtn = document.getElementsByClassName('bet-helper-btn');
      for(let b = 0; b < helpBtn.length ; b++) {
        helpBtn[b].removeAttribute("disabled");
      }
  }

  disableAllBtns=()=> {
    let keyBtn = document.getElementsByClassName('kb-btn');
      for(let a = 0; a < keyBtn.length ; a++) {
          //keyBtn[a].style.background = '#fff8e9'; // btn[a].style.background = 'transparent';
          //keyBtn[a].style.color = '#373535';      // btn[a].style.color = 'white';
          keyBtn[a].setAttribute("disabled", true);
      }
      let helpBtn = document.getElementsByClassName('bet-helper-btn');
      for(let b = 0; b < helpBtn.length ; b++) {
        helpBtn[b].setAttribute("disabled", true);
      }
  }

  appendRobImage=(picNum)=> {
    let robWrap = document.getElementsByClassName('bet-rob-image-wrap')[0];
    robWrap.innerHTML = '';
    robWrap.appendChild(this.state.robImages[picNum]);
    this.setState({picNum:picNum});
  }

  setImageSource = (ingNum)=> {
    let robosh = document.getElementsByClassName('bet-robot-image')[0];
    robosh.src = robSources[ingNum];
  }

  screenZeroStyle=()=> {
      /* return the original behavior of the buttons (Enable) */
      this.enableAllBtns();
      this.setImageSource(8); // on next question //

      //this.appendRobImage(0);
      this.setState({fired:''});// remove class from spanOk
      this.setState({picNum:0});// reset picture to default
  };

  sayQuestion=(question)=>{
      let lang = 'en-US';
      const utterance = new SpeechSynthesisUtterance(question);
	    utterance.lang = lang;
	    utterance.volume = 1;
	    utterance.Pitch = 1.8;
	    utterance.rate = 0.7;
      question = question.replace(/_/g,"").trim();
      utterance.text = question;
	    window.speechSynthesis.speak(utterance);
  }


  nextQuestion=()=> {
      this.stopTimer();
      this.screenZeroStyle();

      let quest_id = this.state.quest_id;
      quest_id = quest_id + 1;
      //alert(quest_id);
      this.setState({quest_id:quest_id});
      let betArray = this.state.betArray;

      if(this.state.betArray[this.state.quest_id] !== undefined) {
          if (!this.state.timeFreezed) { // user pushed timeFreezer, now swithed off
            this.startTimer();
            let timeBtn = document.getElementsByClassName('bet-time-freezer')[0];
            timeBtn.removeAttribute('disabled');
            timeBtn.style.cursor = 'pointer';
          }
          let answer = betArray[quest_id].answer;
              answer = answer.toLowerCase();
          let question = betArray[quest_id].question;
          let ansArr = answer.split("");
          let length = answer.length;
          let guessArr = new Array(length+1).join('_').split('');

          /* ----| question animation code |---- */
          let betQuestText = document.getElementsByClassName('bet-question-text')[0];
          console.log(question.length+ ' q-length');
          if (question.length > 75) {
            betQuestText.style.fontSize = '1.5vw';
          }else if(question.length > 60) {
            betQuestText.style.fontSize = '2vw';
          }
          betQuestText.classList.add("animated", "rubberBand");
          setTimeout(function() { betQuestText.classList.remove("animated", "rubberBand"); }, 1200);
          //setTimeout(()=>{ this.sayQuestion(question); },80); // pronounce the question

          /*--| set default rob's image R.I. |--*/


          this.setState({quest_id: quest_id});
          this.setState({length: length});
          this.setState({ansArr: ansArr});
          this.setState({answer: answer});
          this.setState({question: question});
          this.setState({guessArr: guessArr});
      } else {
          /* -- | play-again |-------
          setTimeout(this.gameOver , 2000);
          this.gameOverContext();
           ----| play again |--------*/
           setTimeout(this.gameEnd, 2000);
           this.setState({picNum:7});
           this.disableAllBtns();
      }
  }

  setGameData=(data)=> {
      /* 1.  set back-end data and call first question */
      /* 2.  preload robosh steps-images  */
      /* 3.  prepare time-and-score limits for Ending-game */
      // console.log('-- into set-game-data ---');

      // answers-n-question.
      let arrData = [];
      for (var ans in data) { // convert to array
        if (data.hasOwnProperty(ans)) {
          arrData.push(data[ans]);
        }
      }
      console.log(arrData);

      // load robosh-images
      let robImages = [];
      for (let i = 0; i < robSources.length; i++) {
        let img = new Image();
        img.src = robSources[i];
        img.alt = 'step_'+i;
        img.classList.add('bet-robot-image');
        robImages[i] = img;
      }
      //console.log(robImages);


      /* calculate coins range */
        let allAnswersString ='';
        for(var bindex in arrData) {
          if(arrData[bindex].answer) {
            allAnswersString += arrData[bindex].answer;
          }
        }

        let minCoins = (allAnswersString.length)*20;
        // bindex = is a count of questions
        let lowBonus = bindex*20;
        let middleBonus = bindex*30;
        let highBonus = bindex*40;

        let lowCoins = minCoins + lowBonus; //window.alert(lowCoins);
        let middleCoins = minCoins + middleBonus; //window.alert(middleCoins);
        let highCoins = minCoins + highBonus; //window.alert(highCoins);
        this.setState({lowCoins:lowCoins});
        this.setState({middleCoins:middleCoins});
        this.setState({highCoins:highCoins});

        this.setState({betArray:arrData});
        this.setState({robImages: robImages});

        if (data.demo_alph) {
          this.setState({ showDemo: false });

        }else{
          this.setState({ showDemo: true });

        }
        this.nextQuestion();
      /* end -calculate coins range */
  };


  changeShowDemo =(demoState)=>{
    this.setState({ showDemo:demoState});
    //let demo_config = this.start_game =(false,this.props.userProfile.uid,2);
    //console.log(demo_config);
    this.startTimer();
  }

  componentWillUnmount() {
      this.pauseTimer();
      window.document.removeEventListener('keypress', this.keyboardHandle);
  }

  goToLevelList = () =>{
     this.props.backTo(false);
  };
    /*
  goToGamelist = () => {
          let gg = this.state.gameContinue;
          for (let j=0 ; j<=gg.length-1; j++) {
           if ( gg[j].mark === '0' ) {
                 if (gg[j].game_id !== this.props.gameID ) {
                     this.props.data(gg[j].type,gg[j].game_id);
                 }
            }
          }
  };



 showOverallPoints=()=> {
    const {star} = this.state;
    if(!star) return null;

    return (
            <div>
              <OverallPointsUnity  starNum={this.state.star} points={this.state.coins} ranks={this.state.rank} />
            	 <div>
               <button className="button_green" style={{padding: '10px 32px 10px 32px'}} onClick={this.retryFromPanel} > Retry</button>
            	 {this.props.count_mark >0?<button className="button_orange" onClick={this.goToGamelist}> Continue /next game/</button>:
            		 this.props.self_mark >0?this.state.star>=1?<button className="button_orange" onClick={this.goToLevelList}> Continue /next lesson/ </button>:
                 <button className="button_orange" style={{margin: ' 0  0 0 30% ', opacity: '0.3', cursor: 'no-drop'}}> Continue... </button>:
                 <button className="button_orange" onClick={this.goToLevelList}>Continue /next Nelson/ </button>
            	 }
            	</div>
            </div>
          );
  }

  retryFromPanel=()=> {
      let coinsAspan = document.getElementsByClassName('bet-coins-a-span')[0];
      coinsAspan.innerText = '';
      this.disableAllBtns();
      this.setState({
        nArr:[],
        quest_id:0,
        scores:0,
        coins:0,
        seconds:0,
        elapsedTime:0,
        timeBonus:0,
        timeFreezed:false
      });
      let timeBtn = document.getElementsByClassName('bet-time-freezer')[0];
      timeBtn.removeAttribute('disabled');
      timeBtn.style.cursor = 'pointer';

      setTimeout(()=> {
          /!* --| set default rob's image R.I. |-- *!/
          this.appendRobImage(0);
          this.setState({ star: null });
          this.nextQuestion();
      }, 1000);
  }*/

  toggleSpecials=()=>{
    this.setState({
      isOpenSpecials: !this.state.isOpenSpecials
    });
  }

  // get from sock flag of game END, and set to parent's props //
  set_socket_game_end = (data) =>{
    // alert(data);
    this.props.g_over(data);
  }

  /* START zgushacum - Armine-part */
  //showHintMessage =()=>{
  showOpenMessage =()=>{
    this.setState({ show_info: true, show_open_info: true });
    this.props.showCoinsModalForHelp('Help5050');
  }

  showFreezeMessage =()=>{
    this.setState({ show_info: true, show_freeze_info: true });
    this.props.showCoinsModalForHelp('Help5050');
  }

  showVideoMessage =()=>{
    this.setState({ show_info: 'video', show_video_info: true });
    this.props.showCoinsModalForHelp('Help5050');
  }


  closeBlackBackground = (e) => {
    if (e === 'close') {
        let it = this;
        setTimeout(() => {
                let coins_blank = document.getElementById('blank_coins');
                coins_blank.classList.add("animated", "fadeOut");
                setTimeout(() => {
                    it.props.showCoinsModalForHelp('');
                    this.setState({
                        show_info: false
                    });
                }, 200)
            }, 200
        )
    }
  };

    show=(e)=>{
        this.setState({
            show_info:false
        });

        if(e==='price_blank'){

            setTimeout(()=>
                {
                    let price_blank=document.getElementById('blank');
                    price_blank.addEventListener('click',function(){
                        price_blank.classList.add("animated", "fadeOut");
                        setTimeout(()=>{

                            this.props.togglePriceTable(false)
                        }, 600)
                    })
                },600
            )
        }
        else if(e ==='coins_blank' ){
            let it=this;
            setTimeout(()=>
                {
                    let coins_blank=document.getElementById('blank_coins');
                    coins_blank.addEventListener('click',function(){
                        coins_blank.classList.add("animated", "fadeOut");
                        setTimeout(()=>{
                            it.props.showCoinsModal('');

                        }, 600)
                    })
                },600
            )

        }
    };

    PayDiamondForHelp5050 =()=> {

        if (this.state.show_open_info) {

         this.fetchDiamonds(this.openCallBack);
         this.setState({ show_open_info:false });

        }else if (this.state.show_freeze_info) {

         console.log('time-----freeze');
         this.fetchDiamonds(this.timeCallBack);
         this.setState({ show_freeze_info:false });

        }else if (this.state.show_video_info) {

         this.fetchDiamonds(this.videoCallBack)
         this.setState({ show_video_info:false });
        }

        this.setState({
           show_info: false,
           takeDiamond:true
        });
        this.props.showCoinsModalForHelp('');

    };



  /* END zgushacum - Armine-part */

  render() {

    // console.log('<<-----render ---->>');
    let betArray = this.state.betArray;
    let robImages = this.state.robImages;
    let picNum = this.state.picNum;

    // console.log('189-picNum-->',this.state.picNum);
    // console.log(`answer is: ${this.state.answer}`);
    // console.log(`question is: ${this.state.question}`);

    // CSS -styles -----
    let fired = this.state.fired; // for guessed word
    // console.log(fired);

    let openStyle = openNormalStyle;
    if(this.state.openHover) {
      openStyle = openHoverStyle;
    }

    let freezeStyle = freezeNormalStyle;
    if(this.state.freezeHover) {
      freezeStyle = freezeHoverStyle;
    }

    let lessonStyle = lessonNormalStyle;
    if (this.state.lessonHover) {
      lessonStyle = lessonHoverStyle;
    }
    //-------CSS-END--||
    //this.keyboardHandle();


    // let showGame = gameBackStyle;
    // if(this.state.star) {
    //     showGame = {display:'none'};
    // }


    let showKeyboard = {display: 'inline-block'};
    let showSpecials = {display: 'none'};
    if(this.state.isOpenSpecials){
      showKeyboard = {display: 'none'};
      showSpecials = {display: 'inline-block'};
    }
    // <span className="grow-step">+20</span>
    // <img src={require('./images/image'+ picNum +'.png')} alt="image1" className="bet-robot-image"/>
    // <img src={image0} alt="image1" className="bet-robot-image"/>

      //{this.showOverallPoints()}  style={showGame}
      let showDemo = this.state.showDemo;
      if(showDemo) {
        this.pauseTimer();
      }
      // <div className='himnakan'></div>}
      // imgunWidth={this.state.imgunWidth} imgunHeight={this.state.imgunHeight}

    return(
      <div className="bet-wrap">
      <FetchNver
          sendGameData = {this.setGameData}
          gameId={this.props.gameId}
          unique_id = {this.props.userProfile.uid} />

        { (this.props.multi )?


        <Socketclient
            multi={this.props.multi}
            userId={this.props.userId}
            gameId={this.props.gameId}
            level={this.props.level}
            fromSocketToLevelList={this.goToLevelList}
            game={this.props.game}
            count_mark = {this.props.count_mark}
            self_mark = {this.props.self_mark}
            lessonLink = {this.props.lessonLink}
            course_Name = {this.props.course_Name}
            data = {this.props.data}
            g_over = {this.set_socket_game_end} />
            :


          <div className="single-mode">

              { ( !robImages || !betArray ) ?
              <span>Loading...</span> :
              <div className="check-demo">
                  {showDemo?<BetDemo unique_id={this.props.userProfile.uid} takeGameData = {betArray} closeShowDemoState = {this.changeShowDemo} />:
                  <div className='not-demo'>

                    <div className="single-window" style={gameBackStyle}>
                      <h2 className="bet-question" onClick={this.getImageSizes}>
                          <span className="bet-question-text"> {this.state.question} </span>
                      </h2>

                      <AudComponent ref="audioChild"/>

                      <div className="bet-user-space">
                          <div className="bet-this-user">


                              <SmallFire ref='smallFireChild'/>
                              <span className="bet-user-name"> answer -> {this.state.answer}</span><br/>
                              <span className="bet-rob-image-wrap">
                                  <img src={gifStaticPos} alt="image1" className="bet-robot-image" />
                              </span>
                              <div className="bet-scores">
                                  <span className="bet-score-image"></span>
                                  <span className="bet-coins-count">
                                    <span className="bet-coins-a-span">{/*this.state.coins*/}</span>
                                        <span className="divider"> / </span>
                                    <span className="bet-score-a-span">{this.state.scores} <span className="grow-step"></span> </span>
                                        <span className="divider"> / </span>
                                    <span className="bet-time-a-span">time bounses +{this.state.timeBonus}</span>
                                   </span>
                              </div>
                          </div>

                          <div className="bet-round-and-timer">
                              <div className="bet-roud">Rounds:</div>
                              <div className="bet-timer">
                                <MyClock
                                    sec = {this.state.seconds}
                                    timeLimit = {this.state.timeLimit}
                                />
                              </div>

                                <div className="bet-helpers">
                                  <button className="bet-let-opener bet-helper-btn" onClick={this.showOpenMessage}
                                                  style={openStyle}
                                                  onMouseOver={this.onOpenHover}
                                                  onMouseOut={this.onOpenOut}>
                                                  Open Letter
                                  </button>

                                  <button className="bet-time-freezer bet-helper-btn" onClick={this.showFreezeMessage}
                                                  style= {freezeStyle}
                                                  onMouseOver = {this.onFreezeHover}
                                                  onMouseOut =  {this.onFreezeOut}>
                                                  Freeze Time
                                  </button>

                                  <button className="bet-lesson-viewer bet-helper-btn" onClick={ this.showVideoMessage }
                                                  style={lessonStyle}
                                                  onMouseOver = {this.onLessHover}
                                                  onMouseOut = {this.onLessOut}>
                                                  Lesson Fragment
                                  </button>

                                </div>

                          </div>
                      </div>

                      <div className="bet-word-space">
                            <span className="guess">
                              <span className={fired?'fired':'not-fired'}>{this.state.guessArr}</span>
                            </span>
                      </div>

                      {/* game-foot */}
                      <div className="game-foot">
                          <div className="bet-more-btn-wrap">
                            <button className="bet-special-simbols" onClick={this.toggleSpecials}>?123.</button><br/>
                            <button className="bet-exit-game"       onClick={this.goToLevelList}>exit</button><br/>

                            <button onClick= {this.startTimer} style={{color:'black',padding:'2px 6px'}} className="bet-exit-game">t-start</button>
                            <button onClick= {this.pauseTimer} style={{color:'black',padding:'2px 6px'}} className="bet-exit-game">t-pause</button>
                          </div>

                          <div className="bet-specials" onClick={this.handleClick} style={showSpecials}>
                            <Simbols/>
                          </div>

                          <div className="bet-keyboard" onClick={this.handleClick} style={showKeyboard}>
                            <Keyboard />
                          </div>

                          <span className="mouse-and-ads">
                              <span className="mouse" style={mouseStyle}></span>
                              <span className="wrap-watch-ads" style={{display:'none'}}>
                                  <MuiThemeProvider>
                                      <ModalDialog userId = {this.props.userId}/>
                                  </MuiThemeProvider>
                              </span>
                          </span>
                      </div><span>game-footer</span>

                      {/* single-window */}
                    </div>

                  {/*not-demo*/}
                  </div>}
              {/*check-demo*/}

              </div>}
          {/* single-mode */}

          </div>}


      {/* bet-wrap */}


      {/* zgushacum */}
      {this.state.show_info ?
        <span className="animated fadeIn">
            <PayForCoins close={this.closeBlackBackground} show_price_blank ={this.show}
            PayDiamondForHelp5050={this.PayDiamondForHelp5050}/>
        <div className="price_back" id="blank_coins" style={{top: '0', left: '0'}}></div></span> : ''
      }



      {/* The Lesson-Fragment-Modal  */}
      <LessonFragmentModal/>


      </div>
    );
  }
}

const store = state => ({
    menuState:state.menu,
    userProfile: state.userProfileData,
    getDiamonds:state.currentDiamonds
});

const dispatch = dispatch => ({
  addUserDiamonds : newState => {
      dispatch({type:'CHANGE_DIAMONDS',payload:newState});
  },
  gotogamelist: tabIndex => dispatch({type:'GOTO_GAMELIST', payload: tabIndex }),
  showCoinsModalForHelp: newState => {
        dispatch({type: 'TOGGLE_COINS_FIRST_MODAL', payload: newState});
    },
});

export default connect(
    store,
    dispatch
)(BetGame);
