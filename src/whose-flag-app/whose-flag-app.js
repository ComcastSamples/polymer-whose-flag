import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-layout.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-button/paper-button.js';

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
          <paper-button id="optionA" class="answer">Brazil</paper-button>
          <paper-button id="optionB" class="answer">Uruguay</paper-button>
        </div>
        <p>A message will go here, telling you if you got it right.</p>
        <paper-button class="another" id="another">Another!</paper-button>
      </div>
    `;
  }
  static get properties() {
    return {

    };
  }
}

window.customElements.define('whose-flag-app', WhoseFlagApp);
