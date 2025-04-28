import React from 'react';
import './Footer.scss'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-links">
          <a href="#rules" className="footer-link">Правила и условия для бонусов</a>
          <a href="#aml" className="footer-link">Политика AML и KYC</a>
          <a href="#withdrawal" className="footer-link">Политика вывода и возврата</a>
          <a href="#privacy" className="footer-link">Политика конфиденциальности</a>
          <a href="#responsible" className="footer-link">Ответственная игра</a>
          <a href="#fair" className="footer-link">Честная игра</a>
          <a href="#rules-games" className="footer-link">Правила игр</a>
     
        </div>
      </div>
    </footer>
  );
};

export default Footer;