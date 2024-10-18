/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
// Generated stylesheet for ./iconbutton/internal/shared-styles.css.
import { css } from 'lit';
export const styles = css `
:host {
    display: inline-flex;
    outline: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    height: var(--_container-height);
    width: var(--_container-width);
    justify-content: center
}

:host([touch-target=wrapper]) {
    margin: max(0px, (48px - var(--_container-height))/2) max(0px, (48px - var(--_container-width))/2)
}

md-focus-ring {
    --md-focus-ring-shape-start-start: var(--_container-shape-start-start);
    --md-focus-ring-shape-start-end: var(--_container-shape-start-end);
    --md-focus-ring-shape-end-end: var(--_container-shape-end-end);
    --md-focus-ring-shape-end-start: var(--_container-shape-end-start)
}

:host([disabled]) {
    pointer-events: none
}

.icon-button {
    place-items: center;
    background: none;
    border: none;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    place-content: center;
    outline: none;
    padding: 0;
    position: relative;
    text-decoration: none;
    user-select: none;
    z-index: 0;
    flex: 1;
    border-start-start-radius: var(--_container-shape-start-start);
    border-start-end-radius: var(--_container-shape-start-end);
    border-end-start-radius: var(--_container-shape-end-start);
    border-end-end-radius: var(--_container-shape-end-end)
}

.icon ::slotted(*) {
    font-size: var(--_icon-size);
    height: var(--_icon-size);
    width: var(--_icon-size);
    font-weight: inherit
}

md-ripple {
    z-index: -1;
    border-start-start-radius: var(--_container-shape-start-start);
    border-start-end-radius: var(--_container-shape-start-end);
    border-end-start-radius: var(--_container-shape-end-start);
    border-end-end-radius: var(--_container-shape-end-end)
}

.flip-icon .icon {
    transform: scaleX(-1)
}

.icon {
    display: inline-flex
}

.link {
    height: 100%;
    outline: none;
    position: absolute;
    width: 100%
}

.touch {
    position: absolute;
    height: max(48px, 100%);
    width: max(48px, 100%)
}

:host([touch-target=none]) .touch {
    display: none
}

@media(forced-colors: active) {
    :host([disabled]) {
        --_disabled-icon-opacity: 1
    }
}
`;
//# sourceMappingURL=shared-styles.js.map