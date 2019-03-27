import str from './svg';

let div = document.createElement("div");
div.innerHTML = str;
let target = div.getElementsByTagName("svg")[0];

target.setAttribute("aria-hidden", "true");

target.style.position = "absolute";
target.style.width = 0;
target.style.height = 0;
target.style.overflow = "hidden";

document.body.insertBefore(target, document.body.firstChild);