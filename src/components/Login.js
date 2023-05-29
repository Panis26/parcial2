import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const baseUrl = 'http://localhost:3001';
  const navigate = useNavigate(); // Agregar esta línea para obtener la función de navegación

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "login": username, "password": password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'error') {
          setError(data.message);
        } else {
          localStorage.setItem('token', data.token);
          navigate('/listCafe');
        }
      });
  };

  return (
    <div style={{ backgroundColor: '#f2f2f2', height: '100vh' }}>
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
        <div className="card" style={{ width: '75%' }}>
          <div className="row no-gutters">
            <div className="card-body" style={{backgroundColor: '#ffdfd0'}}>
              <h5 className="card-title">
                <FormattedMessage id="Login" />
                </h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">
                    <FormattedMessage id="Name" />
                    </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    <FormattedMessage id="Password" />
                    </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group form-check">
                  <a href="#" className="ml-auto">
                    <FormattedMessage id="Forgot-password" />
                    </a>
                </div>
                <div className="text-center mb-4">
                  <button type="submit" className="btn btn-block" style={{backgroundColor: '#BDECB6'}}>
                    <FormattedMessage id="Join" />
                    </button>
                  <button type="submit" className="btn btn-block" style={{backgroundColor: '#ff7c70'}}>
                    <FormattedMessage id="Cancel" />
                    </button>
                </div>
              </form>
              <p className="text-danger">{error}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
