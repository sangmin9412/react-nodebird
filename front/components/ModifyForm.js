import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { MODIFY_POST_REQUEST } from '../reducers/post';

const ModifyForm = ({ post, onClose }) => {
  const dispatch = useDispatch();
  const [modifyText, onChangeModifyText, setModifyText] = useInput('');
  const { modifyPostLoading } = useSelector((state) => state.post);

  useEffect(() => {
    setModifyText(post.content);
  }, []);

  const onSubmitModify = useCallback(() => {
    dispatch({
      type: MODIFY_POST_REQUEST,
      data: {
        postId: post.id,
        content: modifyText,
      },
    });
    onClose();
  }, [modifyText]);

  return (
    <Form onFinish={onSubmitModify}>
      <Form.Item>
        <Input.TextArea value={modifyText} onChange={onChangeModifyText} rows={2} />
        <Button
          style={{ float: 'right' }}
          type="primary"
          htmlType="submit"
          loading={modifyPostLoading}
        >수정확인
        </Button>
      </Form.Item>
    </Form>
  );
};

ModifyForm.propTypes = {
  post: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModifyForm;
