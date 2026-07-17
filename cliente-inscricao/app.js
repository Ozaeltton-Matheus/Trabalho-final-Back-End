const API_URL = 'https://sua-api-no-render.onrender.com'; 

const formLogin = document.getElementById('form-login');
const formDupla = document.getElementById('form-cadastro-dupla');
const btnLogout = document.getElementById('btn-logout');

async function realizarLogin(email, senha, categoriaPreferida) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    if (response.ok) {
      const data = await response.json();
      
      const token = data.access_token || data.token;
      localStorage.setItem('jwt_token', token);
      localStorage.setItem('usuario_logado', JSON.stringify(data.usuario));
      
      document.cookie = `categoria_preferida=${categoriaPreferida}; path=/; max-age=${60 * 60 * 24 * 7}; Secure; SameSite=Strict`;
      
      alert('Login realizado com sucesso!');
      window.location.reload();
    } else {
      const errorData = await response.json();
      alert(`Erro no login: ${errorData.message || 'Credenciais inválidas'}`);
    }
  } catch (error) {
    console.error('Erro de conexão:', error);
    alert('Erro ao conectar com o servidor.');
  }
}

if (formLogin) {
  formLogin.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const categoriaSelect = document.getElementById('select-categoria');
    const categoriaPreferida = categoriaSelect ? categoriaSelect.value : 'geral';
    
    await realizarLogin(email, senha, categoriaPreferida);
  });
}

if (formDupla) {
  formDupla.addEventListener('submit', async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('jwt_token');

    if (!token) {
      alert('Você precisa estar logado para cadastrar uma dupla!');
      return;
    }

    const formData = new FormData(formDupla);

    try {
      const response = await fetch(`${API_URL}/duplas`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (response.ok) {
        alert('Dupla cadastrada com sucesso!');
        formDupla.reset();
      } else {
        const err = await response.json();
        alert(`Erro ao cadastrar dupla: ${err.message}`);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao enviar dados para o servidor.');
    }
  });
}

if (btnLogout) {
  btnLogout.addEventListener('click', () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('usuario_logado');
    document.cookie = 'categoria_preferida=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    alert('Sessão encerrada!');
    window.location.reload();
  });
}

function obterCookie(nome) {
  const cookies = document.cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const [chave, valor] = cookies[i].split('=');
    if (chave === nome) return decodeURIComponent(valor);
  }
  return null;
}

window.addEventListener('DOMContentLoaded', () => {
  const categoriaFavorita = obterCookie('categoria_preferida');
  if (categoriaFavorita) {
    const selectCategoria = document.getElementById('select-categoria');
    if (selectCategoria) {
      selectCategoria.value = categoriaFavorita;
    }
  }

  const token = localStorage.getItem('jwt_token');
  const areaAutenticado = document.getElementById('area-restrita');
  if (token && areaAutenticado) {
    areaAutenticado.style.display = 'block';
  }
});