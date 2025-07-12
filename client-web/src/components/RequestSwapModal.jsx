import React, { useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const RequestSwapModal = ({ item, userItems, onHide, onSuccess }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const toast = useRef(null);

  const handleConfirm = () => {
    if (!selectedItem) {
      toast.current.show({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please select an item to swap',
        life: 3000
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setConfirmed(true);
      
      // Show success message in parent component after 2 seconds
      setTimeout(() => {
        onSuccess();
        onHide();
      }, 2000);
    }, 1500);
  };

  const footerContent = (
    <div>
      <Button 
        label="Cancel" 
        icon="pi pi-times" 
        className="p-button-text" 
        onClick={onHide} 
        disabled={loading || confirmed}
      />
      {!confirmed && (
        <Button 
          label={loading ? 'Processing...' : 'Confirm Swap'} 
          icon="pi pi-check" 
          onClick={handleConfirm} 
          disabled={loading}
          loading={loading}
        />
      )}
    </div>
  );

  return (
    <>
      <Toast ref={toast} position="top-center" />
      <Dialog 
        header={`Swap Request for ${item.title}`} 
        visible={true} 
        style={{ width: '50vw' }} 
        onHide={onHide}
        footer={footerContent}
        closable={!loading && !confirmed}
      >
        <div className="p-fluid">
          {!confirmed ? (
            <>
              <h4>Select an item to offer in exchange:</h4>
              
              <div className="grid mt-3">
                {userItems.map(item => (
                  <div 
                    key={item._id} 
                    className={`col-12 md:col-6 p-3 border-round cursor-pointer 
                      ${selectedItem?._id === item._id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                    onClick={() => !loading && setSelectedItem(item)}
                  >
                    <div className="flex align-items-center gap-3">
                      <img 
                        src={item.images?.[0] || '/noimage.png'} 
                        alt={item.title} 
                        className="w-3rem h-3rem border-round" 
                      />
                      <div>
                        <h5 className="m-0">{item.title}</h5>
                        <p className="text-sm text-gray-600 m-0">Condition: {item.condition}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedItem && (
                <div className="mt-4 p-3 border-round surface-100">
                  <h5>Swap Summary</h5>
                  <div className="flex justify-content-between">
                    <div>
                      <p className="font-semibold">You will receive:</p>
                      <p>{item.title}</p>
                    </div>
                    <i className="pi pi-arrow-right align-self-center mx-4" />
                    <div>
                      <p className="font-semibold">You will give:</p>
                      <p>{selectedItem.title}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center p-5">
              <i className="pi pi-check-circle text-6xl text-green-500 mb-4" />
              <h3 className="text-green-500">Swap Request Confirmed!</h3>
              <p>Your request to swap {selectedItem.title} for {item.title} has been submitted.</p>
              <p>The owner will review your request shortly.</p>
            </div>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default RequestSwapModal;