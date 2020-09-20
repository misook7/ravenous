import React from 'react';
import './App.css';
import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import Yelp from '../../util/Yelp';
import JwPagination from 'jw-react-pagination';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state =  {
      businesses: [],
      businessesPerPage: []
    };

    this.searchYelp = this.searchYelp.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
  }

  searchYelp(term, location, sortBy) {
    //console.log(`You are searching for ${term},  ${location}, and ${sortBy}`);
    Yelp.search(term, location, sortBy).then (businesses => {
      this.setState({businesses: businesses});
    });
  }

  onChangePage(businessesPerPage) {
    this.setState({businessesPerPage: businessesPerPage});
  }

  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp={this.searchYelp} />
        <BusinessList businesses={this.state.businessesPerPage} />
        <JwPagination items={this.state.businesses} onChangePage={this.onChangePage} />
      </div>
    );
  }
}

export default App;
