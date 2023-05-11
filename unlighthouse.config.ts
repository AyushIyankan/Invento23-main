// / <reference types="unlighthouse" />
import { defineConfig } from 'unlighthouse'

export default defineConfig({
    // example
    site: 'https://invento-23-git-develop-notgriffith811-gmailcom.vercel.app/',
    scanner: {
        exclude: ['/private-zone/*'],
        skipJavascript: false,
        samples: 3,
    },
    debug: true,
})
