import React, { ComponentType, FC } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox } from 'antd';

interface ExternalProps<T> {
  item: T;
  checked?: boolean;
  link?(item: T): string;
  onClick?(item: T): void;
}

export interface InjectedProps<T> {

}

interface Options<T> {
  render(item: T): JSX.Element;
}

function onClick <T>(props: ExternalProps<T>, e: React.MouseEvent<HTMLAnchorElement>) {
  if (props.onClick !== undefined) {
    e.preventDefault();
    props.onClick(props.item);
  }
}

function withItem<T>(options: Options<T>) {
  return function <OriginalProps extends {}>(Component: ComponentType<OriginalProps & InjectedProps<T>>) {
    const Item: FC<OriginalProps & ExternalProps<T>> = (props) => {
      const { item, checked, link } = props;
      const mlink: string = link ? link(item) : '';

      return (
        <Link to={mlink} onClick={onClick.bind(null, props)}>
          {checked !== undefined && <Checkbox checked={checked} />}
          <Component {...props} />
        </Link>
      );
    };

    return Item;
  };
}

export default withItem;
