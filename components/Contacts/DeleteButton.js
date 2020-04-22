import React from 'react';
import Popconfirm from 'components/Feedback/Popconfirm';
import Button from 'components/uielements/button';
import notification from 'components/Notification';

export default function({ contact, deleteContact }) {
  let name = '';
  if (contact.firstName) {
    name = `${contact.firstName} `;
  }
  if (contact.lastName) {
    name = `${name}${contact.lastName}`;
  }
  if (!name) {
    name = 'No Name';
  }
  return (
    <Popconfirm
      title={`Sure to delete ${name}?`}
      okText="DELETE"
      cancelText="No"
      onConfirm={() => {
        notification('error', `${name} Deleted`, '');
        deleteContact(contact.id);
      }}
    >
      <Button icon="close" type="default" className="isoDeleteBtn" />
    </Popconfirm>
  );
}
