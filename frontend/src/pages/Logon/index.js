import React, { useState } from "react";
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import api from "../../services/api";

import './styles.css'
import heroesImg from '../../assets/heroes.png'
import logonImg from '../../assets/logo.svg'

const Logon = () => {
  const [id, setId] = useState('');
  const history = useHistory();

  const handleLogin = e => {
    e.preventDefault();
    api.post('sessions', { id })
      .then(res => {
        localStorage.setItem('ongId', id);
        localStorage.setItem('ongName', res.data.name);
        history.push('/profile')
      })
      .catch(err => {
        alert('Falha no login!')
      })
  };

  return (
    <div className='logon-container'>
      <section className="form">
        <img src={logonImg} alt="Be the Hero!"/>
        <form onSubmit={handleLogin}>
          <h1>Faça seu LogOn</h1>
          <input type="text"
                 placeholder="Sua ID"
                 onChange={e => setId(e.target.value)}
          />
          <button className='button' type="submit">Entrar</button>
          <Link to="/register" className='back-link'>
            <FiLogIn size={16} color={'#E02041'}/>
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt='Heroes' />
    </div>
  )
};

export default Logon;