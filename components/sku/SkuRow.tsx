/* eslint-disable */
import * as React from 'react';
import classnames from 'classnames';
import { createNS } from '../utils';
import { BORDER_BOTTOM } from '../utils/constant';
import { on, off } from '../utils/dom/event';
import { SkuTreeItemData, SkuPropItemData } from './types';

const [bem] = createNS('sku-row');

interface Props {
    skuRow: SkuTreeItemData | SkuPropItemData;
}

const SkuRow: React.FC<React.PropsWithChildren<Props>> = (props) => {
    const { skuRow, children } = props;
    const [progress, setProgress] = React.useState(0);
    const scrollerRef = React.useRef<HTMLDivElement>(null);
    const rowRef = React.useRef<HTMLDivElement>(null);
    const scrollable = skuRow.largeImageMode && skuRow.v.length > 6;

    React.useEffect(() => {
        const scroller = scrollerRef.current;
        const row = rowRef.current;

        function onScroll() {
            if (!scroller || !row) {
                return;
            }
            const distance = row.offsetWidth - scroller.offsetWidth;
            setProgress(scroller.scrollLeft / distance);
        }
        if (scroller) {
            on(scroller, 'scroll', onScroll);
        }
        return () => {
            if (scroller) {
                off(scroller, 'scroll', onScroll);
            }
        };
    }, []);

    function genTitle() {
        return (
            <div className={bem('title')}>
                {skuRow.k}
                {skuRow.is_multiple && <span className={bem('title-multiple')}>（可多选）</span>}
            </div>
        );
    }

    function genIndicator() {
        if (scrollable) {
            const style = {
                transform: `translate3d(${progress * 20}px, 0, 0)`,
            };

            return (
                <div className={bem('indicator-wrapper')}>
                    <div className={bem('indicator')}>
                        <div className={bem('indicator-slider')} style={style} />
                    </div>
                </div>
            );
        }
    }

    function genContent() {
        if (skuRow.largeImageMode) {
            const top: React.ReactNode[] = [];
            const bottom: React.ReactNode[] = [];

            React.Children.forEach(children, (child, index) => {
                if (Math.floor(index / 3) % 2 === 0) {
                    top.push(child);
                } else {
                    bottom.push(child);
                }
            });

            return (
                <div className={bem('scroller')} ref={scrollerRef}>
                    <div className={bem('row')} ref={rowRef}>
                        {top}
                    </div>
                    {bottom.length ? <div className={bem('row')}>{bottom}</div> : null}
                </div>
            );
        }

        return children;
    }

    return (
        <div className={classnames([bem(), BORDER_BOTTOM])}>
            {genTitle()}
            {genContent()}
            {genIndicator()}
        </div>
    );
};

export default React.memo(SkuRow);
