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
      data: '',
      dataF: ''
    };

    this.weatherRef = database.ref('/weather'); 
    this.handleSubmit = this.handleSubmit.bind(this);
    this.seveTemper = this.seveTemper.bind(this);
    this.switchMetrik = this.switchMetrik.bind(this);
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

  }

  seveTemper() {
    this.weatherRef.push({ name: this.state.name + " " + this.state.data });    
  }

  switchMetrik() {
    // var f = this.state.data * 9 / 5 + 32;
    console.log("switchMetrik");
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
          {this.state.data ?
            <div className="temp">
              <div className="temp-switch">
                <label className="switch-light switch-candy-yellow"
                  onClick=  {this.switchMetrik}>
                  <input type="checkbox" />

                  <span>
                    <span>°C</span>
                    <span>°F</span>
                    <a></a>
                  </span>
                </label>
              </div>
            </div>
            : null}

          <p className="temp-wrapper">
            <span className="temp">{ name }  { data }</span>
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
