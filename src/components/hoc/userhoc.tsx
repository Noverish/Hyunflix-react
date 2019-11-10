import React from 'react';

import hoc, { InjectedProps } from './hoc-test';

interface Props {
  original: string;
}

const Test: React.FC<Props & InjectedProps> = (props) => {
  return (
    <div>
      {JSON.stringify(props)}
    </div>
  );
};

const render = (item: string) => {
  return (
    <div>
      {item}
    </div>
  );
};

export default hoc({ render })(Test);
