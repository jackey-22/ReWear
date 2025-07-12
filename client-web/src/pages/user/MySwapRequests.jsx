import React, { useEffect, useState } from 'react';
import { fetchGet } from '../../utils/fetch.utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const MySwapRequests = () => {
  const token = localStorage.getItem('token');
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    const res = await fetchGet({ pathName: 'user/profile', token });
    if (res?.swaps) {
      setRequests(res.swaps);
    }
  };

  const itemTemplate = (rowData, field) => rowData[field]?.title || '—';

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">My Swap Requests</h2>
      <DataTable value={requests} paginator rows={5} responsiveLayout="scroll">
        <Column header="#" body={(data, options) => options.rowIndex + 1} />
        <Column field="method" header="Method" />
        <Column field="status" header="Status" />
        <Column
          header="Requested Item"
          body={(rowData) => itemTemplate(rowData, 'itemRequestedId')}
        />
        <Column
          header="Offered Item"
          body={(rowData) => itemTemplate(rowData, 'offeredItemId')}
        />
        <Column field="usedPoints" header="Points Used" />
      </DataTable>
    </div>
  );
};

export default MySwapRequests;
