/**
 * Copyright 2026 Brandon Park
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./insta-clone-post-indicator.js"

/**
 * `insta-clone-project`
 * 
 * @demo index.html
 * @element insta-clone-project
 */
export class InstaClonePost extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-clone-post";
  }

  constructor() {
        super();
        this.username = "";
        this.active = false;
        this.postImage = "";
        this.imageDescription = "";
        this.liked = false;        
    }

    static get properties() {
    return {
      ...super.properties,
      username: { type: String },
      active: { type: Boolean, reflect: true },
      postImage: {type: String},
      imageDescription: {type: String},
      liked: {type: Boolean},
      index: {type : Number}, 
      currentIndex: {type: Number},
      totalPosts: {type: Number}
    };
    }

    static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        height: 470px;
        }

        .post-caption::-webkit-scrollbar {
        width: var(--ddd-spacing-2);  
        }

        .post-caption::-webkit-scrollbar-track {
        background: var(--ddd-theme-default-limestoneLight); 
        }

        .post-caption::-webkit-scrollbar-thumb {
        background-color: var(--ddd-theme-default-limestoneGray); 
        border-radius: var(--ddd-spacing-5); 
        }

        .username h4{
            font: var(--ddd-font-size-sm) var(--ddd-font-primary);
            color: var(--ddd-theme-default-link);
        }

        .post-caption {
            display: flex;
            gap: var(--ddd-spacing-2);
            color: var(--ddd-theme-default-beaverBlue);
            font: var(--ddd-font-size-4xs) var(--ddd-font-navigation);
            max-height: 90px;
            overflow-y: auto;
        }

        .post-image img {
            display: block;
            max-width: 400px;
            max-height: 250px;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: var(--ddd-spacing-3);
            border:  var(--ddd-border-md);
            border-color: var(--ddd-theme-default-beaverBlue);
        }

        .like-button {
            background: none;
            border: none;
            font-size: var(--ddd-font-size-lg);
            //padding: var(--ddd-spacing-1);
        }

        .like-button:hover, .like-button:focus {
            cursor: pointer;
        }

        :host([active])
        {
            display: block;
        }

        :host(:not([active]))
        {
            display: none;
        }
        

    `];
    }

    render() {
        return html `
        <div class="username">
            <h4><strong>${this.username}</strong></h4>
        </div>
        <div class="post-image">
            <img src=${this.postImage} alt=${this.imageDescription} loading="lazy">
        </div>
        <div class="actions">
            <span>
                <button class="like-button" @click="${this.storeLike}">
               ${this.liked ? "❤️" : "🤍"}
                </button>
            </span> 
        </div>
        <div class="post-caption">
        <p>
            <strong>${this.username}</strong> <slot></slot> 
        </p>
        </div>`;
    }

    firstUpdated() {
        this.getFox();
        this.loadFromStorage();
    }

    getFox() {
        fetch("https://randomfox.ca/floof/").then((resp) => {
        if (resp.ok) {
        return resp.json();
        }
        }).then((data) => {
            this.postImage = data.image;
            });
    }

    saveToStorage() {
        localStorage.setItem("likes-" + this.index, JSON.stringify(this.liked));
    }

    loadFromStorage() {
        const savedLikes = localStorage.getItem("likes-" + this.index);

        if (savedLikes) this.liked = JSON.parse(savedLikes);
    }

    storeLike() {
        this.liked = !this.liked;
        this.saveToStorage();
    }

}

globalThis.customElements.define(InstaClonePost.tag, InstaClonePost);