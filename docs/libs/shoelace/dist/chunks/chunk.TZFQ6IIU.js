import {
  avatar_styles_default
} from "./chunk.2WKF4RIH.js";
import {
  SlIcon
} from "./chunk.NDWJOB5Q.js";
import {
  watch
} from "./chunk.C7FWPEOY.js";
import {
  ShoelaceElement
} from "./chunk.PZ6RRH2A.js";
import {
  __decorateClass
} from "./chunk.6M63UXML.js";

// src/components/avatar/avatar.component.ts
import { classMap } from "lit/directives/class-map.js";
import { html } from "lit";
import { property, state } from "lit/decorators.js";
var SlAvatar = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.hasError = false;
    this.image = "";
    this.label = "";
    this.initials = "";
    this.loading = "eager";
    this.shape = "circle";
  }
  handleImageChange() {
    this.hasError = false;
  }
  render() {
    const avatarWithImage = html`
      <img
        part="image"
        class="avatar__image"
        src="${this.image}"
        loading="${this.loading}"
        alt=""
        @error="${() => this.hasError = true}"
      />
    `;
    let avatarWithoutImage = html``;
    if (this.initials) {
      avatarWithoutImage = html`<div part="initials" class="avatar__initials">${this.initials}</div>`;
    } else {
      avatarWithoutImage = html`
        <div part="icon" class="avatar__icon" aria-hidden="true">
          <slot name="icon">
            <sl-icon name="person-fill" library="system"></sl-icon>
          </slot>
        </div>
      `;
    }
    return html`
      <div
        part="base"
        class=${classMap({
      avatar: true,
      "avatar--circle": this.shape === "circle",
      "avatar--rounded": this.shape === "rounded",
      "avatar--square": this.shape === "square"
    })}
        role="img"
        aria-label=${this.label}
      >
        ${this.image && !this.hasError ? avatarWithImage : avatarWithoutImage}
      </div>
    `;
  }
};
SlAvatar.styles = avatar_styles_default;
SlAvatar.dependencies = {
  "sl-icon": SlIcon
};
__decorateClass([
  state()
], SlAvatar.prototype, "hasError", 2);
__decorateClass([
  property()
], SlAvatar.prototype, "image", 2);
__decorateClass([
  property()
], SlAvatar.prototype, "label", 2);
__decorateClass([
  property()
], SlAvatar.prototype, "initials", 2);
__decorateClass([
  property()
], SlAvatar.prototype, "loading", 2);
__decorateClass([
  property({ reflect: true })
], SlAvatar.prototype, "shape", 2);
__decorateClass([
  watch("image")
], SlAvatar.prototype, "handleImageChange", 1);

export {
  SlAvatar
};
