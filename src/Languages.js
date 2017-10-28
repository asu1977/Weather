import React, { Component, PropTypes } from 'react';
import { database } from './firebase';
import './Languages.css';

class Languages extends Component {
  constructor(props) {
    super(props);
  }

  languageSelect() {
    database.ref('/languages')
            .set(true);
  }

  languageDeselect() {
    database.ref('/languages')
            .set(false);
  }

  render () {
    const { language } = this.props;
    // const localLanguage = language && Object.values(language)['0'];
    // console.log(localLanguage);
    return (
      <section className="Languages">
        {
          !language
          ? <button onClick={this.languageSelect}>
              Выбрать русский язык
            </button>
          :
            <button  className="destructive" onClick={this.languageDeselect}>
              Select english language
            </button>
        }
      </section>
    );
  }
}

Languages.propTypes = {
  user: PropTypes.object,
  language: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default Languages;
