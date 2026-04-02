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
export class InstaClonePostArrow extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-clone-post-arrow";
  }

  constructor() {
        super();
    }

    static get properties() {
    return {
      ...super.properties,
      currentIndex: {type: Number},
      totalPosts: {type: Number}
    };
    }

    static get styles() {
    return [super.styles,
    css`
        :host {
            display: block;
            position: absolute;
            top: 50%;
            left: var(--ddd-spacing-0);
            right: var(--ddd-spacing-0);
        }

        .insta-clone-post-arrow-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
      }

        .left-arrow, .right-arrow {
        background-color: light-dark(var(--ddd-theme-default-white),var(--ddd-theme-default-coalyGray));
        color: light-dark(var(--ddd-theme-default-link), var(--ddd-theme-default-skyLight));
        border: var(--ddd-border-md);
        border-color: light-dark(var(--ddd-theme-default-link), var(--ddd-theme-default-skyLight));
        padding: var(--ddd-spacing-1) var(--ddd-spacing-3);
        margin: 0 -15px;
        border-radius: var(--ddd-radius-circle);
        font-size: var(--ddd-font-size-xs);
        cursor: pointer;
        }

        .left-arrow:hover, .right-arrow:hover {
            opacity: 0.7;
        }

        .left-arrow:disabled, .right-arrow:disabled {
            opacity: 0.3;
            cursor: not-allowed;
        }
    `];
    }

    render() {
        return html ` 
        <div class=insta-clone-post-arrow-wrapper>
            <button class="left-arrow" @click=${() => this.dispatchEvent(new CustomEvent("previous-slide", {composed: true, bubbles: true}))} ?disabled=${this.currentIndex === 0}><strong>‹</strong></button>
            <button class="right-arrow" @click=${() => this.dispatchEvent(new CustomEvent("next-slide", {composed: true, bubbles: true}))} ?disabled=${this.currentIndex === this.totalPosts - 1}><strong>›</strong></button>
        </div>`;
    }

}

globalThis.customElements.define(InstaClonePostArrow.tag, InstaClonePostArrow);