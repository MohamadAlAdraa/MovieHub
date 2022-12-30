import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MovieIcon from '@material-ui/icons/Movie';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import TvIcon from '@material-ui/icons/Tv';
import SearchIcon from '@material-ui/icons/Search';
import { useEffect } from 'react';
import { useHistory } from 'react-router';


const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: 'rgb(57, 68, 90)',
    zIndex: 100
  },
  active: {
    fontWeight: 700
  }
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const history = useHistory();

  useEffect(()=>{
    if(value === 0) return history.push('/')
    if(value === 1) return history.push('/Movies')
    if(value === 2) return history.push('/TvSeries')
    if(value === 3) return history.push('/Search')
  }, [value, history])  

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        window.scroll(0,0)
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction 
        style={{ color: 'white' }}
        label="Trending"
        icon={<WhatshotIcon />}
        classes={
          {
            selected: classes.active
          }
        } />

      <BottomNavigationAction
        style={{ color: 'white' }} 
        label="Movies" 
        icon={<MovieIcon />}
        classes={
          {
            selected: classes.active
          }
        } />

      <BottomNavigationAction 
        style={{ color: 'white' }} 
        label="TV Series" 
        icon={<TvIcon />}
        classes={
          {
            selected: classes.active
          }
        } />

      <BottomNavigationAction 
        style={{ color: 'white' }} 
        label="Search" 
        icon={<SearchIcon />}
        classes={
          {
            selected: classes.active
          }
        } />
        
    </BottomNavigation>
  );
}