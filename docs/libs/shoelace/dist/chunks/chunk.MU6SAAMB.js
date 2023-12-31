import {
  visually_hidden_styles_default
} from "./chunk.IOFPPNUO.js";
import {
  ShoelaceElement
} from "./chunk.PZ6RRH2A.js";

// src/components/visually-hidden/visually-hidden.component.ts
import { html } from "lit";
var SlVisuallyHidden = class extends ShoelaceElement {
  render() {
    return html` <slot></slot> `;
  }
};
SlVisuallyHidden.styles = visually_hidden_styles_default;

export {
  SlVisuallyHidden
};
