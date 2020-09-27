import React from 'react';
import { Link } from 'react-router-dom';

import accountIcon from '../../assets/images/account_circle-white-24dp.svg';
import listIcon from '../../assets/images/list-white-48dp.svg';

import './styles.css';

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) =>{
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <div className="nav-item dropdown">
          <Link to="#">
            <img
              src={ listIcon }
              alt="Barra de menu" 
              className="nav-link dropdown-toggle"
              id="navbarDropDown"
            />
          </Link>
        </div>
      
        <img src="" alt="" />
      </div>
      <div className="header-content">
        <strong>{ props.title }</strong>
        { props.description && <p>{ props.description }</p>}
      </div>
      
    </header>
  );
}

export default PageHeader;