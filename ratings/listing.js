import React, { Component } from 'react';

// swipeable
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Table from './table.js';
import sumIcon from '../../../images/sum_icon.png';
import './font-settings.css';

// swipeable
const styles = {
  headline: {
    fontSize: 24,
    marginBottom: 12,
    fontWeight: 400,
  },
  courseIcon: {
    width: '50px',
    padding: '5px',
    backgroundColor: '#ffffff8c',
    borderRadius: '50%',
  },
  slide: {
    padding: 10,
    border: '1px solid',
    fontFamily: 'Monts-regular',
  },
  ratingBtn: {
    textShadow: '1px 1px 2px #2d2b2b',
    fontWeight: 800,
    color:'yellow',
    fontFamily: 'Monts-black',
  },
};

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //swipeable
      slideIndex: 0,
      country_name: 'by_my_country'
      
    };
  }

  // swipeable
  handleChange = (value) => {
    // console.log(value) // 1, 2, 3, 4, .... 8
    switch (value) {
      case 0:
        this.props.setRatingByCourseName('html');
        break;
      case 1:
        this.props.setRatingByCourseName('css');
        break;
      case 2:
        this.props.setRatingByCourseName('trap');
        break;
      case 3:
        this.props.setRatingByCourseName('java');
        break;
      case 4:
        this.props.setRatingByCourseName('uery');
        break;
      case 5:
        this.props.setRatingByCourseName('php');
        break;
      case 6:
        this.props.setRatingByCourseName('mysql');
        break;
      case 7:
        this.props.setRatingByCourseName('eact');
        break;
      case 8:
        let {country_name} = this.state;
        this.props.setRatingByCountryName(country_name);
        break;

    }
    // this.props.setRatingByCourseName('css');
     this.setState({
       slideIndex: value,
     });
  };

  componentWillReceiveProps(nextProps) {

    // console.log(nextProps.filterByCoutry);
    if (nextProps.searchText !== '') {
      this.setState({
        country_name : nextProps.searchText
      })
      
    }else{
      this.setState({
        country_name : 'by_my_country'
      })
      
    }
    if (nextProps.filterByCoutry === true) {
      this.setState({
        slideIndex: 8,
        
      });
    }
    else {
      let value = nextProps.filterByCoutry;
      switch (value) {
        case 'html':
          this.setState({ slideIndex: 0 });
          break;
        case 'css':
          this.setState({ slideIndex: 1 });
          break;
        case 'trap':
          this.setState({ slideIndex: 2 });
          break;
        case 'cript':
          this.setState({ slideIndex: 3 });
          break;
        case 'uery':
          this.setState({ slideIndex: 4 });
          break;
        case 'php':
          this.setState({ slideIndex: 5 });
          break;
        case 'mysql':
          this.setState({ slideIndex: 6 });
          break;
        case 'eact':
          this.setState({ slideIndex: 7 });
          break;
        case 'by_my_country':
          this.setState({ slideIndex: 8 });
          break;

      }
    }
  }


  render() {
    // console.log(this.props.data);
    let {data, trans } = this.props;

    if (!this.props.data ) {
      return <p>Loading ... </p>
    }

// <Table top_rating={this.props.data.top_rating} />

    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
          contentContainerStyle={{flex:1}}
          inkBarStyle={{height: '3px', marginTop:'-3px'}}
        >
          <Tab label="html" value={0} className="html" style={styles.ratingBtn}/>
          <Tab label="css" value={1} className="css" style={styles.ratingBtn}/>
          <Tab label="bootstrap" value={2} className="bootstrap" style={styles.ratingBtn}/>
          <Tab label="js" value={3} className="javascript" style={styles.ratingBtn}/>
          <Tab label="jquery" value={4} className="jquery" style={styles.ratingBtn}/>
          <Tab label="php" value={5} className="php" style={styles.ratingBtn}/>
          <Tab label="mysql" value={6} className="mysql" style={styles.ratingBtn}/>
          <Tab label="reactjs" value={7} className="reactjs" style={styles.ratingBtn}/>
          <Tab label="total" value={8} className="total_local" style={styles.ratingBtn}/>

        </Tabs>

        <div style={styles.slide}>
          <SwipeableViews
           index={this.state.slideIndex}
           onChangeIndex={this.handleChange}
           >

            <div style={styles.slide} className="slide-1">
              <p style={styles.headline}>
                <img src='/static/media/html.6c2dc406.png' style={styles.courseIcon} />

              </p>
              <Table data={this.props.data} trans={trans}/>
            </div>
            <div style={styles.slide} className="slide-2">
              <p style={styles.headline}>
                <img src='/static/media/css.b17651a5.png' style={styles.courseIcon} />

              </p>
              <Table data={this.props.data} trans={trans}/>
            </div>
            <div style={styles.slide} className="slide-3">
              <p style={styles.headline}>
                <img src='/static/media/boot.3721e9e3.png' style={styles.courseIcon} />

              </p>
              <Table data={this.props.data} trans={trans}/>
            </div>
            <div style={styles.slide} className="slide-4">
              <p style={styles.headline}>
                <img src='/static/media/js.99ed64a9.png' style={styles.courseIcon} />

              </p>
              <Table data={this.props.data} trans={trans}/>
            </div>
            <div style={styles.slide} className="slide-5">
              <p style={styles.headline}>
                <img src='/static/media/jQuery.66078e67.png' style={styles.courseIcon} />

              </p>
              <Table data={this.props.data} trans={trans}/>
            </div>
            <div style={styles.slide} className="slide-6">
              <p style={styles.headline}>
                <img src='/static/media/php.72c8d7e3.png' style={styles.courseIcon} />

              </p>
              <Table data={this.props.data} trans={trans}/>
            </div>
            <div style={styles.slide} className="slide-7">
              <p style={styles.headline}>
                <img src='/static/media/sql.0527a587.png' style={styles.courseIcon} />

              </p>
              <Table data={this.props.data} trans={trans}/>
            </div>
            <div style={styles.slide} className="slide-8">
              <p style={styles.headline}>
                <img src='/static/media/react.f72328fc.png' style={styles.courseIcon} />

              </p>
              <Table data={this.props.data} trans={trans}/>
            </div>
            <div style={styles.slide} className="slide-9 my-country">
              <p style={styles.headline}>
                <img src={sumIcon} style={styles.courseIcon} />

              </p>
              <Table data={this.props.data} trans={trans}/>
            </div>
            <div style={styles.slide} className="slide-10 other-country">
              <p style={styles.headline}>
                <img src={sumIcon} style={styles.courseIcon} />

              </p>
              <Table data={this.props.data} trans={trans}/>
            </div>

         </SwipeableViews>
        </div>


      </div>
    );
  }

}

export default Listing;
