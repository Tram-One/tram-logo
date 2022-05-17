import logoSVG from "bundle-text:../logo.svg";

const element = document.createElement("div");
element.innerHTML = logoSVG;
export default element.querySelector("svg");
