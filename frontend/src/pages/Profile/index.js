import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import api from "../../services/api";

import './styles.css'
import logoImg from '../../assets/logo.svg'

const Profile = () => {
  const history = useHistory();
  const [incidents, setIncidents] = useState([])
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId
      }
    })
      .then(res => {
        setIncidents(res.data)
      })
  }, [ongId]);

  const handleLogout = () => {
    localStorage.clear();
    history.push('/')
  };

  const handleDeleteIncident = id => {
    api.delete(`incidents/${id}`, {
      headers: {
        Authorization: ongId
      }
    })
      .then(res => {
          setIncidents(incidents.filter(incident => incident.id !== id))
        }
      )
      .catch(err =>
        alert('Erro ao deletar caso! Tente novamente.')
      )
  };
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero!"/>
        <span>Bem-Vinda, {ongName} </span>
        <Link to='/incidents/new' className='button'>Cadastrar Novo Caso</Link>
        <button type='button'  onClick={handleLogout}>
          <FiPower size={18} color="#E02041"/>
        </button>
      </header>
      <h1>Casos Cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO: </strong>
            <p>{incident.title}</p>
            <strong>Descrição: </strong>
            <p>{incident.description}</p>
            <strong>Valor: </strong>
            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
            <button type='button' onClick={() => handleDeleteIncident(incident.id)}><FiTrash2 size={20} color='#A8A8B3'/></button>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default Profile;