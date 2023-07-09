// the following code is based on
// https://www.beaubus.com/blog/how_to_save_inline_svg_as_png_with_vanilla_javascript_and_html_canvas.html

function download(href, name) {
  var a = html`<a href="${href}" download="${name}"></a>`;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function downloadPNG() {
  const logoPreview = document.querySelector("logo-preview");

  const [svgContainer] = queryAllDOM("#container");
  const svgCode = svgContainer.innerHTML;
  const title = svgContainer.getAttribute("png-title");

  var canvas = document.createElement("canvas"); // create <canvas> element
  // The 2D Context provides objects, methods, and properties to draw
  // and manipulate graphics on a canvas drawing surface.
  var context = canvas.getContext("2d");

  // set canvas with and height equal to png with and height
  canvas.width = logoPreview.getAttribute("size");
  canvas.height = logoPreview.getAttribute("size");

  let image = new Image(); // create <img> element
  image.onload = function () {
    // define fill (specify 'no-repeat' if you don't want it to repeat
    context.fillStyle = context.createPattern(image, "no-repeat");
    // fill rectangle with defined fill
    context.fillRect(0, 0, canvas.width, canvas.height);
    this.download(canvas.toDataURL("image/png"), title);
  }.bind(this);

  // btoa — binary string to ASCII (Base64-encoded)
  image.src = "data:image/svg+xml;base64," + btoa(svgCode);
}

function downloadSVG() {
  const [svgContainer] = queryAllDOM("#container");
  const svgCode = svgContainer.innerHTML;
  const title = svgContainer.getAttribute("svg-title");
  download(window.URL.createObjectURL(new Blob([svgCode], { type: "image/svg" })), title);
}
