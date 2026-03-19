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
export class InstaClonePost extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-clone-post";
  }

  constructor() {
        super();
        this.username = "";
        this.channelTitle = "";
        this.active = false;
        this.postImage = "";
        this.imageDescription = "";
        this.channelImage = "";
        this.channelImageDescription = "";
    }

    static get properties() {
    return {
      ...super.properties,
      username: { type: String },
      channelTitle: { type: String },
      active: { type: Boolean, reflect: true },
      postImage: {type: String},
      imageDescription: {type: String},
      channelImage: {type: String},
      channelImageDescription: {type:String}
    };
    }

    static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        height: 550px;
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

        .channel-title {
            display: flex;
            align-items: center;
            gap: var(--ddd-spacing-2);
        }

        .channel-title h2{
            font: var(--ddd-font-size-l) var(--ddd-font-primary);
            color: var(--ddd-theme-default-beaverBlue);
            margin: var(--ddd-spacing-4) 0 0 0;
        }

        .channel-title img {
            width: 40px;
            height: 40px;
            border-radius: var(--ddd-radius-circle);
            margin-top: var(--ddd-spacing-3);
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
            margin-left: auto;
            margin-right: auto;
            margin-bottom: var(--ddd-spacing-3);
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
        <div class="channel-title">
            <img src=${this.channelImage} alt=${this.channelImageDescription}>
            <h2><strong>${this.channelTitle}</strong></h2>
        </div> 
        <div class="username">
            <h4><strong>${this.username}</strong></h4>
        </div>
        
        <div class="post-image">
            <img src=${this.postImage} alt=${this.imageDescription}>
        </div>
        <div class="post-caption">
        <p>
            <strong>${this.username}</strong> <slot></slot> 
        </p>
        </div>`;
    }

}

globalThis.customElements.define(InstaClonePost.tag, InstaClonePost);