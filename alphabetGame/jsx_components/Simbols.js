import React from 'react';

const Simbols = (props) => (
  <div className="specials-wrap-component">
    <div className="kb-first-row">
        <button className="kb-btn" name="0">0</button>
        <button className="kb-btn" name="1">1</button>
        <button className="kb-btn" name="2">2</button>
        <button className="kb-btn" name="3">3</button>
        <button className="kb-btn" name="4">4</button>
        <button className="kb-btn" name="5">5</button>
        <button className="kb-btn" name="6">6</button>
        <button className="kb-btn" name="7">7</button>
        <button className="kb-btn" name="8">8</button>
        <button className="kb-btn" name="9">9</button>
        <button className="kb-btn" name="(">(</button>
        <button className="kb-btn" name=")">)</button>
    </div>
    <div className="kb-first-row">
        <button className="kb-btn" name="@">@</button>
        <button className="kb-btn" name="#">#</button>
        <button className="kb-btn" name="$">$</button>
        <button className="kb-btn" name="%">%</button>
        <button className="kb-btn" name="&">&</button>
        <button className="kb-btn" name="~">~</button>
        <button className="kb-btn" name="_">_</button>
        <button className="kb-btn" name="=">=</button>
        <button className="kb-btn" name="!">!</button>
        <button className="kb-btn" name="^">^</button>
    </div>
    <div className="kb-second-row">
        <button className="kb-btn" name="*">*</button>
        <button className="kb-btn" name="/">/</button>
        <button className="kb-btn" name="+">+</button>
        <button className="kb-btn" name="-">-</button>
        <button className="kb-btn" name=":">:</button>
        <button className="kb-btn" name=";">;</button>
        <button className="kb-btn" name=",">,</button>
        <button className="kb-btn" name=".">.</button>
        <button className="kb-btn" name="?">?</button>
        <button className="kb-btn" name="\">\</button>
    </div>
    <div className="kb-third-row">
        <button className="kb-btn" name="'" >'</button>
        <button className="kb-btn" name='"'>"</button>
        <button className="kb-btn" name="<" >{'<'}</button>
        <button className="kb-btn" name=">" >{'>'}</button>
        <button className="kb-btn" name="[" >{'['}</button>
        <button className="kb-btn" name="]" >{']'}</button>
        <button className="kb-btn" name={'{'} >{'{'}</button>
        <button className="kb-btn" name={'}'} >{'}'}</button>
        <button className="kb-btn" name="|" >|</button>
    </div>
  </div>
);

export default Simbols;
