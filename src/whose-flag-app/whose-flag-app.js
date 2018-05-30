import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-layout.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-styles/color.js';
import '@polymer/iron-ajax/iron-ajax.js';

/**
 * @customElement
 * @polymer
 */
class WhoseFlagApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          font-family: Roboto, Noto, sans-serif;
        }
        paper-button {
          color: white;
        }
        paper-button.another {
          background: var(--paper-blue-500);
          width: 100%;
        }
        paper-button:focus {
          outline: 1px dashed var(--paper-purple-900);
        }
        paper-button:focus,
        paper-button.another:hover {
          background: var(--paper-light-blue-500);
        }
        paper-button.answer {
          background: var(--paper-purple-500);
          flex-grow: 1;
        }
        paper-button.answer:focus {
          outline-color: var(--paper-blue-900);
        }
        paper-button.answer:focus,
        paper-button.answer:hover {
          background: var(--paper-pink-500);
        }
        app-toolbar {
          background-color: var(--paper-blue-500);
          color: white;
          margin: 20px 0;
        }
        iron-image {
          border: solid;
          width: 100%;
          --iron-image-width: 100%;
          background-color: white;
        }
        #flag-image-container {
          max-width: 600px;
          width: 100%;
          margin: 0 auto;
        }
        #answer-button-container {
          display: flex; /* or inline-flex */
          flex-flow: row wrap;
          justify-content:space-around;
        }
      </style>
      <app-header>
        <app-toolbar>
          <div main-title>Whose flag is this?</div>
        </app-toolbar>
      </app-header>
      <iron-ajax
        auto
        url="data/countrycodes.json"
        handle-as="json"
        on-response="_handleResponse"></iron-ajax>
      <div id="flag-image-container">
        <iron-image
          id="flag-image"
          preload fade src="[[imgSrc]]">
        </iron-image>
        <div id="answer-button-container">
          <paper-button id="optionA" class="answer" on-click="_selectAnswer">[[countryA.name]]</paper-button>
          <paper-button id="optionB" class="answer" on-click="_selectAnswer">[[countryB.name]]</paper-button>
        </div>
        <p>[[outputMessage]]</p>
        <paper-button class="another" id="another" on-click="_nextFlag">Another!</paper-button>
      </div>
    `;
  }
  static get properties() {
    return {
      countryA: {
        type: Object
      },
      countryB: {
        type: Object
      },
      outputMessage: {
        type: String,
        value: ""
      },
      correctAnswer: {
        type: Object
      },
      imgSrc: {
        type: String,
        computed: '_computeImgSrc(correctAnswer)'
      },
      userAnswer: {
        type: String
      },
      countryList: {
        type: Object
      },
      fullCountryList: Object
    };
  }

  _computeImgSrc(correctAnswer) {
    if (correctAnswer && correctAnswer.code) {
      // Note: since this function will only run once this.correctAnswer is NOT undefined,
      //       and we control the data so correctAnswer will always have a 'code' property
      //       this function's body could just be this return statement:
      return `data/svg/${correctAnswer.code}.svg`;
    }
    return '';
  }

  _selectAnswer(event) {
    let clickedButton = event.target;
    this.userAnswer = clickedButton.textContent;
    if (this.userAnswer == this.correctAnswer.name) {
      this.outputMessage = `${this.userAnswer} is correct!`;
    }
    else {
      this.outputMessage = `Nope! The correct answer is ${this.correctAnswer.name}!`;
    }
  }

  _handleResponse(event) {
    this.fullCountryList = event.detail.response.countrycodes;
    this.countryList = event.detail.response.countrycodes;
    this.__displayQuestion();
  }

  __displayQuestion() {
    this.countryA = undefined;
    this.countryB = undefined;
    this.outputMessage = '';
    while (!this.countryA || !this.countryB || (this.countryA.code == this.countryB.code)){
      this.countryA = this.countryList[this.__getRandomCountry()];
      this.countryB = this.countryList[this.__getRandomCountry()];
    }
    let coin = (Math.floor(Math.random() * 2));
    this.correctAnswer = coin == 1 ? this.countryA : this.countryB;
  }

  __getRandomCountry() {
    return Math.floor(Math.random() * (this.countryList.length));
  }

  _nextFlag() {
    this.countryList = this.__countriesWithout(this.correctAnswer);
    if (this.countryList.length == 1) {
      if (this.__allFlagsAsked()) {
        this.countryList = this.fullCountryList;
      } else {
        this.countryList.push({"name": "Oceania"});
      }
    }
    this.__displayQuestion();
  }

  __allFlagsAsked() {
    return !this.countryA.code || !this.countryB.code;
  }

  __countriesWithout(countryToRemove) {
    return this.countryList.filter(country => country.code !== countryToRemove.code);
  }
}

window.customElements.define('whose-flag-app', WhoseFlagApp);
