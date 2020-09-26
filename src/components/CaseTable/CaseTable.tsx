import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Table, Input, Typography, Menu, Avatar } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ICase } from '../../types/types';
import { firebaseAdapter } from '../../adapters/firebaseAdapter';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import AddCaseModal from './AddCaseModal';
import uid from 'uid';
import moment from 'moment';

const CaseTable: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { Search } = Input;
  const [data, setData] = useState<ICase[]>([]);
  const [visible, setVisible] = useState(false);
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
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: t(`file-table.header.column.status`),
    },
    {
      key: 'createdAt',
      dataIndex: 'createdAt',
      title: t(`file-table.header.column.openDate`),
    },
    {
      key: 'clientName',
      dataIndex: 'clientName',
      title: t(`file-table.header.column.clientName`),
      render: (clientName) => `${clientName}`,
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: t(`file-table.header.column.address`),
      render: (address) =>
        `${address.street} ${address.houseNumber}, ${address.city}`,
    },
    {
      key: 'contacts',
      dataIndex: 'contacts',
      title: t(`case-table.add-contact-modal.contacts`),
      render: (contacts) =>
        contacts.map((contact) => (
          <>
            <p>
              <Avatar icon={<UserOutlined />} key={uid()} />
              {contact.name}
            </p>
          </>
        )),
    },
  ];

  useEffect(() => {
    const getData = async () => {
      const casesData: ICase[] = await firebaseAdapter.getCases();
      setData(casesData);
    };

    getData();
  }, [casesRef]);

  const insurerFilter = async ({ key }) => {
    const casesData = await firebaseAdapter.getCasesByInsurer(key);
    setData(casesData);
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={insurerFilter}>
        {t('case-table.filter.items.insurer')}
      </Menu.Item>
    </Menu>
  );

  const onCreate = (values) => {
    const newCase: ICase = {
      ...values,
      createdAt: moment().format('DD/MM/YYYY'),
    };
    firebaseAdapter.addCase(newCase);
    console.log('Received values of form: ', newCase);
    setVisible(false);
  };

  return (
    <>
      <Search placeholder={t('file-table.search.placeholder')} />
      <Table dataSource={data} columns={columns} bordered />
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        {t('case-table.buttons.new-case.title')}
      </Button>
      <AddCaseModal
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
      <Dropdown overlay={menu}>
        <a className="filter-dropdown" onClick={(e) => e.preventDefault()}>
          {t('case-table.filter.title')} <DownOutlined />
        </a>
      </Dropdown>
    </>
  );
};

export default CaseTable;
