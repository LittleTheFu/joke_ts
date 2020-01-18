import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

const color = 'blue';
ReactDOM.render(
    <div>
        {color}
        <Button variant="contained" color="primary">
            你好，世界
        </Button>
    </div>,
    document.getElementById('root'),
);
