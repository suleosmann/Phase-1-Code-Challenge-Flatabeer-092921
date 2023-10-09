// Code here
document.addEventListener("DOMContentLoaded", () => {
    // Fetch and render the first beer details when the page loads
    fetchBeerDetails(1);
    fetchAllBeers();
  
    // Add event listener for review form
    document.getElementById("review-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const newReview = document.getElementById("review").value;
      const reviewList = document.getElementById("review-list");
      const newLi = document.createElement("li");
      newLi.innerText = newReview;
      reviewList.appendChild(newLi);
      document.getElementById("review").value = "";
    });
  
    // (Bonus) Add event listener for review click to remove
    document.getElementById("review-list").addEventListener("click", (e) => {
      if (e.target.tagName === "LI") {
        e.target.remove();
      }
    });
  
    // (Bonus) Add event listener for beer list to fetch and display clicked beer details
    document.getElementById("beer-list").addEventListener("click", (e) => {
      if (e.target.tagName === "LI") {
        fetchBeerDetails(e.target.dataset.id);
      }
    });
  });
  
  function fetchBeerDetails(id) {
    fetch(`/beers/${id}`)
      .then((res) => res.json())
      .then((beer) => displayBeerDetails(beer));
  }
  
  function fetchAllBeers() {
    fetch("/beers")
      .then((res) => res.json())
      .then((beers) => {
        const beerList = document.getElementById("beer-list");
        beerList.innerHTML = "";  // Clear the default list
        beers.forEach((beer) => {
          const beerLi = document.createElement("li");
          beerLi.innerText = beer.name;
          beerLi.dataset.id = beer.id;  // (Bonus) Store the beer ID for later retrieval
          beerList.appendChild(beerLi);
        });
      });
  }
  
  function displayBeerDetails(beer) {
    document.getElementById("beer-name").innerText = beer.name;
    document.getElementById("beer-image").src = beer.image_url;
    document.getElementById("beer-description").innerText = beer.description;
  
    const reviewList = document.getElementById("review-list");
    reviewList.innerHTML = "";  // Clear any existing reviews
    beer.reviews.forEach((review) => {
      const reviewLi = document.createElement("li");
      reviewLi.innerText = review;
      reviewList.appendChild(reviewLi);
    });
  }
  