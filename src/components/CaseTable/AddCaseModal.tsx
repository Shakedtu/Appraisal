import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import uid from 'uid';
import {
  Button,
  Select,
  Modal,
  Form,
  Input,
  Avatar,
  Typography,
  List,
} from 'antd';
import { SmileOutlined, UserOutlined } from '@ant-design/icons';
import { CaseType, CaseStatus, Contact } from '../../types/types';
import AddContactModal from '../Case/AddContactModal';

const AddCaseModal = ({ visible, onCreate, onCancel }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { Option } = Select;
  const [contactVisible, setContactVisible] = useState(false);
  const [contactsList, setContactsList] = useState<Contact[]>([]);
  const changeContactVisabillity = () => setContactVisible(!contactVisible);

  return (
    <>
      <Modal
        visible={visible}
        title={t('case-table.buttons.new-case.title')}
        okText={t('case-table.buttons.new-case.title')}
        cancelText="Cancel"
        onCancel={() => {
          setContactsList([]);
          onCancel();
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form.Provider
          onFormFinish={(name, { values, forms }) => {
            if (name === 'addContactForm') {
              const { caseForm } = forms;
              const preContactsValue = caseForm.getFieldValue('contacts') || [];
              caseForm.setFieldsValue({
                ...caseForm.getFieldsValue(),
                contacts: [...preContactsValue, values],
              });
              setContactsList(caseForm.getFieldValue('contacts'));
              setContactVisible(false);
            }
          }}
        >
          <Form
            form={form}
            layout="vertical"
            name="caseForm"
            initialValues={{
              modifier: 'public',
            }}
          >
            <Form.Item
              name="type"
              label={t('case-table.buttons.new-case.case-type')}
              rules={[
                {
                  required: true,
                  message: 'Please choose the case type!',
                },
              ]}
            >
              <Select
                defaultValue={t('case-table.buttons.new-case.choose-case-type')}
              >
                {Object.values(CaseType)
                  .filter((type) => typeof type === 'string')
                  .map((type) => (
                    <Option value={type} key={uid()}>
                      {type}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="clientName"
              label={t(`case-table.add-case-modal.client-name`)}
              rules={[
                {
                  required: true,
                  message: 'Please enter a client name!',
                },
              ]}
            >
              <Input type="textarea" />
            </Form.Item>
            <Form.Item
              name="status"
              label={t('case-table.buttons.new-case.case-status')}
              initialValue="NEW"
            >
              <Select>
                {Object.values(CaseStatus)
                  .filter((type) => typeof type === 'string')
                  .map((type) => (
                    <Option value={type} key={uid()}>
                      {type}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item label={t(`case-table.add-contact-modal.address`)}>
              <Input.Group compact>
                <Form.Item name={['address', 'street']}>
                  <Input
                    placeholder={t(`case-table.add-contact-modal.street`)}
                  />
                </Form.Item>
                <Form.Item name={['address', 'houseNumber']}>
                  <Input
                    placeholder={t(`case-table.add-contact-modal.house-number`)}
                  />
                </Form.Item>
                <Form.Item name={['address', 'city']}>
                  <Input placeholder={t(`case-table.add-contact-modal.city`)} />
                </Form.Item>
              </Input.Group>
            </Form.Item>
            <Form.Item
              name="contacts"
              label={t(`case-table.add-contact-modal.contacts`)}
              shouldUpdate={(prevValues, curValues) =>
                prevValues.contacts !== curValues.contacts
              }
            >
              {contactsList.length ? (
                <List
                  size="small"
                  dataSource={contactsList}
                  itemLayout="vertical"
                  bordered
                  rowKey={uid()}
                  renderItem={(contact) => (
                    <List.Item key={uid()}>
                      <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={`${contact.name} - ${contact.type}`}
                      />
                    </List.Item>
                  )}
                ></List>
              ) : (
                <Typography.Text className="ant-form-text" type="secondary">
                  ( <SmileOutlined /> No contacts yet. )
                </Typography.Text>
              )}
            </Form.Item>
            <Button onClick={changeContactVisabillity}>
              {t(`case-table.add-contact-modal.buttons.add-contact`)}
            </Button>
          </Form>
          <AddContactModal
            visible={contactVisible}
            onCancel={changeContactVisabillity}
          />
        </Form.Provider>
      </Modal>
    </>
  );
};

export default AddCaseModal;
