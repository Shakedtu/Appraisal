import React, { useState, useEffect } from 'react';
import {
  Button,
  Dropdown,
  Table,
  Input,
  Typography,
  Menu,
  Avatar,
  Spin,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ICase } from '../../types/types';
import { firebaseAdapter } from '../../adapters/Firebase/FirebaseAdapter';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import AddCaseModal from './AddCaseModal';
import uid from 'uid';
import dayjs from 'dayjs';

const CaseTable: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { Search } = Input;
  const [data, setData] = useState<ICase[]>([]);
  const [visible, setVisible] = useState(false);
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
    firebaseAdapter.getCases().then((casesDate) => setData(casesDate));
  }, []);

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
    const { type, clientName, address, contacts, status } = values;
    const newCase: ICase = {
      type: type,
      client: {
        name: clientName,
      },
      address: address,
      createdAt: dayjs().format('DD/MM/YYYY'),
      status: status,
      contacts: contacts || [],
    };

    firebaseAdapter.addCase(newCase);
    console.log('Received values of form: ', newCase);
    setVisible(false);
  };

  return (
    <>
      <Search placeholder={t('file-table.search.placeholder')} />
      <Spin spinning={data.length === 0}>
        <Table dataSource={data} columns={columns} bordered />
      </Spin>
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
