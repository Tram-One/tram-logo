define`
	<logo-preview size="" variant="color" background="white" viewbox="0 0 864 864">
		<style>
			#container {
				margin: auto;
				width: ${"size"}px;
				background: ${"background"};
				border-radius: 2em;
    		padding: 2em;

				/* box-shadow styling copied from open-props */
				box-shadow: rgba(3, 4, 7, 0.12) 0px -1px 2px 0px, rgba(3, 4, 7, 0.13) 0px 3px 2px -2px, rgba(3, 4, 7, 0.13) 0px 7px 5px -2px, rgba(3, 4, 7, 0.14) 0px 12px 10px -2px, rgba(3, 4, 7, 0.15) 0px 22px 18px -2px, rgba(3, 4, 7, 0.16) 0px 41px 33px -2px, rgba(3, 4, 7, 0.17) 0px 100px 80px -2px
			}

			#css-object {
				height: 0;
			}
		</style>
		<div id="container" svg-title="${"variant"}.svg" png-title="${"variant"}_${"size"}.png">
			<object id="logo-object" data="./logo.svg" onload="onSVGLoad(this)"></object>
		</div>
	</logo-preview>
`;

function onSVGLoad(objectNode) {
  // load the SVG inline
  // based on https://stackoverflow.com/a/72804140/864715
  objectNode.parentNode.replaceChild(objectNode.contentDocument.documentElement, objectNode);
  onSizeUpdate();
}

const logoPreview = html`<logo-preview size="512"></logo-preview>`;

const copySVGAttribute = (sourceName, targetName) => {
  const svgLogo = logoPreview.shadowRoot.querySelector("svg");
  const attrValue = logoPreview.getAttribute(sourceName);
  svgLogo.setAttribute(targetName, attrValue);
};

/* helper function to update the size of the logo */
const onSizeUpdate = () => {
  copySVGAttribute("size", "width");
  copySVGAttribute("size", "height");
};

/* helper function to update viewbox window */
const onViewboxUpdate = () => {
  copySVGAttribute("viewbox", "viewBox");
};

addAttributeListener(logoPreview, "size", onSizeUpdate);
addAttributeListener(logoPreview, "viewbox", onViewboxUpdate);

document.body.appendChild(logoPreview);

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
