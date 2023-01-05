import React from 'react'
import Paper from '@material-ui/core/Paper';
import PokeApiService from '../services/PokeApiService'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
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
    score: { position: "absolute", zIndex: 4, color: 'white', top: "20px", left: "5px" },
    sec:{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: 'column'
    },
    pad:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    }
}));

export default function Stats(probs) {
    const classes = useStyles();
    return (
        <div>
            <Paper>
                <Box p={5} className={classes.pad}>
                    <div className={classes.sec}>
                    <div className='shape' >Weight</div><span>{probs.info.weight / 10} kg</span>
                    </div>
                    <div className={classes.sec}>
                    <div className='shape' >Height</div><span>{probs.info.height / 10} m</span>
                    </div>
                    <div className={classes.sec}>
                    <div className='shape' >Experience</div><span>{probs.info.base_experience}</span>
                    </div>
                </Box>
            </Paper>
            
            <Paper className={classes.paper} style={{marginTop: '8px', flexWrap: 'wrap', flexDirection: 'row'}}>
                {probs.info.stats.map((item,i) => (
                    <Box key={i} style={{position:"relative", width: '33.333333%', flexBasis: '33.333333%'}}>
                        <div style={{textAlign: 'center'}}>{ PokeApiService.titleCase(item.stat.name) }</div>
                        <div className={classes.score} >{item.base_stat}</div>
                        {/* <LinearProgress style={{ height: "20px", borderRadius: '50px'}} value={item.base_stat} variant="determinate" color="primary" /> */}
                        <CircularProgressbar value={item.base_stat} text={`${item.base_stat}`} />
                    </Box>
                ))}

            </Paper>

            
            

        </div>
    )
}
