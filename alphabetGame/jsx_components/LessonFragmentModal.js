import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';

const LessonFragmentModal =(props)=> (

  <div className="bet-modal-fragment">
    {/* Modal content */}
    <div className="bet-modal-fragment-content">
        <div className="bet-fragment-modal-header">
            <span className="bet-fragment-close">×</span>
            <h2>Lesson Fragment.</h2>
        </div>
        <div className="bet-fragment-modal-body">
          <iframe className="bet-frag-frame"  src="" frameBorder="0"  allowFullScreen autoPlay></iframe>
        </div>
        <div className="bet-fragment-modal-footer">
            <span className="bet-fragment-close-btn">
              <MuiThemeProvider>
                  <FlatButton
                    label="Close"
                    style = {{border:'1px dotted grey'}}
                    primary={true}/>
              </MuiThemeProvider>
            </span>
        </div>
    </div>
  </div>

)

export default LessonFragmentModal;
