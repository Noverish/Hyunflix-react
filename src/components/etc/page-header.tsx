import React from 'react';
import { PageHeader } from 'antd';
import { Link } from 'react-router-dom';

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

function itemRender(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={'/' + paths.join('/')}>{route.breadcrumbName}</Link>
  );
}

const CustomPageHeader = (props) => {
  return (
    <PageHeader {...props} breadcrumb={{ itemRender, routes: routes() }} />
  );
};

export default CustomPageHeader;
