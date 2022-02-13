import enGiftCatalog from "./app/app";
import "./scss/main.scss";

// Run the script after ONE SECOND because PETA Germany has a script that
// changes the other amount value to 35 if our script runs first
// See "setDonationValues": https://resources.peta.org/engaging-networks/pages/_shared/js/peta-en-shared.js
setTimeout(() => {
  new enGiftCatalog();
}, 1000);
