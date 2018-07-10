import React, { Component } from 'react';
import Checkbox from '../Checkbox';

type Props = {
  checked?: boolean,
  indeterminate?: boolean,
  label: string,
  onChange: () => void
};

export default class SelectCell extends Component<Props> {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.checked !== nextProps.checked ||
      this.props.indeterminate !== nextProps.indeterminate
    );
  }

  render() {
    console.log('render SelectCell');
    const {
      checked,
      indeterminate,
      label,
      onChange,
      ...rootProps
    } = this.props;
    return (
      <td {...rootProps}>
        <Checkbox
          checked={checked}
          indeterminate={indeterminate}
          hideLabel
          label={label}
          onChange={onChange}
        />
      </td>
    );
  }
}