/* eslint-disable */
import * as React from 'react';
import classnames from 'classnames';
import SkuActions from './SkuActions';
import SkuHeader from './SkuHeader';
import SkuHeaderItem from './SkuHeaderItem';
import SkuRow from './SkuRow';
import SkuRowItem from './SkuRowItem';
import SkuRowPropItem from './SkuRowPropItem';
import { createNS, withDefaultProps } from '../utils';
import { View } from './style';
import { Popup } from '..';
import {
    SkuData,
    SkuGoodsData,
    CustomStepperConfig,
    SkuPropItemData,
    SelectedSkuData,
    SkuTreeItemValueData,
} from './types';

const [bem] = createNS('sku');

interface Props {
    visible?: boolean;
    onClosed?: () => void;
    showAddCartBtn?: boolean;
    getContainer?: string | (() => HTMLElement);
    priceTag?: string;
    sku: SkuData;
    goods: SkuGoodsData;
    hideStock?: boolean; // 是否隐藏剩余库存
    showHeaderImage?: boolean;
    bodyOffsetTop?: number;
    customStepperConfig?: CustomStepperConfig;
    properties?: SkuPropItemData[];
    showSoldoutSku?: boolean;
    lazyLoad?: boolean;
}

interface SlotProps {
    skuActions?: React.ReactNode;
    skuHeader?: React.ReactNode;
    skuHeaderImageExtra?: React.ReactNode;
    skuHeaderPrice?: React.ReactNode;
    skuHeaderOriginPrice?: React.ReactNode;
    skuBodyTop?: React.ReactNode;
    extraSkuGroup?: React.ReactNode;
    skuActionsTop?: React.ReactNode;
    skuGroup?: React.ReactNode;
    skuHeaderExtra?: React.ReactNode;
}

interface Events {
    onSkuSelected: (v: SelectedSkuData) => void;
}

const defaultProps = {
    showAddCartBtn: true,
    bodyOffsetTop: 200,
    customStepperConfig: {},
    properties: [],
    showSoldoutSku: true,
};

function useSelectSku(
    props: Props & Events,
): [SelectedSkuData, (v: SkuTreeItemValueData & { skuKeyStr: string }) => void] {
    const { onSkuSelected } = props;
    const [selectedSku, setSelectedSku] = React.useState<SelectedSkuData>({});

    function wrapperSetSelectedSku(skuValue: SkuTreeItemValueData & { skuKeyStr: string }) {
        let $selectedSku;
        if (selectedSku[skuValue.skuKeyStr] === skuValue.id) {
            $selectedSku = {
                ...selectedSku,
                [skuValue.skuKeyStr]: '',
            };
        } else {
            $selectedSku = {
                ...selectedSku,
                [skuValue.skuKeyStr]: skuValue.id,
            };
        }
        setSelectedSku($selectedSku);
        onSkuSelected && onSkuSelected($selectedSku);
    }
    return [selectedSku, wrapperSetSelectedSku];
}

const Sku: React.FC<React.PropsWithChildren<Props & SlotProps & Events>> = (props) => {
    const {
        visible,
        skuActions,
        showAddCartBtn,
        getContainer,
        skuHeader,
        skuHeaderImageExtra,
        skuHeaderPrice,
        skuHeaderOriginPrice,
        priceTag,
        showHeaderImage,
        sku,
        goods,
        bodyOffsetTop,
        skuBodyTop,
        extraSkuGroup,
        skuActionsTop,
        hideStock,
        customStepperConfig,
        skuGroup,
        skuHeaderExtra,
        properties,
        showSoldoutSku,
        lazyLoad,
    } = props;
    const skuRowsRef = React.useRef<any>(null); // TODO
    const [selectedSku, onSelect] = useSelectSku(props);

    const hasSku = !sku.none_sku;
    const hasSkuOrAttr = hasSku || properties?.length;

    const price = '1000'; // TODO
    const originPrice = '2000'; // TODO
    const selectedProp: any = {};

    // const stock = () => {
    //     const { stockNum } = customStepperConfig!;
    //   if (stockNum !== undefined) {
    //     return stockNum;
    //   }
    //   if (selectedSkuComb) {
    //     return selectedSkuComb.stock_num;
    //   }
    //   return sku.stock_num;
    // }

    // const genStockText = () => {
    //     const { stockFormatter } = customStepperConfig!;

    //     if (stockFormatter) {
    //       return stockFormatter(this.stock);
    //     }
    //     return [
    //         '剩余',
    //         <span
    //           className={bem('stock-num', {
    //             highlight: this.stock < this.stockThreshold,
    //           })}
    //         >
    //           {this.stock}
    //         </span>,
    //         ` ${t('stockUnit')}`,
    //       ];
    // }

    const genActions = () => {
        return skuActions || <SkuActions showAddCartBtn={showAddCartBtn} />;
    };

    const genHeader = () => {
        if (skuHeader) {
            return skuHeader;
        }
        return (
            <SkuHeader
                sku={sku}
                goods={goods}
                selectedSku={selectedSku}
                showHeaderImage={showHeaderImage}
                skuHeaderImageExtra={skuHeaderImageExtra}
            >
                {skuHeaderPrice || (
                    <div className="mul-sku__goods-price">
                        <span className="mul-sku__price-symbol">￥</span>
                        <span className="mul-sku__price-num">{price}</span>
                        {priceTag && <span className="mul-sku__price-tag">{priceTag}</span>}
                    </div>
                )}
                {skuHeaderOriginPrice ||
                    (originPrice && <SkuHeaderItem>原价 ￥{originPrice}</SkuHeaderItem>)}
                {hideStock && (
                    <SkuHeaderItem>
                        {/* <span className="mul-sku__stock">{this.stockText}</span> */}
                    </SkuHeaderItem>
                )}
                {/* {hasSkuOrAttr && !this.hideSelectedText && (
                    <SkuHeaderItem>{this.selectedText}</SkuHeaderItem>
                )} */}
                {skuHeaderExtra}
            </SkuHeader>
        );
    };

    const genGroup = () => {
        if (skuGroup) {
            return skuGroup;
        }
        if (hasSkuOrAttr) {
            const className = classnames([
                'mul-sku-group-container',
                {
                    'mul-sku-group-container--hide-soldout': !showSoldoutSku,
                },
            ]);

            return (
                <div className={className}>
                    {(sku.tree || []).map((skuTreeItem) => (
                        <SkuRow key={skuTreeItem.k_id} skuRow={skuTreeItem}>
                            {skuTreeItem.v.map((skuValue) => (
                                <SkuRowItem
                                    key={skuValue.id}
                                    skuList={sku.list}
                                    lazyLoad={lazyLoad}
                                    skuValue={skuValue}
                                    skuKeyStr={skuTreeItem.k_s}
                                    selectedSku={selectedSku}
                                    largeImageMode={skuTreeItem.largeImageMode}
                                    onSelect={onSelect}
                                />
                            ))}
                        </SkuRow>
                    ))}
                    {properties!.map((skuTreeItem) => (
                        <SkuRow key={skuTreeItem.k_id} skuRow={skuTreeItem}>
                            {skuTreeItem.v.map((skuValue) => (
                                <SkuRowPropItem
                                    key={skuValue.id}
                                    skuValue={skuValue}
                                    skuKeyStr={`${skuTreeItem.k_id}`}
                                    selectedProp={selectedProp}
                                    multiple={skuTreeItem.is_multiple}
                                />
                            ))}
                        </SkuRow>
                    ))}
                </div>
            );
        }
        return null;
    };

    const genStepper = () => {};

    const genMessages = () => {};

    const bodyStyle = React.useMemo(
        () => ({
            maxHeight: window.innerHeight - bodyOffsetTop!,
        }),
        [bodyOffsetTop],
    );

    return (
        <Popup position="bottom" closeable round visible={visible} getContainer={getContainer}>
            <View className={bem('container')}>
                {genHeader()}
                <div className="mul-sku-body" style={bodyStyle}>
                    {skuBodyTop}
                    {genGroup()}
                    {extraSkuGroup}
                    {genStepper()}
                    {genMessages()}
                </div>
                {skuActionsTop}
                {genActions()}
            </View>
        </Popup>
    );
};

export default withDefaultProps(React.memo(Sku), defaultProps);
