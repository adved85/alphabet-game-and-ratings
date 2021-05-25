/* Socket-client: multiplayer */
import React from 'react';
import './styles/SocketClient.css';
import SocketcIO from 'socket.io-client';
import FetchNver from './FetchNver';
import MyClock from './MyClock';
//import './styles/BetStyles.css';
import './styles/LessonFragment.css';
import './styles/animate.css';
import FlatButton from 'material-ui/FlatButton';
import OverallPointsUnity from '../notepadGame/points_for_ unity';

import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ModalDialog from './ModalDialog';

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
import gifFalseWord from './images/false_word_fast.gif';
import gifStaticPos from './images/static.gif';
import gifTrueLett from './images/let_true_fast_noloop.gif';
import gifFalseLett from './images/let_false_fast_noloop.gif';
//import gifTrueLett from './images/nocam_true.gif';

import SmallFire from './SmallFire';
import './styles/SmallFire.css';
import AudComponent from './AudComponent';

import RCprogressLeft from './RCprogressLeft';
import RCprogressRight from './RCprogressRight';

/* modal-message-zgushacum */
import '../after_demo';
import PayForCoins from '../../use_coins';

import Simbols from './jsx_components/Simbols';
import Keyboard from './jsx_components/Keyboard';
import LessonFragmentModal from './jsx_components/LessonFragmentModal';
import HelperButtons from './jsx_components/HelperButtons';


const gameBackStyle = {
  backgroundImage: `url(${ betBackImg })`
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
  gifFalseLett,
  gifFalseWord
];

let scores = 0;
let client_id = null;
let prefix = Math.random().toString(36).substr(2, 5) + "_ID_";
let socket;
let component_was_unmounted = false;

let chRooms = null;

class Socketclient extends React.Component {
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
            showPanel:false,

            openHover:false,
            freezeHover: false,
            lessonHover: false,
            timeFreezed:false,
            diamonds:null,


            /* multi-mode */
            endpoint: "https://194.135.81.127:55263/", //"https://omegacoding.com/", //endpoint: "http://localhost:7000/",
            //Uname:"uid__" + (this.props.userId).replace(".",""),
            Uname: prefix + (this.props.userId).split(".")[1],
            //Uname: prefix + (this.props.userProfile.firstname),
            showSearchBtn: false,
            sendMsgBtn: false,
            theySeeEachOther: false, // emit("console", '<- has joined room ->')
            thisDots:0,
            replayRequest: false,
            user_level: this.props.lock,



            // opponent //
            pair: null,
            thisUser: null,
            thatUser: null,
            thatpicNum: 0,
            thatGuessArr:[],
            thatDots:0,

            freeRoomsItems : null,
            search_interval_id: 0,

            /* from gameList */
            gameContinue:[],
            rank:null,

            /* zgushacum */
            show_info:false,
            show_open_info:false,
            show_freeze_info:false,
            show_video_info:false,

            showDemo: true,

        };
    }

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

    /*  for socket-connection */
    componentDidMount() {

        let see_my_socket_id = document.getElementsByClassName('see-my-socket-id')[0];
        let messages_from_server = document.getElementsByClassName('messages-from-server')[0]; // socket_server-msg 6.10.2018

        const {endpoint} = this.state;
        socket = SocketcIO.connect(endpoint, {'forceNew':true }); //

        // no-connection ------------------- 6.10.2018 == or == -- if (socket.connected) {}
        socket.on('connect_error', ()=> {
          console.log('Conn error');
          see_my_socket_id.innerHTML = 'There is a problem with server connection. Please, try later or contact with Admin!';
        })


          // successfully connected with socket-server //
        //console.log(' ham sirunes ham sirumes');
        socket.on("connect", ()=> {
            client_id = null; // ----------- 06.10.2018
            client_id = socket.id;
            console.log(`socket on connection ---- ${socket.id}`);
            //this.setState({showSearchBtn: true});
            this.setState({sendMsgBtn: true});
            socket.emit("adduser", this.state.Uname, this.props.gameId, this.props.userProfile.firstname, this.props.lock);

            // adduser-ի պատասխան //
            socket.on('showSearchBtn', (user_adding_success)=>{

                console.log('user_adding_success ================================', user_adding_success);
                let search_interval_id = setInterval(()=> {
                  socket.emit("searchRoomEvent", client_id);
                } ,2500)
                this.setState({
                  search_interval_id: search_interval_id
                });
                //socket.emit("searchRoomEvent", client_id);

            })
            //let see_my_socket_id = document.getElementsByClassName('see-my-socket-id')[0];
            see_my_socket_id.innerHTML = client_id;
        });


        // ընտրովի խաղ //

        socket.on("otherLevelFreeRooms", (choiceData)=>{
          console.log('levels are different <<<<<<<<<<<<<<<<<<<<<');
          console.log('<--- see all free rooms at this moment "choiceRooms"--->');

          console.log(Object.prototype.toString.call(choiceData));
          console.log(choiceData);
          let choiceRooms = choiceData.choiceData;
          console.log(choiceRooms);



          if (choiceRooms.length) {

            let playerUL = document.getElementsByClassName('free-rooms-ul')[0];
            let freeRoomsItems = choiceRooms.map((freeOne)=>{
              return(
                // 1) react_id:{freeOne.name}
                // 2) socket_id:{freeOne.id}
                // 3) react_name:{freeOne.realyName }
                // 4) level:{freeOne.level }
                // <button className="choice-btn" >join</button>
                // <span className="span-space"> id : { freeOne.id } </span>

                <li key={freeOne.name} className='free-room-elem' data-conn-id={freeOne.id}>
                  <span className="span-space"> name : {freeOne.realyName } </span>
                  <span className="span-space"> level :{ freeOne.level } </span>
                </li>
              )
            })
            this.setState({ freeRoomsItems: freeRoomsItems });
            this.add_room_elem_listener();
              messages_from_server.innerHTML = '';
          }else{
            this.setState({ freeRoomsItems : null });
            messages_from_server.innerHTML = 'No one on server. ';
          }


        })

        this.add_room_elem_listener=()=>{
          let room_elems = document.getElementsByClassName('free-room-elem');
          for (var i = 0; i < room_elems.length; i++) {
            let opponent_connect_id = room_elems[i].getAttribute('data-conn-id');
            room_elems[i].addEventListener('click', ()=>{

              //alert('hey')
              console.log(opponent_connect_id);
              socket.emit("users_choice", client_id, opponent_connect_id);
            })
          }
        }

        /* search-and-join to room */
        this.handleSearch=(e)=> { // search empty room
            e.preventDefault();
            // let search_interval_id = setInterval(()=> {
            //   socket.emit("searchRoomEvent", client_id);
            // } ,1000)
            // this.setState({
            //   search_interval_id: search_interval_id
            // });
            // socket.emit("searchRoomEvent", client_id);
        };

        socket.on("prepareToJoin", (flag)=> {
            if(flag === 1) {
                socket.emit("attemptToJoin", client_id);
            }
        });

        socket.on("onJoin", (data) => { // into attemptToJoin; emit-in-room
            let pair = data.pair;
            let thisUser =null;
            let thatUser =null;
            pair.map(user=>{
              if(user.id === client_id)
                  { thisUser = user; }
              else{ thatUser = user; }
            });
            if (data.joining === true)  {
                this.setState({
                  theySeeEachOther:true,
                  thisUser: thisUser,
                  thatUser: thatUser,
                  pair: pair
                });
                clearInterval(this.state.search_interval_id);
            }

            console.log(data);
            console.log(thisUser);
            console.log(thatUser);
        });

        /* send and receive messages */
        this.handleMessage=(e)=> {
            socket.emit("sendChat", 'test message');
        };
        socket.on("console", (msgToRoom)=> {
            console.log('console--->',msgToRoom);
        });

        socket.on("receiveChat",(sendedChat)=> {
            console.log('sendedChat before any filtering --> ', sendedChat);
            if (sendedChat.hisLetter === false) {
              // opponent: false letter
              if(sendedChat.gameState === 'prepareToGameEnd') {
                //alert(sendedChat.hisCoins);
                this.setState({ coins: this.state.coins + sendedChat.hisCoins });
                setTimeout(this.gameEnd, 1740);
                this.disableAllBtns();
                this.pauseTimer();
              }
              let thatpicNum = sendedChat.hisPicNum;
              //this.appendThatRobImage(thatpicNum);
              this.setImageSource2(10);
              this.setImageSource(8);  /* քանի որ ռենդեռա լինում, բոլոր նկարները update են լինում: */
              this.setState({ thatpicNum : thatpicNum });
              this.refs.progressRighChild.addProgress();
            }
            else if(sendedChat.hisLetter === true) {

                let hisGuessArr = sendedChat.hisGuessArr;
                this.replaceToSimbols(hisGuessArr);
                if(sendedChat.gameState === 'sameQuestion') {

                  //this.setState({ thatGuessArr: hisGuessArr });
                  let that_word_space = document.getElementsByClassName('that-word-space')[0];
                  that_word_space.innerHTML = hisGuessArr.toString().replace(/,/g,'');;
                  // console.log('hisGuessArr 2 -> ', hisGuessArr);
                }else if (sendedChat.gameState === 'turnQuestion') {

                  let that_word_space = document.getElementsByClassName('that-word-space')[0];
                  that_word_space.innerHTML = hisGuessArr.toString().replace(/,/g,'');;
                  this.setState({
                    //thatGuessArr: hisGuessArr,
                    thatDots: this.state.thatDots + 1,
                  });
                  this.setImageSource(11);
                  setTimeout(this.nextQuestion ,3350);
                  this.disBatPauseFire();
                }else if (sendedChat.gameState === 'prepareToGameEnd') {
                  let that_word_space = document.getElementsByClassName('that-word-space')[0];
                  that_word_space.innerHTML = hisGuessArr.toString().replace(/,/g,'');;
                  this.setState({
                    //thatGuessArr: hisGuessArr,
                    thatDots: this.state.thatDots + 1,
                  });
                  socket.emit('thatUserProgress',{
                    thatUser: {
                      'client_id':client_id,
                      'that_coins':this.state.coins,
                      'that_Dots':this.state.thisDots,
                      'room_id':this.state.pair[0]
                    }
                  });
                  //alert(`${sendedChat.gameState} : you lose`);
                  //setTimeout(this.gameEnd, 2000);
                  this.disBatPauseFire();
                }
            }

            else if (sendedChat.hisLetter ==='time_is_overed') {
              if(sendedChat.gameState ==='turnQuestion') {
                setTimeout(this.nextQuestion ,3350);
                this.disBatPauseFire();
              }
            }
        });
        socket.on('onGameEnd', sendedChat=>{
          console.log(sendedChat);
          if(sendedChat.client_id === this.state.thisUser.id) {
            console.log(sendedChat.allCoins);
            this.setState({
              coins: sendedChat.allCoins
            });
             // disconnect from server //
            setTimeout(this.gameEnd, 2700);
            //setTimeout(function() { socket.disconnect(client_id); }, 3000);
          }
        })
        socket.on('replay', data=> {
          let reqMsg = document.getElementsByClassName('request-msg')[0];
          if(data.req === 'whould_you_like_to_play_again') {
            this.setState({ replayRequest:true });
            reqMsg.innerHTML = 'Opponent want to play again. Push "Replay" If you want too..';
          }else if(data.res === 'i_want_too') {
            reqMsg.innerHTML = 'Attention, the game will start in 2 seconds.';

                setTimeout(()=> {
                    // --| set default rob's image R.I. |-- //
                    //this.appendRobImage(0);
                    this.setImageSource(8);
                    this.setImageSource2(8); // render all
                    this.setState({ showPanel: false, quest_id:0 });
                    this.nextQuestion();
                }, 2000);

          }
        })

        socket.on('receiveUnmount', (unmountedPartner) => {
          if (unmountedPartner.listenUnmount === true) {
              console.log('opponent has unmounted');
              console.log(unmountedPartner);
              // console.log(unmountedPartner.playerInfo);
              // console.log(unmountedPartner.userInfo);
              this.setState({ coins: this.state.coins + unmountedPartner.playerInfo.this_coins });
              setTimeout( this.gameEnd, 10);
              this.disableAllBtns();
              this.pauseTimer();
          }
        });

        socket.emit("disconnect", socket.id);
        socket.on("page_reloaded",(whoWent) => {
          //alert('page was reloaded and ${whoWent} is went');
          console.log("||---->> page_reloaded: see whoWent----> ", whoWent);

          //window.location.reload();
          //alert('parner is disconnected');
        });
        /**OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO**/
        /**oooooooooooooooooooooooooooooooooooooooooooooooooo**/
        this.replaceToSimbols=(hisGuessArr)=> {
          var str="&#10004";
          var str_esc=escape(str);
          var ch = unescape(str_esc);
            for (let a = 0; a < hisGuessArr.length; a++) {
              if(hisGuessArr[a] !== "_") {
                //hisGuessArr[a] = "$";
                hisGuessArr[a] = ch;
              }
            }
        };
        this.disBatPauseFire=()=>{
          this.setState({fired:'fired'});
          this.setState({nArr:[]});
          this.disableAllBtns();
          this.pauseTimer();
        }
        this.generalLogic=(keyBtn, n)=> {
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
                            socket.emit(
                              "letterFlag", {
                                hisLetter: true,
                                hisGuessArr: guessArr,
                                gameState: 'sameQuestion'
                            });
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
                              this.setImageSource2(8); // render all
                              this.refs.audioChild.playYes();


                        }

                  } else {
                        // false-letter

                        let picNum = this.state.picNum + 1;

                        if(picNum < 6){
                            /* ---| question Animation |--- */
                            socket.emit(
                              "letterFlag", {
                                hisLetter: false,
                                hisPicNum: picNum
                            });
                            let betQuestText = document.getElementsByClassName('bet-question-text')[0];
                            betQuestText.classList.add("animated", "shake");
                            setTimeout(function() { betQuestText.classList.remove("animated", "shake"); }, 400);
                            this.setState({picNum:picNum});


                        }else{
                            //Game Over: LOSE
                            /* ---| for play-again |----
                            setTimeout(this.gameOver , 2000); // bad answer limits
                            this.setState({picNum:picNum+1});
                            this.gameOverContext();
                            ------| play-again |---- */
                            socket.emit(
                              "letterFlag", {
                                hisLetter: false,
                                gameState: 'prepareToGameEnd',
                                hisCoins: this.state.coins,
                                hisPicNum: picNum

                            });

                            this.setState({ coins:0 });
                            setTimeout(this.gameEnd, 2000);
                            this.disableAllBtns();
                            this.pauseTimer();
                        }
                        /*--| change rob's image |-- */

                        //this.appendRobImage(picNum);
                        this.setImageSource(10);
                        this.setImageSource2(8); // render all
                        this.refs.audioChild.playNop();
                        this.refs.progressLeftChild.subtractProgress();

                        /* --false-keyBtn-styleing-- */
                        keyBtn.style.background = 'rgb(251, 218, 162)';//'orange';
                        keyBtn.style.color = 'red';

                        /* ---| robot's picture animation |--- */
                        // let robosh = document.getElementsByClassName('bet-robot-image')[0];
                        // robosh.classList.add("animated","wobble");
                        // setTimeout(function() { robosh.classList.remove("animated","wobble") }, 250);

                        console.log('98-this - picNum state-->',this.state.picNum);
                        console.log('98-that - picNum state-->',this.state.thatpicNum);
                        console.log('98-picNum let-->',picNum);
                  }
                  /** END - check letter/../../ -------- */

                  /* START compare length of anwer-&-guess
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
                            this.setState({ thisDots: this.state.thisDots + 1 });
                            socket.emit(
                              "letterFlag", {
                                hisLetter: true,
                                hisGuessArr: guessArr,
                                gameState: 'turnQuestion'
                            });

                            this.setImageSource(7);
                            this.setImageSource2(8); // render all
                            setTimeout(this.nextQuestion ,3600);
                            this.refs.smallFireChild.startFire();
                            setTimeout(this.refs.smallFireChild.stopFire,2550);



                        } else {
                            // End of Game
                            this.setState({ thisDots: this.state.thisDots + 1 });
                            socket.emit(
                              "letterFlag", {
                                hisLetter: true,
                                hisGuessArr: guessArr,
                                gameState: 'prepareToGameEnd'
                            });

                            socket.emit('thisUserProgress',{
                              thisUser: {
                                'client_id':client_id,
                                'this_coins':coins,
                                'this_Dots':this.state.thisDots+1,
                                'room_id':this.state.pair[0]
                              }
                            });
                            //alert('game-end: you win');
                            //setTimeout(this.gameEnd, 2000);

                        }
                      this.disableAllBtns();
                      this.setState({fired:'fired'}); // add class for spanOk(color)
                      this.setState({nArr:[]}); // to empty n-array for the next question
                      this.pauseTimer();
                  } /* END compare length ----------- */
              } /* if(d !==-1) */
        } // generalLogic()
        this.nextQuestion=()=> {
            if (component_was_unmounted !== true) {
              this.stopTimer();
              this.screenZeroStyle();
              this.refs.progressLeftChild.resetProgress();
              this.refs.progressRighChild.resetProgress();

              let quest_id = this.state.quest_id;
                  quest_id = quest_id + 1;
              this.setState({quest_id:quest_id});
              let betArray = this.state.betArray;

              if(this.state.betArray[this.state.quest_id].question !== undefined) {
                  if (!this.state.timeFreezed) { // user pushed timeFreezer, now switched off
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
                  let thatGuessArr = new Array(length+1).join('_').split('');

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
                  //this.setState({ thatGuessArr: thatGuessArr });
                  let that_word_space = document.getElementsByClassName('that-word-space')[0];
                  that_word_space.innerHTML = thatGuessArr.toString().replace(/,/g,'');

              } else {
                  /* -- | play-again |-------| openHelper | --
                  setTimeout(this.gameOver , 2000);
                  this.gameOverContext();
                   ----| play again |--------*/
                   setTimeout(this.gameEnd, 2000);
                   this.setState({picNum:7});
                   this.disableAllBtns();
              }
            }
        }
        this.retryFromPanel=()=> {
          if (this.state.replayRequest === false) {
            socket.emit('replay',{req:'whould_you_like_to_play_again'})
          }else {
            socket.emit('replay', {res:'i_want_too'});
            //this.setState({ replayRespons: true });
          }
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
              timeFreezed:false,
              star:null,
              thisDots:0,
              thatDots:0
            });
            let timeBtn = document.getElementsByClassName('bet-time-freezer')[0];
            timeBtn.removeAttribute('disabled');
            timeBtn.style.cursor = 'pointer';

        }
        this.gameEnd=()=> {
            this.pauseTimer();
            let currCoins = this.state.coins;

            let star = '';
            if(currCoins === 0) {
              star = 0;
            }else if(currCoins <= this.state.lowCoins) {
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
            // let getRaiting = `unique_id=${encodeURI(this.props.userProfile.uid)}&level=${this.props.level}
            //       &course_name=${this.props.course_Name}&mark=${star}
            //       &points=${currCoins}&operation=5&game_id=${this.props.gameId}`;
            //       fetch(`http://nver.am/android_test/userProgressManager.php`,{
            //           method:'POST',
            //           headers:{"content-type": "application/x-www-form-urlencoded",'Accept':'application/json'},
            //           body:getRaiting
            //       }).then(response => {
            //           if(response.ok){
            //               return response.json()
            //           }
            //       }).then(response => {
            //           this.setState({rank: response.rank});
            //       });
            //
            //   this.setState({ star: star });  // if star-state isn't 'null' showing 'OverallPointsUnity'-component.
            //   this.setState({ coins: currCoins });
              this.props.g_over(currCoins);
              //this.setState({showPanel: true});
              /* window.alert(` high - ${this.state.highCoins} \n
             midd - ${this.state.middleCoins} \n
              low - ${this.state.lowCoins} \n
              You have ${currCoins} coins. \n
              You have ${star} star. `); */
              // console.log('\\\\----------outer-props loging below ----------///');
              // console.log("this.props.userProfile.uid-->> ", this.props.userProfile.uid);
              // console.log("this.props.level-->> " , this.props.level);
              // console.log("this.props.course_Name-->> ", this.props.course_Name);
              // console.log("this.props.gameId-->> ", this.props.gameId);
              // console.log("this.props.count_mark-->> ", this.props.count_mark);
              // console.log("this.props.self_mark-->> ", this.props.self_mark);
              // console.log("this.props.data-->>", this.props.data);
              // console.log("this.props.game-->> ", this.props.game);
              // console.log("this.props.data--> ", this.props.data);
              // console.log("this.props.lessonLink--> ", this.props.lessonLink);
              // console.log("this.state.gameContinue-->> ", this.state.gameContinue);
        }

        // for keypress //
        window.document.addEventListener('keypress', this.keyboardHandle);
        window.addEventListener("beforeunload", this.onUnload)


} // END componentDidMount()

onUnload=(event)=> { // the method that will be used for both add and remove event
       //console.log("hellooww")
       //console.log(event)
       //event.returnValue = "Hellooww"
       component_was_unmounted = true;
       console.log('my component is unmount --------------here.');
       let theySeeEachOther = this.state.theySeeEachOther;
       if(theySeeEachOther) {
           socket.emit('componentWillUnmount',{
               listenUnmount: true,
               playerInfo: {
                   this_coins: this.state.coins,
                   this_Dots: this.state.thisDots,
                   client_id: client_id,
                   //client_id: this.state.thisUser.id,
                   room_id: this.state.pair[0]
               },
               userInfo:this.state.thisUser
           });
       }else {
         console.log(' User gone before joining --------------- without emiting "componentWillUnmount". ');
       }

       socket.disconnect();
       this.disableAllBtns();
       this.pauseTimer();

       window.document.removeEventListener('keypress', this.keyboardHandle);
       window.removeEventListener("beforeunload", this.onUnload);

   }



componentWillUnmount() {

  component_was_unmounted = true;
  console.log('my component is unmount --------------here.');
  let theySeeEachOther = this.state.theySeeEachOther;
  if(theySeeEachOther) {
      socket.emit('componentWillUnmount',{
          listenUnmount: true,
          playerInfo: {
              this_coins: this.state.coins,
              this_Dots: this.state.thisDots,
              client_id: client_id,
              /*client_id: this.state.thisUser.id,*/
              room_id: this.state.pair[0]
          },
          userInfo:this.state.thisUser
      });
  }else {
    console.log(' User gone before joining --------------- without emiting "componentWillUnmount". ');
  }

  socket.disconnect();
  this.disableAllBtns();
  this.pauseTimer();

  window.document.removeEventListener('keypress', this.keyboardHandle);
  window.removeEventListener("beforeunload", this.onUnload);
}


// socket.emit('thisUserProgress',{
//   thisUser: {
//     'client_id':client_id,
//     'this_coins':coins,
//     'this_Dots':this.state.thisDots+1,
//     'room_id':this.state.pair[0]
//   }
// });

  handleClick=(event)=> {
    if(event.target.hasAttribute('name')) {
        //realy pushed button, no empty space into div
        let n = event.target.getAttribute("name"); //let n = event.target.innerText;
        let keyBtn = document.getElementsByName(n)[0];
        n = n.toLowerCase();
        /* ------------| General |----------------*/
        this.generalLogic(keyBtn, n);
    }
  };

  keyboardHandle=(event)=>{
    let n = event.key;
    let N = n.toUpperCase();
    let keyBtn = document.getElementsByName(N)[0];
    console.log(keyBtn);
    /* ------------| General |----------------*/
    if(keyBtn) { // prevent sending undefined instead of button //
      this.generalLogic(keyBtn, n);
    }

  }

/* gameEnd */
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
              setTimeout(this.nextQuestion ,3350);
              this.setState({fired:'fired'}); // add class for spanOk(color)
              this.setState({nArr:[]});

              // կետ
              socket.emit("console", client_id, 'barev axper jan');
              setTimeout(()=>{
                socket.emit(
                  "timeIsOver", {
                    gameState: 'turnQuestion',
                    hisLetter: 'time_is_overed',

                });
              },1)

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
  screenZeroStyle=()=> {
      /* return the original behavior of the buttons (Enable) */
      this.enableAllBtns();
      //this.appendRobImage(0);
      //this.appendThatRobImage(0);
      this.setImageSource(8); // on next question //
      this.setImageSource2(8);
      this.setState({fired:''});// remove class from spanOk
      this.setState({picNum:0});// reset picture to default
      this.setState({thatpicNum:0});// reset that-picture to default
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
      // console.log('arrData ', arrData);

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


        console.log('setGameData :=> true');
        // if (data.demo_alph) {
        //   this.setState({ showDemo: false });
        //
        // }else{
        //   this.setState({ showDemo: true });
        //
        // }
        component_was_unmounted = false;
        this.nextQuestion();
      /* end -calculate coins range */
  }
  componentWillMount() {
    this.setState({
      gameContinue:this.props.game
    });
  }

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
  goToLevelList = () =>{
     this.props.fromSocketToLevelList(false);
  };
  showOverallPoints=()=> {
    const {showPanel} = this.state;
    if(showPanel === false) return null;
    return (
            <div className="overall-points">
              <OverallPointsUnity  starNum={this.state.star} points={this.state.coins} ranks={this.state.rank} />
            	 <div className="overall-buttons">
               <div className="request-msg"></div>
               <button className="button_green" style={{padding: '10px 32px 10px 32px'}} onClick={this.retryFromPanel} > Replay</button>
            	 {this.props.count_mark >0?<button className="button_orange" onClick={this.goToGamelist}> Continue /next game/</button>:
            		 this.props.self_mark >0?this.state.star>=1?<button className="button_orange" onClick={this.goToLevelList}> Continue /next lesson/ </button>:
                 <button className="button_orange" style={{margin: ' 0  0 0 30% ', opacity: '0.3', cursor: 'no-drop'}}> Continue... </button>:
                 <button className="button_orange" onClick={this.goToLevelList}>Continue /next Nelson/ </button>
            	 }
            	</div>
            </div>
          );
  }

  // retryFromPanel cut from here //

  setImageSource = (imgNum)=> {
    // let robWrap1 = document.getElementsByClassName('bet-rob-image-wrap-1')[0];
    // let robosh = robWrap1.getElementsByClassName('bet-robot-image')[0];
    let rob1 = document.querySelector('#img1');
    rob1.src = robSources[imgNum];
    console.log('this image ---', rob1);
  }
  setImageSource2 = (imgNum)=> {
    // let robWrap2 = document.getElementsByClassName('bet-rob-image-wrap-2')[0];
    // let robosh = robWrap2.getElementsByClassName('bet-robot-image')[0];
    let rob2 = document.querySelector('#img2');
    rob2.src = robSources[imgNum];
    console.log('that image ---', rob2);
  }
  appendRobImage=(picNum)=> {
      let robWrap1 = document.getElementsByClassName('bet-rob-image-wrap-1')[0];
      robWrap1.innerHTML = '';
      robWrap1.appendChild(this.state.robImages[picNum]);
      this.setState({picNum:picNum});
  }
  appendThatRobImage=(thatpicNum)=>{
      let robWrap2 = document.getElementsByClassName('bet-rob-image-wrap-2')[0];
      //robWrap2.innerHTML = '';
      let img2 = document.createElement('IMG');
      let src2 = robSources[thatpicNum]; // for diff image-step

      img2.src = src2;
      img2.alt = 'step_'+thatpicNum;
      img2.classList.add('bet-robot-image');
      robWrap2.innerHTML = '';
      robWrap2.appendChild(img2);
      this.setState({thatpicNum:thatpicNum});
  }
  toggleSpecials=()=>{
    this.setState({
      isOpenSpecials: !this.state.isOpenSpecials
    });
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

    console.log('show props ---------------------');
    console.log('lock from redux ------>', this.props.lock);
    console.log('user_level- as a state -0 ', this.state.user_level);



    const Uname = this.state.Uname;
    const seeEachOther = this.state.theySeeEachOther;
    const searchBtn = this.state.showSearchBtn;
    const sendMsgBtn = this.state.sendMsgBtn;

    const betArray = this.state.betArray;
    const robImages = this.state.robImages;
    let picNum = this.state.picNum;
    let fired = this.state.fired;

    // for helpers
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

    // for background-image showing
    // let showGame = gameBackStyle;
    // if(this.state.showPanel) {
    //     showGame = {display:'none'};
    // }
    // {this.showOverallPoints()}

    // for view-hide keyboards
    let showKeyboard = {display: 'inline-block'};
    let showSpecials = {display: 'none'};
    if(this.state.isOpenSpecials){
      showKeyboard = {display: 'none'};
      showSpecials = {display: 'inline-block'};
    }

    // <FetchNver
    //       sendGameData = {this.setGameData}
    //       gameId={this.props.gameId} />


    return (
        <div className="socket-wrap">
        {(seeEachOther && Uname)?
          <div className="multi-mode">
          <FetchNver
                sendGameData = {this.setGameData}
                gameId = {this.props.gameId}
                unique_id = {this.props.userId} />

              {(!robImages || !betArray)?
              <span className="bet-loader">Loading ...sk</span>:

              <div className="multi-window" style={gameBackStyle}>
                <div className="test-place">
                  {/*sendMsgBtn ? <button onClick= {this.handleMessage}>test Message</button> : null*/}
                </div>
                <h2 className="bet-question" onClick={this.clickQuestion}>
                   <span className="bet-question-text"> {this.state.question} </span>
                </h2>
                <AudComponent ref="audioChild"/>

                <div className="bet-multipanel-wrap">

                    <div className="name-and-progress-wrap">

                      <div className="bet-this-that-user border-blue-off">
                        <span className="this-that-user-name"><code>Player Name:</code> {this.state.thisUser.realyName}</span>
                        <span className="this-that-user-progress">
                          <RCprogressLeft ref="progressLeftChild"/>
                        </span>
                      </div>
                      <div className="bet-free-space-between border-yellow-off">
                        <span> answer -> {this.state.answer} </span>
                      </div>
                      <div className="bet-this-that-user border-green-off">
                        <span className="this-that-user-name"><code>Player Name:</code> {this.state.thatUser.realyName}</span>
                        <span className="this-that-user-progress">
                          <RCprogressRight ref="progressRighChild"/>
                        </span>
                      </div>

                    </div>

                    <div className="bet-image-rounds-timer-helper-wrap">
                        <div className="bet-img-wr">
                          {/*image */}
                          <div className="bet-this-user">
                              <SmallFire ref='smallFireChild'/>
                              <span className="bet-rob-image-wrap-1">
                                  <img src={image0} alt="image1" className="bet-robot-image" id="img1"/>
                              </span>
                          </div>
                        </div>
                        <div className="bet-rounds-timer-helper-wr">
                          <div className="bet-rounds-wr">
                            {/*rounds */}
                            <div className="bet-roud">
                              <span className="round-title">Rounds</span>
                              <span className="bet-round-dots">
                                  <span className="this-dots">{this.state.thisDots}</span>
                                  <span className="round-colon">:</span>
                                  <span className="that-dots">{this.state.thatDots}</span>
                              </span>
                            </div>
                          </div>
                          <div className="bet-timer-wr">
                            {/*timer */}
                            <div className="bet-timer">
                              <MyClock
                                  sec = {this.state.seconds}
                                  timeLimit = {this.state.timeLimit} />
                            </div>
                          </div>
                          <div className="bet-helpers-wr">
                            {/*helpers */}
                            <div className="bet-helpers">
                            <HelperButtons
                              showOpenMessage={this.showOpenMessage}
                              showFreezeMessage={this.showFreezeMessage}
                              showVideoMessage={this.showVideoMessage} />
                            </div>
                          </div>
                        </div>
                    </div>

                    <div className="coins-wrap">
                      <span className="this-that-coins">
                          {/*this coins*/}
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
                      </span>
                      <span className="this-that-coins">
                          {/*that coins {this.state.thatGuessArr} */}
                          <div className="bet-scores">
                              <span className="bet-score-image"></span>
                              <span className="bet-coins-count">
                                <span className="that-word-space"></span>
                              </span>
                          </div>
                      </span>
                    </div>

                  </div>

                <div className="bet-user-space" style={{display: 'none'}}>

                    <div className="bet-this-user">
                        <SmallFire ref='smallFireChild'/>
                        <span className="bet-user-name">{this.state.Uname} </span><br/>
                        <span> {"this=false counter: " + this.state.picNum} </span><br/>
                        <span className="bet-rob-image-wrap-1">
                            <img src={image0} alt="image1" className="bet-robot-image" id="img1"/>
                        </span>
                    </div>

                    <div className="bet-round-and-timer-and-helpers">
                        <div className="bet-roud">
                          <span className="round-title">Rounds</span>
                          <span className="bet-round-dots">
                              <span className="this-dots">{this.state.thisDots}</span>
                              <span className="round-colon">:</span>
                              <span className="that-dots">{this.state.thatDots}</span>
                          </span>
                        </div>
                        <div className="bet-timer">
                          <MyClock
                              sec = {this.state.seconds}
                              timeLimit = {this.state.timeLimit} />
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


                    <div className="bet-that-user" style={{display: 'none'}}>
                        <span className="bet-user-name">{this.state.thatUser.name}</span><br/>
                        <span>{"that=false counter: " + this.state.thatpicNum}</span>
                        <br/>
                        <span className="bet-rob-image-wrap-2">
                          <img src={image0} alt="image1" className="bet-robot-image" id="img2"/>
                        </span>
                        <div className="bet-scores">
                            <span className="bet-score-image"></span>
                            <span className="bet-coins-count">
                              <span className="that-word-space">{this.state.thatGuessArr}</span>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bet-word-space">
                    {this.state.guessArr[0] === 'Play Again' ?
                      <div className="wrap-bet-play-again">
                        <span className="not-satisfactory-msg">The results of your game are not satisfactory. </span>
                        <span className="bet-play-again">Play Again</span>
                      </div>  :
                      <span className="guess">
                        <span className={fired?'fired':'not-fired'}>{this.state.guessArr}</span>
                      </span>
                    }
                </div>

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
                  game-foot
                </div>

                multi-window
              </div>

                }

            multi-mode
          </div>
        :
        <div className = "bet-socket-search">
            <p className="see-my-socket-id"></p>
            <p className="messages-from-server"></p>
            {/*<button className="bet-search-btn" onClick= {this.handleSearch}>Search Room</button>*/}
            <ul className='free-rooms-ul'>
              {this.state.freeRoomsItems}
            </ul>
        </div>
        }


        <LessonFragmentModal/>


        {/* zgushacum */}
        {this.state.show_info ?
          <span className="animated fadeIn">
              <PayForCoins close={this.closeBlackBackground} show_price_blank ={this.show}
              PayDiamondForHelp5050={this.PayDiamondForHelp5050}/>
          <div className="price_back" id="blank_coins" style={{top: '0', left: '0'}}></div></span> : ''
        }

        </div>
      );
   }
}
const store = state => ({
    menuState:state.menu,
    lock:state.videolockercount,
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
)(Socketclient);
/*export default Socketclient;*/
