import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumItem extends React.Component {
  // linkOnclick = () => {
  //   const { resultAlbum, chAlbum } = this.props;
  //   chAlbum(resultAlbum);
  // }

  render() {
    const { resultAlbum } = this.props;
    return (
      <div className="album-item">
        <Link
          to={ `/album/${resultAlbum.collectionId}` }
          data-testid={ `link-to-album-${resultAlbum.collectionId}` }
          // onClick={ this.linkOnclick }
        >
          <h4>{ resultAlbum.collectionName }</h4>
        </Link>
      </div>
    );
  }
}

AlbumItem.propTypes = {
  resultAlbum: PropTypes.shape({
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
  }).isRequired,
  // chAlbum: PropTypes.func.isRequired,
};

export default AlbumItem;
