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
import { getRandomJoke, voteJoke } from './service';

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

    const preFetch = (): void => {
        setLoadding(true);
    };

    const fetchRandomJokeGuard = (): boolean => {
        return isLoading;
    };

    const setJokeInfo = (id: string, content: string, upvotes: number, downvotes: number): void => {
        setId(id);
        setJoke(content);
        setUpvotes(upvotes);
        setDownvotes(downvotes);
    };

    const afterFetchJokeSuccess = (id: string, content: string, upvotes: number, downvotes: number): void => {
        setJokeInfo(id, content, upvotes, downvotes);
        setLoadding(false);
    };

    const fetchData = (): void => {
        getRandomJoke(preFetch, afterFetchJokeSuccess, console.log, fetchRandomJokeGuard);
    };

    const isIdNull = (): boolean => {
        return id === null;
    };

    const afterVoteJokeSuccess = (id: string, content: string, upvotes: number, downvotes: number): void => {
        setJokeInfo(id, content, upvotes, downvotes);
        setLoadding(false);
        setSnackBarOpen(true);
        setSnackBarMsg('vote succeed');
    };

    const afterVoteJokeFail = (error: object): void => {
        console.log(error);
        setLoadding(false);
        setSnackBarOpen(true);
        setSnackBarMsg('vote failed');
    };

    const vote = (isUpvote: boolean): void => {
        // rawFetch(createVoteUrl(id, isUpvote), createPostInfo(), afterVoteJokeSuccess, afterVoteJokeFail, isIdNull);
        voteJoke(id, isUpvote, preFetch, afterVoteJokeSuccess, afterVoteJokeFail, isIdNull);
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
