import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      nomeLogin: '',
    };
  }

  async componentDidMount() {
    const user = await getUser();
    const { name } = user;
    this.setState({
      loading: false,
      nomeLogin: name,
    });
  }

  render() {
    const { loading, nomeLogin } = this.state;
    return (
      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search"> Search </Link>
        <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
        <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
        {
          loading
            ? (<Loading />)
            : (
              <span data-testid="header-user-name">
                { nomeLogin }
              </span>
            )
        }
      </header>
    );
  }
}

export default Header;
