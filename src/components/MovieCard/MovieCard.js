import React from 'react'
import {img_300} from '../../config/config';
import classes from './MovieCard.module.css';
import Badge from '@material-ui/core/Badge';
import Modal from '../Modal/Modal';

const MovieCard = ({id, poster, title, date, media_type, vote_average}) => {
    return (
        
            <div className={classes.MovieCard}>
                <Modal media_type={media_type} id={id}>
                    <div className={classes.MovieCardInside}>
                        <div className={classes.Badge}>
                            <Badge badgeContent={vote_average ? vote_average : '*'} color={vote_average ? vote_average > 7 ? 'primary' : 'secondary' : 'secondary'} />
                        </div>
                        <div className={classes.Poster}>
                            <img 
                                src={ poster ? img_300 + poster : "https://www.movienewz.com/img/films/poster-holder.jpg" }
                                alt={title} />
                        </div>
                        <div className={classes.Title}>
                            <span>{title}</span>
                        </div>
                        <div className={classes.MovieCardFooter}>
                            <span>
                                {media_type === 'tv' ? "TV Series" : "Movies"}
                            </span>
                            <span>
                                {date}
                            </span>
                        </div>
                    </div>
                </Modal>
            </div>
       
    )
}

export default MovieCard
