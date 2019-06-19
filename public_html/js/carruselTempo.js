(() => {

  let vActual = 0; // Posición de ventana que se ve en pantalla
  let direccion = 'derecha';
  const ventanas = document.querySelectorAll('#carruselTempo .ventana');

  /**
   * ANIMAR EL TEMPORIZADOR DE LA PARTE DE ABAJO DEL CARRUSEL
   * @author Fernando Magrosoto
   * @copyright junio, 2019
   * @param tiempo Number El tiempo en milisegundos
   */
  const moverTemporizador = (tiempo) => {
    $('.termometro').animate({'width': '100%'}, tiempo, () => {
      // Mover ventanas
      animarVentanas();
    });
  }


  /**
   * ANINAR LAS VENTANAS
   */
  const animarVentanas = () => {

    let siguiente;
    let posicion;

    // Primero, calcular la proxima ventana a mostrarse
    if (direccion === 'derecha') {
      siguiente = vActual + 1;
      posicion = '-100%';
      if (siguiente === ventanas.length) {
        siguiente = 0;
      }
    } else if(direccion === 'izquierda') {
      siguiente = vActual - 1;
      posicion = '100%';
      if (siguiente < 0) {
        siguiente = ventanas.length - 1;
      }
    }

    // Regresar TODAS las ventanas que no estén activas a la posición
    $('.ventana:not(.activo)').css({'left': posicion, 'z-index': 5 })

    // Quitar activo y mover el z-index en la ventana actual
    $(ventanas[vActual]).css({'z-index': 5}).removeClass('activo');

    // Poner activo y mover z-index la próxima ventana
    $(ventanas[siguiente]).css({'z-index': 10}).addClass('activo').animate({'left': 0}, 900);

    vActual = siguiente;

    // Regresar el termómetro a su ancho inicial
    $('.termometro').animate({ 'width': 0 }, 1000, () => {
      moverTemporizador(10000);
    });

  }


  /**
   * ANIMAR POR MEDIO DE LOS CONTROLES
   */
  const botonesDireccion = document.querySelectorAll('.botonesDireccion');
  botonesDireccion.forEach( e => {
    e.addEventListener('click', ev => {
      ev.preventDefault();
      direccion = e.dataset.direccion;
      // Regresar el termómetro a su ancho inicial
      $('.termometro').stop().animate({ 'width': 0 }, 500, () => {
        animarVentanas();
      });
    }, false);
  });


  // La animación no arranca hasta que no se cargue toda la página.
  window.addEventListener('load', () => {

    // Empezar animación
    $(ventanas[vActual])
      .css({
        'left': 0,
        'z-index': 10
      })
      .addClass('activo');
    moverTemporizador(10000);

    // Al hacer hover en la ventana activa se pausa la animación.
    // Al hacer mouseleave en la ventana activa, se reestablece la animación.
    $('body').on('mouseover', '#carruselTempo .ventana.activo', () => {
      $('.termometro').stop(false, false);
    });

    $('body').on('mouseleave', '#carruselTempo .ventana.activo', () => {
      moverTemporizador(5000)
    });

  }, false);

})();