const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function downloadAllImages() {
  const colorButtons = [...document.querySelectorAll("#color-controls button")];
  const sizeButtons = [...document.querySelectorAll("#size-controls button")];
  const [pngButton, svgButton] = [...document.querySelectorAll("#download-controls button")];

  for (colorButton in colorButtons) {
    colorButtons[colorButton].click();
    await delay(100);
    for (sizeButton in sizeButtons) {
      sizeButtons[sizeButton].click();
      await delay(100);

      // download a png for every size
      pngButton.click();
      await delay(100);
    }

    // at the end (512), also download an svg
    svgButton.click();
  }
}
