import { createRef, Component } from 'react';
import AccountOptions from './account options/AccountOptions';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
    this.accountRef = createRef();
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (
      this.accountRef.current &&
      (!this.accountRef.current.contains(event.target) ||
        !this.accountRef.current === event.target)
    ) {
      this.setState(state => ({
        dropdownOpen: false,
      }));
    }
  }

  toggleDropdown(event) {
    event.preventDefault();
    this.setState(state => ({
      dropdownOpen: !state.dropdownOpen,
    }));
  }

  render() {
    const { dropdownOpen } = this.state;

    return (
      <div className='account-container' ref={this.accountRef}>
        <a className='account' href='account options' onClick={this.toggleDropdown}>
          <div className='avatar-container'>
            <img src='/images/avatar.svg' alt='avatar' />
          </div>
          <img src='/images/down arrow.svg' alt='down arrrow' />
        </a>
        {dropdownOpen ? <AccountOptions /> : null}
      </div>
    );
  }
}

export default Account;
