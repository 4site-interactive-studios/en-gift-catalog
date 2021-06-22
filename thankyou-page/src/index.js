import scss from "./sass/main.scss";
import { options } from './config.js';


window.addEventListener('load', (event) => {

  document.querySelector("body").style.cssText = `
    background: url(${options.backgroundImage}) !important;
    background-size: cover !important;
    background-repeat: no-repeat;
    background-attachment: fixed !important;
    background-position: 50% !important;
  `;

  const componentColumns = document.querySelectorAll(".en__component--column");
  componentColumns.forEach(column => {
    column.style.cssText = "background-color: #FFFFFF !important;";
  });

  const hiddenImg = document.querySelectorAll("img");
  hiddenImg.forEach(img => {
    if (img.hasAttribute("hidden")) {
      img.style.display = "none";
    }
  });

  const firstRow = document.querySelector(".en__component--row");
  const heading = document.querySelector("h1");
  
  firstRow.classList.add("radius10");

  firstRow.insertAdjacentHTML('beforebegin', `
    <div class="en__component en__component--row en__component--row--1">
      <div class="en__component en__component en__component--column en__component--column--1"  style="background: transparent !important;">
        <div class="en__component en__component--copyblock">
          <h1>${heading.textContent}</h1>
        </div>
      </div>
    </div>
  `);

  heading.remove();

});
