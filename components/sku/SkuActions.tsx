import * as React from 'react';
import Button from '../button';
import { createNS, withDefaultProps } from '../utils';

const [bem] = createNS('sku-actions');

export interface Props {
    buyText?: string;
    addCartText?: string;
    showAddCartBtn?: boolean;
    onAddCartClick?: (data?: Record<string, any>) => void; // TODO
    onBuyClick?: (data?: Record<string, any>) => void; // TODO
}

const defaultProps = {};

const SkuActions: React.FC<React.PropsWithChildren<Props>> = (props) => {
    const { showAddCartBtn, addCartText, buyText, onAddCartClick, onBuyClick } = props;

    function skuAddClick() {
        onAddCartClick && onAddCartClick();
    }

    function skuBuyClick() {
        // TODO 预留校验
        onBuyClick && onBuyClick();
    }

    return (
        <div className={bem()}>
            {showAddCartBtn && (
                <Button
                    size="large"
                    type="warning"
                    text={addCartText || '加入购物车'}
                    onClick={skuAddClick}
                />
            )}
            <Button size="large" type="danger" text={buyText || '立即购买'} onClick={skuBuyClick} />
        </div>
    );
};

export default withDefaultProps(React.memo(SkuActions), defaultProps);
