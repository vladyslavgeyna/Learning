import React, {FC} from 'react';

const Price:FC<{price:string}> = ({price}) => {
    return (
        <p>{new Intl.NumberFormat('ua-UA', {
            style: 'currency',
            currency: 'USD',
        }).format(+price)}
        </p>
    );
};

export default React.memo(Price);
