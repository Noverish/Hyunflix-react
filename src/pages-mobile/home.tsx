import React from 'react';
import { TabBar } from 'antd-mobile';

interface Props {
  
}

interface State {
  selectedTab: string;
}

interface Item {
  title: string;
  key: string;
  icon: string;
}

const items: Item[] = [
  {
    title: '영화',
    key: 'Movie',
    icon: 'movie',
  },
  {
    title: 'TV',
    key: 'tv',
    icon: 'tv',
  },
  {
    title: '다큐멘터리',
    key: 'documentary',
    icon: 'dvr',
  },
  {
    title: '토렌트',
    key: 'torrent',
    icon: 'subscriptions',
  },
]

export default class TabBarExample extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab'
    };
  }

  tabBarItem(item: Item) {
    return (
      <TabBar.Item
        title={item.title}
        key={item.key}
        icon={<i className="material-icons">{item.icon}</i>}
        selectedIcon={<i className="material-icons">{item.icon}</i>}
        selected={this.state.selectedTab === item.key}
        onPress={() => {
          this.setState({
            selectedTab: item.key,
          });
        }}
      >
      
      </TabBar.Item>  
    )
  }

  render() {
    const tabBarItems = items.forEach((e) => this.tabBarItem(e));
    
    return (
      <div style={{ height: '100%' }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
        >
          { this.tabBarItem(items[0]) }
          { this.tabBarItem(items[1]) }
          { this.tabBarItem(items[2]) }
          { this.tabBarItem(items[3]) }
        </TabBar>
      </div>
    );
  }
}
