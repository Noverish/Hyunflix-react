import React, { ComponentType, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface ExternalProps<T> {
  link: string;
  onClick?(item: T): void;
}

export default function <T, OriginalProps extends { item: T }>(Component: ComponentType<OriginalProps>) {
  return (props: ExternalProps<T> & OriginalProps) => {
    const { link, onClick: onItemClick, item, ...restProps } = props;
    const originalProps = { item, ...restProps } as any as OriginalProps;

    const onClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onItemClick) {
        e.preventDefault();
        onItemClick(item);
      }
    }, [item, onItemClick]);

    return (
      <Link className="item-wrapper" to={link} onClick={onClick}>
        <Component {...originalProps} />
      </Link>
    );
  };
}
