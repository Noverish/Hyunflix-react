import React, { useCallback, useMemo } from 'react';
import { PageHeader, Input } from 'antd';
import { Link } from 'react-router-dom';
import { PageHeaderProps } from 'antd/lib/page-header';
import { BreadcrumbProps } from 'antd/lib/breadcrumb';

function routes() {
  const path = document.location!.pathname;
  const pathComps = path.split('/').filter(v => !!v);
  const items = pathComps.map(p => ({
    path: p,
    breadcrumbName: p,
  }));

  return [
    {
      path: '',
      breadcrumbName: 'Home',
    },
    ...items,
  ];
}

const itemRender: BreadcrumbProps['itemRender'] = (route, params, routes, paths) => {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={`/${paths.join('/')}`}>{route.breadcrumbName}</Link>
  );
}

interface Props extends PageHeaderProps {
  query?: string;
  onQueryChange?(query: string): void;
}

export default ({ query, onQueryChange, extra, ...restProps }: Props) => {
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange?.(e.target.value);
  }, [onQueryChange]);

  const headerExtra = useMemo(() => {
    if (query !== undefined && onChange !== undefined) {
      return (
        <>
          <Input.Search onChange={onChange} defaultValue={query} />
          {extra}
        </>
      );
    }
    return extra;
  }, [onChange, query, extra]);

  return (
    <PageHeader
      breadcrumb={{ itemRender, routes: routes() }}
      extra={headerExtra}
      {...restProps}
    />
  );
};
