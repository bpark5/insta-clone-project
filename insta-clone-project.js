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
function updateQueryParam(key, value) {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set(key, value);
    history.pushState(null, '', currentUrl.toString());
  }

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
    this.channelTitle = "";
    this.channelImage = "";
    this.channelImageDescription = "";
    this.postData = null;
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      currentIndex: {type: Number},
      totalPosts: {type: Number},
      posts: {type: Array},
      channelTitle: { type: String },
      channelImage: {type: String},
      channelImageDescription: {type: String},
      postData: {type: Object}
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
        max-width: 525px;
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4) var(--ddd-spacing-11);
        box-shadow: var(--ddd-boxShadow-sm);
      }

      .channel-header {
        display: flex;
        align-items: center;
        gap: var(--ddd-spacing-2);
      }

      .channel-header h2{
        font: var(--ddd-font-size-l) var(--ddd-font-primary);
        color: var(--ddd-theme-default-beaverBlue);
        margin: var(--ddd-spacing-4) 0 0 0;
    }

      .channel-header img {
        max-width: 40px;
        height: 40px;
        aspect-ratio: 1024 / 576;
        object-fit: cover;
        border-radius: var(--ddd-radius-circle);
        margin-top: var(--ddd-spacing-3);
      }
    `];
  }

  firstUpdated() {
    const urlParam = new URLSearchParams(window.location.search);
    const index = urlParam.get("activeIndex");
    this.currentIndex = index ? parseInt(index) : 0;
    this.posts = Array.from(this.querySelectorAll("insta-clone-post"));
    this.totalPosts = this.posts.length;
    this._updatePosts()
    this.getChannelInformation();
  }

  updated(changedProperties) {
    if (changedProperties.has("currentIndex")) {
      updateQueryParam("activeIndex", this.currentIndex);
    }
  }

  _updatePosts() {
    this.posts.forEach((post, i) => {
      post.currentIndex = this.currentIndex;
      post.index = i;
      post.active = (i === this.currentIndex)});  
      
    const indexChange = new CustomEvent("insta-clone-index-changed", {
        composed: true,
        bubbles: true,
        detail: {index: this.currentIndex},
      });
    this.dispatchEvent(indexChange);
  }

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

  getChannelInformation() {
    fetch(new URL("./postData.json", import.meta.url).href).then((resp) => {
      if (resp.ok) {
          return resp.json();
      }
      throw new Error("Failed to load JSON");
      })
      .then((data) => {
        this.postData = data;
        this.channelTitle = data.author.channelTitle;
        this.channelImage = data.author.profilePicture;
        this.posts.forEach (post => {
          post.postData = data;
          post.username = data.author.username;
        })
      });
  }
  
  // Lit render the HTML
  render() {
    return html`
    
  <div class="wrapper">
    <div class="channel-header">
      <img src=${this.channelImage} alt=${this.channelImageDescription}>
      <h2><strong>${this.channelTitle}</strong></h2>
    </div> 
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