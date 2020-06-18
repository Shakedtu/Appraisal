import React from 'react';
import { Table, Input, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface TableData {
  key?: string;
  id: string;
  insurer: string;
  status: string;
  openDate: string;
  clientName: string;
}

const CaseTable: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { Search } = Input;
  const columns = [
    {
      key: 'id',
      dataIndex: 'id',
      width: '10%',
      title: t(`file-table.header.column.id`),
      render: (id) => (
        <Link to={`/case/${id}`} component={Typography.Link}>
          {id}
        </Link>
      ),
    },
    {
      key: 'insurer',
      dataIndex: 'insurer',
      title: t(`file-table.header.column.insurer`),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: t(`file-table.header.column.status`),
    },
    {
      key: 'openDate',
      dataIndex: 'openDate',
      title: t(`file-table.header.column.openDate`),
    },
    {
      key: 'clientName',
      dataIndex: 'clientName',
      title: t(`file-table.header.column.clientName`),
    },
  ];

  const data: TableData[] = [
    {
      key: '1',
      id: '1',
      insurer: 'מבוטח כלשהו',
      status: 'פתוח',
      openDate: '22/10/2019',
      clientName: 'מנורה',
    },
    {
      key: '2',
      id: '2',
      insurer: 'עוד אחד',
      status: 'סגור',
      openDate: '22/12/2001',
      clientName: 'מגדל',
    },
  ]; //TODO: fetch real data

  return (
    <>
      <Search placeholder={t('file-table.search.placeholder')} />
      <Table columns={columns} dataSource={data} bordered />
    </>
  );
};

export default CaseTable;
