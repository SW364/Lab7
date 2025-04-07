import React, { useState, useEffect } from 'react';
import { createProfile, updateProfile } from '../services/api';

const ProfileForm = ({ profile, onSubmitSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    skills: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        fullname: profile.fullname || '',
        email: profile.email || '',
        skills: profile.skills || ''
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullname.trim()) {
      setError('El nombre completo es obligatorio');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      if (profile) {
        await updateProfile(profile.id, formData);
      } else {
        await createProfile(formData);
      }

      setFormData({ fullname: '', email: '', skills: '' });
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err) {
      setError('Error al guardar el perfil');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      {error && <div className="error">{error}</div>}

      <div className="form-group">
        <label htmlFor="fullname">Nombre completo*:</label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          disabled={submitting}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={submitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="skills">Habilidades:</label>
        <input
          type="text"
          id="skills"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          disabled={submitting}
        />
      </div>

      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? 'Guardando...' : profile ? 'Actualizar' : 'Crear'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={submitting}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
