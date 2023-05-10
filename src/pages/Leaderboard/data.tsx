import { Column } from 'react-table'

import { ReactComponent as IconPoints } from '../../assets/svg/icon-points.svg'
import { ReactComponent as IconPlace } from '../../assets/svg/position_generic.svg'

export type ColType = typeof COLS

export const FakeTableData = [
    { place: 1, name: 'asandeland0', points: 38 },
    { place: 2, name: 'jstyche1', points: 70 },
    { place: 3, name: 'cyirrell2', points: 88 },
    { place: 4, name: 'cbaudy3', points: 79 },
    { place: 5, name: 'cworswick4', points: 5 },
    { place: 6, name: 'dhartigan5', points: 85 },
    { place: 7, name: 'jrymill6', points: 14 },
    { place: 8, name: 'rtooby7', points: 49 },
    { place: 9, name: 'ykorlat8', points: 14 },
    { place: 10, name: 'jdevere9', points: 11 },
]

export type TableDataType = typeof FakeTableData[0]

export const COLS: Column<TableDataType>[] = [
    {
        Header: 'Place',
        accessor: 'place',
        Cell: ({ value }) => {
            return (
                <span className="iflex wrap-item-cell">
                    <IconPlace /> {value}
                </span>
            )
        },
    },
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Points',
        accessor: 'points',
        Cell: ({ value }) => {
            return (
                <span className="iflex wrap-item-cell">
                    <IconPoints /> {value}
                </span>
            )
        },
    },
]
