/* eslint-disable */
import * as React from 'react';
import classnames from 'classnames';
import { createNS, withDefaultProps } from '../utils';
import Image from '../image';
import { SkuTreeItemValueData, SelectedSkuData, SkuListItemData } from './types';
import { isSkuChoosable } from './utils'; // TODO

const [bem] = createNS('sku-row');

interface Props {
    lazyLoad?: boolean;
    skuValue: SkuTreeItemValueData;
    skuKeyStr: string; // 规格类型
    selectedSku: SelectedSkuData;
    largeImageMode?: boolean;
    skuList: SkuListItemData[];
    onSelect?: (v: SkuTreeItemValueData & { skuKeyStr: string }) => void;
}

const defaultProps = {
    skuList: [] as SkuListItemData[], // TODO
};

const SkuRowItem: React.FC<Props> = (props) => {
    const { largeImageMode, skuValue, selectedSku, skuKeyStr, lazyLoad, skuList, onSelect } = props;

    const choosable = isSkuChoosable(skuList, selectedSku, {
        key: skuKeyStr,
        valueId: skuValue.id,
    });

    const choosed = skuValue.id === selectedSku[skuKeyStr];
    const classPrefix = largeImageMode ? bem('image-item') : bem('item');

    function hanelOnSelect() {
        if (choosable && onSelect) {
            onSelect({ skuKeyStr, ...skuValue });
        }
    }

    function onPreviewImg() {}

    function genImage() {
        const imgUrl = skuValue.imgUrl || skuValue.img_url;
        if (imgUrl) {
            return (
                <Image
                    fit="cover"
                    src={imgUrl}
                    className={`${classPrefix}-img`}
                    lazyLoad={lazyLoad}
                />
            );
        }
    }

    return (
        <span
            className={classnames([
                classPrefix,
                choosed ? `${classPrefix}--active` : '',
                !choosable ? `${classPrefix}--disabled` : '',
            ])}
            onClick={hanelOnSelect}
        >
            {genImage()}
            <div className={`${classPrefix}-name`}>
                {largeImageMode ? (
                    <span className={classnames({ 'mul-multi-ellipsis--l2': largeImageMode })}>
                        {skuValue.name}
                    </span>
                ) : (
                    skuValue.name
                )}
            </div>
            {largeImageMode && (
                <img
                    className={`${classPrefix}-img-icon`}
                    src="https://img.yzcdn.cn/upload_files/2020/07/02/Fu4_ya0l0aAt4Mv4PL9jzPzfZnDX.png"
                    onClick={onPreviewImg}
                />
            )}
        </span>
    );
};

export default withDefaultProps(React.memo(SkuRowItem), defaultProps);
