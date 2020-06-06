import React from 'react';
import { Table } from 'antd';
import {useTranslation} from "react-i18next";


const FileTable: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const columnsKeys = ['id', 'insurer','status', 'openDate', 'clientName'];
    const columns = columnsKeys.map(column => ({
        key: column,
        indexKey: column,
        title: t(`file-table.header.column.${column}`)
    }))
    const data = [{
        id: '1',
        insurer: 'מבוטח 1',
        status: 'פתוח',
        openDate: '22/10/2019',
        clientName: 'מנורה'
    }]
    return (
        <Table
            columns={columns}
            dataSource={data}
        />
    )

}

export default FileTable;