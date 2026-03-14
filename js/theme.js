// Gerenciador de tema (claro/escuro)
document.addEventListener('DOMContentLoaded', () => {
  // Verificar se há uma preferência salva
  const savedTheme = localStorage.getItem('theme');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Definir tema inicial com base na preferência salva ou preferência do sistema
  if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  // Atualizar ícones dos botões de tema
  updateThemeIcons();

  // Adicionar listeners para os botões de tema
  const themeToggles = document.querySelectorAll('.theme-toggle');
  themeToggles.forEach((toggle) => {
    toggle.addEventListener('click', toggleTheme);
  });

  // Atualizar logos quando o tema muda
  updateLogoTheme(
    document.documentElement.getAttribute('data-theme') || 'light',
  );
});

// Função para alternar entre temas
function toggleTheme() {
  const currentTheme =
    document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  // Aplicar o novo tema
  document.documentElement.setAttribute('data-theme', newTheme);

  // Salvar a preferência
  localStorage.setItem('theme', newTheme);

  // Atualizar ícones
  updateThemeIcons();

  // Atualizar logos
  updateLogoTheme(newTheme);

  // Mostrar feedback
  showThemeChangeToast(newTheme);
}

// Atualizar ícones dos botões de tema
function updateThemeIcons() {
  const currentTheme =
    document.documentElement.getAttribute('data-theme') || 'light';
  const themeToggles = document.querySelectorAll('.theme-toggle');

  themeToggles.forEach((toggle) => {
    const icon = toggle.querySelector('i');
    if (icon) {
      if (currentTheme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    }
  });
}

// Atualizar logos para o tema atual
function updateLogoTheme(theme) {
  document.querySelectorAll('svg.logo-svg').forEach((svg) => {
    if (theme === 'dark') {
      svg.setAttribute('data-theme', 'dark');
    } else {
      svg.removeAttribute('data-theme');
    }
  });
}

// Mostrar toast de confirmação de mudança de tema
function showThemeChangeToast(theme) {
  const message =
    theme === 'dark' ? 'Tema escuro ativado' : 'Tema claro ativado';

  // Verificar se a função showToast existe (definida em login.js)
  if (window.showToast) {
    window.showToast(message, 'success', 2000);
  } else {
    // Implementação alternativa caso showToast não esteja disponível
    const toast = document.createElement('div');
    toast.className = `toast success`;
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.right = '20px';
    toast.style.padding = '10px 20px';
    toast.style.backgroundColor = theme === 'dark' ? '#333' : '#fff';
    toast.style.color = theme === 'dark' ? '#fff' : '#333';
    toast.style.borderRadius = '5px';
    toast.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    toast.style.zIndex = '9999';

    toast.innerHTML = `
      <i class="fas fa-${theme === 'dark' ? 'moon' : 'sun'}"></i>
      <span style="margin-left: 10px">${message}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      document.body.removeChild(toast);
    }, 2000);
  }
}
