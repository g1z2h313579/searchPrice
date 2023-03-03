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

const {
  addHardwareType,
  queryHardwareTypelist,
  delHardwareType,
  updateHardwareType,
} = services.hardwareType;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: { hardwareName: string }) => {
  const hide = message.loading('正在添加');
  try {
    const res = await addHardwareType({ ...fields });
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

const TableList: React.FC<unknown> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModal] = useState<boolean>(false);
  const [updateHardwareTypeRecord, handleUpdateRecord] =
    useState<API.hardwareType>();
  const actionRef = useRef<ActionType>();
  const columns: ProDescriptionsItemProps<API.hardwareType>[] = [
    {
      title: '名称',
      dataIndex: 'hardwareName',
      tip: '硬件类型名称',
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
            title="如果删除，与之相关的所有数据都将删除"
            onConfirm={async () => {
              const result = await delHardwareType({
                hardwareId: record.hardwareId,
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
        title: '硬件类型管理',
      }}
    >
      <ProTable<API.hardwareType>
        headerTitle="硬件类型"
        actionRef={actionRef}
        rowKey="hardwareId"
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
          const { data } = await queryHardwareTypelist();
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
        <ProTable<any, API.hardwareType>
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="hardwareId"
          type="form"
          columns={columns}
        />
      </CreateForm>
      <CreateForm
        onCancel={() => handleUpdateModal(false)}
        modalVisible={updateModalVisible}
        title={'编辑'}
      >
        <ProTable<any, API.hardwareType>
          onSubmit={async (value) => {
            const success = await updateHardwareType({
              ...value,
              hardwareId: updateHardwareTypeRecord!.hardwareId!,
            });
            handleUpdateModal(false);
            message.info(success.msg);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
          rowKey="hardwareId"
          type="form"
          columns={columns}
        />
      </CreateForm>
    </PageContainer>
  );
};

export default TableList;
