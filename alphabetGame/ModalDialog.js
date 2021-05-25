import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import GoogleAdsense from './GoogleAdsense';
import { connect } from 'react-redux';

const customContentStyle = {
  width: '60%',
  maxWidth: '768px',
  height:'auto'
};
const customBodyStyle = {
  maxWidth: '80%',
  margin: '0 auto'
}
const customTitleStyle = {
  margin: '0',
  padding: '12px 12px 6px'
}
const customActionsContainerStyle = {
  border: '0'
}

class DialogCustomWidth extends React.Component {
    state = { open: false };

    handleOpen = () => {
      this.setState({open: true});
    };
    handleClose = () => {
      this.setState({open: false});
    };

    clickDetector=(data) => {
      if (data === 'clicked') {

            // https://developers.google.com/web/updates/2015/03/introduction-to-fetch?hl=en
            // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
            let userId = this.props.userId;
            let url = 'https://omegacoding.com/android_test/manageDiamonds.php';
            let method = 'post';
            let headers = {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"};
            let body = "user_id="+userId+"&operation=7";

            fetch(url, {
                method: method,
                headers: headers,
                body: body
            })
            .then(res =>{
              if(res.ok) {
                  return res.json()
                }
              })
            .then(res =>{
              this.props.addUserDiamonds(res);
              this.props.changeUserDiamonds(res);
              console.log(res)
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
        }
    }

    render() {

        //console.log( this.props.userProfile.diamonds, ' --- diamonds -- into Dialog');
        const actions = [
          <FlatButton
            label="Close"
            primary={true}
            onClick={this.handleClose} />,

        ];

        return (
          <div>
            <span className="watch-ads " onClick={this.handleOpen} > Watch ads </span>
            <Dialog
              title={'Title of Modal Dialog with custom width.'}
              actions={actions}
              modal={true}

              titleClassName = "dialog-title-wrapper"
              titleStyle = {customTitleStyle}

              contentClassName = "dialog-content-wrapper"
              contentStyle={customContentStyle}

              bodyClassName = "dialog-body-wrapper"
              bodyStyle = {customBodyStyle}

              actionsContainerClassName = "dialog-actions-wrapper"
              actionsContainerStyle = {customActionsContainerStyle}
              open={this.state.open}
            >

            <GoogleAdsense
                dataAdClient = "ca-pub-7306442307639605"
                dataAdSlot = "5592332219"
                dataAdFormat = "auto"
                getClicks = {this.clickDetector} />

            </Dialog>
          </div>
        );
    }
}

const state = store => ({
    menuState:store.menu,
    userProfile:store.userProfileData
});

const dispatch = dispatch => ({
    addUserDiamonds : newState => {
        dispatch({type:'CHANGE_DIAMONDS',payload:newState});
            },
    changeUserDiamonds : newState => {
        dispatch({type:'ADD_USER_DIAMONDS',payload:newState});
            },

});

export default connect(
    state,
    dispatch
)(DialogCustomWidth);
