"use client";
import React, { useState, useEffect} from 'react';
import { DataTable, DataTablePageEvent, DataTableSortEvent} from 'primereact/datatable';
import { Column } from 'primereact/column';
import { DataTableValueArray } from 'primereact/datatable';
import UserService from '../../services/UserService'
import UserSelections from '../components/UserSelections';
interface UsersProps {}

interface TableState {
    first: number;
    rows: number;
    page: number;
    sortField: string;
    sortOrder: 1 | 0 | -1 | null | undefined;
}

const Users: React.FC<UsersProps> = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [totalRecords, setTotalRecords] = useState<number>();
    const [users, setUsers] = useState<DataTableValueArray | undefined>();
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [selectedUsers, setSelectedUsers] = useState<DataTableValueArray | undefined>(undefined);
    const [tableState, setTableState] = useState<TableState>({
        first: 1,
        rows: 10,
        page: 0,
        sortField: '',
        sortOrder: null
    });
    
    const onPage = (event: DataTablePageEvent) => {
        setTableState((prevTableState) => ({
            ...prevTableState,
            first: event.first,
            page: event.page || 1,
            rows: event.rows,
        }));
    };

    const onSort = (event: DataTableSortEvent) => {
        setTableState((prevTableState) => ({
            ...prevTableState,
            sortField: event.sortField,
            sortOrder: event.sortOrder,
        }));
    };

    const onSelectionChange = (event: any) => {
        const value = event.value;
        setSelectedUsers(value);
        setSelectAll(value.length === users?.length);
    };

    const onSelectAllChange = (event: any) => {        
        const selectAll = event.checked;
        if (selectAll) {
            setSelectAll(true);
            setSelectedUsers(users);

        } else {
            setSelectAll(false);
            setSelectedUsers([]);
        }
    };
    const handleGetRequest = async () => { //logic for setting related states on get request. 
        try {
          setLoading(true); 
          const res = await UserService.getAll(tableState);
          setUsers(res.users);
          if (selectAll) setSelectedUsers(res.users); //if selectAll button is clicked then set selected users based on the new users coming from the request
          setTotalRecords(res.total);
        } catch (error) {
          alert('An error happened while fetching the data');
          console.error(error);

        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
        handleGetRequest(); //on each state change send a request to server.
    }, [tableState]);
    
    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <DataTable
                value={users}
                filterDisplay="menu"
                dataKey="id"
                lazy
                paginator
                first={tableState.first}
                rows={10}
                totalRecords={totalRecords}
                onPage={onPage}
                onSort={onSort}
                sortOrder={tableState.sortOrder}
                sortField={tableState.sortField}
                loading={loading}
                tableStyle={{ minWidth: '75rem' }}
                selection={selectedUsers}
                onSelectionChange={onSelectionChange}
                selectAll={selectAll}
                onSelectAllChange={onSelectAllChange}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
                <Column field="id" header="ID" dataType="numeric" sortable />
                <Column field="firstName" sortable header="First Name" />
                <Column field="lastName" sortable header="Last Name" />
                <Column field="age" header="Age" sortable dataType="numeric"/>
            </DataTable>
            <div style={{ textAlign: 'left', width: '70%' }}>
                <UserSelections selectedUsers={selectedUsers}/>
            </div>
        </div>
    );
};

export default Users;