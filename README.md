## Summary

This logo was created for the Tram-One Project, it was designed by Daniel Jurman.
This version is built off of a single SVG. It uses svgexport to build png variants.

Additionally, you may import this as a javascript module. This will give you access to the png and svg files in your project.

## Usage

You can use any of the assets in your projects by directly refrencing the assets from npm.

You can get the svg by pulling directly from the root, or an image from pulling from a specific png found in `dist`:

```
https://unpkg.com/@tram-one/tram-logo@4
```

```
https://unpkg.com/@tram-one/tram-logo@4/dist/color_1024x1024.png
```

You can also install this as a JS module, and then point to the dist for the pngs, or import the svg directly (both of which require a bundler that supports asset imports, the following examples are using parcel).

```
npm i @tram-one/tram-logo
```

```js
import logo from "@tram-one/tram-logo";

const logoElement = document.createElement("img");
logoElement.src = logo;
```

You can also import the rendered images directly from the module as well.

```js
import logo from "@tram-one/tram-logo/dist/color_512x512.png";

const logoElement = document.createElement("img");
logoElement.src = logo;
```

### Using Variants

This package also includes some variants of the logo, both a non-color black version, and a neon version. These can be used by importing the css associated with these variants, or directly referencing the rendered pngs.

This requires loading the svg as an inline element, if you are using parcel, you can use the `bundle-text` in the import (see example below).

```js
import logo from "bundle-text:@tram-one/tram-logo";
import "@tram-one/tram-logo/variants/neon.css";

const logoElement = document.createElement("section");
logoElement.innerHTML = logo;
```

## Build Instructions

To build the logo images, and all variants, you'll need to serve the css assets, and then in a separate tab, run the build command. Once the build command has finished, you can kill the webserver.

```
npm ci
npm run serve
npm run build
```

## Links

You can check out more of Daniel Jurman's work at the following link: http://www.danieljurman.com/
