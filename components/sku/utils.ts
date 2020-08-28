/* eslint-disable */
import { SkuTreeItemValueData, SelectedSkuData, SkuListItemData } from './types';

interface SkuToChoose {
    key: string;
    valueId: string;
}

// 判断sku是否可选
export const isSkuChoosable = (
    skuList: SkuListItemData[],
    selectedSku: SelectedSkuData,
    skuToChoose: SkuToChoose,
) => {
    const { key, valueId } = skuToChoose;

    // 先假设sku已选中，拼入已选中sku对象中
    const matchedSku = {
        ...selectedSku,
        [key]: valueId,
    };

    // 再判断剩余sku是否全部不可选，若不可选则当前sku不可选中
    const skusToCheck = Object.keys(matchedSku).filter((skuKey) => matchedSku[skuKey] !== '');

    const filteredSku = skuList.filter((sku: SkuListItemData) =>
        skusToCheck.every(
            (skuKey) => String(matchedSku[skuKey]) === String((sku as any)[skuKey]), // TODO
        ),
    );

    const stock = filteredSku.reduce((total, sku) => {
        total += sku.stock_num;
        return total;
    }, 0);
    return stock > 0;
};
