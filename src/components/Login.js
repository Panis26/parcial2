import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realizar la petición al backend
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        // Manejar la respuesta del backend
        console.log(data);
      })
      .catch(error => {
        // Manejar errores de la petición
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      });
  };

  return (
    <div style={{ backgroundColor: '#f2f2f2', height: '100vh' }}>
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
        <div className="card" style={{ width: '75%' }}>
          <div className="row no-gutters">
            <div className="card-body" style={{backgroundColor: '#ffdfd0'}}>
              <h5 className="card-title">Iniciar sesión</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Nombre de usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group form-check">
                  <a href="#" className="ml-auto">Forgot Password?</a>
                </div>
                <div className="text-center mb-4">
                  <button type="submit" className="btn btn-block" style={{backgroundColor: '#BDECB6'}}>Ingresar</button>
                  <button type="submit" className="btn btn-block" style={{backgroundColor: '#ff7c70'}}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
