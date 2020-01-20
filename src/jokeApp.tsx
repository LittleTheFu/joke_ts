import * as React from 'react';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';

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

const JokeApp: React.FC = () => {
    const [joke, setJoke] = useState('default joke');

    useEffect(() => {
        setJoke('a joke');
    });

    return (
        <div>
            <h1>{joke}</h1>
            <Button variant="contained" color="primary">
                fetch
            </Button>
        </div>
    );
};

export default JokeApp;
