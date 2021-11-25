# Chrome Extension - Get Firebase JWT Token

When pressing the extension button, it performs a `console.log();` on the current page with the JWT token.
The extension will only load for:

```text
https://app.altaninsights.com/
https://staging-app.altaninsights.com/
```

## Build

```bash
npm run build
```

or

```bash
npm run build:dev
```

## Instructions to load the extension

Build the project:

```bash
npm install
```

```bash
npm run build
```

Load the extension:

- open the `chrome://extension` URL in Google Chrome
- activate `Developer mode` (top right corner)
- click on `Load unpacked`
- select the `dist` folder that was generated when building the extension

## Add a keyboard shortcut

You can add keyboard shortcuts for any Chrome Extension, without the need of any code to be written.  
(if you add a keyboard shortcut for "activating the extension")

- open the `chrome://extension` URL in Google Chrome
- open the hamburger menu (top left) ( `=` )
- `Keyboard shortcuts`
- find the extension name in the list
- click the edit (pencil) button for the `Activate the extension` hook
