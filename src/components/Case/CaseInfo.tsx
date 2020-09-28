import React, { FunctionComponent } from 'react';
import { DatePicker, Form, Input, InputNumber, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { CaseType, ICase } from '../../types/types';

const CaseInfo: FunctionComponent<{ data: ICase }> = ({ data }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  return (
    <>
      <Form
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 3 }}
        form={form}
        layout="horizontal"
      >
        <Form.Item label={'סוג תיק'}>
          <Select>
            <Select.Option value={CaseType.ACCIDENT}>תאונה</Select.Option>
            <Select.Option value={CaseType.WATER}>מים</Select.Option>
            <Select.Option value={CaseType.ALL_RISKS}>
              כל הסיכונים
            </Select.Option>
            <Select.Option value={CaseType.BURGLARY}>פריצה</Select.Option>
            <Select.Option value={CaseType.FIRE}>אש</Select.Option>
            <Select.Option value={CaseType.FLOOD}>הצפה</Select.Option>
            <Select.Option value={CaseType.WIND}>רוח</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label={'מספר תיק'}>
          <Input />
        </Form.Item>
        <Form.Item label={'שם המזמין'}>
          <Input />
        </Form.Item>
        <Form.Item label={'שמאי מטפל'}>
          <Input />
        </Form.Item>
        <Form.Item label={'תאריך פתיחה'}>
          <DatePicker />
        </Form.Item>
        <Form.Item label={'מצב התיק'}>
          <Input />
        </Form.Item>
        <Form.Item label={'מספר תביעה'}>
          <Input />
        </Form.Item>
        <Form.Item label={'מספר פוליסה'}>
          <Input />
        </Form.Item>
      </Form>
    </>
  );
};

export default CaseInfo;
