import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PokeApiService from '../services/PokeApiService'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch } from 'react-redux';
import { addFav, removeFav } from '../actions'
import { useSelector } from 'react-redux';
import _array from 'lodash/array'
import { useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import './Styles.css'


const useStyles = makeStyles({
    card: {
        boxShadow: '0px 1px 10px 2px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        textAlign: 'center',
        '&:hover': {
            background: "#79caf9",
            outline: '3px solid #b1c2c5'
        },
        cursor: "pointer"

    },
    media: {
        paddingTop: '10px'
    },
    text: {
        textTransform: "capitalize"
    },
    fav: { position: 'absolute' },
    
    grid: {
        flexGrow: 1,
        padding: '20px',
    },
});



const PokeCard = React.memo((probs) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites)
    const [favColor, setFavColor] = useState("");
    let history = useHistory();
    const [pokemon, setPokemon] = useState({});

    const clickFav = (e) => {
        e.stopPropagation();
        const index = _array.findIndex(favorites.items, function (fav) {
            return fav.name === probs.pokemon.name;
        });

        if (index > -1) {
            setFavColor("");
            dispatch(removeFav(index));
        } else {
            setFavColor("red");
            dispatch(addFav(probs.pokemon));
        }
    }

    useEffect(() => {
        PokeApiService.fetchPokemon(probs.pokemon.name)
        .then((response) => {
            setPokemon(response.data)
        })
        const index = _array.findIndex(favorites.items, function (fav) {
            return fav.name === probs.pokemon.name;
        });
        if (index > -1) {
            setFavColor("red")
        } else {
            setFavColor("")
        }
    }, [favorites, probs.pokemon.name])


    return (
        <Card className={classes.card} onClick={() => history.push('/detail/' + probs.pokemon.name)} >

            <div className='pokeIcon'>
                <IconButton
                    style={{ color: favColor }}
                    onClick={clickFav}
                    aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
            </div>

            <div className="wg-box-content">
                <a href="#">

                        <div className="wg-box-content-overlay"></div>

                        <Grid container>
                            <Grid item xs={12} style={{background: 'url(https://wallup.net/wp-content/uploads/2016/05/24/143432-nature-Pokemon.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                                <div className='pokeName'>
                                    {probs.pokemon.name}
                                </div>
                                <div className='pokeOwned'>
                                    <div># <span>{pokemon.id}</span></div>
                                </div>
                                
                                <LazyLoadImage
                                    className='pokeImage'
                                    key={probs.pokemon.url}
                                    height={150}
                                    width={150}
                                    visibleByDefault={false}
                                    src={PokeApiService.getImage(probs.pokemon.url)}
                                />
                                
                            </Grid>
                            
                        </Grid>

                    <div className="wg-box-content-details wg-box-fadeIn-bottom">
                        <h3 className="wg-box-content-title">Show more</h3>
                        <p className="wg-box-content-text">Click and check more information</p>
                    </div>
                </a>
            </div>
        </Card>

    );
})

export default PokeCard;