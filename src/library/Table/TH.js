/* @flow */
import React, { Component } from 'react';
import { createStyledComponent, getNormalizedValue, pxToEm } from '../styles';
import { createThemedComponent, mapComponentThemes } from '../themes';
import TD, { componentTheme as tDComponentTheme } from './TD';
import { TableContext } from './Table';

type Props = {
  /** Rendered content */
  children?: React$Node,
  /** Rendered element */
  element?: string,
  /** See DataTable */
  highContrast?: boolean,
  /** See DataTable's Column type */
  minWidth?: number | string,
  /** See DataTable's Column type */
  maxWidth?: number | string,
  /** See DataTable */
  spacious?: boolean,
  /** See DataTable's Column type */
  textAlign?: 'start' | 'end' | 'center' | 'justify',
  /** See DataTable's Column type */
  width?: number | string
};

export const componentTheme = (baseTheme: Object) => ({
  ...mapComponentThemes(
    {
      name: 'TD',
      theme: tDComponentTheme(baseTheme)
    },
    {
      name: 'TH',
      theme: {
        TH_borderVertical: `1px dotted ${baseTheme.borderColor}`,
        TH_borderVertical_highContrast: `1px dotted ${baseTheme.color_gray_80}`,
        TH_fontWeight: baseTheme.fontWeight_bold,
        TH_paddingHorizontal: baseTheme.space_inline_md,
        TH_paddingVertical: pxToEm(12),
        TH_paddingVertical_spacious: baseTheme.space_stack_md,
        TH_verticalAlign: 'bottom'
      }
    },
    baseTheme
  )
});

export const ThemedTD = createThemedComponent(TD, ({ theme: baseTheme }) => ({
  ...mapComponentThemes(
    {
      name: 'TH',
      theme: componentTheme(baseTheme)
    },
    {
      name: 'TD',
      theme: {}
    },
    baseTheme
  )
}));

const styles = ({
  highContrast,
  maxWidth,
  minWidth,
  spacious,
  theme: baseTheme,
  width
}) => {
  const theme = componentTheme(baseTheme);
  const fontSize = theme.TH_fontSize;
  const paddingHorizontal = getNormalizedValue(
    theme.TH_paddingHorizontal,
    fontSize
  );
  const paddingVertical = getNormalizedValue(
    spacious ? theme.TH_paddingVertical_spacious : theme.TH_paddingVertical,
    fontSize
  );
  const rtl = theme.direction === 'rtl';

  return {
    fontWeight: theme.TH_fontWeight,
    maxWidth,
    minWidth,
    padding: `${paddingVertical} ${paddingHorizontal}`,

    '&:not(:first-child)': {
      borderLeft: rtl
        ? null
        : highContrast
          ? theme.TH_borderVertical_highContrast
          : theme.TH_borderVertical,
      borderRight: !rtl
        ? null
        : highContrast
          ? theme.TH_borderVertical_highContrast
          : theme.TH_borderVertical
    },
    width
  };
};

// TH's root node must be created outside of render, so that the entire DOM
// element is replaced only when the element prop is changed, otherwise it is
// updated in place
function createRootNode(props: Props) {
  const { element = TH.defaultProps.element } = props;

  return createStyledComponent(TD, styles, {
    displayName: 'TH',
    filterProps: ['width'],
    forwardProps: ['element', 'textAlign'],
    rootEl: element,
    withProps: { element }
  });
}

/**
 * TH
 */
export default class TH extends Component<Props> {
  static defaultProps = {
    element: 'th',
    textAlign: 'start'
  };

  componentWillUpdate(nextProps: Props) {
    if (this.props.element !== nextProps.element) {
      this.rootNode = createRootNode(nextProps);
    }
  }

  rootNode: React$ComponentType<*> = createRootNode(this.props);

  render() {
    const { children, ...restProps } = this.props;

    const Root = this.rootNode;

    return (
      <TableContext.Consumer>
        {({ highContrast, spacious }) => {
          const rootProps = { highContrast, spacious, ...restProps };
          return <Root {...rootProps}>{children}</Root>;
        }}
      </TableContext.Consumer>
    );
  }
}