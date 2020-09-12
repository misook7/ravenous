import React from 'react';
import './SearchBar.css';

const sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count'
};

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        //initialize the value of state
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        };    

        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(event) {        
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        event.preventDefault();
    }

    getSortByClass(sortByOption) {
        if (this.state.sortBy === sortByOption) {
            return 'active';
        }
         return '';        
    }   

    /*
    handleSortByChange(sortByOption) {   
        this.setState({
            sortBy: sortByOption
        });
    }
    */  

    // Clicking on a different sorting option automatically requeries the Yelp API, rather than having to manually click “Let’s Go” again
    handleSortByChange(sortByOption) { 
        this.setState({ sortBy: sortByOption }, () => { 
            if (this.state.term && this.state.location) { 
                this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy); 
            }
        });
    }

    // dynamically create the list items needed to display the sort options (Best Match, Highest Rated, Most Reviewed)
    renderSortByOptions() {
        return Object.keys(sortByOptions).map(sortByOption => {            
            // store the sort option object values 
            let sortByOptionValue = sortByOptions[sortByOption];    
            return <li key={sortByOptionValue} onClick={this.handleSortByChange.bind(this, sortByOptionValue)} className={this.getSortByClass(sortByOptionValue)}>{sortByOption}</li>
            //return <li key={sortByOptionValue} onClick={()=>this.handleSortByChangeAndSearch(sortByOptionValue)} className={this.getSortByClass(sortByOptionValue)}>{sortByOption}</li>
        });
    }

    handleTermChange(event) {
        this.setState({ term: event.target.value});
    }

    handleLocationChange(event) {
        this.setState({ location: event.target.value });
    } 

    // Trigger search query with enter key
    keyPressed(event) {       
        var code = event.keyCode || event.which;

        // 13 is enter key. One of the fields like term or location has to be filled to search. 
        if (code === 13 & (this.state.term || this.state.location)) {
            this.handleSearch(event);
        }
    }

    render() {
        return(
            <div className="SearchBar" onKeyPress={(e) => this.keyPressed(e)}>
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input placeholder="Search Businesses" onChange={this.handleTermChange}/>
                    <input placeholder="Where?" onChange={this.handleLocationChange}/>
                </div>
                <div className="SearchBar-submit">
                    <a onClick={this.handleSearch} href="#">Let's Go</a>
                </div>
            </div>
        );
    }
}    


export default SearchBar;