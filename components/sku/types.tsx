export interface SkuData {
    price: string;
    none_sku: boolean;
    stock_num: number;
    hide_stock: boolean;
    collection_id: number;
    tree: SkuTreeItemData[];
    list: SkuListItemData[];
    messages: SkuMessageData[];
    properties: SkuPropItemData[];
}

export interface SkuTreeItemData {
    k: string;
    v: SkuTreeItemValueData[];
    k_s: string;
    k_id: string; // TODO
    is_multiple: never; // TODO
    largeImageMode?: boolean; // TODO
}

export interface SkuPropItemData {
    k: string;
    v: SkuPropItemValueData[];
    k_id: number;
    is_multiple?: boolean;
}

export interface SkuPropItemValueData {
    id: string;
    name: string;
    price?: number;
}

export interface SkuTreeItemValueData {
    id: string;
    name: string;
    imgUrl?: string;
    img_url?: string;
    previewImgUrl?: string;
}

export interface SkuListItemData {
    id: number;
    s1: string;
    s2: string;
    s3: string;
    price: number;
    stock_num: number;
}

export interface SkuMessageData {
    name: string;
    type: string;
    required?: string;
    datetime?: string;
    multiple?: string;
    placeholder?: string;
}

export interface SkuGoodsData {
    title: string;
    picture: string;
}

export type SelectedSkuData = Record<string, string>; // TODO

export interface OverLimitParams {
    action: 'minus' | 'plus';
    limitType: 0 | 1;
    quota: number;
    quotaUsed: number;
    startSaleNum: number;
}

export interface CustomStepperConfig {
    quotaText?: string;
    handleOverLimit?: (v: OverLimitParams) => void;
    handleStepperChange?: (v: string | number) => void;
    stockNum?: number;
    stockFormatter?: (stockNum: number) => void;
}
