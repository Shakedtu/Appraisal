import React, { useEffect, useRef } from 'react';
import { Radio, Form, Input, Select, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { ContactType } from '../../types/types';
import uid from 'uid';

const useResetFormOnCloseModal = ({ form, visible }) => {
  const prevVisibleRef = useRef();
  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible, form]);
  const prevVisible = prevVisibleRef.current;

  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields();
    }
  }, [visible]);
};

interface ModalFormProps {
  visible: boolean;
  onCancel: () => void;
}

const AddContactModal: React.FC<ModalFormProps> = ({ visible, onCancel }) => {
  const { t } = useTranslation();
  const { Option } = Select;
  const [form] = Form.useForm();

  useResetFormOnCloseModal({
    form,
    visible,
  });

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal
      title="Basic Drawer"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" name="addContactForm">
        <Form.Item
          name="type"
          label={t(`case-table.add-contact-modal.contact-type`)}
        >
          <Radio.Group>
            {Object.values(ContactType)
              .filter((type) => typeof type === 'string')
              .map((type) => (
                <Radio value={type} key={uid()}>
                  {type}
                </Radio>
              ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="name"
          label={t(`case-table.add-contact-modal.contact-name`)}
          rules={[{ required: true }]}
        >
          <Input placeholder={t(`case-table.add-contact-modal.contact-name`)} />
        </Form.Item>
        <Form.Item
          name="phone"
          label={t(`case-table.add-contact-modal.phone`)}
          rules={[{ required: true }]}
        >
          <Input style={{ width: '70%' }} />
        </Form.Item>
        <Form.Item label={t(`case-table.add-contact-modal.address`)}>
          <Input.Group compact>
            <Form.Item name={['address', 'street']}>
              <Input placeholder={t(`case-table.add-contact-modal.street`)} />
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
          name="email"
          label={t(`case-table.add-contact-modal.email`)}
          rules={[
            {
              type: 'email',
              message: 'The input is not a valid email address!',
            },
            {
              required: true,
              message: 'Please insert your email address!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="fax"
          label={t(`case-table.add-contact-modal.fax-number`)}
        >
          <Input style={{ width: '70%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddContactModal;
