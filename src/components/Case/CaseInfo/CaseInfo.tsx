import React, { FunctionComponent } from 'react';
import {Card, Col, DatePicker, Form, Input, Row, Select, Space} from 'antd';
import { useTranslation } from 'react-i18next';
import { CaseType, ICase } from '../../../types/types';

const CaseInfo: FunctionComponent<{ data: ICase }> = ({ data }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const caseTypeDropdown = () => {
    const caseTypes: CaseType[] = [
      CaseType.THIRD_PARTY,
      CaseType.ROBBERY,
      CaseType.EXPLOSION,
      CaseType.EARTHQUAKE,
      CaseType.ALL_RISKS,
      CaseType.BURGLARY,
      CaseType.FIRE,
      CaseType.FLOOD,
      CaseType.WATER,
      CaseType.WIND,
      CaseType.BUSINESS_OTHER,
    ];
    return (
      <Select>
        {caseTypes.map((caseType: CaseType) => (
          <Select.Option value={caseType} key={caseType}>
            {t(`case.info.case-type.${caseType}`)}
          </Select.Option>
        ))}
      </Select>
    );
  };

  const generalInfo = () => (
    <>
      <Form.Item  label={t('case.into.case-number')}>
        <Input />
      </Form.Item>
      <Form.Item  label={t('case.into.case-type.title')}>
        {caseTypeDropdown()}
      </Form.Item>
      <Form.Item  label={t('case.into.client-name')}>
        <Input />
      </Form.Item>
      <Form.Item  label={t('case.into.appraiser')}>
        <Input />
      </Form.Item>
      <Form.Item  label={t('case.into.creation-date')}>
        <DatePicker />
      </Form.Item>
      <Form.Item  label={t('case.into.status')}>
        <Input />
      </Form.Item>
    </>
  );
  const references = () => (
      <>
          <Form.Item label={t('case.into.claim-number')}>
              <Input />
          </Form.Item>
          <Form.Item label={t('case.into.policy-number')}>
              <Input />
          </Form.Item>
      </>
  )

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
        form={form}
        layout="vertical"
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={8} flex="auto">
            <Card bordered={false}>
              {generalInfo()}
            </Card>
          </Col>
          <Col className="gutter-row" span={8} flex='auto'>
            <Card bordered={false}>
                {references()}
            </Card>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CaseInfo;
