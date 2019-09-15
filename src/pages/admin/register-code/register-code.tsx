import React from 'react';
import { connect } from 'react-redux';
import { PageHeader, Button, List, Pagination } from 'antd';

import { regCodeListAsync } from 'actions';
import { RegCodeArticleItem } from 'components';
import { RegCode } from 'models';
import { PAGE_SIZE } from 'config';

interface Props {
  regCodeListRequest(): ReturnType<typeof regCodeListAsync.request>;
  regCodes: RegCode[];
}

interface State {
  page: number;
}

class RegisterCodePage extends React.Component<Props, State> {
  state = {
    page: 1,
  }
  
  componentDidMount() {
    this.props.regCodeListRequest();
  }
  
  render() {
    const { regCodes } = this.props;
    const { page } = this.state;
    
    const sliced = regCodes.slice((page - 1) * PAGE_SIZE, (page) * PAGE_SIZE);
    
    return (
      <div className="article-list-page">
      <div className="page-header">
        <PageHeader onBack={() => null} title="회원가입 코드" />
        <Button.Group className="button-group">
          <Button type="primary" onClick={this.onAdd}>추가</Button>
        </Button.Group>
      </div>
      <List
        dataSource={sliced}
        renderItem={regCode => <RegCodeArticleItem regCode={regCode} />}
      />
      <Pagination className="pagenation" current={page} total={regCodes.length} pageSize={PAGE_SIZE} onChange={this.onPageChange} />
    </div>
    )
  }
  
  onAdd = () => {
    
  }
  
  onPageChange = (page: number) => {
    this.setState({ page });
  }
}

const mapDispatchToProps = {
  regCodeListRequest: regCodeListAsync.request,
}

let mapStateToProps = (state) => {
  return {
    regCodes: state.user.regCodes,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterCodePage);

