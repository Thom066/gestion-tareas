import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
      const data = await res.json();

      if (data.length > 0) {
        localStorage.setItem('auth', JSON.stringify(data[0]));
        navigate('/dashboard');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Credenciales inválidas',
          text: 'Revisa tu correo y contraseña',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error de servidor',
        text: 'No se pudo conectar al servidor',
      });
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        <p style={{ marginTop: '1rem' }}>
  ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
</p>

      </form>
    </div>
  );
}

export default Login;
