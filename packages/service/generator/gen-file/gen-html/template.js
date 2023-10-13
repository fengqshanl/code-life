const head = [
    `<meta charset="UTF-8" />`,
    `<link rel="icon" type="image/svg+xml" href="/vite.svg" />`,
    `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`,
    `<title>Vite + Vue</title>`
]

const body = [
    `<div id="app"></div>`,
    `<script type="module" src="/src/main.js"></script>`
]

exports.html = '<!doctype html>' + '<html lang="en">' + `<head>${head.join('')}</head>` + `<body>${body.join('')}</body>` + '</html>'
