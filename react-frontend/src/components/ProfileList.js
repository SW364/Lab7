import React, { useState, useEffect } from 'react';
import { getProfiles, deleteProfile } from '../services/api';
import ProfileItem from './ProfileItem';
import ProfileForm from './ProfileForm';

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const data = await getProfiles();
      setProfiles(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los perfiles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este perfil?')) {
      try {
        await deleteProfile(id);
        setProfiles(profiles.filter(p => p.id !== id));
      } catch (err) {
        setError('Error al eliminar el perfil');
      }
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleFormSubmit = () => {
    fetchProfiles();
    setEditingId(null);
  };

  if (loading) return <div>Cargando perfiles...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="profile-list">
      <h2>Lista de Perfiles</h2>

      {!editingId && (
        <div className="new-profile">
          <h3>Agregar Nuevo Perfil</h3>
          <ProfileForm onSubmitSuccess={handleFormSubmit} />
        </div>
      )}

      <div className="profiles">
        {profiles.length === 0 ? (
          <p>No hay perfiles registrados.</p>
        ) : (
          profiles.map(profile => (
            <div key={profile.id}>
              {editingId === profile.id ? (
                <div className="edit-form">
                  <h3>Editar Perfil</h3>
                  <ProfileForm
                    profile={profile}
                    onSubmitSuccess={handleFormSubmit}
                    onCancel={handleCancelEdit}
                  />
                </div>
              ) : (
                <ProfileItem
                  profile={profile}
                  onDelete={() => handleDelete(profile.id)}
                  onEdit={() => handleEdit(profile.id)}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfileList;
