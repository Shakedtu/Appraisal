import React from 'react';
import { Table } from 'antd';
import {useTranslation} from "react-i18next";

interface TableData {
    id: string;
    insurer: string;
    status: string;
    openDate: string;
    clientName: string;
}

const FileTable: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const columnsKeys = ['id', 'insurer','status', 'openDate', 'clientName'];
    const columns = columnsKeys.map(column => ({
        title: t(`file-table.header.column.${column}`),
        dataIndex: column,
        key: column
    }))
    const data: TableData[] = [
        {
            id: '1',
            insurer: 'מבוטח כלשהו',
            status: 'פתוח',
            openDate: '22/10/2019',
            clientName: 'מנורה'
        },
        {
            id: '2',
            insurer: "עוד אחד",
            status: "סגור",
            openDate: '22/12/2001',
            clientName: 'מגדל'
        }
    ] //TODO: fetch real data

    return (
        <Table
            columns={columns}
            dataSource={data}
        />
    )

}

export default FileTable;