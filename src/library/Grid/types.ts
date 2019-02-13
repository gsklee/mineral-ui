/* @flow */
import { ALIGN_ITEMS, GUTTER_WIDTH } from './constants';

import { FlexProps, FlexItemProps } from '../Flex/types';

type StringOrArrayOfStrings<T> = $Keys<T> | Array<$Keys<T> | null>;

type AlignItems = StringOrArrayOfStrings<typeof ALIGN_ITEMS>;
type GutterWidth = keyof typeof GUTTER_WIDTH | number | string;

export interface GridProps extends FlexProps {
  alignItems?: AlignItems;
  breakpoints?: Array<number | string>;
  children?: React.ReactNode;
  columns?: number;
  gutterWidth?: GutterWidth;
}

export interface GridDefaultProps {
  alignItems: AlignItems;
  columns: number;
  gutterWidth: GutterWidth;
}

export interface GridItemProps extends FlexItemProps {
  span?: number | Array<number | null>;
}

export interface GridCombinedProps extends GridProps, GridItemProps {}

export type GridItemStyleProps = Partial<GridCombinedProps> & {
  shrink?: number
}
