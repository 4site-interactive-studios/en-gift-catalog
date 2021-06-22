const options = { 
  title: "<strong>Select gift(s)</strong> (select as many as you would like):",
  customAmount: true,
  customAmountImage: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg",
  heroImage: "https://martin.4sitestudios.com/peta/hero.png",
  heroImageResponsive: "https://martin.4sitestudios.com/peta/hero-responsive.png",
  footerContent: `Contact PETA  |  Disclaimer  |  Privacy Policy  |  Contest Terms and Conditions  |  Texting Terms and Conditions  |  Terms of Use  |  Donate Now  |  Report Website Abuse  |  © 2021 PETA. Read our full policy.<br><br>

  People for the Ethical Treatment of Animals<br>
  501 Front St., Norfolk, VA 23510<br>
  757-622-PETA (7382)<br>
  757-622-0457 (fax)<br><br>
  
  PETA is a nonprofit, tax-exempt 501(c)(3) corporation (tax ID number 52-1218336)<br><br>
  
  image attribution © source | source additional info`
};

const donations = [
  { id: 0,
    quantity: 0,
    urgent: true, 
    donationAmount: '2', 
    imageURL: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg', 
    title: 'Help provide support and care',
    content: 'Lorem ipsum $2'
  },
  { id: 1,
    quantity: 0,
    urgent: true, 
    donationAmount: '5', 
    imageURL: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg', 
    title: 'Help provide support and care',
    content: 'Lorem ipsum $5'
  },
  { id: 2,
    quantity: 0,
    urgent: true, 
    donationAmount: '7', 
    imageURL: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg', 
    title: 'Help provide support and care',
    content: 'Lorem ipsum $7'
  },
  { id: 3,
    quantity: 0,
    urgent: false, 
    donationAmount: '10', 
    imageURL: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg', 
    title: 'Help provide support and care',
    content: 'Lorem ipsum $10'
  },
  { id: 4,
    quantity: 0,
    urgent: false, 
    donationAmount: '30', 
    imageURL: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg', 
    title: 'Help provide support and care',
    content: 'Lorem ipsum $30'
  }
];

export { options, donations };
