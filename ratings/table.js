import React, { Component } from 'react';
import { connect } from 'react-redux';
import './table.css';

const styles = {
  tbody : {
    backgroundImage: "url('https://omegacoding.com/android_test/tmp/avatar.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  default_upng : {
    backgroundImage: 'url("https://omegacoding.com/android_test/tmp/avatar.png")',
  },
  flag : {
    width: '17px',
    marginRight: '5px',
    filter: 'saturate(0.8)',
  }

}

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unique_id: this.props.userProfile.uid,
      pic_path: 'https://omegacoding.com/android_test/tmp/',
      flag_path: 'https://omegacoding.com/android_test/images/flags/4x3/',
    };
  }

  render() {

    let {pic_path, unique_id, flag_path} = this.state;
    let {trans} = this.props;

    // style{{ backgroundImage: `url(${flag_path}${(row.country_code).toLowerCase()})`}}
    return (
      <table className="table  table-bordered table-hover table-condensed table-responsive">
        <thead>
            <tr>
                <th>No.</th>
                <th>{trans.tablerate.user}</th>
                <th>{trans.tablerate.country}</th>
                <th>{trans.tablerate.points}</th>
            </tr>
        </thead>
        <tbody className="table-body">
          {this.props.data.top_rating &&
            this.props.data.top_rating.map(row =>
            <tr key={row.id} className={(row.unique_id === unique_id)?"current":""}>
              <td>{row.id}</td>
              <td>
                {row.picture !== null ?
                  <span className="upng" style={{ backgroundImage: `url(${pic_path}${row.picture})` }}></span>
                  :
                  <span className="upng" style={styles.default_upng}></span>
                }
                <span className="uname"> {row.name} </span>
                <span className="ulast_name"> {row.last_name} </span>

               </td>
              <td>
                <img src={`${flag_path}${(row.country_code).toLowerCase()}.svg`} style={styles.flag} />

                {row.country_name}</td>
              <td>{row.sum_points}</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          { this.props.data.error_msg &&
            <tr className="no-results">
              <td colSpan='4'> Nobody here ... <br/> Become the first of your Country! </td>
            </tr>
          }
        </tfoot>
      </table>
    );
  }

}


const state = store => ({
    userProfile: store.userProfileData,
});


export default connect(
    state,
)(Table);
// export default Table;
