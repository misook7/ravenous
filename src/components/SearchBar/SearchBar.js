import React from "react";
import "./SearchBar.css";
import LocationSearchInput from "../LocationSearchInput/LocationSearchInput";

const sortByOptions = {
  "Best Match": "best_match",
  "Highest Rated": "rating",
  "Most Reviewed": "review_count",
  "Distance (Closest)": "distance",
};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    //initialize the value of state
    this.state = {
      term: "",
      location: "",
      sortBy: "best_match",
    };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    // at least location is required
    if (this.state.location) {
      this.props.searchYelp(
        this.state.term,
        this.state.location,
        this.state.sortBy
      );
    }
    event.preventDefault();
  }

  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return "active";
    }
    return "";
  }

  // Clicking on a different sorting option automatically requeries the Yelp API, rather than having to manually click “Let’s Go” again
  handleSortByChange(sortByOption) {
    this.setState({ sortBy: sortByOption }, () => {
      if (this.state.location) {
        this.props.searchYelp(
          this.state.term,
          this.state.location,
          this.state.sortBy
        );
      }
    });
  }

  // dynamically create the list items needed to display the sort options (Best Match, Highest Rated, Most Reviewed)
  renderSortByOptions() {
    return Object.keys(sortByOptions).map((sortByOption) => {
      // store the sort option object values
      let sortByOptionValue = sortByOptions[sortByOption];
      return (
        <li
          key={sortByOptionValue}
          onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
          className={this.getSortByClass(sortByOptionValue)}
        >
          {sortByOption}
        </li>
      );
      //return <li key={sortByOptionValue} onClick={()=>this.handleSortByChangeAndSearch(sortByOptionValue)} className={this.getSortByClass(sortByOptionValue)}>{sortByOption}</li>
    });
  }

  handleTermChange(event) {
    this.setState({ term: event.target.value });
  }

  /*
  handleLocationChange(event) {
    this.setState({ location: event.target.value });
  }
  */

  handleLocationChange(selectedLocation) {
    this.setState({ location: selectedLocation });
  }

  // Trigger search query with enter key
  keyPressed(event) {
    var code = event.keyCode || event.which;
    console.log(code);
    // 13 is enter key. One of the fields like term or location has to be filled to search.
    console.log(
      "term: " + this.state.term + "location: " + this.state.location
    );
    if (code === 13 && (this.state.term || this.state.location)) {
      console.log("enter pressed");
      this.handleSearch(event);
    }
  }

  render() {
    return (
      // changed onKeyPress to onKeyDown because the enter key is not detected (all other keys are detected though...)
      <div className="SearchBar" onKeyDown={(e) => this.keyPressed(e)}>
        <div className="SearchBar-sort-options">
          <ul>{this.renderSortByOptions()}</ul>
        </div>
        <div className="SearchBar-fields">
          <input
            placeholder="Search Businesses"
            onChange={this.handleTermChange}
          />
          {/* 09/17/2020 MS - location autocomplete is implemented by using react-places-autocomplete library 
          <input placeholder="Where?" onChange={this.handleLocationChange} /> 
          */}
          <LocationSearchInput
            onHandleLocationChange={this.handleLocationChange}
            location={this.state.location}
          />
          <div className="SearchBar-submit">
            <a onClick={this.handleSearch} href="#">
              Let's Go
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
