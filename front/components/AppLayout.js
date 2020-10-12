import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Menu, Input, Row, Col,
} from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import useInput from '../hooks/useInput';

const AppLayoutWrapper = styled.div`
  overflow-x: hidden;
`;

const SearchInput = styled(Input.Search)`
    vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const [searchInput, onChangeSearchInput] = useInput('');

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <AppLayoutWrapper>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/"><a>노드버드</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile"><a>프로필</a></Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
          />
        </Menu.Item>
        {!me ? (
          <Menu.Item>
            <Link href="/signup"><a>회원가입</a></Link>
          </Menu.Item>
        ) : null}
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="https://github.com/sangmin9412" target="_blank" rel="noreferrer noopener">Made by SangMin</a>
        </Col>
      </Row>
    </AppLayoutWrapper>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
