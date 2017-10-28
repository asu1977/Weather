import React, { Component, PropTypes } from 'react';
import { database } from './firebase';
import './NewWeather.css';
import axios from 'axios';
// import xhr from 'xhr';

class NewWeather extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      data: ''
    };

    this.weatherRef = database.ref('/weather'); 
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    var name = encodeURIComponent(this.state.name);
    var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    var urlSuffix = '&APPID=3425fac33b452fd80674320f618f5dfb&units=metric';
    var url = urlPrefix + name + urlSuffix;

    var self = this;

    // xhr({
    //   url: url
    // }, (err, data) => {
    //   self.setState({
    //     data: JSON.parse(data.body)
    //   });
    // });

    axios.get(url)
      .then(
        (results) => {
          self.setState({
            data: results.data.list[0].main.temp
          });
        }
      );

    // var currentTemp = '';
    // if (this.state.data) {
    //   currentTemp = this.state.data.list[0].main.temp;
    // }
    
    // name = name + " " + currentTemp + "°C";

    // this.setState({name: name});

    console.log(this.state.data);

    this.weatherRef.push({ name: this.state.name + " " + this.state.data });
  }

  render() {
    const { name } = this.state;

    return (
      <form
        className="NewWeather"
      >
        <input
          type="text"
          value={ name }
          placeholder="Temperature in the city"
          onChange={(event) => this.setState({ name: event.target.value })}
        />
        <button
          onClick={this.handleSubmit}
          disabled={!name}
        >
          Submit
        </button>
      </form>
    );
  }
}

NewWeather.propTypes = {
  weatherRef: PropTypes.object
};

export default NewWeather;
