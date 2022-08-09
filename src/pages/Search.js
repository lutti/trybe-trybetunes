import React from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumItem from './AlbumItem';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchDisabled: true,
      searchText: '',
      ultimaBusca: '',
      albumsDaBusca: [],
    };
    this.searchTextChange = this.searchTextChange.bind(this);
    this.searchClick = this.searchClick.bind(this);
  }

  searchTextChange({ target }) {
    const minimoDeCaracteres = 2;
    if (target.value.length >= minimoDeCaracteres) {
      this.setState({
        searchDisabled: false,
        searchText: target.value,
      });
    } else {
      this.setState({
        searchDisabled: true,
        searchText: target.value,
      });
    }
  }

  async searchClick() {
    const { searchText } = this.state;
    this.setState({ ultimaBusca: searchText });
    this.setState({ searchText: '' });
    const albumsFromAPI = await searchAlbumsAPI(searchText);
    this.setState({
      albumsDaBusca: albumsFromAPI,
    });
  }

  render() {
    const {
      searchDisabled,
      albumsDaBusca,
      searchText,
      ultimaBusca,
    } = this.state;
    // const { chAlbum } = this.props;
    // console.log(this.props);
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <div className="search-header">
            <input
              type="search"
              data-testid="search-artist-input"
              onChange={ this.searchTextChange }
              value={ searchText }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ searchDisabled }
              onClick={ this.searchClick }
            >
              Procura
            </button>
          </div>
          <div className="search-results">
            {
              albumsDaBusca.length > 0
                && <p>{ `Resultado de álbuns de: ${ultimaBusca}` }</p>
            }
            {
              albumsDaBusca.length === 0
                ? (<p>Nenhum álbum foi encontrado</p>)
                : (
                  albumsDaBusca.map((album) => (
                    <AlbumItem
                      { ...this.props }
                      // chAlbum={ chAlbum }
                      resultAlbum={ album }
                      key={ `${album.artistId}-${album.collectionId}` }
                    />
                  ))
                )
            }
          </div>
        </div>
      </>
    );
  }
}

// Search.propTypes = {
//   chAlbum: PropTypes.func.isRequired,
// };

export default Search;
