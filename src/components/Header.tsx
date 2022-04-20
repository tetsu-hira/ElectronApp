import React from 'react';

import Icon from './image/search.png';

const Header: React.FC = () => {
  return (
    <div className='Header'>
      <div className='HeaderContainer'>
        <div className='WebTitle'>2setMatch</div>
        {/* <ul className='HeaderLink'>
          <li className='HeaderLink__item'>
            <Link to='/' className='HeaderLink__text'>
              Home
            </Link>
          </li>
          <li className='HeaderLink__item'>
            <Link to='/top' className='HeaderLink__text'>
              TOP
            </Link>
          </li>
          <li className='HeaderLink__item'>
            <Link to='/test' className='HeaderLink__text'>
              TEST
            </Link>
          </li>
        </ul> */}
        <div className='HeaderRight'>
          <div className='search'>
            <img className='icon' src={Icon} alt='アイコン' />
          </div>
          <div className='account'>
            <a className='circle'>TH</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
