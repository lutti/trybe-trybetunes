import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albumId: props.match.params.id,
      // albumObject: {},
      artistName: '',
      albumName: '',
      songs: [],
      favSongsTrackIds: [],
    };
  }

  async componentDidMount() {
    const { albumId } = this.state;
    const favSongs = await getFavoriteSongs();
    const songsList = await getMusics(albumId);
    // console.log('componentDidMount');
    this.setState({
      favSongsTrackIds: favSongs,
      songs: songsList,
      artistName: songsList[0] === undefined ? '' : songsList[0].artistName,
      albumName: songsList[0] === undefined ? '' : songsList[0].collectionName,
    });
  }

  // async componentDidUpdate(prevProps, prevState) {
  //   const favSongs = await getFavoriteSongs();
  //   this.setState({
  //     favSongsTrackIds: favSongs,
  //   });
  // }

  render() {
    const { artistName, albumName, songs, loading, favSongsTrackIds } = this.state;
    if (loading) {
      return (
        <>
          <Header />
          <Loading />
        </>
      );
    }
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <p data-testid="artist-name">{ artistName }</p>
          <p data-testid="album-name">{ albumName }</p>
        </div>
        <div className="song-list">
          {
            songs.filter((track, index) => index !== 0)
              .map((song) => (
                <MusicCard
                  key={ song.previewUrl }
                  trackId={ song.trackId }
                  songName={ song.trackName }
                  previewUrl={ song.previewUrl }
                  isFavorite={ favSongsTrackIds.includes(song.trackId) }
                />
              ))
          }
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  // objAlbum: PropTypes.shape({
  //   artistName: PropTypes.string.isRequired,
  //   collectionName: PropTypes.string.isRequired,
  //   collectionId: PropTypes.number.isRequired,
  // }).isRequired,
};

export default Album;
