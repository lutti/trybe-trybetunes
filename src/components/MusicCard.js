import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fav: props.isFavorite,
      load: false,
    };
  }

  checkboxOnChange = async ({ target }) => {
    const { trackId } = this.props;
    this.togLoading();
    if (target.checked) {
      this.setState({
        fav: true,
      });
      await addSong(trackId);
    } else {
      this.setState({
        fav: false,
      });
    }
    this.togLoading();
  }

  togLoading = () => {
    this.setState((prevState) => ({
      load: !prevState.load,
    }));
  }

  render() {
    const { fav, load } = this.state;
    const { songName, previewUrl, trackId } = this.props;
    return (
      <>
        {load
          && <p>Carregando...</p>}
        <label htmlFor="song-or-track">
          { songName }
          <audio
            data-testid="audio-component"
            id="song-or-track"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
        </label>
        <label htmlFor="check-fav">
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id="check-fav"
            checked={ fav }
            onChange={ this.checkboxOnChange }
          />
        </label>
      </>
    );
  }
}

MusicCard.propTypes = {
  songName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default MusicCard;
