import React, { Component, PropTypes } from 'react';
import WeatherItem from './WeatherItem';
import map from 'lodash/map';
import { database } from './firebase';
import './Weather.css';

class Weather extends Component {
  constructor(props) {
    super(props);
  }

  handleSelect(key) {
    const currentUser = this.props.user;
    database.ref('/weather') //
            .child(key)
            .child('votes')
            .child(currentUser.uid)
            .set(currentUser.displayName);
  }

  handleDeselect(key) {
    const currentUser = this.props.user;
    database.ref('/weather') //
            .child(key)
            .child('votes')
            .child(currentUser.uid)
            .remove();
  }

  onDelete(key) {
    console.log(key);
    database.ref('/weather') //
            .child(key)
            .remove();
  }

  render () {
    const { user, weather } = this.props;
    return (
      <section className="Weather">
        {
          map(weather, (restaurant, key) => {
            return <WeatherItem
                     key={key}
                     {...restaurant}
                     user={user}
                     handleSelect={() => this.handleSelect(key)}
                     handleDeselect={() => this.handleDeselect(key)}
                     onDelete={() => this.onDelete(key)}
                    />;
          })
         }
      </section>
    );
  }
}

Weather.propTypes = {
  user: PropTypes.object,
  weatherRef: PropTypes.object,
  weather: PropTypes.object
};

export default Weather;
