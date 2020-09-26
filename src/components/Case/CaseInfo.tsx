import React, { FunctionComponent } from 'react';
import { CaseMenuTabs } from './CaseMenu/CaseMenu';
import { Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { ICase, CaseType, CaseStatus } from '../../types/types';

const CaseInfo: FunctionComponent<{ data: ICase }> = ({ data }) => {
  const { type, status, createdAt } = data;
  const { t } = useTranslation();
  return (
    <>
      <Card>
        <p>
          {t(`case-table.buttons.new-case.case-type`)}: {type}
        </p>
        <p>
          {t(`case-table.buttons.new-case.case-status`)}: {status}
        </p>
        <p>
          {t(`file-table.header.column.openDate`)}: {createdAt}
        </p>
      </Card>
    </>
  );
};

export default CaseInfo;
