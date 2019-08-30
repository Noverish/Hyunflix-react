import React from 'react';
import { Tree, Modal, Input } from 'antd';
import * as hangul from 'hangul-js';

import { Music } from 'models';

interface Props {
  visible: boolean;
  musics: Music[];
  onAdd: (musics: Music[]) => void;
}

interface State {
  query: string;
  autoExpandParent: boolean;
  expandedKeys: string[];
}

export default class MusicAddModal extends React.Component<Props, State> {
  checkedKeys: string[] = []
  state = {
    query: '',
    autoExpandParent: true,
    expandedKeys: [],
  }
  
  renderTreeNodes = (data: MusicTreeNode[]) => {
    return data.map((item: MusicTreeNode) => {
      if (item.children) {
        return (
          <Tree.TreeNode title={renderTitle(item.title, this.state.query)} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </Tree.TreeNode>
        );
      }
      return <Tree.TreeNode key={item.key} {...item} />;
    });
  }
  
  render() {
    return (
      <Modal
        title="Basic Modal"
        visible={this.props.visible}
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        <Input.Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
        <Tree
          checkable
          onExpand={this.onExpand}
          expandedKeys={this.state.expandedKeys}
          autoExpandParent={this.state.autoExpandParent}
          onCheck={this.onCheck}
        >
          {this.renderTreeNodes([convert(this.props.musics)])}
        </Tree>
      </Modal>
    )
  }
  
  onExpand = (expandedKeys: string[]) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    })
  }
  
  onChange = (e) => {
    const query = e.target.value;
    const searcher = new hangul.Searcher(query);
    const expandedKeys = (query)
      ? this.props.musics
        .filter((m: Music) => searcher.search(m.path) > 0)
        .map((m: Music) =>  m.path)
      : [];

    this.setState({ expandedKeys, query, autoExpandParent: true });
  }
  
  onCheck = (checkedKeys) => {
    this.checkedKeys = checkedKeys;
  }
  
  onOk = () => {
    const keys = this.checkedKeys.filter((k: string) => k.endsWith('.mp3'));
    const musics = this.props.musics.filter((m: Music) => keys.includes(m.path));
    
    this.props.onAdd(musics);
  }
  
  onCancel = () => {
    this.props.onAdd([]);
  }
}

interface MusicTreeNode {
  title: string;
  key: string;
  children: MusicTreeNode[];
}

function renderTitle(title: string, query: string) {
  const index = title.indexOf(query);
  const beforeStr = title.substr(0, index);
  const afterStr = title.substr(index + query.length);
  return (index > -1)
    ? (
      <span>
        {beforeStr}
        <span style={{ color: '#f50' }}>{query}</span>
        {afterStr}
      </span>
    )
    : (
      <span>{title}</span>
    );
}

function convert(musics: Music[]) {
  const root: MusicTreeNode = {
    title: 'archive',
    key: '/archive',
    children: []
  };
  
  for(const music of musics) {
    const path = music.path;
    const comps: string[] = path.split('/');
    comps.shift();
    comps.shift();
    
    let nowNode = root;
    let nowPath = '/archive';
    
    while(comps.length) {
      const comp: string = comps.shift()!;
      nowPath += '/' + comp;
      
      let node: MusicTreeNode | undefined = nowNode.children.find(n => n['title'] === comp);
      
      if(node) {
        nowNode = node;
      } else {
        node = {
          title: comp,
          key: nowPath,
          children: []
        }
        
        nowNode.children.push(node)
        nowNode = node;
      }
    }
  }
  
  return root;
}