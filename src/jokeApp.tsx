import * as React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

// function api<T>(url: string, info: object): Promise<T> {
//     return fetch(url, info).then(response => {
//         if (!response.ok) {
//             console.log(response);
//             throw new Error(response.statusText);
//         }
//         return response.json().then(data => data as T);
//     });
// }

async function api<T>(url: string, info: object): Promise<T> {
    const response = await fetch(url, info);
    if (!response.ok) {
        console.log(response);
        throw new Error(response.statusText);
    }
    const data = await response.json();
    return data as T;
}

const createVoteUrl = (id: number, isUpvote: boolean): string => {
    const voteType = isUpvote ? 'upvote' : 'downvote';
    return 'https://joke3.p.rapidapi.com/v1/joke/' + id + '/' + voteType;
};

const createPostInfo = (): object => {
    return {
        method: 'POST',
        headers: {
            'x-rapidapi-host': 'joke3.p.rapidapi.com',
            'x-rapidapi-key': 'fc5476beb4mshc57aa5e3ed24365p114d83jsn1e6a83699ef6',
            'content-type': 'application/x-www-form-urlencoded',
        },
        body: {},
    };
};

// db09c5d9659d44448c4da0ae5d321e55

const JokeApp: React.FC = () => {
    const [joke, setJoke] = useState('default joke');
    const [isLoading, setLoadding] = useState(false);
    const [upvotes, setUpvotes] = useState(-1);
    const [downvotes, setDownvotes] = useState(-1);
    const [snackbarOpen, setSnackBarOpen] = React.useState(false);
    const [id, setId] = useState(null);
    const [snackBarMsg, setSnackBarMsg] = useState('message');

    const classes = useStyles({});

    useEffect(() => {
        console.log('change');
    }, [upvotes]);

    const fetchData = (): void => {
        if (isLoading) return;
        setLoadding(true);
        api<{ id: string; content: string; upvotes: number; downvotes: number }>(jokeUrl, info)
            .then(({ id, content, upvotes, downvotes }) => {
                console.log(id, content);
                setId(id);
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

    const vote = (isUpvote: boolean): void => {
        if (id === null) return;
        if (isLoading) return;
        setLoadding(true);
        api<{ id: string; content: string; upvotes: number; downvotes: number }>(
            createVoteUrl(id, isUpvote),
            createPostInfo(),
        )
            .then(({ id, content, upvotes, downvotes }) => {
                console.log(id, content);
                setId(id);
                setJoke(content);
                setUpvotes(upvotes);
                setDownvotes(downvotes);
                setLoadding(false);
                setSnackBarOpen(true);
                setSnackBarMsg('vote succeed');
            })
            .catch(error => {
                console.log(error);
                setLoadding(false);
                setSnackBarOpen(true);
                setSnackBarMsg('vote failed');
            });
    };

    const hoverThumbers = (): void => {
        console.log('hover thubmers');
    };

    const clickThumberUp = (): void => {
        vote(true);
    };

    const clickThumberDown = (): void => {
        vote(false);
    };

    const handleClose = (): void => {
        setSnackBarOpen(false);
    };

    return (
        <div>
            <Grid container justify="center" alignItems="center" className={classes.root}>
                <Grid container item xs={12} sm={6} justify="center">
                    {isLoading ? (
                        <CircularProgress color="secondary" size={80} />
                    ) : (
                        <div className={classes.box}>
                            {id === null ? null : id}
                            <br />
                            {joke}
                        </div>
                    )}
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Tooltip title="Voteup">
                        <ThumbUpIcon
                            onClick={clickThumberUp}
                            onMouseEnter={hoverThumbers}
                            className={classes.thumbers}
                        />
                    </Tooltip>
                    :{upvotes}
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Tooltip title="Votedown">
                        <ThumbDownIcon
                            onClick={clickThumberDown}
                            onMouseEnter={hoverThumbers}
                            className={classes.thumbers}
                        />
                    </Tooltip>
                    :{downvotes}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" color="primary" onClick={fetchData}>
                        fetch
                    </Button>
                </Grid>
            </Grid>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleClose}
                message={snackBarMsg}
            ></Snackbar>
        </div>
    );
};

export default JokeApp;

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
