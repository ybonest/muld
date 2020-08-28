/* eslint-disable */
import * as React from 'react';
import classnames from 'classnames';
import { createNS } from '../utils';
import { SkuTreeItemValueData, SelectedSkuData, SkuListItemData } from './types';

const [bem] = createNS('sku-row-prop-item');

interface Props {
    skuValue: SkuTreeItemValueData;
    skuKeyStr: string;
    selectedProp: SelectedSkuData; // TODO
    multiple?: boolean;
}

const SkuHeaderItem: React.FC<Props> = (props) => {
    const { skuValue } = props;

    const choosed = false; // TODO

    function onSelect() {}

    return (
        <span
            className={classnames(['mul-sku-row__item', { 'mul-sku-row__item--active': choosed }])}
            onClick={onSelect}
        >
            <span className="mul-sku-row__item-name">{skuValue.name}</span>
        </span>
    );
};

export default React.memo(SkuHeaderItem);
