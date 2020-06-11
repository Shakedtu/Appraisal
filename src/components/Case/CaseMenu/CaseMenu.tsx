import React, { FunctionComponent } from 'react';
import { Menu, PageHeader } from 'antd';
import { SolutionOutlined, BankOutlined, FileOutlined } from '@ant-design/icons'
import { useTranslation } from "react-i18next";
import './CaseMenu.scss'

const CaseMenu: FunctionComponent = () => {
    const { t } = useTranslation()
    return (
        <>
            <PageHeader
                className="site-page-header"
                onBack={() => null}
                title={t("case.header.title", {name: 'ישראלי אלי'})}
            />
            <Menu mode='horizontal'>
                <Menu.Item icon={<SolutionOutlined />} key='contactInfo'>
                    {t('case.menu.item.contact-info')}
                </Menu.Item>
                <Menu.Item icon={<SolutionOutlined />} key='moreInfo'>
                    {t('case.menu.item.more-info')}
                </Menu.Item>
                <Menu.Item icon={<BankOutlined />} key='billInfo'>
                    {t('case.menu.item.bill-info')}
                </Menu.Item>
                <Menu.Item icon={<FileOutlined />} key='documents'>
                    {t('case.menu.item.documents')}
                </Menu.Item>
            </Menu>
        </>
    )
}

export default CaseMenu;