/**
 * Copyright 2026 Brandon Park
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./insta-clone-post.js";
import "./insta-clone-post-arrow.js";
import "./insta-clone-post-indicator.js";

/**
 * `insta-clone-project`
 * 
 * @demo index.html
 * @element insta-clone-project
 */
export class InstaCloneProject extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-clone-project";
  }

  constructor() {
    super();
    this.currentIndex = 0;
    this.totalPosts = 0;
    this.posts = [];
    this.title = "";
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      currentIndex: {type: Number},
      totalPosts: {type: Number},
      posts: {type: Array}
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        background-color: var(--ddd-theme-default-slateMaxLight);
        border-radius: var(--ddd-radius-xs);
        position: relative;
        box-shadow: var(--ddd-boxShadow-sm);
        max-width: 650px;
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4) var(--ddd-spacing-11);
        box-shadow: var(--ddd-boxShadow-sm);
      }
    `];
  }

  firstUpdated() {
    this.posts = Array.from(this.querySelectorAll("insta-clone-post"));
    this.totalPosts = this.posts.length;
    this._updatePosts()
  }

  _updatePosts() {
      this.posts.forEach((slide, i) => slide.active = (i === this.currentIndex));  
        const indexChange = new CustomEvent("insta-clone-index-changed", {
          composed: true,
          bubbles: true,
          detail: {
              index: this.currentIndex
          },
        });
        this.dispatchEvent(indexChange);
      };

  nextSlide() {
    if (this.currentIndex < this.totalPosts - 1) {
      this.currentIndex ++;
    }
    this._updatePosts();
  }

  previousSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
    this._updatePosts();
  }

  handleEvent(e) {
    this.currentIndex = e.detail.index;
    this._updatePosts();
  }

  // Lit render the HTML
  render() {
    return html`
    
<div class="wrapper">
      <insta-clone-post-arrow 
        .currentIndex=${this.currentIndex}
        .totalPosts=${this.totalPosts}
        @previous-slide="${this.previousSlide}"   
        @next-slide="${this.nextSlide}">   
      </insta-clone-post-arrow>
      <slot></slot>
      <insta-clone-post-indicator 
        @insta-clone-index-changed="${this.handleEvent}"
        .currentIndex="${this.currentIndex}" 
        .totalPosts="${this.totalPosts ? this.posts.length : 0 }">
      </insta-clone-post-indicator>
    </div>`;
  }
}

globalThis.customElements.define(InstaCloneProject.tag, InstaCloneProject);