import React from 'react';

const LastUpdated = () => {
    const deployTime = process.env.REACT_APP_DEPLOY_TIME || 'Not available';
    return (

        <p className="mt-2 text-gray-500 text-xs select-none">
            Last Updated: {deployTime}
        </p>

    );
};

export default LastUpdated;
