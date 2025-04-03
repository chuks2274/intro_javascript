/* 1. This is to generate greeting for user */

function contactUs(userName) {
  if (userName) {
    return `Hello ${userName}, thank you for contacting us! We will get back to you soon.`;
  } else {
    return "Hello, thank you for contacting us! We will get back to you soon.";
  }
}
let submit = contactUs();
console.log(submit);

/* 2. This is to validate email */

function validateEmail(email) {
  const trimmedEmail = email.trim();

  if (trimmedEmail.includes("@") && trimmedEmail.includes(".")) {
    return true;
  } else return false;
}
console.log(validateEmail("johngmail.com"));
console.log(validateEmail("john@gmail.com"));
console.log(validateEmail("john@gmailcom"));

/* 3. This is to click view details button*/

function printClick() {
  return "clicked";
}
console.log("click");

/* 4. This is apartment random picker */

const apartment = [
  "6 Bedroom",
  "5 Bedroom",
  "4 Bedroom",
  "3 Bedroom",
  "2 Bedroom",
  "1 Bedroom",
  "Studio",
];
function getRamdomApartment() {
  const index = Math.floor(Math.random() * apartment.length);
  return apartment[index];
}
console.log(getRamdomApartment());

/* 5. This is mortgage calculator */

const mortgageCalculator = (loanAmount, interestRate, loanYears) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  let monthlyInterest = interestRate / 100 / 12;
  let months = loanYears * 12;
  let monthlyPayment =
    (loanAmount * monthlyInterest) /
    (1 - Math.pow(1 + monthlyInterest, -months));
  return formatter.format(monthlyPayment);
};
console.log(mortgageCalculator(500000, 2.8, 30));

/* 6. This is sale commission calculator */

function saleCommission(salesAmount, commissionRate) {
  const commission = salesAmount * (commissionRate / 100);
  return `$${commission.toFixed(2)}`;
}
const sales = 300000;
const rate = 5;
const commissionAmount = saleCommission(sales, rate);
console.log(
  `Commission for sales of ${sales} at a rate of ${rate}% is: ${commissionAmount} `
);

/* 7. This is one month rent, one month deposit, and one month
  agent commission calculator for new tenant*/

const monthlyRent = [2500, 2500, 2500];
const total = monthlyRent.reduce((sum, monthlyRent) => sum + monthlyRent, 0);
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
console.log(formatter.format(total));
