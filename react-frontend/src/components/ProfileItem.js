import React from 'react';

const ProfileItem = ({ profile, onDelete, onEdit }) => {
  return (
    <div className="profile-item">
      <div className="profile-info">
        <h3>{profile.fullname}</h3>
        <p><strong>Email:</strong> {profile.email || 'No especificado'}</p>
        <p><strong>Habilidades:</strong> {profile.skills || 'No especificadas'}</p>
      </div>
      <div className="profile-actions">
        <button onClick={onEdit} className="edit-btn">Editar</button>
        <button onClick={onDelete} className="delete-btn">Eliminar</button>
      </div>
    </div>
  );
};

export default ProfileItem;
