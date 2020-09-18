import React from "react";
import "./Business.css";

class Business extends React.Component {
  render() {
    const business = this.props.business;
    return (
      <div className="Business">
        <div className="image-container">
          <a href={this.props.business.url} target="_blank" rel="noopener noreferrer">
            <img
              src={this.props.business.imageSrc}
              alt={this.props.business.name}
            />
          </a>
        </div>
        <h2>{business.name}</h2>
        <div className="Business-information">
          <div className="Business-address">
            <a
              href={`http://maps.google.com/?q=${this.props.business.address}, ${this.props.business.city}, ${this.props.business.state}, ${this.props.business.zipCode}`}
              target="_blank" rel="noopener noreferrer"
            >
              <p>{this.props.business.address}</p>
              <p>{this.props.business.city}</p>
              <p>{`${this.props.business.state} ${this.props.business.zipCode}`}</p>
            </a>
          </div>
          <div className="Business-reviews">
            <h3>{this.props.business.category}</h3>
            <h3 className="rating">{`${this.props.business.rating} stars`}</h3>
            <p>{`${this.props.business.reviewCount} reviews`}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Business;
