/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
// Generated stylesheet for ./fab/internal/shared-styles.css.
import { css } from 'lit';
export const styles = css `
:host {
    --md-ripple-hover-opacity: var(--_hover-state-layer-opacity);
    --md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity);
    display: inline-flex;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
}

:host([size=medium][touch-target=wrapper]) {
    margin: max(0px, 48px - var(--_container-height))
}

:host([size=large][touch-target=wrapper]) {
    margin: max(0px, 48px - var(--_large-container-height))
}

.fab,
.icon,
.icon ::slotted(*) {
    display: flex
}

.fab {
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    padding: 0;
    position: relative;
    height: var(--_container-height);
    transition-property: background-color;
    border-width: 0px;
    outline: none;
    z-index: 0;
    text-transform: inherit;
    --md-elevation-level: var(--_container-elevation);
    --md-elevation-shadow-color: var(--_container-shadow-color);
    background-color: var(--_container-color);
    --md-ripple-hover-color: var(--_hover-state-layer-color);
    --md-ripple-pressed-color: var(--_pressed-state-layer-color)
}

.fab.extended {
    width: inherit;
    box-sizing: border-box;
    padding-inline-start: 16px;
    padding-inline-end: 20px
}

.fab:not(.extended) {
    width: var(--_container-width)
}

.fab.large {
    width: var(--_large-container-width);
    height: var(--_large-container-height)
}

.fab.large .icon ::slotted(*) {
    width: var(--_large-icon-size);
    height: var(--_large-icon-size);
    font-size: var(--_large-icon-size)
}

.fab.large,
.fab.large .ripple {
    border-start-start-radius: var(--_large-container-shape-start-start);
    border-start-end-radius: var(--_large-container-shape-start-end);
    border-end-start-radius: var(--_large-container-shape-end-start);
    border-end-end-radius: var(--_large-container-shape-end-end)
}

.fab.large md-focus-ring {
    --md-focus-ring-shape-start-start: var(--_large-container-shape-start-start);
    --md-focus-ring-shape-start-end: var(--_large-container-shape-start-end);
    --md-focus-ring-shape-end-end: var(--_large-container-shape-end-end);
    --md-focus-ring-shape-end-start: var(--_large-container-shape-end-start)
}

.fab:focus {
    --md-elevation-level: var(--_focus-container-elevation)
}

.fab:hover {
    --md-elevation-level: var(--_hover-container-elevation)
}

.fab:active {
    --md-elevation-level: var(--_pressed-container-elevation)
}

.fab.lowered {
    background-color: var(--_lowered-container-color);
    --md-elevation-level: var(--_lowered-container-elevation)
}

.fab.lowered:focus {
    --md-elevation-level: var(--_lowered-focus-container-elevation)
}

.fab.lowered:hover {
    --md-elevation-level: var(--_lowered-hover-container-elevation)
}

.fab.lowered:active {
    --md-elevation-level: var(--_lowered-pressed-container-elevation)
}

.fab .label {
    color: var(--_label-text-color)
}

.fab:hover .fab .label {
    color: var(--_hover-label-text-color)
}

.fab:focus .fab .label {
    color: var(--_focus-label-text-color)
}

.fab:active .fab .label {
    color: var(--_pressed-label-text-color)
}

.label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: var(--_label-text-font);
    font-size: var(--_label-text-size);
    line-height: var(--_label-text-line-height);
    font-weight: var(--_label-text-weight)
}

.fab.extended .icon ::slotted(*) {
    margin-inline-end: 12px
}

.ripple {
    overflow: hidden
}

.ripple,
md-elevation {
    z-index: -1
}

.touch-target {
    position: absolute;
    top: 50%;
    height: 48px;
    left: 50%;
    width: 48px;
    transform: translate(-50%, -50%)
}

:host([touch-target=none]) .touch-target {
    display: none
}

md-elevation,
.fab {
    transition-duration: 280ms;
    transition-timing-function: cubic-bezier(0.2, 0, 0, 1)
}

.fab,
.ripple {
    border-start-start-radius: var(--_container-shape-start-start);
    border-start-end-radius: var(--_container-shape-start-end);
    border-end-start-radius: var(--_container-shape-end-start);
    border-end-end-radius: var(--_container-shape-end-end)
}

md-focus-ring {
    --md-focus-ring-shape-start-start: var(--_container-shape-start-start);
    --md-focus-ring-shape-start-end: var(--_container-shape-start-end);
    --md-focus-ring-shape-end-end: var(--_container-shape-end-end);
    --md-focus-ring-shape-end-start: var(--_container-shape-end-start)
}

.icon ::slotted(*) {
    width: var(--_icon-size);
    height: var(--_icon-size);
    font-size: var(--_icon-size)
}

.link {
    height: 100%;
    outline: none;
    position: absolute;
    width: 100%
}
`;
//# sourceMappingURL=shared-styles.js.map