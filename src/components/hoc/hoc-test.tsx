import React from 'react';

interface WithItemProps<T> {
  t: T;
  checked?: boolean;
  link?(t: T): string;
  onClick?(t: T): void;
}

// Props you want the resulting component to take (besides the props of the wrapped component)
interface ExternalProps {
  external: string;
}

// Props the HOC adds to the wrapped component
export interface InjectedProps {
  injected: string;
}

// Options for the HOC factory that are not dependent on props values
interface Options<T> {
  render(t: T): JSX.Element;
}

function hoc<T>(options: Options<T>) {
  return function <OriginalProps extends {}>(Component: React.ComponentType<OriginalProps & InjectedProps>) {
    const HOC: React.FC<OriginalProps & ExternalProps> = props => (
      <div>
        <Component {...props} injected="injected" />
      </div>
    );

    return HOC;
  };
}

export default hoc;
