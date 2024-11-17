document.addEventListener("DOMContentLoaded", async () => {
  const apiUrl =
    "https://script.google.com/macros/s/AKfycbyVqwVBQd_b40z2-xsorSWeR06gVdEkIsgZKhwJZb2pzfm-D-y5FGnMGJoUjrZtUA2V/exec";

  try {
    const response = await fetch(apiUrl);
    if (!response.ok)
      throw new Error(`Error en la respuesta de la API: ${response.status}`);
    const data = await response.json();
    console.log("Datos recibidos de la API:", data);
    renderPlates(data.data);
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
});

function renderPlates(plates) {
  clearCarousel("entradas-carousel");
  clearCarousel("platos-fuertes-carousel");
  clearCarousel("bebidas-carousel");
  clearCarousel("postres-carousel");

  renderCategory(plates, "Entrada", "entradas-carousel");
  renderCategory(plates, "Platos Fuertes", "platos-fuertes-carousel");
  renderCategory(plates, "Bebidas", "bebidas-carousel");
  renderCategory(plates, "Postres", "postres-carousel");

  initializeLazyLoading();
}

function clearCarousel(carouselId) {
  const carousel = document.getElementById(carouselId);
  if (carousel) {
    carousel.innerHTML = "";
  }
}

function renderCategory(plates, category, carouselId) {
  const carousel = document.getElementById(carouselId);
  if (!carousel) {
    console.error(`No se encontró el contenedor con ID: ${carouselId}`);
    return;
  }

  const filteredPlates = plates.filter((plate) => plate.category === category);
  console.log(`Platos filtrados para ${category}:`, filteredPlates);

  filteredPlates.forEach((plate) => {
    const plateElement = document.createElement("div");
    plateElement.classList.add("plato");

    // Usar el helper `asset()` para las imágenes
    const imageUrl = `{{ asset('menu_restaurante/Imagenes/Menu') }}/${plate.image}`;
    const cartIconUrl = `{{ asset('menu_restaurante/Imagenes/Menu/carrito-icono.png') }}`;

    plateElement.innerHTML = `
      <img class="lazyload" data-src="${imageUrl}" alt="${plate.name}">
      <p class="precio">${plate.price}</p>
      <p class="nombre"><strong>${plate.name}</strong></p>
      <p class="descripcion">${plate.description}</p>
      <button class="add-to-cart" onclick="toggleDesplegable()" 
              data-product='{"image":"${imageUrl}","name":"${
      plate.name
    }","price":${parseFloat(plate.price.replace(/[^0-9.-]+/g, ""))}}'>
        <img src="${cartIconUrl}" alt="Carrito">
        Añadir al carrito
      </button>
    `;

    carousel.appendChild(plateElement);
    console.log(`Elemento añadido al carrusel ${carouselId}:`, plateElement);
  });
}

function initializeLazyLoading() {
  const lazyImages = document.querySelectorAll("img.lazyload");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazyload");
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => {
      imageObserver.observe(img);
    });
  } else {
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
      img.classList.remove("lazyload");
    });
  }
}
