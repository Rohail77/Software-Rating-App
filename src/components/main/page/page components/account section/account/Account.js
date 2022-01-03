import { useEffect, useRef, useState } from 'react';
import AccountOptions from './account options/AccountOptions';

function Account(props) {
  const [state, setState] = useState({
    dropdownOpen: false,
  });

  const accountRef = useRef();

  const handleClickOutside = event => {
    if (
      accountRef.current &&
      (!accountRef.current.contains(event.target) ||
        !accountRef.current === event.target)
    ) {
      setState(state => ({
        dropdownOpen: false,
      }));
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = event => {
    event.preventDefault();
    setState(state => ({
      dropdownOpen: !state.dropdownOpen,
    }));
  };

  const { dropdownOpen } = state;

  return (
    <div className='account-container' ref={accountRef}>
      <a className='account' href='account options' onClick={toggleDropdown}>
        <div className='avatar-container'>
          <img src='/images/avatar.svg' alt='avatar' />
        </div>
        <img src='/images/down arrow.svg' alt='down arrrow' />
      </a>
      {dropdownOpen ? <AccountOptions /> : null}
    </div>
  );
}

export default Account;
