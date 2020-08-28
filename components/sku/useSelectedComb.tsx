/* eslint-disable */
import * as React from 'react';
import { SkuTreeItemData, SelectedSkuData, SkuTreeItemValueData, SkuListItemData } from './types';

const UNSELECTED_SKU_VALUE_ID = ''; // TODO

// 收集规格名称与对应的SkuTreeItemValueData[]
const normalizeSkuTree = (skuTree: SkuTreeItemData[]) => {
    const normalizedTree: Record<string, SkuTreeItemValueData[]> = {};
    skuTree.forEach((treeItem) => {
        normalizedTree[treeItem.k_s] = treeItem.v;
    });
    return normalizedTree;
};

// 获取已选择的sku名称
const getSelectedSkuValues = (skuTree: SkuTreeItemData[], selectedSku: SelectedSkuData) => {
    const normalizedTree = normalizeSkuTree(skuTree);
    return Object.keys(selectedSku).reduce((selectedValues: SkuTreeItemValueData[], skuKeyStr) => {
        const skuValues = normalizedTree[skuKeyStr];
        const skuValueId = selectedSku[skuKeyStr];

        if (skuValueId !== UNSELECTED_SKU_VALUE_ID) {
            const skuValue = skuValues.filter((value) => value.id === skuValueId)[0];
            skuValue && selectedValues.push(skuValue);
        }
        return selectedValues;
    }, []);
};

// 根据已选择的 sku 获取 skuComb
const getSkuComb = (skuList: SkuListItemData[], selectedSku: SelectedSkuData) => {
    const skuComb = skuList.filter((item) =>
        Object.keys(selectedSku).every(
            (skuKeyStr) => String((item as any)[skuKeyStr]) === String(selectedSku[skuKeyStr]), // TODO
        ),
    );
    return skuComb[0];
};

// export function useSelectedComb(props: any) { // TODO
//     const { sku, selectedSku } = props;
//     const hasSku = !sku.none_sku
//     const selectedSkuComb = React.useMemo(() => {
//         let skuComb = null;
//         if (this.isSkuCombSelected) {
//             if (sku.none_sku) {
//                 skuComb = getSkuComb(sku.list, selectedSku);
//             } else {
//                 skuComb = {
//                     id: sku.collection_id,
//                     price: Math.round(sku.price * 100),
//                     stock_num: sku.stock_num,
//                 };
//             }

//             if (skuComb) {
//                 skuComb.properties = getSelectedProperties(
//                     this.propList,
//                     this.selectedProp
//                 );
//                 skuComb.property_price = this.selectedPropValues.reduce(
//                     (acc, cur) => acc + (cur.price || 0),
//                     0
//                 );
//             }
//         }
//         return skuComb;
//     }, [sku, selectedSku, hasSku]);

//     return selectedSkuComb;
// }
