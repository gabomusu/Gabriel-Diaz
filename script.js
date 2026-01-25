// Función para inicializar el portafolio
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar año actual en el footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Cerrar menú móvil si está abierto (para futura implementación)
                
                // Scroll suave al elemento
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Actualizar URL sin recargar la página
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Manejo del formulario de contacto
    const formularioContacto = document.getElementById('formulario-contacto');
    if(formularioContacto) {
        formularioContacto.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar campos
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const asunto = document.getElementById('asunto').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
            
            // Validación básica
            if(!nombre || !email || !asunto || !mensaje) {
                mostrarMensaje('Por favor, completa todos los campos obligatorios.', 'error');
                return;
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email)) {
                mostrarMensaje('Por favor, ingresa un correo electrónico válido.', 'error');
                return;
            }
            
            // Simular envío del formulario
            const botonSubmit = this.querySelector('button[type="submit"]');
            const textoOriginal = botonSubmit.textContent;
            
            // Mostrar estado de carga
            botonSubmit.textContent = 'Enviando...';
            botonSubmit.disabled = true;
            
            // Simular petición al servidor
            setTimeout(() => {
                // En un caso real, aquí enviarías los datos a un servidor
                // Por ejemplo: fetch('/api/contacto', { method: 'POST', body: formData })
                
                mostrarMensaje('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.', 'success');
                formularioContacto.reset();
                
                // Restaurar botón
                botonSubmit.textContent = textoOriginal;
                botonSubmit.disabled = false;
            }, 1500);
        });
    }
    
    // Cambiar estilo de la navegación al hacer scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if(window.scrollY > 100) {
            nav.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            nav.style.backgroundColor = 'white';
        }
    });
    
    // Efecto de aparición suave para elementos al hacer scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    document.querySelectorAll('.habilidad-card, .proyecto-card, .timeline-item').forEach(el => {
        observer.observe(el);
    });
    
    // Observar también los títulos de secciones
    document.querySelectorAll('h2').forEach(el => {
        observer.observe(el);
    });
    
    // Función para mostrar mensajes de estado
    function mostrarMensaje(mensaje, tipo) {
        // Crear elemento de mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = `mensaje-alerta mensaje-${tipo}`;
        mensajeDiv.textContent = mensaje;
        
        // Estilos para el mensaje
        mensajeDiv.style.position = 'fixed';
        mensajeDiv.style.top = '20px';
        mensajeDiv.style.right = '20px';
        mensajeDiv.style.padding = '15px 20px';
        mensajeDiv.style.borderRadius = '5px';
        mensajeDiv.style.color = 'white';
        mensajeDiv.style.fontWeight = '600';
        mensajeDiv.style.zIndex = '10000';
        mensajeDiv.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        mensajeDiv.style.transition = 'all 0.3s ease';
        mensajeDiv.style.opacity = '0';
        mensajeDiv.style.transform = 'translateX(100px)';
        
        if(tipo === 'success') {
            mensajeDiv.style.backgroundColor = '#2ecc71';
        } else {
            mensajeDiv.style.backgroundColor = '#e74c3c';
        }
        
        // Agregar al DOM
        document.body.appendChild(mensajeDiv);
        
        // Animar entrada
        setTimeout(() => {
            mensajeDiv.style.opacity = '1';
            mensajeDiv.style.transform = 'translateX(0)';
        }, 10);
        
        // Remover después de 5 segundos
        setTimeout(() => {
            mensajeDiv.style.opacity = '0';
            mensajeDiv.style.transform = 'translateX(100px)';
            setTimeout(() => {
                if(mensajeDiv.parentNode) {
                    mensajeDiv.parentNode.removeChild(mensajeDiv);
                }
            }, 300);
        }, 5000);
    }
    
    // Agregar efecto de máquina de escribir al título principal
    const tituloPrincipal = document.querySelector('header h1');
    if(tituloPrincipal) {
        const textoOriginal = tituloPrincipal.textContent;
        tituloPrincipal.textContent = '';
        
        let i = 0;
        function escribirTexto() {
            if(i < textoOriginal.length) {
                tituloPrincipal.textContent += textoOriginal.charAt(i);
                i++;
                setTimeout(escribirTexto, 50);
            }
        }
        
        // Iniciar animación después de un breve retraso
        setTimeout(escribirTexto, 500);
    }
    
    // Agregar tooltips a las habilidades
    const habilidadesItems = document.querySelectorAll('.habilidad-card ul li');
    habilidadesItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const texto = this.textContent;
            if(texto.includes('[Agregar')) {
                this.style.cursor = 'pointer';
                this.title = 'Haz clic para editar esta información';
            }
        });
    });
    
    // Agregar funcionalidad para editar elementos con [Agregar...]
    document.querySelectorAll('.fa-pencil-alt').forEach(icono => {
        icono.addEventListener('click', function(e) {
            e.stopPropagation();
            const elementoPadre = this.parentElement;
            const textoActual = elementoPadre.textContent;
            
            // Crear campo de edición
            const input = document.createElement('input');
            input.type = 'teext'  