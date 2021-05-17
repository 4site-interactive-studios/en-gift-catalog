import scss from "./sass/main.scss";
import noUiSlider from 'nouislider';

import {donations, tooltips} from './config.js';

const inputDonation = document.querySelector("*[name='transaction.donationAmt.other']");

if (inputDonation) {
  inputDonation.value = 0;
  const donationButtons = document.querySelector(".en__field--donationAmt");
  donationButtons.style.display = "none";
  displayDonationSliders();
}

function displayDonationSliders() {

  let donationsHTML = '';

  donations.forEach(e => {
    donationsHTML += `<div class="en__component en__component en__component--column">
    <div class="en__component--wrap">
      ${e.urgent ? "<div class='en__component--urgent'>" + e.urgentContent + "</div>" : ''}
      <img src="${e.imageURL}" border="0" />
      <div class="en__component en__component--content">
        <div class="en__component en__component--slider-wrap">
          <div class="en__component--start-price">${e.startPrice}</div>
          <div class="en__component en__component--slider">
              <div class="slider"></div>
          </div><!-- en__component--slider -->
          <div class="en__component--end-price">${e.endPrice}</div>
        </div><!-- en__component--slider-wrap -->
        ${e.content}
      </div>
    </div>
  </div>`
  });

  const shoppingCart = document.querySelector(".en__component--row--2");
  shoppingCart.insertAdjacentHTML('beforebegin', `
  <div class="en__component en__component--row en__component--row--3">
    ${donationsHTML}
  </div>`);

  const values = [];
  const sliders = document.querySelectorAll('.slider');

  const radioButtonsContainer = document.querySelector(".en__field__element--radio");
  const radioButtons = radioButtonsContainer.children;
  const secondLastRadio = radioButtons[radioButtons.length - 2];
  const inputBtn = secondLastRadio.firstElementChild;
  inputBtn.checked = true;

  const tooltipFormat = {
    to: function(value) { 
      if (!value) {
        return `<span class="tooltip-value tooltip-value--zero">${tooltips[value]}</span>`;
      } else {
        return '$' + value + `<br><span class="tooltip-value">${tooltips[value]}</span>`;
      }
    },
    from: function(value) { 
      return value; 
    }
  }

  if (sliders) {
    setSliders();
  }

  function setSliders() {
    sliders.forEach((slider, index) => {
      values.push[0];
      createSlider(slider, index);
    });
  }

  function createSlider(slider, index) {
    noUiSlider.create(slider, {
      start: [0],
      step: 20,
      connect: 'lower',
      tooltips: [tooltipFormat],
      range: {
          'min': [0],
          'max': [100]
      },
      pips: {
        mode: 'values',
        values: [0, 100],
        density: 20,
      }
    });

    slider.noUiSlider.on('change', function(e) {
      const newValue = +e[0];
      values[index] = newValue;
      updateInput();
    });

  }

  function updateInput() {
    const result = values.reduce((acc, current) => {
      return acc + current;
    });
    inputDonation.value = result;
  }

}