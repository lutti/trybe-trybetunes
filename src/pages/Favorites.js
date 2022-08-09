import React from 'react';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          <span>Qualquer coisa</span>
        </div>
      </>
    );
  }
}

export default Favorites;
