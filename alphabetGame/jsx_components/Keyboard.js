import React, { Component } from 'react';

const Keboard =(props)=> {
    let showArm = {display: 'none'};
    let showUpper = {display: 'none'};
    let showLower = {display: 'none'};
    let showEng = {display: 'inline-block'};
    if(props.lng === 'am' || props.lng === 'arm') {
      showArm = {display: 'inline-block'};
      if (props.charCase === false) {
        showLower = {display: 'inline-block'};
      }else{
        showUpper = {display: 'inline-block'};
      }

      showEng = {display: 'none'};
    }else{
      showArm = {display: 'none'};
      showEng = {display: 'inline-block'};
      if (props.charCase === false) {
        showLower = {display: 'inline-block'};
      }else{
        showUpper = {display: 'inline-block'};
      }
    }

    return (
      <div className="keyboard-all-langs">
        <div className="bet-arm-keyborad"  style={showArm} >
          <div className="keyboard-wrap-component uppercase" style={showUpper}>
            <div className="kb-first-row">
                <button className="kb-btn" name="Է"  >Է</button>
                <button className="kb-btn" name="Թ"  >Թ</button>
                <button className="kb-btn" name="Փ"  >Փ</button>
                <button className="kb-btn" name="Ձ"  >Ձ</button>
                <button className="kb-btn" name="Ջ"  >Ջ</button>
                <button className="kb-btn" name="Ւ"  >Ւ</button>
                <button className="kb-btn" name="և"  >և</button>
                <button className="kb-btn" name="Ր"  >Ր</button>
                <button className="kb-btn" name="Չ"  >Չ</button>
                <button className="kb-btn" name="Ճ"  >Ճ</button>
                <button className="kb-btn" name="Ժ"  >Ժ</button>
            </div>
            <div className="kb-first-row">
                <button className="kb-btn" name="Ք"  >Ք</button>
                <button className="kb-btn" name="Ո"  >Ո</button>
                <button className="kb-btn" name="Ե"  >Ե</button>
                <button className="kb-btn" name="Ռ"  >Ռ</button>
                <button className="kb-btn" name="Տ"  >Տ</button>
                <button className="kb-btn" name="Ը"  >Ը</button>
                <button className="kb-btn" name="Ւ"  >Ւ</button>
                <button className="kb-btn" name="Ի"  >Ի</button>
                <button className="kb-btn" name="Օ"  >Օ</button>
                <button className="kb-btn" name="Պ"  >Պ</button>
                <button className="kb-btn" name="Խ"  >Խ</button>
                <button className="kb-btn" name="Ծ"  >Ծ</button>
            </div>
            <div className="kb-second-row">
                <button className="kb-btn" name="Ա"  >Ա</button>
                <button className="kb-btn" name="Ս"  >Ս</button>
                <button className="kb-btn" name="Դ"  >Դ</button>
                <button className="kb-btn" name="Ֆ"  >Ֆ</button>
                <button className="kb-btn" name="Գ"  >Գ</button>
                <button className="kb-btn" name="Հ"  >Հ</button>
                <button className="kb-btn" name="Յ"  >Յ</button>
                <button className="kb-btn" name="Կ"  >Կ</button>
                <button className="kb-btn" name="Լ"  >Լ</button>
                <button className="kb-btn" name="Շ"  >Շ</button>
            </div>
            <div className="kb-third-row">
                <button className="kb-btn" name="Զ"  >Զ</button>
                <button className="kb-btn" name="Ղ"  >Ղ</button>
                <button className="kb-btn" name="Ց"  >Ց</button>
                <button className="kb-btn" name="Վ"  >Վ</button>
                <button className="kb-btn" name="Բ"  >Բ</button>
                <button className="kb-btn" name="Ն"  >Ն</button>
                <button className="kb-btn" name="Մ"  >Մ</button>
            </div>
            <div className="kb-third-row">
              <button className="kb-btn" name="space"  >բացատ</button>
            </div>
          </div>

          <div className="keyboard-wrap-component lowercase" style={showLower}>
            <div className="kb-first-row">
                <button className="kb-btn" name="է"  >է</button>
                <button className="kb-btn" name="թ"  >թ</button>
                <button className="kb-btn" name="փ"  >փ</button>
                <button className="kb-btn" name="ձ"  >ձ</button>
                <button className="kb-btn" name="ջ"  >ջ</button>
                <button className="kb-btn" name="ւ"  >ւ</button>
                <button className="kb-btn" name="և"  >և</button>
                <button className="kb-btn" name="ր"  >ր</button>
                <button className="kb-btn" name="չ"  >չ</button>
                <button className="kb-btn" name="ճ"  >ճ</button>
                <button className="kb-btn" name="ժ"  >ժ</button>
            </div>
            <div className="kb-first-row">
                <button className="kb-btn" name="ք"  >ք</button>
                <button className="kb-btn" name="ո"  >ո</button>
                <button className="kb-btn" name="ե"  >ե</button>
                <button className="kb-btn" name="ռ"  >ռ</button>
                <button className="kb-btn" name="տ"  >տ</button>
                <button className="kb-btn" name="ը"  >ը</button>
                <button className="kb-btn" name="ւ"  >ւ</button>
                <button className="kb-btn" name="ի"  >ի</button>
                <button className="kb-btn" name="օ"  >օ</button>
                <button className="kb-btn" name="պ"  >պ</button>
                <button className="kb-btn" name="խ"  >խ</button>
                <button className="kb-btn" name="ծ"  >ծ</button>
            </div>
            <div className="kb-second-row">
                <button className="kb-btn" name="ա"  >ա</button>
                <button className="kb-btn" name="ս"  >ս</button>
                <button className="kb-btn" name="դ"  >դ</button>
                <button className="kb-btn" name="ֆ"  >ֆ</button>
                <button className="kb-btn" name="գ"  >գ</button>
                <button className="kb-btn" name="հ"  >հ</button>
                <button className="kb-btn" name="յ"  >յ</button>
                <button className="kb-btn" name="կ"  >կ</button>
                <button className="kb-btn" name="լ"  >լ</button>
                <button className="kb-btn" name="շ"  >շ</button>
            </div>
            <div className="kb-third-row">
                <button className="kb-btn" name="զ"  >զ</button>
                <button className="kb-btn" name="ղ"  >ղ</button>
                <button className="kb-btn" name="ց"  >ց</button>
                <button className="kb-btn" name="վ"  >վ</button>
                <button className="kb-btn" name="բ"  >բ</button>
                <button className="kb-btn" name="ն"  >ն</button>
                <button className="kb-btn" name="մ"  >մ</button>
            </div>
            <div className="kb-third-row">
              <button className="kb-btn" name="space"  >բացատ</button>
            </div>
          </div>
        </div>

        <div className="bet-eng-keyboard" style={showEng} >
          <div className="keyboard-wrap-component" style={showUpper}>
            <div className="kb-first-row">
                <button className="kb-btn" name="Q"  >Q</button>
                <button className="kb-btn" name="W"  >W</button>
                <button className="kb-btn" name="E"  >E</button>
                <button className="kb-btn" name="R"  >R</button>
                <button className="kb-btn" name="T"  >T</button>
                <button className="kb-btn" name="Y"  >Y</button>
                <button className="kb-btn" name="U"  >U</button>
                <button className="kb-btn" name="I"  >I</button>
                <button className="kb-btn" name="O"  >O</button>
                <button className="kb-btn" name="P"  >P</button>
            </div>
            <div className="kb-second-row">
                <button className="kb-btn" name="A"  >A</button>
                <button className="kb-btn" name="S"  >S</button>
                <button className="kb-btn" name="D"  >D</button>
                <button className="kb-btn" name="F"  >F</button>
                <button className="kb-btn" name="G"  >G</button>
                <button className="kb-btn" name="H"  >H</button>
                <button className="kb-btn" name="J"  >J</button>
                <button className="kb-btn" name="K"  >K</button>
                <button className="kb-btn" name="L"  >L</button>
            </div>
            <div className="kb-third-row">
                <button className="kb-btn" name="Z"  >Z</button>
                <button className="kb-btn" name="X"  >X</button>
                <button className="kb-btn" name="C"  >C</button>
                <button className="kb-btn" name="V"  >V</button>
                <button className="kb-btn" name="B"  >B</button>
                <button className="kb-btn" name="N"  >N</button>
                <button className="kb-btn" name="M"  >M</button>
            </div>
            <div className="kb-third-row">
              <button className="kb-btn" name="space"  >space</button>
            </div>
          </div>

          <div className="keyboard-wrap-component" style={showLower}>
            <div className="kb-first-row">
                <button className="kb-btn" name="q"  >q</button>
                <button className="kb-btn" name="w"  >w</button>
                <button className="kb-btn" name="e"  >e</button>
                <button className="kb-btn" name="r"  >r</button>
                <button className="kb-btn" name="t"  >t</button>
                <button className="kb-btn" name="y"  >y</button>
                <button className="kb-btn" name="u"  >u</button>
                <button className="kb-btn" name="i"  >i</button>
                <button className="kb-btn" name="o"  >o</button>
                <button className="kb-btn" name="p"  >p</button>
            </div>
            <div className="kb-second-row">
                <button className="kb-btn" name="a"  >a</button>
                <button className="kb-btn" name="s"  >s</button>
                <button className="kb-btn" name="d"  >d</button>
                <button className="kb-btn" name="f"  >f</button>
                <button className="kb-btn" name="g"  >g</button>
                <button className="kb-btn" name="h"  >h</button>
                <button className="kb-btn" name="j"  >j</button>
                <button className="kb-btn" name="k"  >k</button>
                <button className="kb-btn" name="l"  >l</button>
            </div>
            <div className="kb-third-row">
                <button className="kb-btn" name="z"  >z</button>
                <button className="kb-btn" name="x"  >x</button>
                <button className="kb-btn" name="c"  >c</button>
                <button className="kb-btn" name="v"  >v</button>
                <button className="kb-btn" name="b"  >b</button>
                <button className="kb-btn" name="n"  >n</button>
                <button className="kb-btn" name="m"  >m</button>
            </div>
            <div className="kb-third-row">
              <button className="kb-btn" name="space"  >space</button>
            </div>
          </div>

        </div>
      </div>

    )
}

export default Keboard;
