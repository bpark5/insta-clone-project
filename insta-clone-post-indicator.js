/**
 * Copyright 2026 Brandon Park
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `insta-clone-project`
 * 
 * @demo index.html
 * @element insta-clone-project
 */
export class InstaClonePostIndicator extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-clone-post-indicator";
  }

  constructor() {
        super();
    }

    static get properties() {
    return {
      ...super.properties,
      currentIndex: { type: Number },
      totalPosts: { type: Number }
    };
    }

    static get styles() {
    return [super.styles,
    css`
        :host {
            display: block;
            text-align: center;
        }

        .dot.active {
            color: var(--ddd-theme-default-skyBlue);
            cursor: not-allowed;
        }

        .dot {
            color: var(--ddd-theme-default-limestoneGray);
            font-size: var(--ddd-font-size-4xs);
            cursor: pointer;
        }

        .dot:not(.active):hover {
            opacity: 0.7;
        }
    `];
    }

    render() {
        let dots = [];
        for (let i = 0; i < this.totalPosts; i++) {
            dots.push(html`
                <span @click="${this._handleDotClick}" 
                data-index="${i}" 
                class = "dot ${i === this.currentIndex ? "active" : ""}">
                ●
                </span>`);
        }
        return html`
            <div class="dots">
                ${dots}
            </div>`;
    }

    _handleDotClick(e) {
        const indexChange = new CustomEvent("insta-clone-index-changed", {
        composed: true,
        bubbles: true,
        detail: {
            index: parseInt(e.currentTarget.dataset.index)
            },
        });
        this.dispatchEvent(indexChange);
    }

}

globalThis.customElements.define(InstaClonePostIndicator.tag, InstaClonePostIndicator);