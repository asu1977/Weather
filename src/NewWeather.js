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
    this.seveTemper = this.seveTemper.bind(this);
  }

  getTemper(name) {
    var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    var urlSuffix = '&APPID=3425fac33b452fd80674320f618f5dfb&units=metric';
    var url = urlPrefix + name + urlSuffix;

    var self = this;

    axios.get(url, 500)
    .then(
      (results) => {
        self.setState({
          data: results.data.list[0].main.temp
        });
      }
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    var name = encodeURIComponent(this.state.name);

    this.getTemper(name);

    console.log("temp", this.state.data);

  }

  seveTemper() {
    this.weatherRef.push({ name: this.state.name + " " + this.state.data });    
  }

  render() {
    const { name, data } = this.state;

    return (
      <div>
        <form
          className="NewWeather"
        >
          <input
            type="text"
            value={ name }
            placeholder="Temperature in the city"
            onChange={(event) => this.setState({ name: event.target.value })}
          />

          <p className="temp-wrapper">
            <span className="temp">{ name }  { data }</span>
            <span className="temp-symbol">°C</span>
          </p>

          <button
            onClick={this.handleSubmit}
            disabled={!name}
          >
            Submit
          </button>
        </form>
        <button
          onClick={this.seveTemper}
          disabled={!data}
        >
          Save
        </button>
      </div>
    );
  }
}

NewWeather.propTypes = {
  weatherRef: PropTypes.object
};

export default NewWeather;
