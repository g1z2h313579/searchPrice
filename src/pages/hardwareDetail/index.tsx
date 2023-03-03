import services from '@/services/hardware';
import {
  ActionType,
  PageContainer,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Image, message } from 'antd';
import React, { useRef, useState } from 'react';
import CreateForm from '../../components/Modal/CreateForm';
import Upload from '@/components/Upload';

const {
  addHardwareDetail,
  delHardwareDetail,
  updateHardwareDetail,
  queryHardwareDetaillist,
} = services.hardwareDetail;
const { queryHardwareTypelist } = services.hardwareType;
/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.hardwareDetail) => {
  const hide = message.loading('正在添加');
  try {
    const res = await addHardwareDetail({ ...fields });
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

const HardwareDetail: React.FC<unknown> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModal] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>('');
  const [updateHardwareDetailRecord, handleUpdateRecord] =
    useState<API.hardwareDetail>();
  const actionRef = useRef<ActionType>();
  const columns: ProDescriptionsItemProps<API.hardwareDetail>[] = [
    {
      title: '类型',
      dataIndex: 'typename',
      request: async () => {
        const result: API.Result = await queryHardwareTypelist();
        const d = result.data! as {
          hardwareId: number;
          hardwareName: string;
        }[];
        return [
          { label: '全部', value: '-1' },
          ...d.map((v) => {
            return {
              label: v.hardwareName,
              value: v.hardwareId,
            };
          }),
        ];
      },
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      hideInSearch: true,
    },
    {
      title: '型号',
      dataIndex: 'model',
      hideInSearch: true,
    },
    {
      title: '库存数量',
      dataIndex: 'inventory',
      hideInSearch: true,
    },
    {
      title: '单价',
      dataIndex: 'price',
      hideInSearch: true,
    },
    {
      title: '是否上架',
      dataIndex: 'onshelves',
      hideInSearch: true,
      valueEnum() {
        return {
          '0': { text: '否', status: '1' },
          '1': { text: '是', status: '1' },
        };
      },
    },
    {
      title: '图片',
      dataIndex: 'imgUrl',
      hideInSearch: true,
      renderFormItem: () => {
        return <Upload setImgUrl={setImgUrl} imageUrl={imgUrl} />;
      },
      render: (_, record) => {
        return (
          <Image
            src={record.imgUrl}
            width={100}
            fallback="data:image/png;base64,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"
          />
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={async () => {
              const result = await delHardwareDetail({
                hardwareDetailId: record.hardwareDetailId,
              });
              message.info(result.msg);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }}
          >
            删除
          </a>
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
        title: '硬件详情管理',
      }}
    >
      <ProTable
        headerTitle="硬件详情"
        actionRef={actionRef}
        rowKey="hardwareDetailId"
        // search={false}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => handleModalVisible(true)}
          >
            新建
          </Button>,
        ]}
        request={async (params) => {
          const { data } = await queryHardwareDetaillist({
            hardwareType: params.typename ?? -1,
          });
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
        <ProTable<any, API.hardwareDetail>
          onSubmit={async (value) => {
            const success = await handleAdd({ ...value, imgUrl });
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="hardwareDetailId"
          type="form"
          columns={columns.map((v) => {
            if (v.dataIndex === 'typename') {
              return {
                ...v,
                dataIndex: 'type',
              };
            }
            return { ...v };
          })}
        />
      </CreateForm>
      <CreateForm
        onCancel={() => handleUpdateModal(false)}
        modalVisible={updateModalVisible}
        title={'编辑'}
      >
        <ProTable<any, API.hardwareDetail>
          onSubmit={async (value) => {
            const success = await updateHardwareDetail({
              ...value,
              // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
              hardwareDetailId: updateHardwareDetailRecord?.hardwareDetailId!,
              imgUrl,
            });
            handleUpdateModal(false);
            message.info(success.msg);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
          rowKey="hardwareDetailId"
          type="form"
          columns={columns.map((v) => {
            if (v.dataIndex === 'typename') {
              return {
                ...v,
                dataIndex: 'type',
              };
            }
            return { ...v };
          })}
          form={{
            initialValues: updateHardwareDetailRecord,
          }}
        />
      </CreateForm>
    </PageContainer>
  );
};

export default HardwareDetail;
