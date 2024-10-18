/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
// Generated stylesheet for ./field/internal/shared-styles.css.
import { css } from 'lit'
export const styles = css`
:host {
    display: inline-flex;
    resize: both
}

.field {
    display: flex;
    flex: 1;
    flex-direction: column;
    writing-mode: horizontal-tb;
    max-width: 100%
}

.container-overflow {
    border-start-start-radius: var(--_container-shape-start-start);
    border-start-end-radius: var(--_container-shape-start-end);
    border-end-end-radius: var(--_container-shape-end-end);
    border-end-start-radius: var(--_container-shape-end-start);
    display: flex;
    height: 100%;
    position: relative
}

.container {
    align-items: center;
    border-radius: inherit;
    display: flex;
    flex: 1;
    max-height: 100%;
    min-height: 100%;
    min-width: min-content;
    position: relative
}

.field,
.container-overflow {
    resize: inherit
}

.resizable:not(.disabled) .container {
    resize: inherit;
    overflow: hidden
}

.disabled {
    pointer-events: none
}

@layer styles {

    .start,
    .middle,
    .end {
        display: flex;
        box-sizing: border-box;
        height: 100%;
        position: relative
    }

    .start {
        color: var(--_leading-content-color)
    }

    .end {
        color: var(--_trailing-content-color)
    }

    .start,
    .end {
        align-items: center;
        justify-content: center
    }

    .with-start .start,
    .with-end .end {
        min-width: 48px
    }

    .with-start .start {
        margin-inline-end: 4px
    }

    .with-end .end {
        margin-inline-start: 4px
    }

    .middle {
        align-items: stretch;
        align-self: baseline;
        flex: 1
    }

    .content {
        color: var(--_content-color);
        display: flex;
        flex: 1;
        opacity: 0;
        transition: opacity 83ms cubic-bezier(0.2, 0, 0, 1)
    }

    .no-label .content,
    .focused .content,
    .populated .content {
        opacity: 1;
        transition-delay: 67ms
    }

    :is(.disabled, .disable-transitions) .content {
        transition: none
    }

    .content ::slotted(*) {
        all: unset;
        color: currentColor;
        font-family: var(--_content-font);
        font-size: var(--_content-size);
        line-height: var(--_content-line-height);
        font-weight: var(--_content-weight);
        width: 100%;
        overflow-wrap: revert;
        white-space: revert
    }

    .content ::slotted(:not(textarea)) {
        padding-top: var(--_top-space);
        padding-bottom: var(--_bottom-space)
    }

    .content ::slotted(textarea) {
        margin-top: var(--_top-space);
        margin-bottom: var(--_bottom-space)
    }

    :hover .content {
        color: var(--_hover-content-color)
    }

    :hover .start {
        color: var(--_hover-leading-content-color)
    }

    :hover .end {
        color: var(--_hover-trailing-content-color)
    }

    .focused .content {
        color: var(--_focus-content-color)
    }

    .focused .start {
        color: var(--_focus-leading-content-color)
    }

    .focused .end {
        color: var(--_focus-trailing-content-color)
    }

    .disabled .content {
        color: var(--_disabled-content-color)
    }

    .disabled.no-label .content,
    .disabled.focused .content,
    .disabled.populated .content {
        opacity: var(--_disabled-content-opacity)
    }

    .disabled .start {
        color: var(--_disabled-leading-content-color);
        opacity: var(--_disabled-leading-content-opacity)
    }

    .disabled .end {
        color: var(--_disabled-trailing-content-color);
        opacity: var(--_disabled-trailing-content-opacity)
    }

    .error .content {
        color: var(--_error-content-color)
    }

    .error .start {
        color: var(--_error-leading-content-color)
    }

    .error .end {
        color: var(--_error-trailing-content-color)
    }

    .error:hover .content {
        color: var(--_error-hover-content-color)
    }

    .error:hover .start {
        color: var(--_error-hover-leading-content-color)
    }

    .error:hover .end {
        color: var(--_error-hover-trailing-content-color)
    }

    .error.focused .content {
        color: var(--_error-focus-content-color)
    }

    .error.focused .start {
        color: var(--_error-focus-leading-content-color)
    }

    .error.focused .end {
        color: var(--_error-focus-trailing-content-color)
    }
}

@layer hcm {
    @media(forced-colors: active) {
        .disabled :is(.start, .content, .end) {
            color: GrayText;
            opacity: 1
        }
    }
}

@layer styles {
    .label {
        box-sizing: border-box;
        color: var(--_label-text-color);
        overflow: hidden;
        max-width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        z-index: 1;
        font-family: var(--_label-text-font);
        font-size: var(--_label-text-size);
        line-height: var(--_label-text-line-height);
        font-weight: var(--_label-text-weight);
        width: min-content
    }

    .label-wrapper {
        inset: 0;
        pointer-events: none;
        position: absolute
    }

    .label.resting {
        position: absolute;
        top: var(--_top-space)
    }

    .label.floating {
        font-size: var(--_label-text-populated-size);
        line-height: var(--_label-text-populated-line-height);
        transform-origin: top left
    }

    .label.hidden {
        opacity: 0
    }

    .no-label .label {
        display: none
    }

    .label-wrapper {
        inset: 0;
        position: absolute;
        text-align: initial
    }

    :hover .label {
        color: var(--_hover-label-text-color)
    }

    .focused .label {
        color: var(--_focus-label-text-color)
    }

    .disabled .label {
        color: var(--_disabled-label-text-color)
    }

    .disabled .label:not(.hidden) {
        opacity: var(--_disabled-label-text-opacity)
    }

    .error .label {
        color: var(--_error-label-text-color)
    }

    .error:hover .label {
        color: var(--_error-hover-label-text-color)
    }

    .error.focused .label {
        color: var(--_error-focus-label-text-color)
    }
}

@layer hcm {
    @media(forced-colors: active) {
        .disabled .label:not(.hidden) {
            color: GrayText;
            opacity: 1
        }
    }
}

@layer styles {
    .supporting-text {
        color: var(--_supporting-text-color);
        display: flex;
        font-family: var(--_supporting-text-font);
        font-size: var(--_supporting-text-size);
        line-height: var(--_supporting-text-line-height);
        font-weight: var(--_supporting-text-weight);
        gap: 16px;
        justify-content: space-between;
        padding-inline-start: var(--_supporting-text-leading-space);
        padding-inline-end: var(--_supporting-text-trailing-space);
        padding-top: var(--_supporting-text-top-space)
    }

    .supporting-text :nth-child(2) {
        flex-shrink: 0
    }

    :hover .supporting-text {
        color: var(--_hover-supporting-text-color)
    }

    .focus .supporting-text {
        color: var(--_focus-supporting-text-color)
    }

    .disabled .supporting-text {
        color: var(--_disabled-supporting-text-color);
        opacity: var(--_disabled-supporting-text-opacity)
    }

    .error .supporting-text {
        color: var(--_error-supporting-text-color)
    }

    .error:hover .supporting-text {
        color: var(--_error-hover-supporting-text-color)
    }

    .error.focus .supporting-text {
        color: var(--_error-focus-supporting-text-color)
    }
}

@layer hcm {
    @media(forced-colors: active) {
        .disabled .supporting-text {
            color: GrayText;
            opacity: 1
        }
    }
}
`