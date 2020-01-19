import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CircularProgress from '@material-ui/core/CircularProgress';
import JokeApp from './jokeApp';

const color = 'blue';
ReactDOM.render(
    <div>
        <JokeApp name="Jake" word="bang" />
        {color}
        <Button variant="contained" color="primary">
            你好，世界
        </Button>
        <FormGroup>
            <FormControlLabel control={<Switch size="small" />} label="Small" />
            <FormControlLabel control={<Switch />} label="Normal" />
        </FormGroup>
        <CircularProgress />
        <CircularProgress color="secondary" />
    </div>,
    document.getElementById('root'),
);
