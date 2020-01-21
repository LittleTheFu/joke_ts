import * as React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
// import CircularProgress from '@material-ui/core/CircularProgress';

// interface Props {
//     name: string;
//     word?: string;
// }

// const JokeApp = ({ name, word = 'bad' }: Props): JSX.Element => {
//     return (
//         <div>
//             {name} with {word}
//             <Button variant="contained" color="primary">
//                 你好，世界
//             </Button>
//             <FormGroup>
//                 <FormControlLabel control={<Switch size="small" />} label="Small" />
//                 <FormControlLabel control={<Switch />} label="Normal" />
//             </FormGroup>
//             <CircularProgress />
//             <CircularProgress color="secondary" />
//         </div>
//     );
// };

//####################################################################################################
// const JokeApp: React.FC<{ name: string; word?: string }> = ({ name, word = 'pol' }) => {
//     return (
//         <div>
//             {name} with {word}
//             <Button variant="contained" color="primary">
//                 你好，世界
//             </Button>
//             <FormGroup>
//                 <FormControlLabel control={<Switch size="small" />} label="Small" />
//                 <FormControlLabel control={<Switch />} label="Normal" />
//             </FormGroup>
//             <CircularProgress />
//             <CircularProgress color="secondary" />
//         </div>
//     );
// };

const info = {
    method: 'GET',
    headers: {
        'x-rapidapi-host': 'joke3.p.rapidapi.com',
        'x-rapidapi-key': 'fc5476beb4mshc57aa5e3ed24365p114d83jsn1e6a83699ef6',
    },
};

const jokeUrl = 'https://joke3.p.rapidapi.com/v1/joke';

const useStyles = makeStyles({
    root: {
        height: 300,
    },
    icon: {
        size: 800,
    },
    box: {
        height: 100,
        color: 'red',
    },
    thumbers: {
        color: 'green',
    },
});

function api<T>(url: string, info: object): Promise<T> {
    return fetch(url, info).then(response => {
        if (!response.ok) {
            console.log(response);
            throw new Error(response.statusText);
        }
        return response.json().then(data => data as T);
    });
}

const JokeApp: React.FC = () => {
    const [joke, setJoke] = useState('default joke');
    const [isLoading, setLoadding] = useState(false);
    const [upvotes, setUpvotes] = useState(-1);
    const [downvotes, setDownvotes] = useState(-1);

    const classes = useStyles({});
    console.log(classes);

    const fetchData = (): void => {
        if (isLoading) return;
        setLoadding(true);
        api<{ id: string; content: string; upvotes: number; downvotes: number }>(jokeUrl, info)
            .then(({ id, content, upvotes, downvotes }) => {
                console.log(id, content);
                setJoke(content);
                setUpvotes(upvotes);
                setDownvotes(downvotes);
                setLoadding(false);
            })
            .catch(error => {
                console.log(error);
                setLoadding(false);
            });
    };

    return (
        <div>
            <Grid container justify="center" alignItems="center" className={classes.root}>
                <Grid container item xs={12} sm={6} justify="center">
                    {isLoading ? (
                        <CircularProgress color="secondary" size={80} />
                    ) : (
                        <div className={classes.box}>{joke}</div>
                    )}
                </Grid>
                <Grid item xs={6} sm={3}>
                    <ThumbUpIcon className={classes.thumbers} />:{upvotes}
                </Grid>
                <Grid item xs={6} sm={3}>
                    <ThumbDownIcon className={classes.thumbers} />:{downvotes}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" color="primary" onClick={fetchData}>
                        fetch
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default JokeApp;
