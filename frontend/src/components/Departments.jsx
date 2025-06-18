import React, { useState, useEffect } from 'react';
import {
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CSpinner,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CButton,
  CAlert,
  CForm,
  CFormInput,
  CFormSelect,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react';
import { cilPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newDept, setNewDept] = useState({
    department_name: '',
    department_head_id: '',
    description: '',
    contact_email: '',
    contact_phone: '',
    building_name: '',
    campus_map_location: '',
  });
  const [editDept, setEditDept] = useState(null);
  const [visible, setVisible] = useState(false);
  const port = process.env.REACT_APP_API_PORT || 3000;

  useEffect(() => {
    fetchDepartments();
  }, [port]);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:${port}/departments`);
      setDepartments(response.data.data);
    } catch (err) {
      setError('Failed to fetch departments');
      console.error('Error fetching departments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editDept) {
      setEditDept({ ...editDept, [name]: value });
    } else {
      setNewDept({ ...newDept, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editDept ? `http://localhost:${port}/departments/${editDept.department_id}` : `http://localhost:${port}/departments`;
      const method = editDept ? 'put' : 'post';
      const response = await axios[method](url, editDept || newDept);
      fetchDepartments();
      setNewDept({ department_name: '', department_head_id: '', description: '', contact_email: '', contact_phone: '', building_name: '', campus_map_location: '' });
      setEditDept(null);
      setVisible(false);
    } catch (err) {
      console.error(`Error ${editDept ? 'updating' : 'creating'} department:`, err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:${port}/departments/${id}`);
      fetchDepartments();
    } catch (err) {
      console.error('Error deleting department:', err);
    }
  };

  if (loading) return <CSpinner color="primary" />;
  if (error) return <CAlert color="danger">{error}</CAlert>;

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <h4>Departments</h4>
          <CButton color="primary" onClick={() => setVisible(true)}>
            <CIcon icon={cilPlus} /> Add Department
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Head ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                <CTableHeaderCell scope="col">Building</CTableHeaderCell>
                <CTableHeaderCell scope="col">Map Location</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created At</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {departments.map((dept) => (
                <CTableRow key={dept.department_id}>
                  <CTableDataCell>{dept.department_id}</CTableDataCell>
                  <CTableDataCell>{dept.department_name}</CTableDataCell>
                  <CTableDataCell>{dept.department_head_id}</CTableDataCell>
                  <CTableDataCell>{dept.description}</CTableDataCell>
                  <CTableDataCell>{dept.contact_email}</CTableDataCell>
                  <CTableDataCell>{dept.contact_phone}</CTableDataCell>
                  <CTableDataCell>{dept.building_name}</CTableDataCell>
                  <CTableDataCell>{dept.campus_map_location}</CTableDataCell>
                  <CTableDataCell>{new Date(dept.created_at).toLocaleDateString()}</CTableDataCell>
                  <CTableDataCell>
                    <CDropdown>
                      <CDropdownToggle color="secondary">Actions</CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem onClick={() => {
                          setEditDept(dept);
                          setVisible(true);
                        }}>Edit</CDropdownItem>
                        <CDropdownItem onClick={() => handleDelete(dept.department_id)}>Delete</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      <CModal visible={visible} onClose={() => { setVisible(false); setEditDept(null); }}>
        <CModalHeader>
          <CModalTitle>{editDept ? 'Edit Department' : 'Add Department'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit}>
            <CFormInput
              type="text"
              name="department_name"
              value={editDept?.department_name || newDept.department_name}
              onChange={handleInputChange}
              placeholder="Department Name"
              required
            />
            <CFormInput
              type="number"
              name="department_head_id"
              value={editDept?.department_head_id || newDept.department_head_id}
              onChange={handleInputChange}
              placeholder="Head ID"
              required
            />
            <CFormInput
              type="text"
              name="description"
              value={editDept?.description || newDept.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
            <CFormInput
              type="email"
              name="contact_email"
              value={editDept?.contact_email || newDept.contact_email}
              onChange={handleInputChange}
              placeholder="Contact Email"
              required
            />
            <CFormInput
              type="tel"
              name="contact_phone"
              value={editDept?.contact_phone || newDept.contact_phone}
              onChange={handleInputChange}
              placeholder="Contact Phone"
              required
            />
            <CFormInput
              type="text"
              name="building_name"
              value={editDept?.building_name || newDept.building_name}
              onChange={handleInputChange}
              placeholder="Building Name"
              required
            />
            <CFormInput
              type="text"
              name="campus_map_location"
              value={editDept?.campus_map_location || newDept.campus_map_location}
              onChange={handleInputChange}
              placeholder="Campus Map Location"
            />
            <CButton color="primary" type="submit" className="mt-3">
              {editDept ? 'Update' : 'Save'}
            </CButton>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>Close</CButton>
        </CModalFooter>
      </CModal>
    </CCol>
  );
};

export default Departments;