import * as React from 'react';
import classnames from 'classnames';
import Image from '../image';
import { createNS, withDefaultProps } from '../utils';
import { BORDER_BOTTOM } from '../utils/constant';
import { SkuData, SkuGoodsData, SelectedSkuData } from './types';

const [bem] = createNS('sku-header');

export interface Props {
    sku: SkuData;
    goods: SkuGoodsData;
    selectedSku: SelectedSkuData;
    showHeaderImage?: boolean;
    skuHeaderImageExtra?: React.ReactNode;
}

export interface SelectedValueType {
    ks: string;
    imgUrl: string;
}

const defaultProps = {
    showHeaderImage: true,
};

function getSkuImgValue(sku: SkuData, selectedSku: SelectedSkuData): SelectedValueType | undefined {
    let imgValue;

    sku.tree.some((item) => {
        const id = selectedSku[item.k_s];

        if (id && item.v) {
            const matchedSku = item.v.filter((skuValue) => skuValue.id === id)[0] || {};

            const img = matchedSku.previewImgUrl || matchedSku.imgUrl || matchedSku.img_url;
            if (img) {
                imgValue = {
                    ...matchedSku,
                    ks: item.k_s,
                    imgUrl: img,
                };
                return true;
            }
        }
        return false;
    });

    return imgValue;
}

const SkuHeader: React.FC<React.PropsWithChildren<Props>> = (props) => {
    const { children, showHeaderImage, skuHeaderImageExtra, sku, selectedSku, goods } = props;

    const selectedValue = getSkuImgValue(sku, selectedSku);
    const imgUrl = selectedValue ? selectedValue.imgUrl : goods.picture;

    function onPreviewImage() {} // TODO

    return (
        <div className={classnames([bem(), BORDER_BOTTOM])}>
            {showHeaderImage && (
                <Image
                    fit="cover"
                    src={imgUrl}
                    className={bem('img-wrap')}
                    onClick={onPreviewImage}
                >
                    {skuHeaderImageExtra}
                </Image>
            )}
            <div className={bem('goods-info')}>{children}</div>
        </div>
    );
};

export default withDefaultProps(React.memo(SkuHeader), defaultProps);
