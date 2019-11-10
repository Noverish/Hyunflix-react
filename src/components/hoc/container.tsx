import React, { ComponentType } from 'react';
import { History } from 'history';
import { debounce } from 'debounce';
import { parse, stringify } from 'query-string';

import { ExternalProps as ComponentExternalProps } from './list';
import { USER_INPUT_DEBOUNCE, PAGE_SIZE } from 'config';

type Without<T, K> = Pick<T, Exclude<keyof T, keyof K>>;
type SearchResult<T> = { total: number, results: T[] };
type SearchFunction<T> = (query: string, page: number, pageSize: number) => Promise<SearchResult<T>>;

type ExtractedProps<T> =
  Pick<ComponentExternalProps<T>, 'items' | 'total' | 'page' | 'onPageChange' | 'onQueryChange'>;

interface InjectedProps<T> {
  search: SearchFunction<T>;
  history: History;
}

type CombinedExtrnalProps<T> = Without<ComponentExternalProps<T>, ExtractedProps<T>> & InjectedProps<T>;

export interface Options<T> {

}

interface State<T> {
  items: T[];
  total: number;
  loading: boolean;
}

function withContainer<T>(options?: Options<T>) {
  return function (Component: ComponentType<ComponentExternalProps<T>>) {
    class HOCContainer extends React.Component<CombinedExtrnalProps<T>, State<T>> {
      state: State<T> = {
        items: [] as T[],
        total: 0,
        loading: false,
      };

      componentDidMount() {
        this.refresh();
      }

      public extractQuery = () => {
        const { q, p } = parse(window.location.search);
        const query: string = (q || '') as string;
        const page: number = parseInt(p as string || '1');
        return { query, page };
      }

      render() {
        const pageSize = this.props.pageSize || PAGE_SIZE;
        const { items, total, loading } = this.state;
        const { page, query } = this.extractQuery();

        return (
          <Component
            items={items}
            total={total}
            page={page}
            pageSize={pageSize}
            query={query}

            onPageChange={this.onPageChange}
            onQueryChange={this.onQueryChange}

            {...this.props}
            loading={loading}
          />
        );
      }

      debouncedOnQueryChange = debounce((query: string) => {
        const { query: oldQuery } = this.extractQuery();
        if (oldQuery !== query) {
          const querystring = stringify({ p: 1, q: query });
          this.props.history.push(window.location.pathname + '?' + querystring);
          this.refresh();
        } else {
          this.setState({ loading: false });
        }
      }, USER_INPUT_DEBOUNCE);

      onQueryChange = (query: string) => {
        this.state.loading || this.setState({ loading: true });
        this.debouncedOnQueryChange(query);
      }

      onPageChange = (page: number) => {
        const { query } = this.extractQuery();
        const querystring = stringify({ q: query, p: page });
        this.props.history.push(window.location.pathname + '?' + querystring);
        this.refresh();
      }

      public refresh = () => {
        const pageSize = this.props.pageSize || PAGE_SIZE;
        const { query, page } = this.extractQuery();
        this.setState({ loading: true });

        this.props.search(query, page, pageSize)
          .then((result: SearchResult<T>) => {
            this.setState({
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
