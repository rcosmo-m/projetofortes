document.addEventListener('DOMContentLoaded', () => {
  // Login Modal
  const loginBtn = document.getElementById('login-btn');
  const loginModal = document.getElementById('login-modal');
  const closeBtn = document.querySelector('.close');
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');

  // Dashboard Navigation
  const sidebarNavItems = document.querySelectorAll('.sidebar-nav ul li');
  const logoutBtn = document.getElementById('logout-btn');
  const logoutBtnEmpresa = document.getElementById('logout-btn-empresa');

  // Tabs
  const tabs = document.querySelectorAll('.tab');

  // Back Buttons
  const backBtns = document.querySelectorAll('.back-btn');

  // View Profile Buttons
  const viewProfileBtns = document.querySelectorAll('.view-profile');

  // Pages
  const loginPage = document.getElementById('login-page');
  const instituicaoDashboard = document.getElementById('instituicao-dashboard');
  const empresaDashboard = document.getElementById('empresa-dashboard');

  // Maps
  const instituicaoPontosPage = document.getElementById('instituicao-pontos');
  const empresaPontosPage = document.getElementById('empresa-pontos');

  // Toast notification system
  function showToast(message, type = 'success', duration = 3000) {
    // Remove any existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }

    // Create toast elements
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let icon = '';
    if (type === 'success')
      icon = '<i class="fas fa-check-circle toast-icon"></i>';
    else if (type === 'warning')
      icon = '<i class="fas fa-exclamation-triangle toast-icon"></i>';
    else if (type === 'error')
      icon = '<i class="fas fa-times-circle toast-icon"></i>';

    toast.innerHTML = `
      ${icon}
      <div class="toast-content">
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close">&times;</button>
    `;

    document.body.appendChild(toast);

    // Show the toast
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    // Add close button functionality
    const closeToast = toast.querySelector('.toast-close');
    closeToast.addEventListener('click', () => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    });

    // Auto close after duration
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, duration);
  }

  // Loading spinner
  function showLoading(element) {
    const loadingContainer = document.createElement('div');
    loadingContainer.className = 'loading-container';
    loadingContainer.innerHTML = '<div class="loading-spinner"></div>';
    element.appendChild(loadingContainer);
    return loadingContainer;
  }

  function hideLoading(loadingContainer) {
    loadingContainer.remove();
  }

  // Google Maps Initialization
  function initMaps() {
    // Initialize maps when the Google Maps API is loaded
    initInstituicaoMap();
    initEmpresaMap();
  }

  function initInstituicaoMap() {
    const mapElement = document.getElementById('map-instituicao');

    if (mapElement) {
      // Create the map centered on São Paulo
      const map = new google.maps.Map(mapElement, {
        center: { lat: -23.5505, lng: -46.6333 }, // São Paulo coordinates
        zoom: 12,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
      });

      // Collection points data
      const collectionPoints = [
        {
          position: { lat: -23.5629, lng: -46.6544 }, // Av. Paulista
          title: 'Empresa XYZ - Sede',
          address: 'Av. Paulista, 1000 - São Paulo, SP',
          hours: 'Seg-Sex: 8h às 18h',
          waste: 'Papel, Plástico, Metal',
        },
        {
          position: { lat: -23.5539, lng: -46.6606 }, // Rua Augusta
          title: 'Empresa XYZ - Filial',
          address: 'Rua Augusta, 500 - São Paulo, SP',
          hours: 'Seg-Sex: 9h às 17h',
          waste: 'Papel, Plástico',
        },
        {
          position: { lat: -22.9068, lng: -43.1729 }, // Rio de Janeiro
          title: 'Empresa ABC',
          address: 'Av. Rio Branco, 100 - Rio de Janeiro, RJ',
          hours: 'Seg-Sex: 8h às 17h',
          waste: 'Vidro, Eletrônicos',
        },
        {
          position: { lat: -19.9167, lng: -43.9345 }, // Belo Horizonte
          title: 'Empresa DEF',
          address: 'Av. Afonso Pena, 500 - Belo Horizonte, MG',
          hours: 'Seg-Sex: 9h às 18h',
          waste: 'Papel, Orgânicos',
        },
      ];

      // Add markers for each collection point
      collectionPoints.forEach((point) => {
        const marker = new google.maps.Marker({
          position: point.position,
          map: map,
          title: point.title,
          animation: google.maps.Animation.DROP,
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
          },
        });

        // Create info window with point details
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div class="map-info-window">
              <h3>${point.title}</h3>
              <p><i class="fas fa-map-marker-alt"></i> ${point.address}</p>
              <p><i class="fas fa-clock"></i> ${point.hours}</p>
              <p><i class="fas fa-recycle"></i> Resíduos: ${point.waste}</p>
              <button class="map-btn" onclick="scheduleCollection('${point.title}')">Agendar Coleta</button>
            </div>
          `,
        });

        // Add click listener to open info window
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });
    }
  }

  function initEmpresaMap() {
    const mapElement = document.getElementById('map-empresa');

    if (mapElement) {
      // Create the map centered on São Paulo
      const map = new google.maps.Map(mapElement, {
        center: { lat: -23.5505, lng: -46.6333 }, // São Paulo coordinates
        zoom: 12,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
      });

      // Company collection points
      const companyPoints = [
        {
          position: { lat: -23.5629, lng: -46.6544 }, // Av. Paulista
          title: 'Sede Principal',
          address: 'Av. Paulista, 1000 - São Paulo, SP',
          hours: 'Seg-Sex: 8h às 18h',
          waste: 'Papel, Plástico, Metal',
        },
        {
          position: { lat: -23.5539, lng: -46.6606 }, // Rua Augusta
          title: 'Filial 1',
          address: 'Rua Augusta, 500 - São Paulo, SP',
          hours: 'Seg-Sex: 9h às 17h',
          waste: 'Papel, Plástico',
        },
        {
          position: { lat: -23.5669, lng: -46.6926 }, // Av. Brigadeiro Faria Lima
          title: 'Filial 2',
          address: 'Av. Brigadeiro Faria Lima, 2000 - São Paulo, SP',
          hours: 'Seg-Sex: 8h às 17h',
          waste: 'Papel, Plástico, Eletrônicos',
        },
      ];

      // Add markers for each company point
      companyPoints.forEach((point) => {
        const marker = new google.maps.Marker({
          position: point.position,
          map: map,
          title: point.title,
          animation: google.maps.Animation.DROP,
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          },
        });

        // Create info window with point details
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div class="map-info-window">
              <h3>${point.title}</h3>
              <p><i class="fas fa-map-marker-alt"></i> ${point.address}</p>
              <p><i class="fas fa-clock"></i> ${point.hours}</p>
              <p><i class="fas fa-recycle"></i> ${point.waste}</p>
              <button class="map-btn" onclick="editPoint('${point.title}')">Editar</button>
            </div>
          `,
        });

        // Add click listener to open info window
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });

      // Add click listener to add new collection points
      map.addListener('click', (event) => {
        if (
          document.getElementById('empresa-pontos').classList.contains('active')
        ) {
          showAddPointModal(event.latLng);
        }
      });
    }
  }

  // Function to schedule collection (called from map info window)
  function scheduleCollection(pointName) {
    alert(`Agendamento para ${pointName} será implementado em breve!`);
  }

  // Function to edit point (called from map info window)
  function editPoint(pointName) {
    alert(`Edição do ponto ${pointName} será implementada em breve!`);
  }

  // Function to show add point modal
  function showAddPointModal(location) {
    const confirmAdd = confirm(
      `Deseja adicionar um novo ponto de coleta nas coordenadas: ${location.lat().toFixed(6)}, ${location.lng().toFixed(6)}?`,
    );

    if (confirmAdd) {
      alert('Funcionalidade de adicionar ponto será implementada em breve!');
    }
  }

  // Initialize Google Maps
  // let instituicaoMap = null
  // let empresaMap = null
  // let markers = []

  // function initMaps() {
  //   // Initialize maps if the Google Maps API is loaded
  //   if (typeof google !== 'undefined' && google.maps) {
  //     // Collection points data
  //     const collectionPoints = [
  //       {
  //         name: "Empresa XYZ - Sede",
  //         position: { lat: -23.5505, lng: -46.6333 }, // São Paulo
  //         address: "Av. Paulista, 1000 - São Paulo, SP",
  //         hours: "Seg-Sex: 8h às 18h",
  //         waste: "Papel, Plástico, Metal",
  //         status: "active"
  //       },
  //       {
  //         name: "Empresa XYZ - Filial",
  //         position: { lat: -23.5566, lng: -46.6509 }, // Rua Augusta
  //         address: "Rua Augusta, 500 - São Paulo, SP",
  //         hours: "Seg-Sex: 9h às 17h",
  //         waste: "Papel, Plástico",
  //         status: "active"
  //       },
  //       {
  //         name: "Empresa ABC",
  //         position: { lat: -23.5489, lng: -46.6388 }, // Consolação
  //         address: "Rua da Consolação, 1234 - São Paulo, SP",
  //         hours: "Seg-Sex: 10h às 16h",
  //         waste: "Metal, Vidro",
  //         status: "inactive"
  //       }
  //     ]

  //     // Instituicao Map
  //     const instituicaoMapElement = document.getElementById("instituicao-map")
  //     if (instituicaoMapElement) {
  //       instituicaoMap = new google.maps.Map(instituicaoMapElement, {
  //         center: { lat: -23.5505, lng: -46.6333 },
  //         zoom: 13,
  //         mapId: "69c97594e254a4dd",
  //       })

  //       // Add markers to the map
  //       collectionPoints.forEach((point) => {
  //         const marker = new google.maps.Marker({
  //           position: point.position,
  //           map: instituicaoMap,
  //           title: point.name,
  //         })

  //         // Info window for each marker
  //         const infoWindow = new google.maps.InfoWindow({
  //           content: `
  //             <h3>${point.name}</h3>
  //             <p><strong>Endereço:</strong> ${point.address}</p>
  //             <p><strong>Horário:</strong> ${point.hours}</p>
  //             <p><strong>Resíduos:</strong> ${point.waste}</p>
  //             <p><strong>Status:</strong> ${point.status}</p>
  //           `,
  //         })

  //         marker.addListener("click", () => {
  //           infoWindow.open(instituicaoMap, marker)
  //         })

  //         markers.push(marker)
  //       })
  //     }

  //     // Empresa Map
  //     const empresaMapElement = document.getElementById("empresa-map")
  //     if (empresaMapElement) {
  //       empresaMap = new google.maps.Map(empresaMapElement, {
  //         center: { lat: -23.5505, lng: -46.6333 },
  //         zoom: 13,
  //         mapId: "69c97594e254a4dd",
  //       })

  //       // Add markers to the map
  //       collectionPoints.forEach((point) => {
  //         const marker = new google.maps.Marker({
  //           position: point.position,
  //           map: empresaMap,
  //           title: point.name,
  //         })

  //         // Info window for each marker
  //         const infoWindow = new google.maps.InfoWindow({
  //           content: `
  //             <h3>${point.name}</h3>
  //             <p><strong>Endereço:</strong> ${point.address}</p>
  //             <p><strong>Horário:</strong> ${point.hours}</p>
  //             <p><strong>Resíduos:</strong> ${point.waste}</p>
  //             <p><strong>Status:</strong> ${point.status}</p>
  //           `,
  //         })

  //         marker.addListener("click", () => {
  //           infoWindow.open(empresaMap, marker)
  //         })

  //         markers.push(marker)
  //       })
  //     }
  //   } else {
  //     console.error("Google Maps API not loaded")
  //   }
  // }

  // Open login modal
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      console.log('Login button clicked');
      if (loginModal) {
        loginModal.style.display = 'block';
      } else {
        console.error('Login modal not found');
      }
    });
  } else {
    console.error('Login button not found');
  }

  // Close login modal
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      loginModal.style.display = 'none';
    });
  }

  // Close modal when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
      loginModal.style.display = 'none';
    }
  });

  // Login form submission
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      if (email === 'instituicao@gmail.com' && password === '123') {
        loginModal.style.display = 'none';
        loginPage.classList.remove('active');
        instituicaoDashboard.classList.add('active');
        showToast('Login realizado com sucesso!', 'success');
        initMaps();
      } else if (email === 'empresa@gmail.com' && password === '123') {
        loginModal.style.display = 'none';
        loginPage.classList.remove('active');
        empresaDashboard.classList.add('active');
        showToast('Login realizado com sucesso!', 'success');
        initMaps();
      } else {
        loginError.textContent = 'Email ou senha incorretos.';
        showToast('Email ou senha incorretos.', 'error');
      }
    });
  }

  // Sidebar navigation
  sidebarNavItems.forEach((item) => {
    if (!item.id.includes('logout')) {
      item.addEventListener('click', function () {
        const pageId = this.getAttribute('data-page');

        // Remove active class from all nav items
        sidebarNavItems.forEach((navItem) => {
          navItem.classList.remove('active');
        });

        // Add active class to clicked nav item
        this.classList.add('active');

        // Hide all dashboard pages
        document.querySelectorAll('.dashboard-page').forEach((page) => {
          page.classList.remove('active');
        });

        // Show selected dashboard page
        document.getElementById(pageId).classList.add('active');
      });
    }
  });

  // Logout buttons
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm('Tem certeza que deseja sair?')) {
        instituicaoDashboard.classList.remove('active');
        loginPage.classList.add('active');
      }
    });
  }

  if (logoutBtnEmpresa) {
    logoutBtnEmpresa.addEventListener('click', () => {
      if (confirm('Tem certeza que deseja sair?')) {
        empresaDashboard.classList.remove('active');
        loginPage.classList.add('active');
      }
    });
  }

  // Tabs functionality
  tabs.forEach((tab) => {
    tab.addEventListener('click', function () {
      const tabId = this.getAttribute('data-tab');

      // Remove active class from all tabs
      tabs.forEach((t) => {
        if (t.parentElement === this.parentElement) {
          t.classList.remove('active');
        }
      });

      // Add active class to clicked tab
      this.classList.add('active');

      // Hide all tab panes
      const tabPanes =
        this.parentElement.nextElementSibling.querySelectorAll('.tab-pane');
      tabPanes.forEach((pane) => {
        pane.classList.remove('active');
      });

      // Show selected tab pane
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Back buttons
  backBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      // Hide current page
      const currentPage = this.closest('.dashboard-page');
      currentPage.classList.remove('active');

      // Show previous page
      if (currentPage.id === 'instituicao-empresa-profile') {
        document.getElementById('instituicao-empresas').classList.add('active');
      }
    });
  });

  // View Profile buttons
  viewProfileBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Hide current page
      document
        .getElementById('instituicao-empresas')
        .classList.remove('active');

      // Show profile page
      document
        .getElementById('instituicao-empresa-profile')
        .classList.add('active');
    });
  });

  // Search functionality for empresas
  const empresaSearch = document.getElementById('empresa-search');
  if (empresaSearch) {
    empresaSearch.addEventListener('input', function () {
      const searchTerm = this.value.toLowerCase();
      const empresaCards = document.querySelectorAll('.empresa-card');

      empresaCards.forEach((card) => {
        const empresaNome = card.querySelector('h3').textContent.toLowerCase();

        if (empresaNome.includes(searchTerm)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth',
        });
      }
    });
  });
});

// Add UX improvements
document.addEventListener('DOMContentLoaded', () => {
  // Add loading indicators to buttons
  document
    .querySelectorAll('.btn-primary, .btn-secondary')
    .forEach((button) => {
      button.addEventListener('click', function (e) {
        // Skip for logout buttons which have their own confirmation
        if (this.id === 'logout-btn' || this.id === 'logout-btn-empresa')
          return;

        // Skip for buttons that open modals or have special functions
        if (this.id === 'login-btn') return;

        const originalText = this.innerHTML;
        this.classList.add('loading');
        this.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Processando...';

        // Simulate processing time (remove in production)
        setTimeout(() => {
          this.classList.remove('loading');
          this.innerHTML = originalText;

          // Show success feedback for certain actions
          if (
            this.textContent.includes('Confirmar') ||
            this.textContent.includes('Salvar') ||
            this.textContent.includes('Agendar')
          ) {
            showFeedback('success', 'Operação realizada com sucesso!');
          }
        }, 1000);
      });
    });

  // Add form validation feedback
  document.querySelectorAll('form').forEach((form) => {
    if (form.id === 'login-form') return; // Skip login form which has its own validation

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;
      const requiredFields = this.querySelectorAll(
        'input[required], textarea[required]',
      );

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');

          // Add error message if it doesn't exist
          let errorMsg = field.nextElementSibling;
          if (!errorMsg || !errorMsg.classList.contains('field-error')) {
            errorMsg = document.createElement('div');
            errorMsg.classList.add('field-error');
            errorMsg.style.color = 'var(--danger-color)';
            errorMsg.style.fontSize = '0.8rem';
            errorMsg.style.marginTop = '5px';
            field.parentNode.insertBefore(errorMsg, field.nextSibling);
          }
          errorMsg.textContent = 'Este campo é obrigatório';
        } else {
          field.classList.remove('error');
          const errorMsg = field.nextElementSibling;
          if (errorMsg && errorMsg.classList.contains('field-error')) {
            errorMsg.textContent = '';
          }
        }
      });

      if (isValid) {
        showFeedback('success', 'Formulário enviado com sucesso!');
        this.reset();
      } else {
        showFeedback(
          'error',
          'Por favor, preencha todos os campos obrigatórios.',
        );
      }
    });
  });

  // Add tooltips to buttons and icons that might need explanation
  document
    .querySelectorAll('.btn-primary, .btn-secondary, .sidebar-nav ul li')
    .forEach((element) => {
      // Skip elements that already have tooltips or don't need them
      if (element.classList.contains('tooltip')) return;

      const text = element.textContent.trim();
      if (text) {
        element.classList.add('tooltip');
        const tooltipText = document.createElement('span');
        tooltipText.classList.add('tooltip-text');
        tooltipText.textContent = text;
        element.appendChild(tooltipText);
      }
    });
});

// Function to show feedback messages
function showFeedback(type, message) {
  // Remove any existing feedback
  const existingFeedback = document.querySelector('.feedback-message');
  if (existingFeedback) {
    existingFeedback.remove();
  }

  // Create feedback element
  const feedback = document.createElement('div');
  feedback.classList.add('feedback-message', type);

  // Add appropriate icon
  let icon = 'info-circle';
  if (type === 'success') icon = 'check-circle';
  if (type === 'warning') icon = 'exclamation-triangle';
  if (type === 'error') icon = 'times-circle';

  feedback.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;

  // Add to the page
  const activeContent = document.querySelector('.dashboard-page.active');
  if (activeContent) {
    activeContent.insertBefore(feedback, activeContent.firstChild);
  } else {
    document.body.insertBefore(feedback, document.body.firstChild);
  }

  // Auto-remove after 5 seconds
  setTimeout(() => {
    feedback.style.opacity = '0';
    feedback.style.transform = 'translateY(-10px)';
    setTimeout(() => feedback.remove(), 300);
  }, 5000);
}

// Adicionar verificação para garantir que o Google Maps API está carregado
window.initGoogleMaps = () => {
  console.log('Google Maps API loaded');
  if (typeof initMaps === 'function') {
    initMaps();
  }
};

// Adicionar script do Google Maps ao final do documento
document.addEventListener('DOMContentLoaded', () => {
  // Verificar se o script do Google Maps já existe
  if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
    const script = document.createElement('script');
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initGoogleMaps';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  // Verificar se o modal de login existe
  const loginModal = document.getElementById('login-modal');
  if (!loginModal) {
    console.error('Login modal element not found');
  }

  // Verificar se o botão de login existe
  const loginBtn = document.getElementById('login-btn');
  if (!loginBtn) {
    console.error('Login button element not found');
  }
});
