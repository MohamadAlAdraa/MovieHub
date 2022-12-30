import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect} from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import CustomPagination from '../../components/Pagination/CustomPagination';
import PageTitle from '../Shared/PageTitle/PageTitle';


const Trending = () => {
    
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(()=>{
        let mounted = true;
        axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
        .then((response) => {
            if(mounted){
                setContent(response.data.results);
            }
        }).catch((error) => {
            console.log(error.messages);
        });
        return () =>{
            mounted = false;
        }
    }, [page]);


    const style = {
        'display': 'flex',
        'flexWrap': 'wrap',
        'justifyContent': 'space-around',
    }

    return (
        <>
            <PageTitle title='Trending Movies' />
            <div style={style}>
                {
                    content ? content.map(c=>{
                        return  <MovieCard
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type={c.media_type}
                            vote_average={c.vote_average} />
                    }) : null
                }
            </div>
            <CustomPagination switchPage={setPage} />
        </>
    )
}

export default Trending
