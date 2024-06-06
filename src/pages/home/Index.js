import React from 'react';
import Advanced from './Advanced';
import Tabbar from '../../components/Tabbar';
function Index(preferences) {
    return (

        <div className='m-0'>
            <Advanced preferences={preferences} />
            <Tabbar />
        </div>
    );

}

export default Index;