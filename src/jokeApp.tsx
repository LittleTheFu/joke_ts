import * as React from 'react';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CircularProgress from '@material-ui/core/CircularProgress';

const JokeApp: React.FC<{ name: string; color: string }> = ({ name, color }) => {
    return (
        <div>
            {name} with {color}
            <Button variant="contained" color="primary">
                你好，世界
            </Button>
            <FormGroup>
                <FormControlLabel control={<Switch size="small" />} label="Small" />
                <FormControlLabel control={<Switch />} label="Normal" />
            </FormGroup>
            <CircularProgress />
            <CircularProgress color="secondary" />
        </div>
    );
};

export default JokeApp;
