import React, { Component } from 'react';
import PropTypes from 'prop-types';
///import './styles/GoogleAdsense.css';

const targStyle = {
  padding:'10px',
  border:'1px dotted green',
}

class GoogleAdsense extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});

    let adbg = document.getElementsByClassName('bet-google-adsense')[0];
    adbg.addEventListener('click' , ()=>{
      this.props.getClicks('clicked');
    });
    //this.props.getClicks('clicked');
  }

render(){

  if (typeof (this.props.dataFullWidthResponsive) !== 'undefined') {
    return (
      <div className="bet-google-adsense">
       {/* <div className="bet-layer">Google Adsense Below...</div>*/}
        <ins className="adsbygoogle"
             style={{display: 'block'}}
             data-ad-client={this.props.dataAdClient}
             data-ad-slot={this.props.dataAdSlot}
             data-ad-format={this.props.dataAdFormat}
             data-full-width-responsive={this.props.dataFullWidthResponsive}>
        </ins>
      </div>
    );
  }

  return (
    <div className="bet-google-adsense">
     {/* <div className="bet-layer">Google Adsense Below...</div>*/}
      <ins className="adsbygoogle"
           style={{display: 'block'}}
           data-ad-client={this.props.dataAdClient}
           data-ad-slot={this.props.dataAdSlot}
           data-ad-format={this.props.dataAdFormat}>
      </ins>
    </div>
  );    
  }
}

export default GoogleAdsense;
GoogleAdsense.PropTypes = {
  dataAdClient: PropTypes.string,
  dataAdSlot: PropTypes.string,
  dataAdFormat: PropTypes.string,
  wrapperDivStyle: PropTypes.object
}
