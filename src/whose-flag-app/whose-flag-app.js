import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-layout.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-styles/color.js';

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
        paper-button.another:hover {
          background: var(--paper-light-blue-500);
        }
        paper-button.answer {
          background: var(--paper-purple-500);
          flex-grow: 1;
        }
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
      <div id="flag-image-container">
        <iron-image
          id="flag-image"
          preload fade src="data/svg/BR.svg">
        </iron-image>
        <div id="answer-button-container">
          <paper-button id="optionA" class="answer" on-click="_selectAnswer">[[countryA]]</paper-button>
          <paper-button id="optionB" class="answer" on-click="_selectAnswer">[[countryB]]</paper-button>
        </div>
        <p>[[outputMessage]]</p>
        <paper-button class="another" id="another">Another!</paper-button>
      </div>
    `;
  }
  static get properties() {
    return {
      countryA: {
        type: String,
        value: "Brazil"
      },
      countryB: {
        type: String,
        value: "Uruguay"
      },
      outputMessage: {
        type: String,
        value: ""
      },
      correctAnswer: {
        type: String,
        value: "Brazil"
      },
      userAnswer: {
        type: String,
        value: "Brazil"
      }
    };
  }

  _selectAnswer(event) {
    let clickedButton = event.target;
    this.userAnswer = clickedButton.textContent;
    if (this.userAnswer == this.correctAnswer) {
      this.outputMessage = `${this.userAnswer} is correct!`;
    }
    else {
      this.outputMessage = `Nope! The correct answer is ${this.correctAnswer}!`;
    }
  }
}

window.customElements.define('whose-flag-app', WhoseFlagApp);
