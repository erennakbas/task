import { DataTableValueArray } from 'primereact/datatable'
import React from 'react'

interface UserSelectionsProps {
    selectedUsers: DataTableValueArray | undefined;
  }

const UserSelections: React.FC<UserSelectionsProps> = ({ selectedUsers }) => {
  return (
        <ul>
            {selectedUsers?.map(u=>
                (<li key={u.id}>
                        {u.id}
                </li>)
            )}
        </ul>
     
  )
}

export default UserSelections