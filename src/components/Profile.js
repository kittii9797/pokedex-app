import React from 'react'
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import PokeApiService from '../services/PokeApiService'
import { makeStyles } from '@material-ui/core/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './Styles.css'

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    score: { position: "absolute", zIndex: 4, color: 'white', top: "20px", left: "5px" }
}));

export default function Profile(probs) {
    console.log('profile', probs.info)
    const classes = useStyles();
    return (
        <div style={{ marginTop: '20px' }}>
            <Paper className={classes.paper}>
                {probs.info.types.map((item,i) => (
                    <Box style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '125px'}} mt={1} key={i}>
                        <div className={'icon'+ ' ' + item.type.name}>
                        <LazyLoadImage
                            key={item.type.name}
                            height={50}
                            width={50}
                            src={'/icons/' + item.type.name + '.svg'}
                        />
                        </div>
                        <div>{ PokeApiService.titleCase(item.type.name) }</div>
                        
                    </Box>
                ))}

            </Paper>
            
        </div>
    )
}

