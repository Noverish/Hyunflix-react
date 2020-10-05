import React, { useCallback, useMemo } from 'react';
import { Dropdown, Button, Menu } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';

const NO_SELECT = '선택 없음';

interface Props {
  onChange(tag?: string): void;
  tags: {[tag: string]: string};
  value?: string;
}

export default ({ tags, onChange, value }: Props) => {
  const className: string | undefined = value ? `ant-tag-${tags[value]}` : undefined;

  const onClick = useCallback((param: MenuInfo) => {
    onChange(param.key === NO_SELECT ? undefined : param.key.toString());
  }, [onChange]);

  const menu = useMemo(() => {
    const items = Object.keys(tags).map(t => (
      <Menu.Item key={t}>
        {t}
      </Menu.Item>
    ));
    return (
      <Menu onClick={onClick}>
        <Menu.Item key={NO_SELECT}>
          {NO_SELECT}
        </Menu.Item>
        {items}
      </Menu>
    );
  }, [tags, onClick]);

  return (
    <Dropdown overlay={menu}>
      <Button className={className}>
        {value || '태그 선택'}
      </Button>
    </Dropdown>
  );
};
