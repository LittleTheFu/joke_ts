import * as React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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
    icon: {
        size: 800,
    },
    box: {
        height: 300,
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
    const classes = useStyles({});
    console.log(classes);

    const fetchData = (): void => {
        if (isLoading) return;
        setLoadding(true);
        api<{ id: string; content: string }>(jokeUrl, info)
            .then(({ id, content }) => {
                console.log(id, content);
                setJoke(content);
                setLoadding(false);
            })
            .catch(error => {
                console.log(error);
                setLoadding(false);
            });
    };

    return (
        <div>
            <Grid container direction="column" justify="center" alignItems="center">
                {isLoading ? (
                    <CircularProgress color="secondary" className={classes.icon} />
                ) : (
                    <Box className={classes.box}>{joke}</Box>
                )}
                <Button variant="contained" color="primary" onClick={fetchData}>
                    fetch
                </Button>
            </Grid>
        </div>
    );
};

export default JokeApp;
