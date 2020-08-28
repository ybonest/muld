import * as React from 'react';
import styled from 'styled-components';
import DemoSection from '@trillion/muld-tools/site/mobile/layout/DemoSection';
import DemoBlock from '@trillion/muld-tools/site/mobile/layout/DemoBlock';
import { Sku } from '..';
import Button from '../../button';
import { getSkuData } from './data';

export default function SkuDemo() {
    const [visible, setVisible] = React.useState(false);

    function skuToggleVisible() {
        setVisible(!visible);
    }

    const skuData = getSkuData();
    return (
        <View className="demo-sku">
            <DemoSection>
                <DemoBlock title="基础用法">
                    <Sku
                        sku={skuData.sku}
                        goods={skuData.goods_info}
                        visible={visible}
                        onClosed={skuToggleVisible}
                    />
                    <Button block type="primary" text="基础用法" onClick={skuToggleVisible} />
                </DemoBlock>
            </DemoSection>
        </View>
    );
}

const View = styled(DemoSection)``;
