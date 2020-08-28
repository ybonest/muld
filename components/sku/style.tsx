import styled from 'styled-components';
import {
    $sku,
    $cell,
    $field,
    $font_size_md,
    $white,
    $padding_md,
    $padding_sm,
    $border_radius_md,
    $padding_xs,
    $gray6,
    $gray3,
    $font_size_sm,
    $font_size_lg,
    $text_color,
    $red,
    $padding_base,
    $border_radius_sm,
    $active_color,
    $gradient_red,
    $gradient_orange,
    $font_weight_bold,
    $gray5,
    $padding_xl,
} from '../style/var';

export const View = styled.div`
	&.mul-sku__container {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		min-height: 50%;
		max-height: 80%;
		overflow-y: visible;
		font-size: ${$font_size_md};
		background: ${$white};
	}

	.mul-sku {
		&-body {
			flex: 1 1 auto;
			min-height: 44px;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;

			&::-webkit-scrollbar {
				display: none;
			}
		}

		&-header {
			display: flex;
			flex-shrink: 0;
			margin: 0 ${$padding_md};

			&__img-wrap {
				width: 96px;
				height: 96px;
				margin: ${$padding_sm} ${$padding_sm} ${$padding_sm} 0;
				overflow: hidden;
				border-radius: ${$border_radius_md};
			}

			&__goods-info {
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				padding: ${$padding_sm} 20px ${$padding_sm} 0;
			}
		}

		&-header-item {
			margin-top: ${$padding_xs};
			color: ${$gray6};
			font-size: ${$font_size_sm};
			line-height: 16px;
		}

		&__price-symbol {
			font-size: ${$font_size_lg};
			vertical-align: bottom;
		}

		&__price-num {
			font-weight: ${$font_weight_bold};
			font-size: 22px;
			vertical-align: bottom;
			word-wrap: break-word;
		}

		&__goods-price {
			color: ${$red};
		}

		&__price-tag {
			position: relative;
			display: inline-block;
			margin-left: ${$padding_xs};
			padding: 0 5px;
			overflow: hidden;
			color: ${$red};
			font-size: ${$font_size_sm};
			line-height: 16px;
			border-radius: 8px;

			&::before {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: currentColor;
				opacity: 0.1;
				content: '';
			}
		}

		&-group-container {
			padding-top: ${$padding_sm};

			&--hide-soldout {
				.mul-sku-row__item--disabled {
					display: none;
				}
			}
		}

		/* sku row */
		&-row {
			margin: 0 ${$padding_md} ${$padding_sm};

			&:last-child {
				margin-bottom: 0;
			}

			&__item,
			&__image-item {
				position: relative;
				overflow: hidden;
				color: ${$text_color};
				border-radius: ${$border_radius_md};
				cursor: pointer;

				&::before {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: ${$sku.item_background_color};
					content: '';
				}

				&--active {
					color: ${$red};

					&::before {
						background: currentColor;
						opacity: 0.1;
					}
				}
			}

			&__item {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				min-width: 40px;
				margin: 0 ${$padding_sm} ${$padding_sm} 0;
				font-size: 13px;
				line-height: 16px;
				vertical-align: middle;

				&-img {
					z-index: 1;
					width: 24px;
					height: 24px;
					margin: 4px 0 4px 4px;
					object-fit: cover;
					border-radius: ${$border_radius_sm};
				}

				&-name {
					z-index: 1;
					padding: ${$padding_xs};
				}

				&--disabled {
					color: ${$gray5};
					background: ${$active_color};
					cursor: not-allowed;

					.mul-sku-row__item-img {
						opacity: 0.3;
					}
				}
			}

			&__image {
				margin-right: 0;

				&-item {
					display: flex;
					flex-direction: column;
					width: 110px;
					margin: 0 4px 4px 0;
					border: 1px solid transparent;

					&:last-child {
						margin-right: 0;
					}

					&-img {
						width: 100%;
						height: 110px;

						&-icon {
							position: absolute;
							top: 0;
							right: 0;
							z-index: 3;
							width: 18px;
							height: 18px;
						}
					}

					&-name {
						position: relative;
						display: flex;
						align-items: center;
						justify-content: center;
						box-sizing: border-box;
						height: 40px;
						padding: ${$padding_base};
						font-size: 12px;
						line-height: 16px;

						span {
							word-wrap: break-word;
						}
					}

					&--active {
						border-color: currentColor;
					}

					&--disabled {
						color: ${$gray5};
						cursor: not-allowed;

						&::before {
							z-index: 2;
							background: ${$active_color};
							opacity: 0.4;
						}
					}
				}
			}

			&__title {
				padding-bottom: ${$padding_sm};
			}

			&__title-multiple {
				color: ${$gray6};
			}

			&__scroller {
				margin: 0 -${$padding_md};
				overflow-x: scroll;
				overflow-y: hidden;
				-webkit-overflow-scrolling: touch;

				&::-webkit-scrollbar {
					display: none;
				}
			}

			&__row {
				display: inline-flex;
				margin-bottom: 4px;
				padding: 0 ${$padding_md};
			}

			&__indicator {
				width: 40px;
				height: 4px;
				background: ${$gray3};
				border-radius: 2px;

				&-wrapper {
					display: flex;
					justify-content: center;
					padding-bottom: 16px;
				}

				&-slider {
					width: 50%;
					height: 100%;
					background-color: ${$red};
					border-radius: 2px;
				}
			}
		}

		&-stepper-stock {
			padding: ${$padding_sm} ${$padding_md};
			overflow: hidden;
			line-height: 30px;
		}

		&__stepper {
			float: right;
			padding-left: ${$padding_base};

			&-title {
				float: left;
			}

			&-quota {
				float: right;
				color: ${$red};
				font-size: ${$font_size_sm};
			}
		}

		&__stock {
			display: inline-block;
			margin-right: ${$padding_xs};
			color: ${$gray6};
			font-size: ${$font_size_sm};

			&-num--highlight {
				color: ${$red};
			}
		}

		&-messages {
			padding-bottom: ${$padding_xl};

			&__image-cell {
				.mul-cell__title {
					max-width: ${$field.label_width};
					margin-right: ${$field.label_margin_right};
					color: ${$field.label_color};
					text-align: left;
					word-wrap: break-word;
				}

				.mul-cell__value {
					overflow: visible;
					text-align: left;
				}

				&-label {
					color: ${$cell.label_color};
					font-size: ${$cell.label_font_size};
					line-height: ${$cell.label_line_height};
				}
			}
		}

		&-actions {
			display: flex;
			flex-shrink: 0;
			padding: ${$padding_xs} ${$padding_md};

			.mul-button {
				height: 40px;
				font-weight: ${$font_weight_bold};
				font-size: ${$font_size_md};
				border: none;
				border-radius: 0;

				&:first-of-type {
					border-top-left-radius: 20px;
					border-bottom-left-radius: 20px;
				}

				&:last-of-type {
					border-top-right-radius: 20px;
					border-bottom-right-radius: 20px;
				}

				&--warning {
					background: ${$gradient_orange};
				}

				&--danger {
					background: ${$gradient_red};
				}
			}
		}
	}
}`;
