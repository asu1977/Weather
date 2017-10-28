import React, { Component, PropTypes } from 'react';
import map from 'lodash/map';
import './WeatherItem.css';

class WeatherItem extends Component {
  render () {
    const { name, user, votes, handleDeselect, handleSelect, onDelete } = this.props;
    const userHasSelected = votes && Object.keys(votes).includes(user.uid);

    return (
      <article className="WeatherItem">
        <h3>{ name }</h3>
        <ul>
          { votes && map(votes, (vote, key) => <li key={key}>{ vote }</li>)}
        </ul>
        {
          !userHasSelected
          ? <button onClick={handleSelect}>
              Yea, I'd go there
            </button>
          :
            <button className="destructive" onClick={handleDeselect}>
              Nah, nevermind
            </button>
        }
            <button className="destructive" onClick={onDelete}>
              Delete
            </button>


      </article>
    );
  }
}

WeatherItem.propTypes = {
  name: PropTypes.string,
  votes: PropTypes.object,
  user: PropTypes.object,
  handleSelect: PropTypes.func,
  handleDeselect: PropTypes.func,
  onDelete: PropTypes.func,
};

export default WeatherItem;
