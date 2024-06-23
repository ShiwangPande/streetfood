import React from 'react';
import useLazyImage from './useLazyImage';

const LazyImage = ({ src, alt, className }) => {
    const [loaded, imgRef] = useLazyImage(src);

    return (
        <img
            ref={imgRef}
            src={loaded ? src : undefined}
            alt={alt}
            className={className}
            style={{ opacity: loaded ? 1 : 0.5, transition: 'opacity 0.3s', borderRadius: '10px' }}
        />
    );
};

export default LazyImage;
