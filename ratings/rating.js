import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Listing from './listing.js';
import { connect } from 'react-redux';

import AutoComplete from 'material-ui/AutoComplete';
import countries from './countries.js';
import {translate} from './lang/strings.js';
import './font-settings.css';
import GoogleAdsense from '../alphabetGame/GoogleAdsense';

let countriesList = countries.map( (country, index) => {
  return country['English short name'];
})

const styles = {
  wrapper :{
    color:'white',
    width: '65%',
    position: 'absolute',
    left: '50%',
    transform: 'translate(-55%)',
  },
  pageHeading : {
      marginTop: '45px',
      fontSize: '26px',
      marginBottom: '6px',
      textShadow:'black 0px 3px 1px, rgba(255, 255, 0, 0.46) 0px 7px 20px',
      fontWeight: '600',
      fontFamily: 'Monts-black',
      color: '#00bcd4'
  },
  small_text: {
    color: 'white',
  },
  hint_style: {
    left: '50%',
    transform: 'translate(-50%)',
    color:'white',
    fontWeight:600,
    textTransform:'uppercase',
    fontFamily: 'Monts-black',
    letterSpacing: '1px',
    width: '400px'
  },
  input_style : {
    color:'white',
    textTransform:'uppercase',
    fontWeight:600,
    fontFamily: 'Monts-black',
    letterSpacing: '1px',
    width: '400px',
  },
  underline_Focus_Style : {
    color:'#f43e80',
    height: '3px',
  },
};


class Ratings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      unique_id: this.props.userProfile.uid,
      course_name: 'html',
      country_data: this.props.userProfile.country_data, // {country_code: "AM", country_name: "Armenia"}
      searchText: '',
      filterByCoutry: false,
      other_country: ''
    };
  }

  componentWillMount = () => {
    // closing left menu //
    this.props.toggleNavMenu(true);
  }
  

  componentDidMount() {
    this.getRatingByCourseName(this.state.course_name);    
  }

  getRatingByCourseName=(course_name)=> {
    let {filterByCoutry, searchText, unique_id} = this.state;

    // if( (typeof filterByCoutry ==="boolean") && filterByCoutry) {
      //  && searchText !==this.state.country_data.country_name
    if( (searchText !=="")) {
      console.log('other country(+) and search by course-name', searchText)
      console.log('other country and search by course-name(+)', course_name)
      let query_string = `?country_name=${searchText}&course_name=${course_name}&other_country=true`;
      fetch('https://omegacoding.com/android_test/ratings.php'+query_string)
      .then(response => response.json())
      .then(data => {
        this.setState({ data, course_name, filterByCoutry: false }) // , 
        console.log(data);
      });
    }
    else{
      let query_string = `?unique_id=${unique_id}&course_name=${course_name}&my_country=true`;

      fetch('https://omegacoding.com/android_test/ratings.php'+query_string)
        .then(response => response.json())
        .then(data => {
          this.setState({ data, course_name,filterByCoutry: false })
        });
    }
  }


  getRatingByCountryName=(country_name)=> {
    console.log('country_name ----> ',country_name);
    let {filterByCoutry, searchText} = this.state;
    console.log('searchText---->', searchText)

  


    let query_string = `?country_name=${country_name}`;
    if (country_name === 'by_my_country') {
      query_string = `?country_name=${this.state.country_data.country_name}`;         
    }

    fetch('https://omegacoding.com/android_test/ratings.php'+query_string)
      .then(response => response.json())
      .then(data => this.setState({ data}));
  }

  handleUpdateInput = (searchText) => {
    if (countriesList.includes(searchText)) {
      this.getRatingByCountryName(searchText)
      this.setState({
        searchText: searchText,
        filterByCoutry:true,
      });
    }else {
      console.log(this.state.course_name);
      this.getRatingByCourseName(this.state.course_name);
      this.setState({
        searchText: this.state.country_data.country_name,        
        filterByCoutry:this.state.course_name,
      })
    }


  }

  clickDetector=(clicked)=>{
    console.log(clicked)
  }

  render() {
    // console.log(this.state.unique_id);
    // console.log( this.state.data );
    // console.log(this.state.country_data.country_name);
    const trans = translate[this.props.lang];


    let showIns = 'hidden';
    // console.log(this.props.userProfile.status)
    if (this.props.userProfile.status < 1) {
      showIns = 'visible';
    }



    return (
      <div style={styles.wrapper}>
        <h2 style={styles.pageHeading}>{trans.headline}</h2>
        <MuiThemeProvider>
          <AutoComplete
            hintText={this.state.country_data.country_name}
            searchText={this.state.searchText}
            onUpdateInput={this.handleUpdateInput}
            dataSource={countriesList}
            filter={AutoComplete.caseInsensitiveFilter}
            openOnFocus={true}
            maxSearchResults={6}
            inputStyle={styles.input_style}
            hintStyle={styles.hint_style}
            fullWidth={true}            
          />
        </MuiThemeProvider>


        <MuiThemeProvider>
          <Listing
            data={this.state.data}
            setRatingByCourseName={this.getRatingByCourseName}
            setRatingByCountryName={this.getRatingByCountryName}
            filterByCoutry={this.state.filterByCoutry}
            searchText = {this.state.searchText}
            trans={trans}/>
        </MuiThemeProvider>

        <div className='gugo-ads-wrap' style={{width:'100%', visibility:showIns}}>
          <GoogleAdsense
            dataAdClient='ca-pub-7306442307639605' 
            dataAdSlot='7315600006'
            dataAdFormat = "auto"            
            getClicks = {this.clickDetector}
          />
        </div>
      </div>
    );
  }

}

const state = store => ({
    editableTab:store.tabs,
    userProfile: store.userProfileData,
    userInfoState:store.userInfo,
    lang:store.lang
});


const dispatch = dispatch => ({
    changePageLang : newPage => { dispatch({type : 'CHANGE_PAGE_LANGUAGE', payload : newPage})},
    toggleNavMenu: newState => dispatch({type: 'TOGGLE_NAV_MENU', payload: newState}),
});

export default connect(
    state,
    dispatch,
)(Ratings);
