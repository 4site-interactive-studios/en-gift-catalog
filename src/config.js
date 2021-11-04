let options = {
  title: "<strong>Select gift(s)</strong> <em>(select as many as you would like):</em>",
  heroTitle: "<h1>Help a Lonely 'Backyard Dog' Survive the Summer</h1>",
  heroCopy: `
    <p>The scorching sun and unrelenting heat of summer can be deadly for dogs chained outside without adequate shelter. Your much-needed gift today will help provide a lonely dog with support and care, or you can give shelter and some relief from the season's worst weather by sponsoring a sturdy doghouse.</p>
    <p class='small-bold'>Your care package of any size will make a life-changing difference to a dog in need. <em>Dogs need you!</em></p>
    <input type="button" value="Send your care package!" onClick="document.getElementById('en__component--heading').scrollIntoView();">
    `,
  responsiveTitle: "<strong>Select Gift(s):</strong>",
  customAmount: true,
  customAmountImage:
    "https://acb0a5d73b67fccd4bbe-c2d8138f0ea10a18dd4c43ec3aa4240a.ssl.cf5.rackcdn.com/10003/Shop-Choose-Amount-SDH21.jpg",
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
