import React, {Component} from 'react';
import { connect } from 'react-redux';




class FetchNver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameData:{},
            unique_id: this.props.unique_id,
            game_type: 2
        };
    }

    componentDidMount() {

      let gameId = this.props.gameId;
      let lang=this.props.lang;
      // https://developers.google.com/web/updates/2015/03/introduction-to-fetch?hl=en
	    let url = 'https://omegacoding.com/android_test/alphabet_game.php';
	    let method = 'post';
	    let headers = {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"};
	    let body = "foo=baraba&game_id="+gameId+"&lang="+lang+"";
 console.log(body ,"body alphabet_game ");
	    fetch(url, {
	        method: method,
	        headers: headers,
	        body: body
	    })
	    .then(res=>res.json())
	    //.then(data=>console.log(data))
	    //.then(data => this.setState({gameData:data}))
	    .then(data => {

              console.log('data was set successfuly');
              let body = `unique_id=${encodeURI(this.state.unique_id)}&game_type=${encodeURI(this.state.game_type)}`;

              fetch(url, {
                  method: method,
                  headers: headers,
                  body: body
              })
              .then(res=>res.json())
              //.then(data=>console.log(data))
              //.then(data => this.setState({gameData:data}))
              .then(demo_alph => {
                console.log('demo_alph --' , demo_alph);
                //if(demo_alph) {}
                  data['demo_alph'] = demo_alph;
                  this.props.sendGameData(data);
                  console.log(data);
              })
              .catch(function (error) {
                  console.log('Request failed', error);
              });

        // this.props.sendGameData(data)
      })
	    .catch(function (error) {
	        console.log('Request failed', error);
	    });

    }

/* ----- no need rendering, just send data by props-function :))
return( 	<div className="fetch-nver"> </div> );
--------------------------------------------------------------*/
	render() {
            return false;
	}
}

const store = state => ({
    lang:state.lang
});

const dispatch = dispatch => ({
});

export default connect(
    store,
    dispatch
)(FetchNver);
