import React, { useState } from 'react';
import { Contact, ContactType, ICase, Address } from '../../types/types';
import { Button, Input, Form, Table, Popconfirm, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useQueryCache, useMutation } from 'react-query';
import { firebaseAdapter } from '../../adapters/Firebase/FirebaseAdapter';
import { useParams } from 'react-router-dom';

const Contacts: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const queryCache = useQueryCache();
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record: TableItem) => record.key === editingKey;
  const data: ICase | undefined = queryCache.getQueryData('getCaseData');
  const { contacts } = data || {};
  const { id } = useParams();

  const [mutate] = useMutation(firebaseAdapter.updateContact, {
    onSuccess: (updatedCase) =>
      queryCache.setQueryData(['getCaseData', { id: id }], updatedCase),
  });

  const tableDataSource: TableItem[] | undefined = contacts?.map(
    (contact, index) => {
      return {
        key: index.toString(),
        name: contact.name,
        type: contact.type,
        phone: contact.phone,
        address: contact.address,
        email: contact.email,
        fax: contact.fax,
      };
    }
  );

  interface TableItem {
    key: string;
    name: string;
    type: ContactType;
    address: Address;
    phone: string;
    email: string;
    fax?: string;
  }
  interface EditableCellProps {
    title: any;
    editable: boolean;
    inputType: 'select' | 'text';
    children: React.ReactNode;
    dataIndex: string;
    record: TableItem;
  }

  const contactTypeDropdown = () => {
    const contactTypes: ContactType[] = [
      ContactType.INSURANCE_AGENT,
      ContactType.INSURANCE_COMPANY,
      ContactType.INSUREE,
    ];

    return (
      <Select>
        {contactTypes.map((contactType: ContactType) => (
          <Select.Option value={contactType} key={contactType}>
            {t(`case.info.contact-type.${contactType}`)}
          </Select.Option>
        ))}
      </Select>
    );
  };

  const EditableCell: React.FC<EditableCellProps> = ({
    editable,
    dataIndex,
    title,
    inputType,
    record,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'text' ? <Input /> : contactTypeDropdown();

    return (
      <td {...restProps}>
        {editable ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Contact;
      if (contacts !== undefined)
        contacts.splice(parseInt(key.toString()), 1, row);
      try {
        await mutate({ id, contacts });
      } catch (e) {
        console.log(e);
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    } finally {
      setEditingKey('');
    }
  };

  const edit = (record: TableItem) => {
    form.setFieldsValue({
      ...record,
      address: `${record.address.street} ${record.address.houseNumber}, ${record.address.city}`,
    });
    setEditingKey(record.key);
  };

  const columns = [
    {
      title: t(`case.contact-info.contacts.name`),
      dataIndex: 'name',
      editable: true,
    },
    {
      title: t(`case.contact-info.contacts.type`),
      dataIndex: 'type',
      editable: true,
    },
    {
      title: t(`case.contact-info.contacts.address`),
      dataIndex: 'address',
      render: (address) =>
        `${address.street} ${address.houseNumber}, ${address.city}`,
      editable: true,
    },
    {
      title: t(`case.contact-info.contacts.phone`),
      dataIndex: 'phone',
      editable: true,
    },
    {
      title: t(`case.contact-info.contacts.email`),
      dataIndex: 'email',
      editable: true,
    },
    {
      title: t(`case.contact-info.contacts.fax`),
      dataIndex: 'fax',
      editable: true,
    },
    {
      title: t(`case.contact-info.contacts.edit`),
      dataIndex: 'edit',
      render: (_: any, record: TableItem) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button type={'link'}>Cancel</Button>
            </Popconfirm>
            <Button type={'link'} onClick={() => save(record.key)}>
              Save
            </Button>
          </span>
        ) : (
          <Button type={'link'} onClick={() => edit(record)}>
            Edit
          </Button>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: TableItem) => ({
        record,
        inputType: col.dataIndex === 'type' ? 'select' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editable: isEditing(record),
      }),
    };
  });

  const components = {
    body: {
      cell: EditableCell,
    },
  };

  return contacts ? (
    <Form form={form} component={false}>
      <Table
        columns={mergedColumns}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={tableDataSource}
      />
    </Form>
  ) : null;
};

export default Contacts;
