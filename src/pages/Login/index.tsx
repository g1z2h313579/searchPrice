import { Button, Col, Form, Input, message, Row } from 'antd';

import service from '@/services/user';
import { useNavigate } from '@umijs/max';

const { login } = service.UserController;

const Login: React.FC = () => {
  let navigate = useNavigate();
  const onFinish = async (values: any) => {
    const result: API.Result = await login(values);
    if (result.msg !== '登陆成功') {
      message.error(result.msg);
      return;
    }
    message.success(result.msg);
    localStorage.setItem('token', result.data?.token);
    navigate('/hardwareManager');
  };

  return (
    <Row align={'middle'}>
      <Col span={8} xs={4} />
      <Col span={8} xs={16}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              登陆
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={8} xs={4} />
    </Row>
  );
};

export default Login;
