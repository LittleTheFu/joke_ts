import * as React from 'react';
// import * as PropTypes from 'prop-types';

// export interface Props {
//     name: string;
// }

// type Props = { name: string };

const JokeApp: React.FC<{ name: string }> = ({ name }) => {
    return <div>{name}</div>;
};

// JokeApp.propTypes = {
//     name: PropTypes.string,
// };

export default JokeApp;
