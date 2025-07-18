function cargarProductos(jsonUrl) {
  fetch(jsonUrl)
    .then(res => res.json())
    .then(data => {
      const carrusel = document.getElementById('productos-carousel');
      if (!carrusel) return console.warn('No existe el carrusel de productos');
      carrusel.innerHTML = '';

      data.forEach(producto => {
        const div = document.createElement('div');
        div.className = `
          relative
          min-w-[260px] flex-shrink-0
          bg-gray-900
          rounded-lg
          shadow-md
          overflow-hidden
          transition-transform
          duration-300
          hover:scale-105
          hover:shadow-lg
          cursor-pointer
          flex
          flex-col
        `;

        div.innerHTML = `
          <!-- Etiqueta Oferta -->
          <span class="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold uppercase px-2 py-0.5 rounded z-10 shadow-lg select-none">Oferta</span>

          <img src="${producto.imagen}" alt="${producto.nombre}" class="w-full h-36 object-cover rounded-t-md" />
          <div class="p-4 flex flex-col flex-grow justify-between">
            <div>
              <h5 class="uppercase font-medium mb-2 text-white text-center">${producto.nombre}</h5>
              <p class="text-xs text-gray-400 mb-4 leading-tight text-center">${producto.descripcion}</p>
            </div>
            <div>
              <p class="text-lg font-semibold text-white mb-3 text-center">$${producto.precio}</p>
              <a href="https://wa.me/${producto.whatsapp}?text=${encodeURIComponent(producto.mensajeWhatsapp)}" 
                 target="_blank" 
                 class="mx-auto inline-flex items-center justify-center gap-2 bg-[#FFEDF3] hover:bg-[#f8dede] text-black py-1.5 px-5 rounded-md shadow-sm text-sm font-semibold transition max-w-full w-full sm:w-auto"
                 aria-label="Comprar por WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 7.89a4.5 4.5 0 006.36 0l1.61-1.61a4.5 4.5 0 000-6.36L14 6"/></svg>
                Comprar por WhatsApp
              </a>
            </div>
          </div>
        `;
        carrusel.appendChild(div);
      });

      // Botones
      const prev = document.getElementById('prev-btn');
      const next = document.getElementById('next-btn');

      prev.onclick = () => carrusel.scrollBy({ left: -280, behavior: 'smooth' });
      next.onclick = () => carrusel.scrollBy({ left: 280, behavior: 'smooth' });

      // Movimiento automático cada 4 segundos
      let autoScrollInterval = setInterval(() => {
        if (carrusel.scrollLeft + carrusel.clientWidth >= carrusel.scrollWidth) {
          carrusel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carrusel.scrollBy({ left: 280, behavior: 'smooth' });
        }
      }, 4000);

      // Detener auto-scroll si el usuario usa botones
      [prev, next].forEach(btn => {
        btn.addEventListener('click', () => {
          clearInterval(autoScrollInterval);
        });
      });
    })
    .catch(error => {
      console.error('Error al cargar productos:', error);
    });
}
