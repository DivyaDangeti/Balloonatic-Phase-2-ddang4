const getQuotes = async () => {
  const response = await fetch("/quote");
  const data = await response.json();
  const quoteArea = document.getElementById("home-quote");
  quoteArea.innerHTML = data.quote;
};
window.addEventListener("load", (event) => {
  setInterval(function () {
    getQuotes();
  }, 10000);
});
