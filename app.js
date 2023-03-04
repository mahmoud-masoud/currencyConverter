const currOne = document.getElementById("currency-one");
const currTwo = document.getElementById("currency-two");
const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");
const swapBtn = document.getElementById("swap");
const rate = document.getElementById("rate");
const error = document.getElementById("error");

const calculator = () => {
  const currOneValue = currOne.value;
  const currTwoValue = currTwo.value;
  fetch(
    `https://v6.exchangerate-api.com/v6/85d889f7959d6f7416fed666/latest/${currOneValue}`
  )
    .then((res) => res.json())
    .then((result) => {
      const ratePrice = result.conversion_rates[currTwoValue].toFixed(2);
      rate.innerText = `1 ${currOneValue} = ${ratePrice} ${currTwoValue}`;
      amountTwo.value = (ratePrice * amountOne.value).toFixed(2);
    })
    .catch((e) => {
      error.style.opacity = 100;
      error.innerText = e;
    });
};

currOne.addEventListener("change", calculator);
currTwo.addEventListener("change", calculator);
amountOne.addEventListener("input", calculator);
amountTwo.addEventListener("input", calculator);
swapBtn.addEventListener("click", () => {
  const placeHolder = currTwo.value;
  currTwo.value = currOne.value;
  currOne.value = placeHolder;
  calculator();
});

calculator();
