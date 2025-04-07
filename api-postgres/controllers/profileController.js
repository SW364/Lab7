const pool = require('../db');

// Obtener todos los perfiles
exports.getAllProfiles = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM profiles ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener perfiles' });
  }
};

// Obtener un perfil por ID
exports.getProfileById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM profiles WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Perfil no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
};

// Crear nuevo perfil
exports.createProfile = async (req, res) => {
  const { name, position, seniority, allocation_percent, email, password } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO profiles (name, position, seniority, allocation_percent, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, position, seniority, allocation_percent, email, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear perfil' });
  }
};

// Actualizar perfil
exports.updateProfile = async (req, res) => {
  const { name, position, seniority, allocation_percent } = req.body;
  const profileId = req.params.id;
  try {
    const result = await pool.query(
      'UPDATE profiles SET name = $1, position = $2, seniority = $3, allocation_percent = $4 WHERE id = $5 RETURNING *',
      [name, position, seniority, allocation_percent, profileId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
};

// Eliminar perfil
exports.deleteProfile = async (req, res) => {
  const profileId = req.params.id;
  try {
    await pool.query('DELETE FROM profiles WHERE id = $1', [profileId]);
    res.json({ message: 'Perfil eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar perfil' });
  }
};
