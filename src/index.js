import scss from "./sass/main.scss";
// import noUiSlider from 'nouislider';

import { options, donations } from './config.js';


let isIE = /*@cc_on!@*/false || !!document.documentMode;
if (isIE) {
  window.location.replace("https://support.peta.org/page/30610/donate/1?en_txn7=don::SDHCarepackage-IE11-Redirect&supporter.appealCode=IXXXWBXXXXH");
}


window.enOnValidate = function() {
  let storedDonations = [];
  const currentDonations = document.querySelectorAll(".donationCard");
  currentDonations.forEach((donation, index) => {
    const donationAmount = donation.querySelector(".en__component--donationAmount").textContent;
    const quantity = donation.querySelector(".amount").textContent;
    storedDonations.push({donationAmount: donationAmount, quantity: quantity});
  });
  localStorage.setItem("donations", JSON.stringify(storedDonations));

  const customAmountDonation = document.querySelector(".en__component--customAmount input").value;
  localStorage.setItem("customDonation", customAmountDonation);

  const repeatGift = document.querySelector("*[name='transaction.recurrpay']");
  localStorage.setItem("repeatGift", repeatGift.checked);

  return true;
}

// window.enOnError = function() {
//   console.log('Validation failed');
// }

window.addEventListener('DOMContentLoaded', (event) => {

  const inputDonation = document.querySelector("*[name='transaction.donationAmt.other']");

  const values = [];
  const radioButtonsContainer = document.querySelector(".en__field--donationAmt.en__field--withOther .en__field__element--radio");
  const radioButtons = radioButtonsContainer.children;
  const secondLastRadio = radioButtons[radioButtons.length - 2];
  const inputBtn = secondLastRadio.firstElementChild;
  inputBtn.checked = true;

  const recurrPay = document.querySelector(".en__field--recurrpay");
  recurrPay.classList.add("en__component--carePackage-content");
  recurrPay.querySelector('label.en__field__label').remove();
  recurrPay.querySelector('.en__field__element--checkbox').classList.add('carePackage-content');
  recurrPay.querySelector('.en__field__element--checkbox .en__field__item').classList.add('container');

  const checkbox = recurrPay.querySelector('.en__field__element--checkbox .en__field__item label');
  checkbox.insertAdjacentHTML('beforeend', '<div class="checkmark"></div>');

  recurrPay.insertAdjacentHTML('afterbegin', `
  <div class="carePackage-total">
  <h3>Care Package Total</h3>
  <div class="totalAmount">0</div>
  </div>
  `);

  recurrPay.insertAdjacentHTML('beforeend', `
  <div class="carePackage-image">
  <svg xmlns="http://www.w3.org/2000/svg" width="218" height="200" fill="none" viewBox="0 0 218 200">
        <g clip-path="url(#clip0)">
            <path fill="#754C29" d="M0 70.094c.879-.219.923-1.05 1.23-1.663 4.572-9.625 16.658-11.288 23.559-3.106 1.055 1.225 2.021 1.75 3.648 1.794 7.78.219 13.58 6.257 13.713 14.22.087 6.432.087 12.82 0 19.252 0 1.662.395 2.712 2.021 3.369 2.198.919 3.824 2.625 5.45 4.375 6.198 6.738 12.35 13.433 18.548 20.171.923 1.006 1.846 1.925 3.428 2.1 15.471 1.575 24.393 10.763 29.008 24.896 4.132 12.733 4.791 25.859 4.791 39.116 0 3.544-2.373 5.426-6.285 5.426-13.273.043-26.503 0-39.776 0-1.45 0-2.945.043-4.395-.044-3.429-.131-5.846-2.056-5.626-5.426.527-8.707-3.736-15.051-9.318-21.133-9.186-10.019-18.9-19.558-27.382-30.146-5.714-7.088-9.977-14.92-11.691-23.934-.132-.612-.132-1.356-.923-1.575V70.094zm51.291 85.627c-.22.175-.395.35-.615.481-.44-.569-.835-1.181-1.318-1.663-7.472-8.094-14.856-16.32-22.46-24.283-4.175-4.375-5.89-9.363-5.845-15.27.088-13.214.044-26.384 0-39.598 0-1.006 0-2.056-.22-3.019-.791-3.412-4.043-5.644-7.56-5.294-3.516.35-6.24 3.282-6.24 7-.045 12.69-.045 25.378.043 38.067 0 1.881.352 3.763.66 5.644 1.626 9.32 6.416 17.02 12.57 23.89 8.878 9.976 18.02 19.733 27.03 29.621 5.054 5.47 8.439 11.726 8.702 19.296.044 1.881.835 2.45 2.681 2.45 12.395-.044 24.745-.087 37.14 0 1.89 0 2.549-.612 2.549-2.538-.044-6.869-.484-13.695-1.495-20.477-1.054-7-2.769-13.87-6.329-20.126-4.307-7.526-10.812-11.858-19.47-12.383-3.297-.175-5.538-1.312-7.648-3.719-6.373-7.219-12.966-14.264-19.47-21.396-2.462-2.669-5.407-4.025-9.055-3.194-6.724 1.532-9.054 9.364-4.307 14.658 4.615 5.163 9.362 10.238 14.065 15.358 4.307 4.681 6.021 10.369 6.593 16.495zM28.13 89.346v12.689c0 2.494.044 2.494 2.242 1.575 1.01-.438 2.021-.832 3.12-1.05 1.275-.263 1.67-.919 1.67-2.144-.044-6.563.044-13.127-.044-19.69-.044-2.975-1.67-5.075-4.439-6.213-1.934-.787-2.505-.394-2.549 1.707-.044 4.375 0 8.75 0 13.126zM140.514 200h-21.537c-4.483 0-6.549-1.969-6.505-6.344.088-12.47.748-24.896 4.439-36.973 1.231-4.069 2.901-7.963 5.187-11.551 5.186-8.225 12.658-12.951 22.327-14.22 2.549-.35 4.439-1.269 6.153-3.194 5.758-6.475 11.735-12.82 17.625-19.208 1.802-1.969 3.692-3.763 6.153-4.813 1.275-.525 1.407-1.487 1.407-2.669V82.433c.044-9.276 5.362-14.92 14.636-15.314 1.362-.044 1.889-.875 2.593-1.663 3.604-4.244 8.131-6.125 13.669-4.988 5.406 1.138 8.922 4.463 10.592 9.67.527 1.662.659 3.413.659 5.163 0 10.37-.263 20.695.044 31.065.44 14.964-4.659 27.784-14.328 39.073-8.439 9.801-17.581 18.945-26.151 28.615-1.495 1.706-2.945 3.413-4.351 5.207-3.033 3.806-4.396 8.182-4.396 12.995 0 .656 0 1.312-.044 1.968-.175 3.763-2.153 5.776-5.977 5.82-7.384 0-14.768-.044-22.195-.044zm26.063-44.017c.615-6.344 2.285-12.032 6.636-16.67 4.659-5.032 9.318-10.107 13.933-15.183 2.637-2.887 3.516-6.213 1.89-9.888-2.593-5.951-10.065-7.088-14.724-2.144-6.373 6.738-12.702 13.52-18.767 20.521-2.681 3.106-5.362 5.513-9.757 4.9-.264-.044-.572.088-.879.131-9.318 1.444-15.427 6.957-19.119 15.314-5.406 12.208-6.154 25.246-6.241 38.329 0 1.575 1.01 1.663 2.197 1.663h37.755c1.582 0 2.241-.569 2.285-2.144.264-7.92 3.868-14.352 9.142-20.04 7.955-8.576 15.91-17.108 23.734-25.771 6.153-6.782 11.779-13.957 14.416-22.971 1.055-3.5 1.714-7.088 1.714-10.763.044-12.295.044-24.634 0-36.929 0-4.463-3.252-7.57-7.472-7.307-3.779.22-6.548 3.238-6.548 7.395-.044 13.388-.044 26.821 0 40.21 0 6.082-1.759 11.332-6.11 15.839-7.603 7.963-14.987 16.189-22.459 24.283-.308.482-.615 1.007-1.626 1.225zm23.206-66.637c0-4.463-.044-8.882 0-13.345 0-1.794-.747-2.144-2.329-1.575-2.813 1.006-4.659 3.5-4.659 6.738-.044 5.338 0 10.632 0 15.97 0 4.463 0 4.463 4.175 6.213.22.088.396.175.616.263 2.197.919 2.241.919 2.241-1.575 0-4.245-.044-8.489-.044-12.69z"/>
            <path fill="#A97C50" d="M51.291 155.721c-.571-6.126-2.285-11.77-6.593-16.452-4.703-5.119-9.45-10.151-14.064-15.357-4.747-5.295-2.374-13.127 4.307-14.658 3.648-.831 6.593.481 9.054 3.194 6.505 7.132 13.098 14.133 19.47 21.396 2.154 2.406 4.352 3.544 7.648 3.719 8.703.525 15.164 4.857 19.47 12.382 3.56 6.257 5.275 13.083 6.33 20.127 1.055 6.782 1.494 13.608 1.494 20.477 0 1.925-.66 2.538-2.549 2.538-12.394-.044-24.745-.044-37.14 0-1.845 0-2.636-.569-2.68-2.45-.264-7.614-3.692-13.827-8.703-19.296-9.01-9.845-18.152-19.602-27.03-29.621-6.153-6.914-10.944-14.614-12.57-23.89-.308-1.882-.66-3.763-.66-5.645-.087-12.688-.087-25.377-.043-38.066 0-3.719 2.725-6.65 6.24-7 3.517-.35 6.77 1.881 7.56 5.294.22.963.22 2.013.22 3.019 0 13.214.088 26.384 0 39.598-.044 5.906 1.67 10.894 5.846 15.27 7.604 7.963 14.987 16.189 22.46 24.283.483.525.878 1.138 1.318 1.663.22-.219.395-.35.615-.525z"/>
            <path fill="#A97C50" d="M28.129 89.346c0-4.376-.044-8.751 0-13.126 0-2.1.571-2.494 2.55-1.707 2.768 1.138 4.394 3.238 4.438 6.213.088 6.563.044 13.127.044 19.69 0 1.181-.44 1.881-1.67 2.144-1.055.218-2.11.656-3.12 1.05-2.198.919-2.242.919-2.242-1.575v-12.69zM166.576 155.983c1.055-.175 1.319-.743 1.715-1.181 7.471-8.095 14.855-16.32 22.459-24.284 4.307-4.506 6.109-9.757 6.109-15.839-.044-13.388-.044-26.82 0-40.21 0-4.156 2.725-7.175 6.549-7.394 4.219-.263 7.472 2.844 7.472 7.307.044 12.295.044 24.633 0 36.928 0 3.676-.704 7.22-1.714 10.764-2.638 9.013-8.263 16.189-14.417 22.971-7.867 8.663-15.822 17.195-23.733 25.771-5.275 5.688-8.879 12.12-9.142 20.039-.044 1.576-.704 2.144-2.286 2.144-12.57-.043-25.184-.043-37.754 0-1.187 0-2.242-.087-2.198-1.662.132-13.083.879-26.122 6.241-38.329 3.692-8.357 9.801-13.826 19.119-15.314.308-.044.572-.175.879-.131 4.395.612 7.076-1.838 9.757-4.901 6.066-7 12.395-13.782 18.768-20.52 4.703-4.944 12.13-3.807 14.724 2.144 1.626 3.675.747 7-1.89 9.888-4.615 5.076-9.274 10.107-13.933 15.183-4.439 4.594-6.109 10.282-6.725 16.626z"/>
            <path fill="#A97C50" d="M189.783 89.346v12.689c0 2.494-.044 2.494-2.241 1.575-.22-.088-.396-.175-.616-.263-4.175-1.706-4.175-1.706-4.175-6.213 0-5.338-.044-10.632 0-15.97.044-3.238 1.846-5.732 4.659-6.738 1.582-.569 2.373-.219 2.329 1.575.044 4.463.044 8.882.044 13.345z"/>
            <path fill="#754C29" d="M171.411 62.262c0 9.145-.044 18.245 0 27.39.044 5.644-2.329 9.538-7.603 11.901-15.779 7.045-31.47 14.22-47.204 21.44-5.538 2.538-10.9 2.494-16.394-.044-15.56-7.132-31.074-14.264-46.721-21.221-5.582-2.494-7.955-6.475-7.955-12.47.088-18.158.088-36.36 0-54.517-.044-5.776 2.373-9.67 7.78-12.033C69.003 15.883 84.606 8.97 100.21 1.925c5.801-2.625 11.383-2.581 17.141.088 15.251 6.957 30.502 13.826 45.841 20.52 5.714 2.494 8.219 6.52 8.131 12.602-.044 9.057.088 18.114.088 27.127zm-62.895-6.257c1.011-.35 2.022-.612 2.989-1.006 15.823-7.176 31.601-14.308 47.38-21.527.923-.394 2.154-.656 2.11-2.013-.088-1.137-1.231-1.4-2.066-1.794-15.823-7.088-31.689-14.176-47.512-21.308-1.802-.831-3.472-.788-5.274 0-15.998 7.132-32.04 14.22-48.083 21.308-.835.394-1.978.613-2.066 1.75-.088 1.357 1.187 1.576 2.11 2.013 15.779 7.176 31.601 14.352 47.38 21.527.967.438 2.022.7 3.032 1.05zm-54.5 11.07c0 7.394.088 14.789-.044 22.14-.043 2.494.836 3.981 3.165 5.031 14.548 6.52 29.052 13.17 43.6 19.777 2.989 1.357 3.56 1.007 3.56-2.231 0-15.052 0-30.06.044-45.11 0-2.32-.879-3.676-2.989-4.639C86.804 55.48 72.3 48.83 57.752 42.267c-3.076-1.4-3.736-.963-3.736 2.318v22.49zm109 0V44.673c0-3.282-.703-3.72-3.779-2.319-14.548 6.563-29.052 13.214-43.6 19.777-2.11.962-2.989 2.319-2.945 4.638.088 15.051.044 30.059.044 45.11 0 3.238.571 3.588 3.56 2.232 14.548-6.607 29.052-13.214 43.6-19.777 2.329-1.05 3.208-2.538 3.164-5.076-.131-7.394-.044-14.788-.044-22.183z"/>
            <path fill="#C49A6C" d="M108.517 56.005c-1.055-.35-2.066-.612-2.989-1.006-15.823-7.176-31.601-14.351-47.38-21.527-.923-.394-2.197-.656-2.11-2.013.088-1.137 1.231-1.4 2.066-1.75 15.999-7.132 32.04-14.176 48.083-21.308 1.802-.788 3.472-.832 5.274 0 15.823 7.132 31.69 14.176 47.512 21.308.835.394 1.978.613 2.066 1.794.088 1.356-1.187 1.619-2.11 2.013-15.778 7.175-31.601 14.351-47.38 21.527-.967.35-2.021.612-3.032.962zM54.016 67.075V44.673c0-3.282.703-3.72 3.736-2.319 14.548 6.607 29.052 13.214 43.6 19.777 2.11.962 2.989 2.319 2.989 4.638-.088 15.051-.044 30.059-.044 45.11 0 3.238-.572 3.588-3.56 2.232-14.548-6.607-29.052-13.214-43.6-19.777-2.33-1.05-3.209-2.538-3.165-5.032.132-7.438.044-14.833.044-22.227zM163.016 67.075c0 7.394-.088 14.789.044 22.14.044 2.494-.835 4.025-3.165 5.075-14.548 6.519-29.052 13.17-43.6 19.777-3.032 1.356-3.56 1.006-3.56-2.232 0-15.05 0-30.059-.044-45.11 0-2.319.879-3.72 2.945-4.638 14.548-6.563 29.052-13.214 43.6-19.777 3.077-1.4 3.736-.962 3.78 2.32v22.445z"/>
            <path fill="#E93F23" stroke="#FFF0CA" stroke-miterlimit="10" stroke-width="4.134" d="M106.847 46.948c-.967-.787-3.297-2.319-5.231-3.456-5.757-3.238-6.548-3.72-8.878-5.338-4.307-2.976-6.153-5.951-6.153-9.976 0-1.97.176-2.713.923-3.895 1.275-1.968 3.12-3.456 5.45-4.331 1.67-.656 2.505-.919 5.274-.919 2.901 0 3.516.263 5.23.963 2.11.875 4.22 2.712 4.703 3.981l.264.788.659-1.094c3.824-6.257 16.043-6.17 20.306.175 1.362 2.013 1.494 6.3.307 8.707-1.582 3.15-4.483 5.557-11.251 9.232-4.439 2.407-9.494 6.082-9.845 6.563-.352.613.044.088-1.758-1.4z"/>
            <path fill="#FFF0CA" d="M62.938 63.53c.088-.393.132-.83.264-1.224.22-.656.484-1.269.923-1.663.835-.787 1.846-.787 2.989 0 .747.481 1.362 1.181 1.89 1.97 1.45 2.1 2.241 4.418 2.593 6.868.132.876.176 1.707.132 2.582-.044 1.313-.308 2.538-.967 3.457-.484.656-1.143 1.006-2.022.875-.615-.088-1.187-.438-1.714-.875-.747-.657-1.362-1.444-1.89-2.363-.835-1.356-1.362-2.844-1.758-4.332-.308-1.181-.483-2.362-.527-3.544v-.087c.044-.613.044-1.138.087-1.663zM77.487 57.012c.351.218.659.437.967.743.703.744 1.23 1.62 1.626 2.582.615 1.487.923 2.975 1.055 4.463.044.875.044 1.75-.044 2.581-.176 1.576-.528 2.976-1.363 4.113-.351.525-.835.92-1.406 1.138-1.055.394-2.242-.088-3.209-1.313-.615-.787-1.099-1.663-1.45-2.625-.528-1.444-.791-2.844-.88-4.244-.087-1.575.045-3.02.44-4.376.308-.962.704-1.793 1.319-2.45.571-.569 1.23-.919 2.11-.787h.043c.308 0 .572.087.792.175zM84.695 100.459c-.615-.131-1.23-.612-1.89-.962-1.319-.744-2.637-1.444-3.956-2.144-.967-.481-1.89-.963-2.857-1.4-.615-.306-1.274-.569-1.89-.832-.57-.262-1.186-.393-1.758-.656-1.626-.656-3.164-1.575-4.527-3.063-1.406-1.531-2.197-3.369-2.33-5.381-.043-.394-.087-.788-.043-1.182.044-.656.22-1.269.44-1.837.131-.438.703-2.67 3.691-3.107.396-.044.572-.087 1.055-.175.572-.131 1.143-.263 1.67-.525.88-.481 1.67-1.094 2.462-1.75.703-.613 1.318-1.27 1.978-1.882.835-.743 1.846-1.181 3.032-1.006.88.131 1.714.613 2.418 1.4.659.657 1.758 2.625 1.977 3.238 1.055 2.713 2.066 5.47 3.385 8.095.615 1.225 2.549 4.287 2.725 4.769.527 1.269.879 2.625.967 3.894.175 2.406-.791 4.463-2.901 4.944-.835.175-1.758.131-2.681-.088-.264-.131-.572-.218-.967-.35.395.132-.572-.131 0 0zM99.858 80.639c-.088 1.312-.44 2.494-.967 3.544-.703 1.4-1.626 2.494-2.813 3.281-.923.613-1.89.963-3.076.876-.703-.044-1.407-.307-2.022-.92-.703-.656-1.143-1.487-1.363-2.406-.22-.831-.22-1.662-.131-2.45.307-2.538 1.362-4.375 2.944-5.82.791-.7 1.67-1.224 2.725-1.443.616-.131 1.275-.131 1.978.131 1.187.438 1.978 1.356 2.418 2.713.263.744.351 1.575.307 2.494zM82.893 70.444c.088-1.619.527-3.019 1.142-4.288.484-.919 1.055-1.706 1.758-2.363.791-.7 1.67-1.225 2.813-1.268.88 0 1.714.306 2.506 1.137.615.7.967 1.532 1.186 2.407.264 1.137.308 2.231.132 3.237-.264 2.1-1.01 3.85-2.198 5.251-.659.788-1.45 1.444-2.373 1.75-.66.219-1.318.306-2.11.088-1.054-.307-1.802-1.094-2.329-2.276-.396-.83-.527-1.706-.615-2.581.044-.306.044-.7.088-1.094zM123.064 81.383c.088-.482.132-.963.22-1.444.176-.832.44-1.707.835-2.582.747-1.619 1.67-2.625 2.725-3.063.704-.306 1.275-.262 1.758-.043 1.363.568 2.066 2.012 2.462 3.981.131.7.175 1.488.175 2.32-.044 1.312-.263 2.756-.835 4.33-.439 1.182-1.054 2.145-1.846 2.932-.571.526-1.098.788-1.582.876-.703.13-1.274 0-1.758-.35-.747-.482-1.275-1.357-1.67-2.407-.308-.831-.44-1.794-.484-2.888v-.087c-.043-.525 0-1.05 0-1.575zM136.294 60.25c.308-.132.615-.263.923-.263.659 0 1.143.306 1.494.831.572.788.879 1.925 1.011 3.282.088.787.088 1.619 0 2.494-.132 1.662-.483 3.456-1.186 5.338-.352.875-.748 1.75-1.275 2.537-.967 1.444-2.066 2.188-2.945 2.013-.571-.131-1.011-.525-1.362-1.094-.484-.831-.747-1.969-.835-3.238-.088-1.443 0-2.975.351-4.725.264-1.225.616-2.45 1.187-3.719.527-1.138 1.143-2.144 1.934-2.932l.044-.043c.22-.175.439-.307.659-.482zM143.415 94.946c-.528.482-1.143.7-1.758 1.007-1.187.612-2.418 1.269-3.604 1.969-.879.48-1.758 1.006-2.638 1.575-.571.35-1.186.744-1.758 1.137-.527.35-1.098.788-1.626 1.182-1.494 1.05-2.901 1.706-4.175 1.619-1.319-.044-2.066-1.007-2.198-2.844-.044-.35-.088-.7-.088-1.094.044-.7.22-1.444.352-2.188.132-.569.615-3.325 3.34-6.738.352-.438.528-.7.967-1.225.528-.7 1.055-1.4 1.495-2.188.791-1.356 1.538-2.8 2.241-4.2.615-1.27 1.187-2.582 1.802-3.85.747-1.576 1.67-3.02 2.769-4.114.791-.787 1.538-1.137 2.242-1.137.615 0 1.626.744 1.846 1.094.966 1.575 1.933 3.194 3.208 4.375.571.525 2.373 1.575 2.549 1.838.484.7.835 1.619.923 2.8.176 2.188-.703 5.163-2.593 7.745-.791 1.05-1.582 1.88-2.417 2.625-.264.131-.528.35-.879.612.351-.262-.572.482 0 0zM157.04 60.337c-.044 1.356-.352 2.844-.835 4.375-.616 2.013-1.451 4.07-2.506 5.995-.835 1.487-1.714 2.887-2.813 3.981-.659.656-1.274 1.138-1.889 1.182-.66.087-1.055-.263-1.275-.963-.176-.613-.22-1.356-.176-2.231.264-2.757 1.187-5.645 2.593-8.62.704-1.488 1.539-2.888 2.506-4.157.571-.743 1.186-1.4 1.802-1.881 1.054-.788 1.846-.744 2.241.131.264.525.352 1.225.352 2.188zM141.393 67.775c.087-1.663.439-3.457 1.01-5.338.44-1.356.923-2.713 1.583-4.113.703-1.487 1.538-2.888 2.549-4.069.791-.919 1.582-1.488 2.285-1.4.572.044.923.481 1.099 1.138.264.83.308 1.837.176 2.975-.22 2.319-.879 4.769-1.934 7.307-.571 1.444-1.318 2.844-2.154 4.156-.571.876-1.23 1.663-1.889 2.188-.967.744-1.671.744-2.154.175-.352-.437-.527-1.094-.571-1.881 0-.35-.044-.744 0-1.138z"/>
        </g>
        <defs>
            <clipPath id="clip0">
                <path fill="#fff" d="M0 0H218V200H0z"/>
            </clipPath>
        </defs>
    </svg>
  </div>`);

  if (inputDonation) {
    inputDonation.value = 0;
    const donationButtons = document.querySelector(".en__field--donationAmt");
    donationButtons.style.display = "none";
    window.addEventListener('load', function () {
      displayDonations();
      lastElement();
      moveBasicFields();
      wrapElements();
      showBody();
      carePackageBtn();
      moveError();
      listenMonthlyCheckbox();

      document.querySelector('.en__field--donationAmt.en__field--radio .en__field__element .en__field__item:nth-last-child(2) input').checked = true; // Check the second to last Gift Amount field so that the other amount field is used for the gift amount
    });

    if (localStorage.getItem('repeatGift') === 'true') {
      document.querySelector("*[name='transaction.recurrpay']").checked = true;
    }

  }

  function displayDonations() {

    let donationsHTML = '';
    let localStorageDonations = [];

    if (localStorage.getItem("donations") !== null) {
      localStorageDonations = JSON.parse(localStorage.getItem('donations'));
    }

    donations.forEach((e, i) => {

      donationsHTML += `<div class="en__component en__component en__component--column donationCard">
      <div class="en__component--wrap">
        <div class='en__component--donationAmount ${e.urgent ? 'urgent' : '' }'>${localStorage.getItem('donations') ? localStorageDonations[i].donationAmount : e.donationAmount}</div>
        <img src="${e.imageURL}" border="0" />
        <div class="en__component en__component--content">
          <h1>${e.title}</h1>
          ${e.content}

          <div class="en__component en__component--selectAmount">
            <div class="decrease"></div>
            <div class="amount">${localStorage.getItem('donations') ? localStorageDonations[i].quantity : e.quantity}</div>
            <div class="increase"></div>
          </div><!-- en__component--selectAmount -->
          <div class="en__component--quantity">Quantity</div>

        </div>
      </div>
    </div>`
    });

    if (options.customAmount) {
      donationsHTML += `
      <div class="en__component en__component en__component--column">
        <div class="en__component--wrap en__component--customAmount">
          <div class="en__component en__component--content">
            <h1>Amount of<br>your choice</h1>
            <div class='en__component--customDonationAmount-wrap'>
              <div class='en__component--customDonationAmount'>
                <input type="number" step="any" placeholder="Other Amount" min="0" value="${localStorage.getItem('customDonation') ? localStorage.getItem('customDonation') : 0 }" />
                <div class="en__component--usd">USD</div>
              </div>
            </div>
          </div>
          <img src="${options.customAmountImage}" border="0" />
        </div>
      </div>
      `;
    }
    

    const shoppingCart = document.querySelector(".en__component--row--1");
    shoppingCart.insertAdjacentHTML('beforebegin', `
    <div class="en__component--hero-wrapper">
    <div class="en__component en__component--row en__component--row--1 en__component--hero" style="background: #B64815 url('${options.heroImage}');background-repeat: no-repeat; background-position: right; background-size: contain;">

      <div class="en__component--hero-wrap-responsive">


        
        <div class="en__component--hero-content hero-content-responsive">
          <div class="en__component--hero-logo"></div>
          <div class="en__component--hero-hero-titles">
            <h1>Help a Distressed 'Backyard Dog' Survive the Summer</h1>
          </div>
        </div>

        <img src="${options.heroImageResponsive}" border="0" />
        
        <div class="en__component--hero-content">
          <p>The scorching sun and unrelenting heat of summer can be deadly for a dog kept chained outside without adequate shelter. For as little as $2, you can help provide support and care to a lonely dog, or you can give a sturdy doghouse and some relief to a dog struggling to survive the season’s worst weather, by sponsoring a doghouse.</p>
          <p class="small-bold">Send a care package below—a package of any size will be life-changing for a dog. Plus, our friends at v-dog will donate a 5-pound bag of healthy vegan dog food. Dogs need you!</p>
        </div>

      </div>
      
      <div class="en__component--hero-wrap">
        <div class="en__component--hero-logo"></div>
        <div class="en__component--hero-content">
          <h1>Help a Distressed 'Backyard Dog' Survive the Summer</h1>
          <p>The scorching sun and unrelenting heat of summer can be deadly for a dog kept chained outside without adequate shelter. For as little as $2, you can help provide support and care to a lonely dog, or you can give a sturdy doghouse and some relief to a dog struggling to survive the season’s worst weather, by sponsoring a doghouse.</p>
          <p class="small-bold">Send a care package below—a package of any size will be life-changing for a dog. Plus, our friends at v-dog will donate a 5-pound bag of healthy vegan dog food. Dogs need you!</p>
        </div>
      </div>

    </div>
    </div>
    <div id="en__component--heading" class="en__component en__component--row en__component--row--3 en__component--heading">
      <h1 class="desktop">${options.title}</h1>
      <h1 class="responsive">${options.responsiveTitle}</h1>
    </div>
    <div class="en__component en__component--row en__component--row--3">
      ${donationsHTML}
    </div>
    `);

    const selectAmounts = document.querySelectorAll('.donationCard');
    let customDonationAmount = localStorage.getItem('customDonation') ? +localStorage.getItem('customDonation') : 0;

    if (selectAmounts) {
      getCustomDonationAmount();
      setSelectAmounts();
    }

    function getCustomDonationAmount() {
      const customAmount = document.querySelector('.en__component--customDonationAmount input');

      if (!customAmount){
        return;
      }

      updateInput(customDonationAmount);
      
      customAmount.addEventListener('input', function(e) {
        if (e.target.value === '') {
          customDonationAmount = 0;
          updateInput(0);
        } else {
          customDonationAmount = +e.target.value;
          updateInput(customDonationAmount);
        }
      });

    }

    function setSelectAmounts() {
      selectAmounts.forEach((slider, index) => {
        // values.push[0];
        createSelectAmount(slider, index);
      });
    }

    function createSelectAmount(slider, index) {

      const decrease = slider.querySelector('.decrease');
      const increase = slider.querySelector('.increase');
      const amount = slider.querySelector('.amount');
      const donationAmount = +slider.querySelector('.en__component--donationAmount').textContent;
      const currentAmount = +slider.querySelector('.en__component--selectAmount .amount').textContent;
      values.push({value: donationAmount, amount: currentAmount});

      updateInput(localStorage.getItem('customDonation') ? +localStorage.getItem('customDonation') : 0);

      decrease.addEventListener('click', function(e) {
        // const valueIndex = Math.max(values[index] - 1, 0);
        // values[index] = Math.max(values[index] - donationAmount, 0);
        const newAmount = Math.max(values[index].amount - 1, 0);
        values[index].amount = newAmount;
        amount.innerHTML = newAmount;
        updateInput(customDonationAmount);
      });

      increase.addEventListener('click', function(e) {
        // const valueIndex = Math.min(values[index] + 1, steps.length - 1);
        // values[index] = values[index] + donationAmount;
        const newAmount = values[index].amount + 1
        values[index].amount = newAmount;
        amount.innerHTML = newAmount;
        updateInput(customDonationAmount);
      });
    }

    function updateInput(customAmount) {
      const carePackagesTotal = document.querySelectorAll(".totalAmount");

      const result = values.reduce((acc, current) => {
        return acc + current.value * current.amount;
      }, 0);

      carePackagesTotal.forEach(total => {
        total.innerHTML = (customAmount + result);
      });
      inputDonation.value = (customAmount + result);
    }

  }

  function moveBasicFields() {
    const firstName = document.querySelector(".en__field--firstName");
    const lastName = document.querySelector(".en__field--lastName");
    const emailAddress = document.querySelector(".en__field--emailAddress");
    const country = document.querySelector(".en__field--country");
    country.insertAdjacentElement('beforebegin', firstName);
    country.insertAdjacentElement('beforebegin', lastName);
    country.insertAdjacentElement('beforebegin', emailAddress);
    document.querySelector(".en__donation--billing--info").remove();

    

    const billingInfo = document.querySelector(".en__donation--billing--info");
    billingInfo.classList.add('en__component--column--1');

    const newDiv2 = document.createElement('div');
    const postCode = document.querySelector(".en__field--postcode");
    newDiv2.classList.add('email--signup');
    postCode.after(newDiv2);
    
    billingInfo.insertAdjacentElement('beforeend', billingInfo.nextElementSibling);
    billingInfo.insertAdjacentElement('beforeend', billingInfo.nextElementSibling);
    billingInfo.insertAdjacentElement('beforeend', billingInfo.nextElementSibling);

    const newDiv = document.createElement('div');
    newDiv.classList.add('en__component', 'en__component--formblock', 'en__column--cc', 'en__component--column--2');
    billingInfo.insertAdjacentElement('afterend', newDiv);

    const columnCC = document.querySelector(".en__column--cc");
    columnCC.insertAdjacentElement('beforeend', columnCC.nextElementSibling);
    columnCC.insertAdjacentElement('beforeend', columnCC.nextElementSibling);
    columnCC.insertAdjacentElement('beforeend', columnCC.nextElementSibling);
    columnCC.insertAdjacentElement('beforeend', columnCC.nextElementSibling);
    columnCC.insertAdjacentElement('beforeend', columnCC.nextElementSibling);

    const inputFields = document.querySelector(".en__component--input-fields");
    inputFields.insertAdjacentElement('afterbegin', columnCC);
    inputFields.insertAdjacentElement('afterbegin', billingInfo);
    inputFields.insertAdjacentHTML('beforebegin', `
    <div class="en__component en__component--row en__component--row--1 en__component--complete-heading">
      <div class="en__component en__component en__component--column en__component--column--1">
        <h1>Complete Your $<div class="totalAmount">0</div> <span class="monthly" style="display: none">Monthly</span> Donation</h1>
      </div>
    </div>`);

    

    newDiv2.insertAdjacentElement('afterbegin', billingInfo.lastElementChild);
    newDiv2.insertAdjacentElement('afterbegin', billingInfo.lastElementChild);
    newDiv2.insertAdjacentElement('afterbegin', billingInfo.lastElementChild);

  }

  function lastElement() {
    const row2 = document.querySelectorAll(".en__component--row--1");
    const lastColumn = row2[row2.length - 1];
    const lastColumnChild = lastColumn.lastElementChild;
    // lastColumnChild.classList.add('en__column--cc');
    // lastColumn.classList.add('en_component--input-fields');

    const newDiv = document.createElement('div');
    newDiv.classList.add('en__component', 'en__component--row', 'en__component--row--2', 'en__component--input-fields');
    lastColumn.insertAdjacentElement('beforebegin', newDiv);
    
  }

  function wrapElements() {
    const ccvv = document.querySelector(".en__field--ccvv");
    const ccexpire = document.querySelector(".en__field--ccexpire");
    ccvv.insertAdjacentHTML('beforebegin', `<div class="en__field--ccwrap"></div>`);
    const ccWrap = document.querySelector('.en__field--ccwrap');
    ccWrap.insertAdjacentElement('beforeend', ccvv);
    ccWrap.insertAdjacentElement('beforeend', ccexpire);

    // Placed here because it's dependent on other elements to have been moved/wrapped before it fires
    const postCode2 = document.querySelector(".email--signup");
    const ccWrap2 = document.querySelector(".en__field--ccwrap");
    ccWrap2.after(postCode2);
  }

  function showBody(){
    document.body.className += ' showBody';
  }

  function carePackageBtn() {

    const carePackageBtn = document.querySelectorAll(".en__component--button-cta");

    carePackageBtn.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector('.en__component--heading').scrollIntoView({
            behavior: 'smooth'
        });
      });
    });
  }

  function moveError() {
    const errorHeader = document.querySelector(".en__errorHeader");
    const errorFields = document.querySelectorAll(".en__error");
    if (errorHeader && errorHeader.parentNode) {
      const errorParent = errorHeader.parentNode;
      errorParent.appendChild(errorHeader);
      errorFields.forEach(error => {
        errorParent.appendChild(error);
      });
      setTimeout(function() { 
        errorHeader.scrollIntoView();
      }, 1000);
    } else {
      window.localStorage.clear();
    }
  }

  function listenMonthlyCheckbox() {
    const checkbox = document.querySelector('input[name="transaction.recurrpay"]');
    const monthly = document.querySelector(".en__component--complete-heading .monthly");
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        monthly.style.display = "inline-block"
      } else {
        monthly.style.display = "none"
      }
    });
  }

});