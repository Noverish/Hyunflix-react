import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

import MainLayout from 'src/components/layout/main-layout';

interface Props extends RouteProps {
  layout?: React.ComponentType<any>;
}

const RouteWithLayout = (props: Props) => {
  const { layout, component, render, ...rest } = props;

  if (component) {
    const render2 = props => React.createElement(layout || MainLayout, props, React.createElement(component, props));

    return (
      <Route {...rest} render={render2} />
    );
  }

  if (render) {
    const render2 = props => React.createElement(layout || MainLayout, props, render(props)); // TODO 연구하기

    return (
      <Route {...rest} render={render2} />
    );
  }

  return (
    <div>ERROR - RouteWithLayout</div>
  );
};

export default RouteWithLayout;
