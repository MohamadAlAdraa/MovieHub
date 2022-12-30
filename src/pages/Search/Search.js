import React from 'react'
import PageTitle from '../Shared/PageTitle/PageTitle'
import TextField from '@material-ui/core/TextField'
import { createTheme, Tab, ThemeProvider, Button } from '@material-ui/core'
import Tabs from '@material-ui/core/Tabs'
import { useState, useEffect } from 'react'
import axios from 'axios';
import SearchIcon from "@material-ui/icons/Search";
import MovieCard from '../../components/MovieCard/MovieCard';
import CustomPagination from '../../components/Pagination/CustomPagination';
const theme = createTheme({
    palette:{
        type: 'dark',
        primary: {
            main : '#fff'
        }
    }
})

const Search = () => {

    const [type, setType] = useState(0);
    const [content, setContent] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState();
    const [page, setPage] = useState(1);
    const [searchedText, setSearchedText] = useState("");    

    const handleChange = (event, newValue) => {
        setType(newValue);
        setPage(1);
      };

    const fetchSearch = async () => {
    try {
        const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
            process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchedText}&page=${page}&include_adult=false`
        );
        setContent(data.results);
        setNumberOfPages(data.total_pages);
        // console.log(data);
    } catch (error) {
        console.error(error);
    }
    };
    
    useEffect(() => {
        fetchSearch();
        // eslint-disable-next-line
    }, [type, page]);

    const style = {
        'display': 'flex',
        'flexWrap': 'wrap',
        'justifyContent': 'space-around',
    }
    return (
        <>
            <PageTitle title='Search For Your Favorite Movie OR Series' />  
            <ThemeProvider theme={theme}>
                <div style={{ display: 'flex', width: '100%', marginBottom: '20px' }}>
                
                        <TextField 
                            label="Search"
                            variant="filled"
                            color='primary'
                            size='small'
                            style={{ flex: '1', margin:'10px 5px 10px 5px' }}
                            onChange={e=>{
                                setSearchedText(e.target.value);   
                            }}
                        />
                        <Button
                            onClick={fetchSearch}
                            variant="contained"
                            style={{ margin:'10px 5px 10px 5px' }}
                        >
                            <SearchIcon fontSize="large" />
                        </Button>
                
                </div>
                <Tabs value={type} indicatorColor='primary' style={{ paddingBottom: 5 }} textColor='primary' variant="fullWidth" onChange={handleChange} >
                    <Tab style={{width: '50%'}} label='Search Movie' />
                    <Tab style={{ width: '50%' }} label='Search TV Series' />
                </Tabs>
            </ThemeProvider>
            <div style={style}>
                {content &&
                    content.map((c) => (
                        <MovieCard
                        key={c.id}
                        id={c.id}
                        poster={c.poster_path}
                        title={c.title || c.name}
                        date={c.first_air_date || c.release_date}
                        media_type={type ===1 ? "tv" : "movie"}
                        vote_average={c.vote_average}
                        />
                    ))}
                    {
                    searchedText &&
                    !content &&
                    (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
                {numberOfPages > 1 && (
                    <CustomPagination switchPage={setPage} numberOfPages={numberOfPages}  />
                )}
            </div>
            
        </>
    )
}

export default Search
