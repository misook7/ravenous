import PlacesAutocomplete from 'react-places-autocomplete';
import React from 'react';

const LocationSearchInput = (props) => {
    return (
        <PlacesAutocomplete
            value={props.location}
            onChange={props.onHandleLocationChange}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
                <input
                {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input',
                })}
                />               
                <div className="suggestion-result"> 
                {/* {loading && <div>Loading...</div>} */}
                {suggestions.map(suggestion => {
                    const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                    // inline style for demonstration purpose                    
                    const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer'}
                    : { backgroundColor: '#ffffff', cursor: 'pointer'}; 
                    return (
                        <div
                            {...getSuggestionItemProps(suggestion, {
                            className,
                            style
                            })}
                        >
                            <span>{suggestion.description}</span>
                        </div>
                    
                    );
                })}
                </div>
            </div>
            )}
        </PlacesAutocomplete>
    );
}

export default LocationSearchInput;