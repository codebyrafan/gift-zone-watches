const watches = [

  {
    name:"Casio Classic",
    price:"149 AED",
    image:"https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop"
  },

  {
    name:"Seiko Premium",
    price:"349 AED",
    image:"https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1000&auto=format&fit=crop"
  },

  {
    name:"Fossil Modern",
    price:"279 AED",
    image:"https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?q=80&w=1000&auto=format&fit=crop"
  },

  {
    name:"Luxury Steel",
    price:"399 AED",
    image:"https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?q=80&w=1000&auto=format&fit=crop"
  }

];

const products = document.getElementById("products");

watches.forEach((watch)=>{

  products.innerHTML += `

  <div class="card">

    <img src="${watch.image}" alt="${watch.name}">

    <div class="card-content">

      <h3>${watch.name}</h3>

      <div class="price">${watch.price}</div>

      <a
      href="https://wa.me/971508309035?text=I'm interested in ${watch.name}"
      target="_blank"
      class="btn gold">

      Inquire Now
      </a>

    </div>

  </div>

  `;

});
