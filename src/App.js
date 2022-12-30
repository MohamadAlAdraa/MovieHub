import React from 'react';
import Header from './components/Header/Header';
import classes from './App.module.css';
import SimpleBottomNavigation from './components/Footer/Footer-Navigation';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Trending from './pages/Trending/Trending';
import Movies from './pages/Movies/Movies';
import TvSeries from './pages/TvSeries/TvSeries';
import Search from './pages/Search/Search';
import { Container } from '@material-ui/core';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className={classes.App}>
        <Container>
          <Switch>
            <Route path='/' component={Trending} exact />
            <Route path='/Movies' component={Movies} />
            <Route path='/TvSeries' component={TvSeries} />
            <Route path='/Search' component={Search} />
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  )
}

export default App
