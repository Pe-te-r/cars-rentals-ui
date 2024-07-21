// SmallToast.js
import React from 'react';

interface SmallToastProps {
  toasts: any[];
}

const SmallToast: React.FC<SmallToastProps> = ({ toasts }) => {
  return (
    <div className="toast toast-end">
      {toasts.map(toast => (
        <div key={toast.id} className={`alert alert-${toast.type}`}>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

export default SmallToast;
