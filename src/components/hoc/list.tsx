import React, { ComponentType, FC } from 'react';
import { Link } from 'react-router-dom';
import { List, Pagination, Input } from 'antd';
import { PAGE_SIZE } from 'config';
import { PageHeader } from 'components';

export interface ExternalProps<T> {
  items: T[];
  total: number;
  page: number;
  pageSize?: number;
  loading?: boolean;

  query?: string;
  onQueryChange(query: string): void;

  title: string;
  subTitle?: string;

  onPageChange(page: number): void;
  onItemClick?(item: T): void;
  link?(item: T): string;
  onBack?(): void;
  checklist?: T[];
  headerExtra?: React.ReactNode;
}

export interface InjectedProps<T> {
  item: T;
  checked?: boolean;
}

export interface Options<T> {
  compare(t1: T, t2: T): boolean;
}

function withList<T>(options: Options<T>) {
  return function <OriginalProps extends {}>(Component: ComponentType<OriginalProps & InjectedProps<T>>) {
    const { compare } = options;
    type CombinedExternalProps = OriginalProps & ExternalProps<T>;

    function onItemClick(
      props: CombinedExternalProps,
      item: T,
      e: React.MouseEvent<HTMLAnchorElement>,
    ) {
      if (props.onItemClick !== undefined) {
        e.preventDefault();
        props.onItemClick(item);
      }
    }

    function onQueryChange(
      props: CombinedExternalProps,
      e: React.ChangeEvent<HTMLInputElement>,
    ) {
      props.onQueryChange(e.target.value);
    }

    function renderItem(
      props: CombinedExternalProps,
      item: T,
    ) {
      const { checklist, link } = props;
      const mLink: string = link ? link(item) : '';

      const checked = (checklist !== undefined)
        ? checklist.some(i => compare(i, item))
        : undefined;

      return (
        <Link className="item-wrapper" to={mLink} onClick={onItemClick.bind(null, props, item)}>
          <Component
            {...props}
            item={item}
            checked={checked}
          />
        </Link>
      );
    }

    const HOCList: FC<CombinedExternalProps> = (props) => {
      const { items, loading, title, onBack, page, pageSize, total, onPageChange, headerExtra, subTitle, query } = props;

      const pageHeaderProps = (onBack)
        ? { onBack }
        : { backIcon: false };

      const extra = (
        <>
          <Input.Search onChange={onQueryChange.bind(null, props)} defaultValue={query} />
          {headerExtra}
        </>
      );

      return (
        <div className="list">
          <PageHeader {...pageHeaderProps} title={title} subTitle={subTitle} extra={extra} />
          <List
            dataSource={items}
            renderItem={renderItem.bind(null, props)}
            loading={loading}
          />
          <Pagination current={page} total={total} pageSize={pageSize || PAGE_SIZE} onChange={onPageChange} />
        </div>
      );
    };

    return HOCList;
  };
}

export default withList;
