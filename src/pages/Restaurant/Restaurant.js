import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import { connect } from 'react-redux';
import moment from 'moment';
import { postReview, fetchReviews } from '../../actions/ReviewActions';
import { fetchRestaurant } from '../../actions/RestaurantActions';
import ReserveForm from '../../components/ReserveForm/ReserveForm';
import 'rc-calendar/assets/index.css';

require('./Restaurant.css');

class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      newReview: {
        rating: 0
      }
    }
  }

  componentDidMount() {
    this.props.fetchRestaurant(this.props.match.params.id);
    this.props.fetchReviews(this.props.match.params.id);
  }

  componentWillReceiveProps(props) {
    if (props.reservationDone) this.props.history.push('/customer');
  }

  onSubmitReview = (e)=>{
    e.preventDefault();
    let data = {
      content: this.refs.content.value,
      rating: this.state.newReview.rating,
      date: moment().format('YYYY-MM-DD HH:mm:ss'),
      restaurantId: parseInt(this.props.match.params.id),
      customerName: this.props.userName
    };
    this.props.postReview(data);
  }

  onStarClick(nextValue, prevValue, name) {
    let newReview = {...this.state.newReview};
    newReview.rating = nextValue;
    this.setState({ newReview })
  }

  renderReviews() {
    let reviews = this.props.reviews;
    if (reviews && reviews.length) {
      return reviews.map((review)=>{
        return (
          <div className="media col-xs-12" key={review.id}>
            <div className="media-left">
              <span className="glyphicon glyphicon-user"></span>
            </div>
            <div className="media-body">
              <h4 className="media-heading">{review.user.firstName} {review.user.lastName}</h4>
              <div className="row rating">
                <span className="col-xs-12 review-rating">Rating: {review.rating} stars</span>
              </div>
              <p className="review-content">
                {review.content}
              </p>
            </div>
          </div>
        )
      })
    }
  }

  render() {
    if (this.props.isLogout) return (<Redirect to="/" />)
    if (!this.props.isAuthenticated) return (<Redirect to="/login" />)
    if (!this.props.restaurant) { return <div>Loading...</div>}
    return (
      <div className="restaurant">
        <div className="row">
          <h3 className="title col-xs-12">{this.props.restaurant.name}</h3>
          <p className="address">
            {this.props.restaurant.address}
          </p>
        </div>

        <div className="row">
          <StarRatingComponent
            name="rating"
            value={this.props.reviewRating}
            emptyStarColor={'lightgray'}
            editing={false}
          />
          <span className="rating-count">
            { this.props.reviews && this.props.reviews.length } reviews
          </span>
        </div>

        { this.props.role === 'CUSTOMER' &&
          <ReserveForm timeslotOptions={this.props.restaurant.timeslotOptions}
            capacity={this.props.restaurant.capacity}
          />
        }

        <div className="row reviews">
          <div className="row">
            <h3 className="col-xs-3">Reviews</h3>
          </div>
          <div className="row">
            <span className="review-label">Rating:</span>
            <StarRatingComponent
              className="review-star"
              name="rating"
              value={this.state.newReview.rating}
              onStarClick={this.onStarClick.bind(this)}
              emptyStarColor={'lightgray'}
            />
          </div>
          { this.props.role === 'CUSTOMER' &&
            <form className="form-horizontal" onSubmit={this.onSubmitReview}>
              <textarea className="form-control" rows="3" placeholder="Your comment" ref="content"></textarea>
              <div className="form-group">
                <button type="submit" className="btn btn-default">
                  Submit
                </button>
              </div>
            </form>
          }

          {this.renderReviews()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userName: state.auth.userName,
    isAuthenticated: state.auth.isAuthenticated,
    role: state.auth.role,
    restaurant: state.restaurant.restaurant,
    reviews: state.review.reviews,
    reviewRating: state.review.reviewRating,
    reservationDone: state.reservation.isSubmitted
  }
}

export default connect(mapStateToProps, { postReview, fetchReviews,  fetchRestaurant })(Restaurant);
