import React, { useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const ConfirmRedeemDialog = ({ visible, onHide, itemRequested, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  const handleConfirm = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onSuccess();
      toast.current.show({
        severity: 'success',
        summary: 'Success',
        detail: `${itemRequested.title} redeemed successfully!`,
        life: 3000
      });
    }, 1500);
  };

  const footerContent = (
    <div>
      <Button 
        label="Cancel" 
        icon="pi pi-times" 
        className="p-button-text" 
        onClick={onHide} 
      />
      <Button 
        label={loading ? 'Processing...' : 'Confirm Redemption'} 
        icon="pi pi-check" 
        onClick={handleConfirm} 
        disabled={loading}
        loading={loading}
      />
    </div>
  );

  return (
    <>
      <Toast ref={toast} position="top-center" />
      <Dialog 
        header="Confirm Redemption" 
        visible={visible} 
        style={{ width: '40vw' }} 
        onHide={onHide}
        footer={footerContent}
      >
        <div className="p-fluid">
          <div className="flex align-items-center gap-4 mb-4">
            <img 
              src={itemRequested.images?.[0] || '/noimage.png'} 
              alt={itemRequested.title} 
              className="w-6rem h-6rem border-round shadow-2" 
            />
            <div>
              <h4 className="m-0">{itemRequested.title}</h4>
              <p className="text-sm text-gray-600 m-0">{itemRequested.category}</p>
            </div>
          </div>

          <div className="grid">
            <div className="col-6">
              <p className="font-semibold">Required Points:</p>
              <div className="flex align-items-center gap-2">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/649/649972.png" 
                  alt="coin" 
                  width="24" 
                  height="24" 
                />
                <span className="text-xl font-bold">{itemRequested.points}</span>
              </div>
            </div>
            <div className="col-6">
              <p className="font-semibold">Your Points:</p>
              <div className="flex align-items-center gap-2">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/649/649972.png" 
                  alt="coin" 
                  width="24" 
                  height="24" 
                />
                <span className="text-xl font-bold">150</span> {/* Static value for demo */}
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 border-round surface-100">
            <p className="font-semibold">After redemption:</p>
            <div className="flex align-items-center gap-2">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/649/649972.png" 
                alt="coin" 
                width="20" 
                height="20" 
              />
              <span>Your remaining points: {150 - itemRequested.points}</span>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ConfirmRedeemDialog;