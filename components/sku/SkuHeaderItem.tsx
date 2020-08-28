/* eslint-disable */
import * as React from 'react';
import { createNS } from '../utils';

const [bem] = createNS('sku-header-item');

const SkuHeaderItem: React.FC<React.PropsWithChildren<{}>> = (props) => {
    return <div className={bem()}>{props.children}</div>;
};

export default React.memo(SkuHeaderItem);
