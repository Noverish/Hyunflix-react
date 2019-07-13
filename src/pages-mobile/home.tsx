import React from 'react';
import { Route } from 'react-router-dom';
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
  content;
}

export default class TabBarExample extends React.Component<Props, State> {
  renderTabBarItem(item: Item) {
    const path = this.props.location.pathname;
    const selected = path.startsWith(item.path);
    
    return (
      <TabBar.Item
        title={item.title}
        key={item.key}
        icon={<i className="material-icons">{item.icon}</i>}
        selectedIcon={<i className="material-icons">{item.icon}</i>}
        selected={selected}
        onPress={() => {
          this.props.history.push(item.path);
        }}
      >
        {(selected) ? item.content : (<div></div>)}
      </TabBar.Item>  
    )
  }

  render() {
    const path = this.props.location.pathname;
    const items: Item[] = [
      {
        title: '영화',
        key: 'Movie',
        icon: 'movie',
        path: '/archive',
        content: (<Route path={path} component={FolderList} />),
      },
      {
        title: '사진',
        key: 'Picture',
        icon: 'collections',
        path: '/pictures',
        content: (<div></div>),
      },
      {
        title: '음악',
        key: 'Music',
        icon: 'library_music',
        path: '/musics',
        content: (<div></div>),
      },
      {
        title: '설정',
        key: 'Setting',
        icon: 'settings',
        path: '/settings',
        content: (<div></div>),
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
