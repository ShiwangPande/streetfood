import React, { useState, useEffect } from 'react';
import Advanced from './Advanced';
function Index(preferences) {
    return (

        <div>

            <Advanced preferences={preferences} />
        </div>
    );

}

export default Index;