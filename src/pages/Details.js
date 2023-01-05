import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

import PokeApiService from '../services/PokeApiService'
import Profile from '../components/Profile'
import Stats from '../components/Stats'

import './Styles.css'
import Loading from '../components/Loading';



export default function Details() {
    let { name } = useParams();
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState({});


    useEffect(() => {
        setLoading(true);
        PokeApiService.fetchPokemon(name)
            .then((response) => {
                setPokemon(response.data)
                return response.data.moves
            })
            .then((moves) => {
                let movesFetch = [];
                moves.map((item) => movesFetch.push(PokeApiService.fetchPokemonMove(item.move.url)))
                return Promise.all(movesFetch)
            })
            .then(() => setLoading(false))
            .catch((e) => { setLoading(false); console.log("error", e) })
    }, [name]);

    const pokeColor = {
        grass: '#A7DB8D',
        fire: '#F5AC78',
        water: '#9DB7F5',
        bug: '#C6D16E',
        normal: '#C6C6A7',
        poison: '#C183C1',
        electric: '#FAE078',
        ground: '#EBD69D',
        fairy: '#F4BDC9',
        fighting: '#D67873',
        psychic: '#FA92B2',
        rock: '#D1C17D',
        ghost: '#A292BC',
        ice: '#BCE6E6',
        dragon: '#A27DFA',
    } 

    if (loading) {
        return (<div><Loading/></div>)
    } else
        return (
            <div className='modal'>
                <Grid container spacing={3}> 

                    <div style={{position: 'absolute', paddingTop: '30px', paddingLeft: '15px'}}>
                        <a href="/" className="previous round">&#8249;</a>
                    </div>

                    <Grid item xs={12} md={6} lg={6} style={{display: 'flex',alignItems: 'center',justifyContent: 'center', backgroundColor: pokeColor[pokemon.types[0].type.name], marginBottom: '20px', marginTop: '20px'}}>
                        <div>
                            <img alt={name} width="100%" src={PokeApiService.getBigImage(pokemon.id)}></img>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                        <Paper style={{padding: '20px'}}>
                        <Typography style={{ textTransform: "capitalize", fontWeight: 'bold', color: '#595761'}} variant="h5" component="h5">
                            {name}
                        </Typography>
                        </Paper>
                       
                        <Profile info={pokemon}></Profile>
                        <Box pt={1}></Box>
                        <Stats info={pokemon}></Stats>
                    </Grid>

                </Grid>
            </div>
        )
}
