import {
  menu_styles_default
} from "./chunk.Z75LPS3C.js";
import {
  SlMenuItem
} from "./chunk.IF2QOIQ5.js";
import {
  ShoelaceElement
} from "./chunk.PZ6RRH2A.js";
import {
  __decorateClass
} from "./chunk.6M63UXML.js";

// src/components/menu/menu.component.ts
import { html } from "lit";
import { query } from "lit/decorators.js";
var SlMenu = class extends ShoelaceElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "menu");
  }
  handleClick(event) {
    if (!(event.target instanceof SlMenuItem)) {
      return;
    }
    const item = event.target;
    if (item.type === "checkbox") {
      item.checked = !item.checked;
    }
    this.emit("sl-select", { detail: { item } });
  }
  handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      const item = this.getCurrentItem();
      event.preventDefault();
      event.stopPropagation();
      item == null ? void 0 : item.click();
    } else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      const items = this.getAllItems();
      const activeItem = this.getCurrentItem();
      let index = activeItem ? items.indexOf(activeItem) : 0;
      if (items.length > 0) {
        event.preventDefault();
        event.stopPropagation();
        if (event.key === "ArrowDown") {
          index++;
        } else if (event.key === "ArrowUp") {
          index--;
        } else if (event.key === "Home") {
          index = 0;
        } else if (event.key === "End") {
          index = items.length - 1;
        }
        if (index < 0) {
          index = items.length - 1;
        }
        if (index > items.length - 1) {
          index = 0;
        }
        this.setCurrentItem(items[index]);
        items[index].focus();
      }
    }
  }
  handleMouseDown(event) {
    const target = event.target;
    if (this.isMenuItem(target)) {
      this.setCurrentItem(target);
    }
  }
  handleSlotChange() {
    const items = this.getAllItems();
    if (items.length > 0) {
      this.setCurrentItem(items[0]);
    }
  }
  isMenuItem(item) {
    var _a;
    return item.tagName.toLowerCase() === "sl-menu-item" || ["menuitem", "menuitemcheckbox", "menuitemradio"].includes((_a = item.getAttribute("role")) != null ? _a : "");
  }
  /** @internal Gets all slotted menu items, ignoring dividers, headers, and other elements. */
  getAllItems() {
    return [...this.defaultSlot.assignedElements({ flatten: true })].filter((el) => {
      if (el.inert || !this.isMenuItem(el)) {
        return false;
      }
      return true;
    });
  }
  /**
   * @internal Gets the current menu item, which is the menu item that has `tabindex="0"` within the roving tab index.
   * The menu item may or may not have focus, but for keyboard interaction purposes it's considered the "active" item.
   */
  getCurrentItem() {
    return this.getAllItems().find((i) => i.getAttribute("tabindex") === "0");
  }
  /**
   * @internal Sets the current menu item to the specified element. This sets `tabindex="0"` on the target element and
   * `tabindex="-1"` to all other items. This method must be called prior to setting focus on a menu item.
   */
  setCurrentItem(item) {
    const items = this.getAllItems();
    items.forEach((i) => {
      i.setAttribute("tabindex", i === item ? "0" : "-1");
    });
  }
  render() {
    return html`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `;
  }
};
SlMenu.styles = menu_styles_default;
__decorateClass([
  query("slot")
], SlMenu.prototype, "defaultSlot", 2);

export {
  SlMenu
};
