import services from '@/services/hardware';
import {
  ActionType,
  PageContainer,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import CreateForm from '@/components/Modal/CreateForm';

const { addUser, delUser, updateUser, queryUser } = services.hardwareUser;
/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.userInfo) => {
  const hide = message.loading('正在添加');
  try {
    const res = await addUser({ ...fields });
    hide();
    if (res.msg !== '添加成功') {
      message.error('添加失败请重试！');
    } else {
      message.success(res.msg);
    }
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

const UserManager: React.FC<unknown> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModal] = useState<boolean>(false);
  const [updateHardwareTypeRecord, handleUpdateRecord] =
    useState<API.userInfo>();
  const actionRef = useRef<ActionType>();
  const columns: ProDescriptionsItemProps<API.userInfo>[] = [
    {
      title: '用户名',
      dataIndex: 'userName',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '名称为必填项',
          },
        ],
      },
    },
    {
      title: '真实姓名',
      dataIndex: 'nickName',
    },
    {
      title: '密码',
      dataIndex: 'password',
      hideInTable: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '名称为必填项',
          },
        ],
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Popconfirm
            title="确认删除用户？"
            onConfirm={async () => {
              const result = await delUser({
                id: record.id,
              });
              message.info(result.msg);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }}
            okText="确认"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>

          <span> | </span>
          <a
            onClick={() => {
              handleUpdateModal(true);
              handleUpdateRecord(record);
            }}
          >
            编辑
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: '用户管理',
      }}
    >
      <ProTable<API.userInfo>
        headerTitle="用户"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => handleModalVisible(true)}
          >
            新建
          </Button>,
        ]}
        request={async () => {
          const { data } = await queryUser();
          return {
            data: data || [],
          };
        }}
        columns={columns}
      />

      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <ProTable<any, API.userInfo>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={columns}
        />
      </CreateForm>
      <CreateForm
        onCancel={() => handleUpdateModal(false)}
        modalVisible={updateModalVisible}
        title={'编辑'}
      >
        <ProTable<any, API.userInfo>
          onSubmit={async (value) => {
            const success = await updateUser({
              ...value,
              id: updateHardwareTypeRecord!.id!,
            });
            handleUpdateModal(false);
            message.info(success.msg);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
          rowKey="id"
          type="form"
          columns={columns}
          form={{
            initialValues: { ...updateHardwareTypeRecord, password: '' },
          }}
        />
      </CreateForm>
    </PageContainer>
  );
};

export default UserManager;
