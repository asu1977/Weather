import React, { Component } from 'react';
import { auth, database } from './firebase';
import CurrentUser from './CurrentUser';
import SignIn from './SignIn';
import NewWeather from './NewWeather';
import Weather from './Weather';
import Languages from './Languages';
import './App.css';

// import map from 'lodash/map';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      weather: null,
      language: null
    };

    this.lenguageRef = database.ref('/');
    this.restaurantRef = database.ref('/weather'); //weather
  }

  componentDidMount() {
    this.lenguageRef.on('value', (snapshot) => {
      this.setState({ language: snapshot.val() });
    });

    auth.onAuthStateChanged((currentUser) => {
      this.setState({ currentUser });
      console.log(currentUser);
      this.restaurantRef.on('value', (snapshot) => {
        this.setState({ weather: snapshot.val() });
      });
    });
  }

  render() {
    const { currentUser, weather, language } = this.state;
    const localLanguage = language && Object.values(language)['0'];
    console.log(language);
    return (
      <div className="Application">
        <header className="Application--header">
          {
            !localLanguage
            ? <h1>Weather in the cities of the world</h1>
            : <h1>Погода в городах мира</h1>
          }
        </header>
        
        <div>
          {!currentUser && <SignIn />}
          {
            currentUser &&
            <div>
              <Languages
                language={localLanguage}
              />
              <NewWeather />
              <Weather weather={weather} user={currentUser} />
              <CurrentUser user={currentUser} />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
