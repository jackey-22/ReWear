import React, { useEffect, useState } from 'react';
import { fetchGet } from '../../utils/fetch.utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const IncomingSwapRequests = () => {
  const token = localStorage.getItem('token');
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadIncoming();
  }, []);

  const loadIncoming = async () => {
    const res = await fetchGet({ pathName: 'user/incoming-requests', token });
    if (res?.requests) {
      setRequests(res.requests);
    }
  };

  const itemTitle = (rowData, field) => rowData[field]?.title || '—';

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Incoming Swap Requests</h2>
      <DataTable value={requests} paginator rows={5} responsiveLayout="scroll">
        <Column header="#" body={(data, options) => options.rowIndex + 1} />
        <Column field="method" header="Method" />
        <Column field="status" header="Status" />
        <Column header="Requested By" body={(row) => row.requestedById?.name || '—'} />
        <Column
          header="Item Requested"
          body={(row) => itemTitle(row, 'itemRequestedId')}
        />
        <Column
          header="Offered Item"
          body={(row) => itemTitle(row, 'offeredItemId')}
        />
      </DataTable>
    </div>
  );
};

export default IncomingSwapRequests;
