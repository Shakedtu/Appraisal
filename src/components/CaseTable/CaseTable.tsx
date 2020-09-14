import React, { useState, useEffect } from 'react';
import { Table, Input, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ICase, CaseStatus, CaseType } from '../../types/types';
import { firebaseAdapter } from '../../adapters/firebaseAdapter';

const CaseTable: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { Search } = Input;
  const [data, setData] = useState<ICase[]>([]);
  const casesRef = firebaseAdapter.getCollection('cases');
  const columns: ColumnsType<ICase> = [
    {
      key: 'id',
      dataIndex: 'id',
      width: '10%',
      title: t(`file-table.header.column.id`),
      render: (id) => (
        <Link to={`/case/${id}`} component={Typography.Link} params={id}>
          {id}
        </Link>
      ),
    },
    {
      key: 'type',
      dataIndex: 'type',
      title: t(`file-table.header.column.caseType`),
      render: (caseType) => CaseType[caseType],
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: t(`file-table.header.column.status`),
      render: (statusNum) => CaseStatus[statusNum],
    },
    {
      key: 'createdAt',
      dataIndex: 'createdAt',
      title: t(`file-table.header.column.openDate`),
    },
    {
      key: 'clientName',
      dataIndex: 'client',
      title: t(`file-table.header.column.clientName`),
      render: (client) => client.name,
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: t(`file-table.header.column.address`),
      render: (address) =>
        `${address.street} ${address.houseNumber}, ${address.city}`,
    },
  ];
  useEffect(() => {
    const getData = async () => {
      const casesData: ICase[] = await firebaseAdapter.getCases();
      setData(casesData);
    };

    getData();
  }, [casesRef]);

  return (
    <>
      <Search placeholder={t('file-table.search.placeholder')} />
      <Table dataSource={data} columns={columns} bordered />
    </>
  );
};

export default CaseTable;
