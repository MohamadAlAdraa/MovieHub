import React,{useEffect} from 'react'
import axios from 'axios'
import Chip from '@material-ui/core/Chip';

const GenresFilter = ({type, selectedGenres, setSelectedGenres, Genres, setGenres, switchPage}) => {

    useEffect(()=>{
        let mounted = true;
        axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        .then((response) => {
            if(mounted){
                setGenres(response.data.genres);
            }
        }).catch((error) => {
            console.log(error.messages);
        });
        return () =>{
            mounted = false;
            setGenres([]);
        }
    }, [type, setGenres]);

    const handleAdd = (genre) => {
        switchPage(1);
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(Genres.filter(g=> g.id !==genre.id));
    }
    
    const handleDelete = (genre) => {
        switchPage(1);
        setGenres([...Genres, genre]);
        setSelectedGenres(selectedGenres.filter(g=> g.id !==genre.id));
    }
    return (
        <div style={{ padding: '20px 8px 20px 30px', display: 'flex', flexWrap: 'wrap' }}>
            {
                selectedGenres ? selectedGenres.map(genre=>{
                    return (<div key={genre.id} style={{ margin:'5px' }}>
                                <Chip label={genre.name} clickable size='small' color="primary" onDelete={()=>handleDelete(genre)}  />
                            </div>); 
                }) : null
            }
            {
                Genres ? Genres.map(genre=>{
                    return (<div key={genre.id} style={{ margin:'5px' }}>
                                <Chip label={ <strong>{genre.name}</strong> } clickable size='small'   onClick={()=>handleAdd(genre)} />
                            </div>); 
                }) : null
            }
        </div>
    )
}

export default GenresFilter
