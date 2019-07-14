import React from 'react';
import { TabBar } from 'antd-mobile';

import ExplorerPage from 'pages/explorer';
import FavoritePage from 'pages/favorite';
import SettingPage from 'pages/settings';

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
  content;
}

export default class TabBarExample extends React.Component<Props, State> {
  renderTabBarItem(item: Item) {
    const nowPath = this.props.location.pathname;
    
    return (
      <TabBar.Item
        title={item.title}
        key={item.key}
        icon={<i className="material-icons">{item.icon}</i>}
        selectedIcon={<i className="material-icons">{item.icon}</i>}
        selected={nowPath.startsWith(item.path)}
        onPress={() => {
          this.props.history.push(item.path);
        }}
      >
        {item.content}
      </TabBar.Item>  
    )
  }

  render() {
    const items: Item[] = [
      {
        title: '탐색기',
        key: 'Explorer',
        icon: 'folder',
        path: '/archive',
        content: (<ExplorerPage />),
      },
      {
        title: '즐겨찾기',
        key: 'favorite',
        icon: 'star',
        path: '/favorite',
        content: (<FavoritePage />),
      },
      {
        title: '설정',
        key: 'Settings',
        icon: 'settings',
        path: '/settings',
        content: (<SettingPage />),
      },
    ];
    
    const tabBarItems = items.map((i) => this.renderTabBarItem(i));
    
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
