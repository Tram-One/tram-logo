define`
	<preview-controls>
		<style>
			#preview-controls {
				margin-top: 1em;
				margin-bottom: 1.2em;
			}
			#options {
				display: flex;
				justify-content: space-around;
				margin-bottom: 5px;
			}

			@media only screen and (max-width: 800px) {
				#options {
					display: flex;
					flex-direction: column;
					gap: 5px;
				}

				#url-preview {
					margin: auto;
					display: flex;
					flex-direction: column;
					gap: 5px;
					width: 512px;
				}
			}

			/* if we're on a touch screen, make the buttons bigger */
			@media (pointer:coarse) {
				button {
					font-size: 2em;
				}
			}

			#color-controls button#${"variant"} {
				font-weight: bold;
			}

			#size-controls button#x${"size"} {
				font-weight: bold;
			}
		</style>
		<div id="preview-controls">
			<div id="options">
				<div id="color-controls">
					<button id="color" onclick="updateVariant('color', 'white')">Color</button>
					<button id="neon" onclick="updateVariant('neon', 'black')">Neon</button>
					<button id="black" onclick="updateVariant('black')">Black</button>
					<button id="lite" onclick="updateVariant('lite', 'black', '90 550 100 100')">Lite</button>
				</div>
				<div id="size-controls">
					<button id="x32" onclick="updateSize('32')">32x</button>
					<button id="x64" onclick="updateSize('64')">64x</button>
					<button id="x128" onclick="updateSize('128')">128x</button>
					<button id="x256" onclick="updateSize('256')">256x</button>
					<button id="x512" onclick="updateSize('512')">512x</button>
				</div>
				<div id="download-controls">
					<button onclick="downloadPNG()">Download PNG</button>
					<button onclick="downloadSVG()">Download SVG</button>
				</div>
			</div>
			<div id="url-preview">
				<input disabled value="https://unpkg.com/@tram-one/tram-logo@5/dist/${"variant"}.svg" size="55" />
				<input disabled value="https://unpkg.com/@tram-one/tram-logo@5/dist/${"variant"}_${"size"}.png" size="55" />
			</div>
    </div>
	</preview-controls>
`;

// curly braces to put this in it's own context, so we don't collide const definitions
{
  const logoPreview = document.querySelector("logo-preview");
  const previewControls = document.querySelector("preview-controls");

  addAttributeListener(logoPreview, "variant", () => {
    previewControls.setAttribute("variant", logoPreview.getAttribute("variant"));
  });

  addAttributeListener(logoPreview, "size", () => {
    previewControls.setAttribute("size", logoPreview.getAttribute("size"));
  });
}

function updateSize(size) {
  logoPreview.setAttribute("size", size);
}

async function updateVariant(variant, background = "#DEDEDE", viewbox = "0 0 864 864") {
  logoPreview.setAttribute("viewbox", viewbox);
  logoPreview.setAttribute("background", background);
  logoPreview.setAttribute("variant", variant);

  const cssFile = await fetch(`./variants/${variant}.css`);
  const cssContent = await cssFile.text();

  const [stylePlaceholder] = queryAllDOM(".style-placeholder");
  stylePlaceholder.innerHTML = cssContent;
}
