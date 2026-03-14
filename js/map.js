// Inicialização do mapa e funcionalidades relacionadas
document.addEventListener('DOMContentLoaded', () => {
  // Verificar se a API do Google Maps está carregada
  window.google = window.google || {}; // Declare google variable
  if (typeof window.google.maps === 'undefined') {
    loadGoogleMapsAPI();
  } else {
    initializeMaps();
  }
});

// Carregar a API do Google Maps
function loadGoogleMapsAPI() {
  const script = document.createElement('script');
  script.src =
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initializeMaps';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

// Função global para inicializar os mapas
window.initializeMaps = () => {
  window.initEmpresaMap = window.initEmpresaMap || (() => {}); // Declare initEmpresaMap variable // Declare initEmpresaMap variable
  window.initInstituicaoMap = window.initInstituicaoMap || (() => {}); // Declare initInstituicaoMap variable // Declare initInstituicaoMap variable
  initEmpresaMap();
  initInstituicaoMap();
};

// Inicializar o mapa da empresa
function initEmpresaMap() {
  const mapElement = document.getElementById('map-empresa');
  if (!mapElement) return;

  // Criar o mapa centralizado em São Paulo
  const map = new window.google.maps.Map(mapElement, {
    center: { lat: -23.5505, lng: -46.6333 }, // Coordenadas de São Paulo
    zoom: 12,
    mapId: '8d193001f940fde3',
    styles: [
      {
        elementType: 'geometry',
        stylers: [{ color: '#f5f5f5' }],
      },
      {
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }],
      },
      {
        elementType: 'labels.text.fill',
        stylers: [{ color: '#616161' }],
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#f5f5f5' }],
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#bdbdbd' }],
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{ color: '#eeeeee' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#757575' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#e5e5e5' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9e9e9e' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#ffffff' }],
      },
      {
        featureType: 'road.arterial',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#757575' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#dadada' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#616161' }],
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9e9e9e' }],
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{ color: '#e5e5e5' }],
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [{ color: '#eeeeee' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#c9c9c9' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9e9e9e' }],
      },
    ],
  });

  // Aplicar tema escuro se necessário
  applyMapTheme(map);

  // Pontos de coleta da empresa
  const pontosColeta = [
    {
      position: { lat: -23.5629, lng: -46.6544 }, // Av. Paulista
      title: 'Sede Principal',
      address: 'Av. Paulista, 1000 - São Paulo, SP',
      hours: 'Seg-Sex: 8h às 18h',
      waste: 'Papel, Plástico, Metal',
      status: 'Ativo',
    },
    {
      position: { lat: -23.5539, lng: -46.6606 }, // Rua Augusta
      title: 'Filial 1',
      address: 'Rua Augusta, 500 - São Paulo, SP',
      hours: 'Seg-Sex: 9h às 17h',
      waste: 'Papel, Plástico',
      status: 'Ativo',
    },
    {
      position: { lat: -23.5669, lng: -46.6926 }, // Av. Brigadeiro Faria Lima
      title: 'Filial 2',
      address: 'Av. Brigadeiro Faria Lima, 2000 - São Paulo, SP',
      hours: 'Seg-Sex: 8h às 17h',
      waste: 'Papel, Plástico, Eletrônicos',
      status: 'Ativo',
    },
  ];

  // Adicionar marcadores para cada ponto de coleta
  pontosColeta.forEach((ponto) => {
    const marker = new window.google.maps.Marker({
      position: ponto.position,
      map: map,
      title: ponto.title,
      animation: window.google.maps.Animation.DROP,
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      },
    });

    // Criar janela de informações para cada marcador
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div class="map-info-window">
          <h3>${ponto.title}</h3>
          <p><i class="fas fa-map-marker-alt"></i> ${ponto.address}</p>
          <p><i class="fas fa-clock"></i> ${ponto.hours}</p>
          <p><i class="fas fa-recycle"></i> ${ponto.waste}</p>
          <p><i class="fas fa-circle"></i> Status: ${ponto.status}</p>
          <button class="map-btn" onclick="editPonto('${ponto.title}')">Editar</button>
        </div>
      `,
    });

    // Adicionar evento de clique para abrir a janela de informações
    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
  });

  // Adicionar controles do mapa
  setupMapControls(map, mapElement);

  // Adicionar evento de clique para adicionar novos pontos
  map.addListener('click', (event) => {
    if (
      document.getElementById('empresa-pontos').classList.contains('active')
    ) {
      showAddPointModal(event.latLng, map);
    }
  });
}

// Inicializar o mapa da instituição
function initInstituicaoMap() {
  const mapElement = document.getElementById('map-instituicao');
  if (!mapElement) return;

  // Criar o mapa centralizado em São Paulo
  const map = new window.google.maps.Map(mapElement, {
    center: { lat: -23.5505, lng: -46.6333 }, // Coordenadas de São Paulo
    zoom: 11,
    mapId: '8d193001f940fde3',
    styles: [
      {
        elementType: 'geometry',
        stylers: [{ color: '#f5f5f5' }],
      },
      {
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }],
      },
      {
        elementType: 'labels.text.fill',
        stylers: [{ color: '#616161' }],
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#f5f5f5' }],
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#bdbdbd' }],
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{ color: '#eeeeee' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#757575' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#e5e5e5' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9e9e9e' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#ffffff' }],
      },
      {
        featureType: 'road.arterial',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#757575' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#dadada' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#616161' }],
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9e9e9e' }],
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{ color: '#e5e5e5' }],
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [{ color: '#eeeeee' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#c9c9c9' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9e9e9e' }],
      },
    ],
  });

  // Aplicar tema escuro se necessário
  applyMapTheme(map);

  // Pontos de coleta disponíveis para a instituição
  const pontosColeta = [
    {
      position: { lat: -23.5629, lng: -46.6544 }, // Av. Paulista
      title: 'Empresa XYZ - Sede',
      address: 'Av. Paulista, 1000 - São Paulo, SP',
      hours: 'Seg-Sex: 8h às 18h',
      waste: 'Papel, Plástico, Metal',
      company: 'Empresa XYZ',
    },
    {
      position: { lat: -23.5539, lng: -46.6606 }, // Rua Augusta
      title: 'Empresa XYZ - Filial',
      address: 'Rua Augusta, 500 - São Paulo, SP',
      hours: 'Seg-Sex: 9h às 17h',
      waste: 'Papel, Plástico',
      company: 'Empresa XYZ',
    },
    {
      position: { lat: -22.9068, lng: -43.1729 }, // Rio de Janeiro
      title: 'Empresa ABC',
      address: 'Av. Rio Branco, 100 - Rio de Janeiro, RJ',
      hours: 'Seg-Sex: 8h às 17h',
      waste: 'Vidro, Eletrônicos',
      company: 'Empresa ABC',
    },
    {
      position: { lat: -19.9167, lng: -43.9345 }, // Belo Horizonte
      title: 'Empresa DEF',
      address: 'Av. Afonso Pena, 500 - Belo Horizonte, MG',
      hours: 'Seg-Sex: 9h às 18h',
      waste: 'Papel, Orgânicos',
      company: 'Empresa DEF',
    },
  ];

  // Adicionar marcadores para cada ponto de coleta
  pontosColeta.forEach((ponto) => {
    const marker = new window.google.maps.Marker({
      position: ponto.position,
      map: map,
      title: ponto.title,
      animation: window.google.maps.Animation.DROP,
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
      },
    });

    // Criar janela de informações para cada marcador
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div class="map-info-window">
          <h3>${ponto.title}</h3>
          <p><i class="fas fa-building"></i> ${ponto.company}</p>
          <p><i class="fas fa-map-marker-alt"></i> ${ponto.address}</p>
          <p><i class="fas fa-clock"></i> ${ponto.hours}</p>
          <p><i class="fas fa-recycle"></i> ${ponto.waste}</p>
          <button class="map-btn" onclick="agendarColeta('${ponto.title}')">Agendar Coleta</button>
        </div>
      `,
    });

    // Adicionar evento de clique para abrir a janela de informações
    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
  });

  // Adicionar controles do mapa
  setupMapControls(map, mapElement);
}

// Configurar controles do mapa
function setupMapControls(map, mapElement) {
  const controlsContainer =
    mapElement.parentElement.querySelector('.map-controls');

  if (controlsContainer) {
    // Botão de zoom in
    const zoomInBtn = controlsContainer.querySelector('[title="Zoom In"]');
    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', () => {
        map.setZoom(map.getZoom() + 1);
      });
    }

    // Botão de zoom out
    const zoomOutBtn = controlsContainer.querySelector('[title="Zoom Out"]');
    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', () => {
        map.setZoom(map.getZoom() - 1);
      });
    }

    // Botão de localização atual
    const locationBtn = controlsContainer.querySelector(
      '[title="Minha Localização"]',
    );
    if (locationBtn) {
      locationBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              map.setCenter(pos);
              map.setZoom(15);

              // Adicionar marcador na localização atual
              new window.google.maps.Marker({
                position: pos,
                map: map,
                title: 'Sua localização',
                icon: {
                  url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                },
              });
            },
            () => {
              showToast('Não foi possível obter sua localização.', 'error');
            },
          );
        } else {
          showToast('Seu navegador não suporta geolocalização.', 'error');
        }
      });
    }
  }
}

// Mostrar modal para adicionar novo ponto
function showAddPointModal(location, map) {
  const confirmAdd = confirm(
    `Deseja adicionar um novo ponto de coleta nas coordenadas: ${location.lat().toFixed(6)}, ${location.lng().toFixed(6)}?`,
  );

  if (confirmAdd) {
    // Criar um formulário para adicionar o novo ponto
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.innerHTML = `
      <div class="modal-content animate__animated animate__fadeInDown">
        <button class="close" aria-label="Fechar">&times;</button>
        <h2>Adicionar Novo Ponto de Coleta</h2>
        <form id="add-point-form">
          <div class="form-group">
            <label for="point-name">Nome do Ponto</label>
            <input type="text" id="point-name" required>
          </div>
          <div class="form-group">
            <label for="point-address">Endereço</label>
            <input type="text" id="point-address" required>
          </div>
          <div class="form-group">
            <label for="point-hours">Horário de Funcionamento</label>
            <input type="text" id="point-hours" placeholder="Ex: Seg-Sex: 8h às 18h" required>
          </div>
          <div class="form-group">
            <label>Tipos de Resíduos</label>
            <div class="residuos-checkboxes">
              <div class="checkbox-group">
                <input type="checkbox" id="waste-paper" checked>
                <label for="waste-paper">Papel</label>
              </div>
              <div class="checkbox-group">
                <input type="checkbox" id="waste-plastic" checked>
                <label for="waste-plastic">Plástico</label>
              </div>
              <div class="checkbox-group">
                <input type="checkbox" id="waste-metal">
                <label for="waste-metal">Metal</label>
              </div>
              <div class="checkbox-group">
                <input type="checkbox" id="waste-glass">
                <label for="waste-glass">Vidro</label>
              </div>
              <div class="checkbox-group">
                <input type="checkbox" id="waste-electronics">
                <label for="waste-electronics">Eletrônicos</label>
              </div>
            </div>
          </div>
          <input type="hidden" id="point-lat" value="${location.lat()}">
          <input type="hidden" id="point-lng" value="${location.lng()}">
          <div class="form-actions">
            <button type="button" class="btn-secondary" id="cancel-add-point">Cancelar</button>
            <button type="submit" class="btn-primary">Adicionar Ponto</button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);

    // Fechar o modal
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    // Cancelar adição
    const cancelBtn = modal.querySelector('#cancel-add-point');
    cancelBtn.addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    // Submeter formulário
    const form = modal.querySelector('#add-point-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Obter valores do formulário
      const name = document.getElementById('point-name').value;
      const address = document.getElementById('point-address').value;
      const hours = document.getElementById('point-hours').value;
      const lat = Number.parseFloat(document.getElementById('point-lat').value);
      const lng = Number.parseFloat(document.getElementById('point-lng').value);

      // Obter tipos de resíduos selecionados
      const wasteTypes = [];
      if (document.getElementById('waste-paper').checked)
        wasteTypes.push('Papel');
      if (document.getElementById('waste-plastic').checked)
        wasteTypes.push('Plástico');
      if (document.getElementById('waste-metal').checked)
        wasteTypes.push('Metal');
      if (document.getElementById('waste-glass').checked)
        wasteTypes.push('Vidro');
      if (document.getElementById('waste-electronics').checked)
        wasteTypes.push('Eletrônicos');

      // Adicionar marcador no mapa
      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: name,
        animation: window.google.maps.Animation.DROP,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        },
      });

      // Criar janela de informações
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="map-info-window">
            <h3>${name}</h3>
            <p><i class="fas fa-map-marker-alt"></i> ${address}</p>
            <p><i class="fas fa-clock"></i> ${hours}</p>
            <p><i class="fas fa-recycle"></i> ${wasteTypes.join(', ')}</p>
            <p><i class="fas fa-circle"></i> Status: Ativo</p>
            <button class="map-btn" onclick="editPonto('${name}')">Editar</button>
          </div>
        `,
      });

      // Adicionar evento de clique para abrir a janela de informações
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      // Adicionar o ponto à lista de pontos
      addPointToList(name, address, hours, wasteTypes.join(', '));

      // Fechar o modal
      document.body.removeChild(modal);

      // Mostrar mensagem de sucesso
      showToast('Ponto de coleta adicionado com sucesso!', 'success');
    });
  }
}

// Adicionar ponto à lista de pontos
function addPointToList(name, address, hours, waste) {
  const pontosGrid = document.querySelector('.pontos-grid');
  if (!pontosGrid) return;

  const pontoCard = document.createElement('div');
  pontoCard.className = 'ponto-card';
  pontoCard.innerHTML = `
    <div class="ponto-header">
      <h4>${name}</h4>
      <span class="ponto-status active">Ativo</span>
    </div>
    <div class="ponto-details">
      <p><i class="fas fa-map-marker-alt"></i> ${address}</p>
      <p><i class="fas fa-clock"></i> ${hours}</p>
      <p><i class="fas fa-recycle"></i> ${waste}</p>
    </div>
    <div class="ponto-actions">
      <button class="btn-primary"><i class="fas fa-edit"></i> Editar</button>
      <button class="btn-secondary"><i class="fas fa-trash-alt"></i> Remover</button>
    </div>
  `;

  pontosGrid.appendChild(pontoCard);
}

// Aplicar tema escuro ao mapa se necessário
function applyMapTheme(map) {
  const isDarkTheme =
    document.documentElement.getAttribute('data-theme') === 'dark';

  if (isDarkTheme) {
    map.setOptions({
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }],
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }],
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{ color: '#263c3f' }],
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#6b9a76' }],
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#38414e' }],
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#212a37' }],
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#9ca5b3' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{ color: '#746855' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#1f2835' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#f3d19c' }],
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{ color: '#2f3948' }],
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#17263c' }],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#515c6d' }],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#17263c' }],
        },
      ],
    });
  }
}

// Funções globais para interação com o mapa
window.editPonto = (pontoNome) => {
  showToast(`Edição do ponto ${pontoNome} será implementada em breve!`, 'info');
};

window.agendarColeta = (pontoNome) => {
  showToast(
    `Agendamento para ${pontoNome} será implementada em breve!`,
    'info',
  );
};

// Função para mostrar toast
function showToast(message, type = 'success', duration = 3000) {
  // Verificar se já existe uma função showToast global
  if (typeof window.showToast === 'function') {
    window.showToast(message, type, duration);
    return;
  }

  // Remover qualquer toast existente
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }

  // Criar elementos do toast
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  let icon = '';
  if (type === 'success')
    icon = '<i class="fas fa-check-circle toast-icon"></i>';
  else if (type === 'error')
    icon = '<i class="fas fa-times-circle toast-icon"></i>';
  else if (type === 'info')
    icon = '<i class="fas fa-info-circle toast-icon"></i>';
  else if (type === 'warning')
    icon = '<i class="fas fa-exclamation-triangle toast-icon"></i>';

  toast.innerHTML = `
    ${icon}
    <div class="toast-content">
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close">&times;</button>
  `;

  document.body.appendChild(toast);

  // Mostrar o toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  // Adicionar funcionalidade ao botão de fechar
  const closeToast = toast.querySelector('.toast-close');
  closeToast.addEventListener('click', () => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  });

  // Fechar automaticamente após a duração
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}
