// Função para mostrar o overlay de carregamento
function showLoadingOverlay() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.style.display = 'flex';
  }
}

// Função para esconder o overlay de carregamento
function hideLoadingOverlay() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
      overlay.style.opacity = '1';
    }, 300);
  }
}

// Função para mostrar notificações toast
function showToast(message, type = 'success', duration = 3000) {
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

// Função para inicializar o login
function initLogin() {
  console.log('Inicializando login...');

  // Esconder o overlay de carregamento quando a página estiver carregada
  hideLoadingOverlay();

  // Obter elementos do DOM
  const loginBtn = document.getElementById('login-btn');
  const loginModal = document.getElementById('login-modal');
  const closeBtn = document.querySelector('.close');
  const loginForm = document.getElementById('login-form');

  // Verificar se os elementos existem
  if (!loginBtn) {
    console.error('Botão de login não encontrado!');
    return;
  }

  if (!loginModal) {
    console.error('Modal de login não encontrado!');
    return;
  }

  if (!closeBtn) {
    console.error('Botão de fechar não encontrado!');
    return;
  }

  if (!loginForm) {
    console.error('Formulário de login não encontrado!');
    return;
  }

  // Adicionar evento de clique ao botão de login
  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Botão de login clicado');
    loginModal.classList.add('show');
  });

  // Adicionar evento de clique ao botão de fechar
  closeBtn.addEventListener('click', () => {
    console.log('Botão de fechar clicado');
    loginModal.classList.remove('show');
  });

  // Fechar modal ao clicar fora dele
  window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
      loginModal.classList.remove('show');
    }
  });

  // Adicionar evento de envio ao formulário de login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Formulário de login enviado');

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const loginError = document.getElementById('login-error');

    // Mostrar overlay de carregamento
    showLoadingOverlay();

    // Simular um pequeno atraso para mostrar o overlay
    setTimeout(() => {
      if (email === 'instituicao@gmail.com' && password === '123') {
        // Login como instituição
        loginModal.classList.remove('show');
        document.getElementById('login-page').classList.remove('active');
        document
          .getElementById('instituicao-dashboard')
          .classList.add('active');
        showToast('Login realizado com sucesso!', 'success');
      } else if (email === 'empresa@gmail.com' && password === '123') {
        // Login como empresa
        loginModal.classList.remove('show');
        document.getElementById('login-page').classList.remove('active');
        document.getElementById('empresa-dashboard').classList.add('active');
        showToast('Login realizado com sucesso!', 'success');
      } else {
        // Login inválido
        if (loginError) {
          loginError.textContent = 'Email ou senha incorretos.';
        }
        showToast('Email ou senha incorretos.', 'error');
      }

      // Esconder overlay de carregamento
      hideLoadingOverlay();
    }, 1000);
  });

  // Adicionar funcionalidade para mostrar/esconder senha
  const togglePasswordBtns = document.querySelectorAll('.toggle-password');
  togglePasswordBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      const passwordInput = this.previousElementSibling;
      const type =
        passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);

      // Alternar ícone
      const icon = this.querySelector('i');
      icon.classList.toggle('fa-eye');
      icon.classList.toggle('fa-eye-slash');
    });
  });
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initLogin);
