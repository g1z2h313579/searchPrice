import services from '@/services/hardware';
import {
  ActionType,
  PageContainer,
  ProDescriptionsItemProps,
  ProSchemaValueEnumObj,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import CreateForm from '../../components/Modal/CreateForm';

const { queryOrderlist, addOrder, updateOrder, delOrder } = services.order;

const { queryHardwareTypelist } = services.hardwareType;
const { queryHardwareDetaillist } = services.hardwareDetail;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.order) => {
  const hide = message.loading('正在添加');
  try {
    const res = await addOrder({ ...fields });
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

const OrderManager: React.FC<unknown> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModal] = useState<boolean>(false);
  const [updateHardwareDetailRecord, handleUpdateRecord] =
    useState<API.order>();
  const actionRef = useRef<ActionType>();
  const [columns, setColumns] = useState<
    ProDescriptionsItemProps<API.order & API.orderHardwareDetail>[]
  >([
    {
      title: '订单id',
      dataIndex: 'orderId',
      span: 1,
    },
    {
      title: '客户姓名',
      dataIndex: 'customerName',

      span: 1,
    },
    {
      title: '客户电话',
      dataIndex: 'customerPhone',

      span: 3,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',

      span: 3,
    },
    {
      title: '是否完成',
      dataIndex: 'isCompleted',

      span: 1,
      valueEnum() {
        return {
          '0': { text: '否' },
          '1': { text: '是' },
        };
      },
    },
  ]);

  useEffect(() => {
    (async () => {
      const result: API.Result = await queryHardwareTypelist();
      const detailRes: API.Result = await queryHardwareDetaillist({
        hardwareType: -1,
      });
      const detailData: API.hardwareDetail[] = detailRes.data!;
      const data: API.hardwareType[] = result.data!;
      const detailDataMap = detailData.reduce<{
        [hardwareType: number]: API.hardwareDetail[];
      }>((pre, cur) => {
        if (pre[cur.type]) {
          pre[cur.type].push(cur);
        } else {
          pre[cur.type] = [cur];
        }
        return pre;
      }, {});
      setColumns([
        ...columns,
        ...data.map<
          ProDescriptionsItemProps<API.order & API.orderHardwareDetail>
        >((v) => ({
          title: v.hardwareName,
          dataIndex: v.hardwareId,
          valueEnum: () => {
            const currentTypeDetail = detailDataMap[v.hardwareId];
            if (currentTypeDetail) {
              const d = currentTypeDetail.reduce<ProSchemaValueEnumObj>(
                (pre, cur) => {
                  pre[cur.hardwareDetailId + ''] = {
                    text: cur.brand + cur.model!,
                  };
                  return pre;
                },
                {},
              );
              return d;
            }
            return {
              '0': { text: '未知' },
            };
          },
        })),
        {
          title: '总价',
          dataIndex: 'totalPrice',
          hideInForm: true,
          render: (_, record) => {
            if (record.hardwareDetailInfo) {
              const detailInfo = JSON.parse(record.hardwareDetailInfo);
              if (detailInfo) {
                console.log(
                  'detailInfo',
                  JSON.parse(JSON.stringify(detailInfo)),
                );
                let totalPrice: number = 0;
                for (let hardwareTypeId in detailInfo) {
                  if (hardwareTypeId && detailInfo[hardwareTypeId]) {
                    const hardwareDetail = detailInfo[hardwareTypeId];
                    const currentHardwareDetail = detailDataMap[
                      +hardwareTypeId
                    ]?.filter(
                      (v) => +v.hardwareDetailId === +hardwareDetail,
                    )[0];
                    if (!currentHardwareDetail) {
                      return <div>商品信息有误</div>;
                    }
                    totalPrice += currentHardwareDetail.price ?? 0;
                  }
                }
                return <div>{totalPrice}</div>;
              }
            }

            return <div>商品信息有误</div>;
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
                  const result = await delOrder({
                    orderId: record.orderId,
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
      ]);
    })();
  }, []);
  return (
    <PageContainer
      header={{
        title: '订单管理',
      }}
    >
      <ProTable
        headerTitle="订单详情"
        actionRef={actionRef}
        rowKey="orderId"
        scroll={{ x: 300 }}
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
          const result = await queryOrderlist();
          let _data: API.order[] = result.data;
          const data = _data.map((v) => {
            if (v.hardwareDetailInfo) {
              return {
                ...v,
                ...JSON.parse(v.hardwareDetailInfo!),
              };
            }
            return { ...v };
          });
          console.log('data', data);
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
        <ProTable<any, API.order>
          onSubmit={async (value) => {
            const hardwareDetailInfo: { [hardwareId: string]: number } = {};

            Object.entries(value).forEach((v) => {
              if (typeof +v[0] === 'number') {
                hardwareDetailInfo[v[0]] = v[1];
              }
            });
            const success = await handleAdd({
              ...value,
              hardwareDetailInfo: JSON.stringify(hardwareDetailInfo),
            });
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="orderId"
          type="form"
          columns={columns}
        />
      </CreateForm>
      <CreateForm
        onCancel={() => handleUpdateModal(false)}
        modalVisible={updateModalVisible}
        title={'编辑'}
      >
        <ProTable<any, API.order>
          onSubmit={async (value) => {
            const hardwareDetailInfo: { [hardwareId: string]: number } = {};

            Object.entries(value).forEach((v) => {
              if (typeof +v[0] === 'number') {
                hardwareDetailInfo[v[0]] = v[1];
              }
            });
            const success = await updateOrder({
              ...value,
              hardwareDetailInfo: JSON.stringify(hardwareDetailInfo),
            });
            handleUpdateModal(false);
            message.info(success.msg);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
          rowKey="orderId"
          type="form"
          columns={columns}
          form={{
            initialValues: updateHardwareDetailRecord,
          }}
        />
      </CreateForm>
    </PageContainer>
  );
};

export default OrderManager;
