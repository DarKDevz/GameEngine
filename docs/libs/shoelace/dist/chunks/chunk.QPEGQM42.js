import {
  component_styles_default
} from "./chunk.TUVJKY7S.js";

// src/components/carousel-item/carousel-item.styles.ts
import { css } from "lit";
var carousel_item_styles_default = css`
  ${component_styles_default}

  :host {
    --aspect-ratio: inherit;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-height: 100%;
    aspect-ratio: var(--aspect-ratio);
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }

  ::slotted(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export {
  carousel_item_styles_default
};
