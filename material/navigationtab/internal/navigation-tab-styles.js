/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
// Generated stylesheet for ./labs/navigationtab/internal/navigation-tab-styles.css.
import { css } from 'lit'
export const styles = css`
:host {
    --_active-indicator-color: var(--md-navigation-bar-active-indicator-color, var(--md-sys-color-secondary-container, #e8def8));
    --_active-indicator-height: var(--md-navigation-bar-active-indicator-height, 32px);
    --_active-indicator-shape: var(--md-navigation-bar-active-indicator-shape, var(--md-sys-shape-corner-full, 9999px));
    --_active-indicator-width: var(--md-navigation-bar-active-indicator-width, 64px);
    --_active-focus-icon-color: var(--md-navigation-bar-active-focus-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));
    --_active-focus-label-text-color: var(--md-navigation-bar-active-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));
    --_active-focus-state-layer-color: var(--md-navigation-bar-active-focus-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));
    --_active-hover-icon-color: var(--md-navigation-bar-active-hover-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));
    --_active-hover-label-text-color: var(--md-navigation-bar-active-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));
    --_active-hover-state-layer-color: var(--md-navigation-bar-active-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));
    --_active-icon-color: var(--md-navigation-bar-active-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));
    --_active-label-text-color: var(--md-navigation-bar-active-label-text-color, var(--md-sys-color-on-surface, #1d1b20));
    --_active-label-text-weight: var(--md-navigation-bar-active-label-text-weight, var(--md-sys-typescale-label-medium-weight-prominent, var(--md-ref-typeface-weight-bold, 700)));
    --_active-pressed-icon-color: var(--md-navigation-bar-active-pressed-icon-color, var(--md-sys-color-on-secondary-container, #1d192b));
    --_active-pressed-label-text-color: var(--md-navigation-bar-active-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));
    --_active-pressed-state-layer-color: var(--md-navigation-bar-active-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));
    --_container-color: var(--md-navigation-bar-container-color, var(--md-sys-color-surface-container, #f3edf7));
    --_container-elevation: var(--md-navigation-bar-container-elevation, 2);
    --_container-height: var(--md-navigation-bar-container-height, 80px);
    --_container-shape: var(--md-navigation-bar-container-shape, var(--md-sys-shape-corner-none, 0px));
    --_focus-state-layer-opacity: var(--md-navigation-bar-focus-state-layer-opacity, 0.12);
    --_hover-state-layer-opacity: var(--md-navigation-bar-hover-state-layer-opacity, 0.08);
    --_icon-size: var(--md-navigation-bar-icon-size, 24px);
    --_inactive-focus-icon-color: var(--md-navigation-bar-inactive-focus-icon-color, var(--md-sys-color-on-surface, #1d1b20));
    --_inactive-focus-label-text-color: var(--md-navigation-bar-inactive-focus-label-text-color, var(--md-sys-color-on-surface, #1d1b20));
    --_inactive-focus-state-layer-color: var(--md-navigation-bar-inactive-focus-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));
    --_inactive-hover-icon-color: var(--md-navigation-bar-inactive-hover-icon-color, var(--md-sys-color-on-surface, #1d1b20));
    --_inactive-hover-label-text-color: var(--md-navigation-bar-inactive-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));
    --_inactive-hover-state-layer-color: var(--md-navigation-bar-inactive-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));
    --_inactive-icon-color: var(--md-navigation-bar-inactive-icon-color, var(--md-sys-color-on-surface-variant, #49454f));
    --_inactive-label-text-color: var(--md-navigation-bar-inactive-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));
    --_inactive-pressed-icon-color: var(--md-navigation-bar-inactive-pressed-icon-color, var(--md-sys-color-on-surface, #1d1b20));
    --_inactive-pressed-label-text-color: var(--md-navigation-bar-inactive-pressed-label-text-color, var(--md-sys-color-on-surface, #1d1b20));
    --_inactive-pressed-state-layer-color: var(--md-navigation-bar-inactive-pressed-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));
    --_label-text-font: var(--md-navigation-bar-label-text-font, var(--md-sys-typescale-label-medium-font, var(--md-ref-typeface-plain, Roboto)));
    --_label-text-line-height: var(--md-navigation-bar-label-text-line-height, var(--md-sys-typescale-label-medium-line-height, 1rem));
    --_label-text-size: var(--md-navigation-bar-label-text-size, var(--md-sys-typescale-label-medium-size, 0.75rem));
    --_label-text-tracking: var(--md-navigation-bar-label-text-tracking, );
    --_label-text-type: var(--md-navigation-bar-label-text-type, var(--md-sys-typescale-label-medium-weight, var(--md-ref-typeface-weight-medium, 500)) var(--md-sys-typescale-label-medium-size, 0.75rem) / var(--md-sys-typescale-label-medium-line-height, 1rem) var(--md-sys-typescale-label-medium-font, var(--md-ref-typeface-plain, Roboto)));
    --_label-text-weight: var(--md-navigation-bar-label-text-weight, var(--md-sys-typescale-label-medium-weight, var(--md-ref-typeface-weight-medium, 500)));
    --_pressed-state-layer-opacity: var(--md-navigation-bar-pressed-state-layer-opacity, 0.12);
    display: flex;
    flex-grow: 1
}

md-focus-ring {
    --md-focus-ring-shape: var(--md-sys-shape-corner-small, 8px);
    --md-focus-ring-inward-offset: -1px
}

.md3-navigation-tab {
    align-items: center;
    appearance: none;
    background: none;
    border: none;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    min-height: 48px;
    min-width: 48px;
    outline: none;
    padding: 8px 0px 12px;
    position: relative;
    text-align: center;
    width: 100%;
    font-family: var(--_label-text-font);
    font-size: var(--_label-text-size);
    line-height: var(--_label-text-line-height);
    font-weight: var(--_label-text-weight);
    text-transform: inherit
}

.md3-navigation-tab::-moz-focus-inner {
    border: 0;
    padding: 0
}

.md3-navigation-tab__icon-content {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 1
}

.md3-navigation-tab__label-text {
    height: 16px;
    margin-top: 4px;
    opacity: 1;
    transition: opacity 100ms cubic-bezier(0.4, 0, 0.2, 1), height 100ms cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1
}

.md3-navigation-tab--hide-inactive-label:not(.md3-navigation-tab--active) .md3-navigation-tab__label-text {
    height: 0;
    opacity: 0
}

.md3-navigation-tab__active-indicator {
    display: flex;
    justify-content: center;
    opacity: 0;
    position: absolute;
    transition: width 100ms cubic-bezier(0.4, 0, 0.2, 1), opacity 100ms cubic-bezier(0.4, 0, 0.2, 1);
    width: 32px;
    background-color: var(--_active-indicator-color);
    border-radius: var(--_active-indicator-shape)
}

.md3-navigation-tab--active .md3-navigation-tab__active-indicator {
    opacity: 1
}

.md3-navigation-tab__active-indicator,
.md3-navigation-tab__icon-content {
    height: var(--_active-indicator-height)
}

.md3-navigation-tab--active .md3-navigation-tab__active-indicator,
.md3-navigation-tab__icon-content {
    width: var(--_active-indicator-width)
}

.md3-navigation-tab__icon {
    fill: currentColor;
    align-self: center;
    display: inline-block;
    position: relative;
    width: var(--_icon-size);
    height: var(--_icon-size);
    font-size: var(--_icon-size)
}

.md3-navigation-tab__icon.md3-navigation-tab__icon--active {
    display: none
}

.md3-navigation-tab--active .md3-navigation-tab__icon {
    display: none
}

.md3-navigation-tab--active .md3-navigation-tab__icon.md3-navigation-tab__icon--active {
    display: inline-block
}

.md3-navigation-tab__ripple {
    z-index: 0
}

.md3-navigation-tab--active {
    --md-ripple-hover-color: var(--_active-hover-state-layer-color);
    --md-ripple-pressed-color: var(--_active-pressed-state-layer-color);
    --md-ripple-hover-opacity: var(--_hover-state-layer-opacity);
    --md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)
}

.md3-navigation-tab--active .md3-navigation-tab__icon {
    color: var(--_active-icon-color)
}

.md3-navigation-tab--active .md3-navigation-tab__label-text {
    color: var(--_active-label-text-color)
}

.md3-navigation-tab--active:hover .md3-navigation-tab__icon {
    color: var(--_active-hover-icon-color)
}

.md3-navigation-tab--active:hover .md3-navigation-tab__label-text {
    color: var(--_active-hover-label-text-color)
}

.md3-navigation-tab--active:focus .md3-navigation-tab__icon {
    color: var(--_active-focus-icon-color)
}

.md3-navigation-tab--active:focus .md3-navigation-tab__label-text {
    color: var(--_active-focus-label-text-color)
}

.md3-navigation-tab--active:active .md3-navigation-tab__icon {
    color: var(--_active-pressed-icon-color)
}

.md3-navigation-tab--active:active .md3-navigation-tab__label-text {
    color: var(--_active-pressed-label-text-color)
}

.md3-navigation-tab:not(.md3-navigation-tab--active) {
    --md-ripple-hover-color: var(--_inactive-hover-state-layer-color);
    --md-ripple-pressed-color: var(--_inactive-pressed-state-layer-color);
    --md-ripple-hover-opacity: var(--_hover-state-layer-opacity);
    --md-ripple-pressed-opacity: var(--_pressed-state-layer-opacity)
}

.md3-navigation-tab:not(.md3-navigation-tab--active) .md3-navigation-tab__icon {
    color: var(--_inactive-icon-color)
}

.md3-navigation-tab:not(.md3-navigation-tab--active) .md3-navigation-tab__label-text {
    color: var(--_inactive-label-text-color)
}

.md3-navigation-tab:not(.md3-navigation-tab--active):hover .md3-navigation-tab__icon {
    color: var(--_inactive-hover-icon-color)
}

.md3-navigation-tab:not(.md3-navigation-tab--active):hover .md3-navigation-tab__label-text {
    color: var(--_inactive-hover-label-text-color)
}

.md3-navigation-tab:not(.md3-navigation-tab--active):focus .md3-navigation-tab__icon {
    color: var(--_inactive-focus-icon-color)
}

.md3-navigation-tab:not(.md3-navigation-tab--active):focus .md3-navigation-tab__label-text {
    color: var(--_inactive-focus-label-text-color)
}

.md3-navigation-tab:not(.md3-navigation-tab--active):active .md3-navigation-tab__icon {
    color: var(--_inactive-pressed-icon-color)
}

.md3-navigation-tab:not(.md3-navigation-tab--active):active .md3-navigation-tab__label-text {
    color: var(--_inactive-pressed-label-text-color)
}

.link {
    height: 100%;
    outline: none;
    position: absolute;
    width: 100%
}
`
//# sourceMappingURL=navigation-tab-styles.js.map