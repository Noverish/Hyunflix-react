import React, { ComponentType } from 'react';
import { debounce } from 'debounce';

import { ExternalProps as ComponentExternalProps } from './list';
import { USER_INPUT_DEBOUNCE, PAGE_SIZE } from 'config';

type Without<T, K> = Pick<T, Exclude<keyof T, keyof K>>;
type SearchResult<T> = { total: number, results: T[] };
type SearchFunction<T> = (query: string, page: number, pageSize: number) => Promise<SearchResult<T>>;

type ExtractedProps<T> =
  Pick<ComponentExternalProps<T>, 'items' | 'total' | 'page' | 'onPageChange' | 'onQueryChange'>;

interface InjectedProps<T> {
  search: SearchFunction<T>;
}

type CombinedExtrnalProps<T> = Without<ComponentExternalProps<T>, ExtractedProps<T>> & InjectedProps<T>;

export interface Options<T> {

}

interface State<T> {
  items: T[];
  total: number;
  page: number;
  loading: boolean;
  query: string;
}

function withContainer<T>(options?: Options<T>) {
  return function (Component: ComponentType<ComponentExternalProps<T>>) {
    class HOCContainer extends React.Component<CombinedExtrnalProps<T>, State<T>> {
      state: State<T> = {
        items: [] as T[],
        total: 0,
        page: 1,
        loading: false,
        query: '',
      };

      componentDidMount() {
        const { query, page } = this.state;
        this.search(query, page);
      }

      render() {
        const pageSize = this.props.pageSize || PAGE_SIZE;
        const { items, total, page, loading } = this.state;

        return (
          <Component
            items={items}
            total={total}
            page={page}
            pageSize={pageSize}
            loading={loading}

            onPageChange={this.onPageChange}
            onQueryChange={this.onQueryChange}

            {...this.props}
          />
        );
      }

      debouncedOnQueryChange = debounce((query: string) => {
        if (this.state.query !== query) {
          this.search(query, 1);
        } else {
          this.setState({ loading: false });
        }
      }, USER_INPUT_DEBOUNCE);

      onQueryChange = (query: string) => {
        this.state.loading || this.setState({ loading: true });
        this.debouncedOnQueryChange(query);
      }

      onPageChange = (page: number) => {
        const { query } = this.state;
        this.search(query, page);
      }

      public refresh = () => {
        const { query, page } = this.state;
        this.search(query, page);
      }

      search = (query: string, page: number) => {
        const pageSize = this.props.pageSize || PAGE_SIZE;
        this.setState({ loading: true });

        this.props.search(query, page, pageSize)
          .then((result: SearchResult<T>) => {
            this.setState({
              query,
              page,
              loading: false,
              items: result.results,
              total: result.total,
            });
          })
          .catch(() => {}); // TODO catch
      }
    }

    return HOCContainer;
  };
}

export default withContainer;
