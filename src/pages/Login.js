import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nameLogin: '',
      isLoginButtonDisabled: true,
      loading: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.clickLogin = this.clickLogin.bind(this);
  }

  onInputChange({ target }) {
    const minimoDeCaracteres = 3;
    if (target.value.length >= minimoDeCaracteres) {
      this.setState({
        isLoginButtonDisabled: false,
        nameLogin: target.value,
      });
    } else {
      this.setState({
        isLoginButtonDisabled: true,
        nameLogin: target.value,
      });
    }
  }

  async clickLogin() {
    const { history } = this.props;
    const { nameLogin } = this.state;
    this.setState({ loading: true });
    await createUser({ name: nameLogin });
    history.push('/search');
  }

  render() {
    const { isLoginButtonDisabled, loading } = this.state;
    return (
      <div data-testid="page-login">
        {
          loading
            ? (<Loading />)
            : (
              <>
                <label htmlFor="name-input">
                  Nome:
                  <input
                    type="text"
                    data-testid="login-name-input"
                    id="name-input"
                    onChange={ this.onInputChange }
                  />
                </label>
                <input
                  type="button"
                  data-testid="login-submit-button"
                  disabled={ isLoginButtonDisabled }
                  value="Entrar"
                  onClick={ this.clickLogin }
                />
              </>)
        }
      </div>
    );
  }
}

Login.propTypes = {
  // history: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
