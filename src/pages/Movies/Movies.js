import React,{useState, useEffect} from 'react'
import axios from 'axios'
import MovieCard from '../../components/MovieCard/MovieCard';
import CustomPagination from '../../components/Pagination/CustomPagination';
import PageTitle from '../Shared/PageTitle/PageTitle';
import GenresFilter from '../../components/Genres/GenresFilter';
import useGenres from '../../hooks/useGenres';
const Movies = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [Genres, setGenres] = useState([]);
    const genresURL = useGenres(selectedGenres);

    useEffect(()=>{
        let mounted = true;
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresURL}`)
        .then((response) => {
            if(mounted){
                setContent(response.data.results);
                setNumberOfPages(response.data.total_pages);
            }
        }).catch((error) => {
            console.log(error.messages);
        });
        return () =>{
            mounted = false;
        }
    }, [page, genresURL]);

    const style = {
        'display': 'flex',
        'flexWrap': 'wrap',
        'justifyContent': 'space-around',
    }
    
    return (
        <div>
            <>
            <PageTitle title='Movies' />
            <GenresFilter 
                type='movie' 
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                Genres={Genres}
                setGenres={setGenres}
                switchPage={setPage} />

            <div style={style}>
                {
                    content ? content.map(c=>{
                        return  <MovieCard
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type='movie'
                            vote_average={c.vote_average} />
                    }) : null
                }
            </div>
            {
                numberOfPages > 1 ? <CustomPagination switchPage={setPage} numberOfPages={numberOfPages}  /> : null
            }
            
        </>
        </div>
    )
}

export default Movies
