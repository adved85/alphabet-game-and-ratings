import React, { Component } from 'react';
import { connect } from 'react-redux';

import lettOpener from '../images/helpers/lettOpener.png';
import timeFreezer from '../images/helpers/timeFreezer.png';
import lessViewer from '../images/helpers/lessViewer.png';

import {translate} from '../lang/strings.js';

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


class HelperButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openHover:false,
      freezeHover: false,
      lessonHover: false,
      timeFreezed:false,
    };
  }

  render() {

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

    const trans = translate[this.props.lang];

/*
Open Letter
Freeze Time
Lesson Fragment
*/

    return (
      <div className="helper-buttons-wrap-component">
          <button className="bet-let-opener bet-helper-btn" onClick={this.props.showOpenMessage}
                          style={openStyle}
                          onMouseOver={this.onOpenHover}
                          onMouseOut={this.onOpenOut}>
                          {trans.buttons.open_letter}
          </button>

          <button className="bet-time-freezer bet-helper-btn" onClick={this.props.showFreezeMessage}
                          style= {freezeStyle}
                          onMouseOver = {this.onFreezeHover}
                          onMouseOut =  {this.onFreezeOut}>
                          {trans.buttons.freeze_time}
          </button>

          <button className="bet-lesson-viewer bet-helper-btn" onClick={ this.props.showVideoMessage }
                          style={lessonStyle}
                          onMouseOver = {this.onLessHover}
                          onMouseOut = {this.onLessOut}>
                          {trans.buttons.less_fragment}
          </button>
      </div>
    );
  }

}

const store = state => ({
    lang:state.lang,
});

export default connect(
    store,
)(HelperButtons);

// export default HelperButtons;
