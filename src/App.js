import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Login from './pages/Login';

class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     selectedAlbum: {},
  //   };
  //   this.changeSelectedAlbum = this.changeSelectedAlbum.bind(this);
  // }

  // changeSelectedAlbum(album) {
  //   this.setState({
  //     selectedAlbum: album,
  //   });
  // }

  render() {
    // const { selectedAlbum } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={ Login } exact />
          <Route
            path="/search"
            render={ (props) => (
              <Search
                { ...props }
                // chAlbum={ this.changeSelectedAlbum }
              />) }
          />
          {/* <Route
            path="/album/:id"
            render={ (props) => (
              <Album
                { ...props }
                objAlbum={ selectedAlbum }
              />) }
          /> */}
          <Route
            path="/album/:id"
            component={ Album }
          />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile" component={ Profile } exact />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
