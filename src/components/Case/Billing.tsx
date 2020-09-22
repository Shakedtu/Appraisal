import React, { FunctionComponent } from 'react';
import { CaseMenuTabs } from './CaseMenu/CaseMenu';
import { Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { ICase } from '../../types/types';

const Billing: FunctionComponent<{ data: ICase }> = ({ data }) => {
  const { payments } = data;
  const { t } = useTranslation();
  return (
    <>
      <Card>
        <p>{t('case.menu.item.bill-info')}</p>
      </Card>
    </>
  );
  // TODO:: loop over payments array
};

export default Billing;
