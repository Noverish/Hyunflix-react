import React from 'react';
import { TabBar } from 'antd-mobile';

import FolderList from '../pages-mobile/folder-list';

interface Props {
  location,
  history
}

interface State {
  
}

interface Item {
  title: string;
  key: string;
  icon: string;
  path: string;
}

const items: Item[] = [
  {
    title: '영화',
    key: 'Movie',
    icon: 'movie',
    path: '/archive/Movies',
  },
  {
    title: 'TV',
    key: 'tv',
    icon: 'tv',
    path: '/archive/TV_Series',
  },
  {
    title: '다큐멘터리',
    key: 'documentary',
    icon: 'dvr',
    path: '/archive/Documentaries',
  },
  {
    title: '토렌트',
    key: 'torrent',
    icon: 'subscriptions',
    path: '/archive/torrents',
  },
]

export default class TabBarExample extends React.Component<Props, State> {
  tabBarItem(item: Item) {
    return (
      <TabBar.Item
        title={item.title}
        key={item.key}
        icon={<i className="material-icons">{item.icon}</i>}
        selectedIcon={<i className="material-icons">{item.icon}</i>}
        selected={this.props.location.pathname.startsWith(item.path)}
        onPress={() => {
          this.props.history.push(item.path);
        }}
      >
        <FolderList path={this.props.location.pathname}/>
      </TabBar.Item>  
    )
  }

  render() {
    console.log(this.props.location.pathname);
    
    const tabBarItems = items.map((e) => this.tabBarItem(e));
    
    return (
      <div style={{ height: '100%' }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
        >
          { tabBarItems }
        </TabBar>
      </div>
    );
  }
}
