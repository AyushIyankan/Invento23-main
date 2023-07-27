/* eslint-disable @typescript-eslint/no-non-null-assertion */
import './scss/main.scss'

import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)

// function debugCss() {
//     const sheet = window.document.styleSheets[1]
//     sheet.insertRule(
//         `
// * {
//     outline: 1px red solid !important;
//     visibility: visible !important;
// }`,
//         sheet.cssRules.length,
//     )
// }

// function clearDebugCss() {}

// window.debugCss = debugCss
