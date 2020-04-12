export default (content, helmet) => {
  return `<!doctype html>
            <html lang="en">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                ${helmet.meta.toString()}
                ${helmet.title.toString()}
                <link rel="icon" href="/assets/favicon.ico" type="image/x-icon"/>
                <link rel="shortcut icon" href="/assets/favicon.ico" type="image/x-icon"/>
                ${content.linkTags}
                ${content.styleTags}
            </head>
            <body>
                <div id="app">${content.html}</div>
                <script>
                    window.__INITIAL_STATE__ = ${content.initialData};
                </script>
                ${content.scriptTags}
            </body>
            </html>`;
};
