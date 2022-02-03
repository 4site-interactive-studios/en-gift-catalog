let options = {
  title: "<strong>Select gift(s)</strong> <em>(select as many as you would like):</em>",
  heroTitle: "<h1>Help a Neglected Dog Survive the Winter</h1>",
  heroCopy: `
    <p>Strong winds, snow, and freezing temperatures can be deadly for a dog forced to live outside instead of being in the safety of a loving home.</p>
    <p>Right now, you can send love to a “backyard dog” with a Valentine’s Day care package. Help PETA’s team provide insulated doghouses, lightweight tie-outs to replace heavy chains, much-need care, and more.</p>
    <p style="font-weight: bold">Change a dog’s life today!</p>
    <input type="button" value="Send your care package!" onClick="document.getElementById('en__component--heading').scrollIntoView();">
    `,
  responsiveTitle: "<strong>Select Gift(s):</strong>",
  customAmount: true,
  customAmountImage:
    "https://acb0a5d73b67fccd4bbe-c2d8138f0ea10a18dd4c43ec3aa4240a.ssl.cf5.rackcdn.com/10003/2021-Shop-Choose-Amount-WDH1.jpg?v=1636121242000",
  heroImage: "https://acb0a5d73b67fccd4bbe-c2d8138f0ea10a18dd4c43ec3aa4240a.ssl.cf5.rackcdn.com/10003/img-doghouse.jpg?v=1635978213000",
  heroImageResponsive:
    "https://acb0a5d73b67fccd4bbe-c2d8138f0ea10a18dd4c43ec3aa4240a.ssl.cf5.rackcdn.com/10003/img-doghouse.jpg?v=1635978213000",
  footerContent: `Contact PETA  |  Disclaimer  |  Privacy Policy  |  Contest Terms and Conditions  |  Texting Terms and Conditions  |  Terms of Use  |  Donate Now  |  Report Website Abuse  |  © 2021 PETA. Read our full policy.<br><br>

  People for the Ethical Treatment of Animals<br>
  501 Front St., Norfolk, VA 23510<br>
  757-622-PETA (7382)<br>
  757-622-0457 (fax)<br><br>
  
  PETA is a nonprofit, tax-exempt 501(c)(3) corporation (tax ID number 52-1218336)<br><br>
  
  image attribution © source | source additional info`,
  donations: [
    {
      id: 0,
      quantity: 0,
      urgent: false,
      donationAmount: "5",
      imageURL:
        "https://acb0a5d73b67fccd4bbe-c2d8138f0ea10a18dd4c43ec3aa4240a.ssl.cf5.rackcdn.com/10003/Shop-Food-For-Week.jpg?v=1625507654000",
      title: "Feed a neglected dog for a week",
      content: "This item costs $5",
    },
    {
      id: 1,
      quantity: 0,
      urgent: false,
      donationAmount: "12",
      imageURL:
        "https://acb0a5d73b67fccd4bbe-c2d8138f0ea10a18dd4c43ec3aa4240a.ssl.cf5.rackcdn.com/10003/Shop-Toy-SDH21.jpg?v=1625507668000",
      title: "Supply a durable dog toy to bring joy",
      content: "This item costs $12",
    },
    {
      id: 2,
      quantity: 0,
      urgent: false,
      donationAmount: "30",
      imageURL:
        "https://acb0a5d73b67fccd4bbe-c2d8138f0ea10a18dd4c43ec3aa4240a.ssl.cf5.rackcdn.com/10003/Shop-Medicine-SDH21.jpg?v=1625507655000",
      title: "Provide a dog with medicine",
      content: "This item costs $30",
    },
    {
      id: 3,
      quantity: 0,
      urgent: false,
      donationAmount: "100",
      imageURL:
        "https://acb0a5d73b67fccd4bbe-c2d8138f0ea10a18dd4c43ec3aa4240a.ssl.cf5.rackcdn.com/10003/Shop-Vet-Care-SDH21.jpg?v=1625507670000",
      title: "Help a dog with veterinary care",
      content: "This item costs $100",
    },
    {
      id: 4,
      quantity: 0,
      urgent: false,
      donationAmount: "265",
      imageURL:
        "https://acb0a5d73b67fccd4bbe-c2d8138f0ea10a18dd4c43ec3aa4240a.ssl.cf5.rackcdn.com/10003/Shop-Doghouse-SDH21.jpg?v=1625507652000",
      title: "Sponsor a sturdy PETA doghouse",
      content: "This item costs $265",
    },
  ],
};

if ("ShoppingCartOptions" in window) {
  options = Object.assign(options, window.ShoppingCartOptions);
}

export { options };
