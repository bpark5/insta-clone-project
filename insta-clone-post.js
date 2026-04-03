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
        this.postData = null;
        this.caption = "";
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
      totalPosts: {type: Number},
      postData: {type: Object},
      caption: {type: String}
    };
    }

    static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        height: 410px;
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

        .user-information {
            padding-top: var(--ddd-spacing-2);
            padding-bottom: var(--ddd-spacing-4);
        }

        .username {
            font: var(--ddd-font-size-xxs) var(--ddd-font-primary);
            color: light-dark(var(--ddd-theme-default-skyBlue), var(--ddd-theme-default-pughBlue));

        }

        .date {
            font: var(--ddd-font-size-4xs) var(--ddd-font-primary);
            color: var(--ddd-theme-default-limestoneGray);
        }

        .post-caption {
            display: flex;
            gap: var(--ddd-spacing-2);
            color: light-dark(var(--ddd-theme-default-beaverBlue), var(--ddd-theme-default-skyLight));
            font: var(--ddd-font-size-4xs) var(--ddd-font-navigation);
            margin-top: -15px;
        }

        .picture-date {
            font: var(--ddd-font-size-4xs) var(--ddd-font-navigation);
            color: var(--ddd-theme-default-limestoneGray);
        }

        .post-image img {
            display: block;
            width: 100%;
            height: 230px;
            object-fit: cover;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: var(--ddd-spacing-3);
            border:  var(--ddd-border-md);
            border-color: light-dark(var(--ddd-theme-default-beaverBlue), var(--ddd-theme-default-skyLight));
        }

        .actions button {
            color: var(--ddd-theme-default-white);
        }

        .like-button {
            background: none;
            border: none;
            font-size: var(--ddd-font-size-xs);
        }

        .share-button {
            background: none;
            border: none;
            font-size: var(--ddd-font-size-xs);
        }

        .like-button:hover, .share-button:hover {
            cursor: pointer;
            opacity: 0.7;
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
        <div class="user-information">
            <span class="username"> <strong>${this.username}</strong> </span> <span class="date">Joined ${this.dateJoined} </span>
        </div>
        <div class="post-image">
            <img src=${this.postImage} alt=${this.imageDescription} loading="lazy">
        </div>
        <div class="actions">
            <span>
                <button class="like-button" @click="${this.storeLike}">
                    ${this.liked ? "❤️" : "🩶"}
                </button>
            </span> 
            <span>
                <button class="share-button" @click="${this.sharePost}">
                🚀
                </button>
            </span>
        </div>
        <div class="post-caption">
        <p>
            <strong>${this.username}</strong> ${this.imageDescription} <span class="picture-date">${this.datePosted}</span>
        </p>
        </div>`;
    }

    updated(changedProperties) {
        if (changedProperties.has("index")) {
            this.loadFromStorage();
        }
        if (changedProperties.has("currentIndex") || changedProperties.has("postData")) {
            if (this.index === this.currentIndex && this.postData) {
                const image = this.postData.image[this.index];
                this.postImage = image.source;
                this.imageDescription = image.title;
                this.datePosted = image.dateTaken;
            }
        }
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

    async sharePost() {
        const url = `${window.location.origin}${window.location.pathname}?activeIndex=${this.index}`;

        try {
            await navigator.clipboard.writeText(url);
            alert("Link copied!");
        }
        catch (err) {
            console.error("Clipboard copy failed", err);
        }
    }
}

globalThis.customElements.define(InstaClonePost.tag, InstaClonePost);