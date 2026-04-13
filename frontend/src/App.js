import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// 👉 API tương đối – để nginx / proxy xử lý
const API_BASE = process.env.REACT_APP_API_BASE || '';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/students`);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/api/students/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post(`${API_BASE}/api/students`, form);
      }
      setForm({ name: '', email: '' });
      fetchStudents();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const handleEdit = (student) => {
    setForm({
      name: student.name,
      email: student.email,
      age: student.age
    });
    setEditingId(student.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="App">
      <h1>Student Management</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />


        <button type="submit">
          {editingId ? 'Update' : 'Add'} Student
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ name: '', email: '' });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
