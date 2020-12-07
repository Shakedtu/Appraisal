import React, { useState, FunctionComponent } from 'react';
import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { CaseType, ICase, CaseStatus, ICaseInfo } from '../../../types/types';
import { useQueryCache } from 'react-query';
import dayjs from 'dayjs';
import DatePicker from '../../DatePicker/DatePicker';
import { firebaseAdapter } from '../../../adapters/Firebase/FirebaseAdapter';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';

const CaseInfo: FunctionComponent = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const queryCache = useQueryCache();
  const data: ICase | undefined = queryCache.getQueryData('getCaseData');
  const dateFormat = 'DD/MM/YYYY';
  const params = useParams();
  const { id } = params;
  const [formValues, setFormValues] = useState({
    caseType: data?.type,
    clientName: data?.client.name,
    createdAt: dayjs(data?.createdAt, dateFormat),
    status: data?.status,
  });

  const [mutate] = useMutation(firebaseAdapter.updateCase, {
    onSuccess: (data, mutationVariables) => {
      console.log('mutation d', data);
      console.log('mutation v', mutationVariables);
      queryCache.invalidateQueries([
        'getCaseData',
        {
          id: id,
        },
      ]);
    },
  });

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
      data && (
        <Select>
          {caseTypes.map((caseType: CaseType) => (
            <Select.Option value={caseType} key={caseType}>
              {t(`case.info.case-type.${caseType}`)}
            </Select.Option>
          ))}
        </Select>
      )
    );
  };

  const caseStatusDropdown = () => {
    const caseStatuses: CaseStatus[] = [
      CaseStatus.CLOSE,
      CaseStatus.NEW,
      CaseStatus.OPEN,
      CaseStatus.WAITING_FOR_FIRST_IMPRESSION,
      CaseStatus.WAITING_FOR_PAYMENT,
      CaseStatus.WAITING_FOR_REPORT,
    ];

    return (
      data && (
        <Select>
          {caseStatuses.map((caseStatus: CaseStatus) => (
            <Select.Option value={caseStatus} key={caseStatus}>
              {t(`case.into.status.${caseStatus}`)}
            </Select.Option>
          ))}
        </Select>
      )
    );
  };

  const initialValues = data && {
    caseNumber: data.id,
    caseType: CaseType[data.type.toUpperCase()],
    clientName: data.client.name,
    appraiser: undefined,
    createdAt: dayjs(data.createdAt, dateFormat),
    status: CaseStatus[data.status.toUpperCase()],
  };

  const generalInfo = () => {
    const labels: string[] = [
      'caseNumber',
      'caseType',
      'clientName',
      'appraiser',
      'createdAt',
      'status',
    ];

    return (
      <>
        {labels.map((label: string) => {
          return (
            <Form.Item label={t(`case.into.${label}`)} name={label} key={label}>
              {label === 'createdAt' ? (
                <DatePicker format={dateFormat} />
              ) : label === 'caseType' ? (
                caseTypeDropdown()
              ) : label === 'status' ? (
                caseStatusDropdown()
              ) : (
                <Input />
              )}
            </Form.Item>
          );
        })}
      </>
    );
  };

  const saveCaseChanges = async (values) => {
    setFormValues({
      caseType: values.caseType,
      clientName: values.clientName,
      createdAt: values.createdAt,
      status: values.status,
    });

    const caseInfo: ICaseInfo = formValues && {
      id: id,
      type: values.caseType,
      client: {
        name: values.clientName,
      },
      createdAt: values.createdAt.format(dateFormat),
      status: values.status,
    };

    try {
      await mutate(caseInfo);
    } catch (e) {
      console.log(e);
    }
  };

  const references = () => (
    <>
      <Form.Item label={t('case.into.claim-number')}>
        <Input />
      </Form.Item>
      <Form.Item label={t('case.into.policy-number')}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          // onClick={saveCaseChanges}
        >
          שמור שינויים
        </Button>
      </Form.Item>
    </>
  );

  return data ? (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={saveCaseChanges}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={8} flex="auto">
            <Card bordered={false}>{generalInfo()}</Card>
          </Col>
          <Col className="gutter-row" span={8} flex="auto">
            <Card bordered={false}>{references()}</Card>
          </Col>
        </Row>
      </Form>
    </>
  ) : null;
};

export default CaseInfo;
