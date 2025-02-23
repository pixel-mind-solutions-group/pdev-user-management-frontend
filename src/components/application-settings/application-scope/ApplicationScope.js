import React, { useEffect, useState, useRef } from 'react'
import Swal from 'sweetalert2'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormFeedback,
  CRow,
  CTableRow,
  CFormSelect,
  CTable,
  CTableBody,
  CTableDataCell,
  CInputGroup,
  CTableHeaderCell,
  CTableHead,
} from '@coreui/react'
import { getAll, createOrUpdate } from '../../../service/application-scope/ApplicationScopeService'

const ApplicationScope = () => {
  const [validated, setValidated] = useState(false)
  const [applicationScopes, setApplicationScopes] = useState([])
  const [formData, setFormData] = useState({
    applicationScopeId: '',
    scope: '',
    status: '-1',
    uniqueId: '',
  })
  const statusRef = useRef(null)

  useEffect(() => {
    getAllAppScopes()
  }, [])

  const getAllAppScopes = async () => {
    try {
      const data = await getAll()
      if (data.status == 'OK') {
        setApplicationScopes(data.data)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message,
        })
      }
    } catch (error) {
      console.error('Error occuring while calling user service to fetch all scopes. ', error)
      Swal.fire({
        icon: 'error',
        title: 'Internal Server Error',
        text: 'Application scopes fetching failed.',
      })
    }
  }

  const handleSubmit = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else {
      try {
        const data = await createOrUpdate(formData)
        if (data.status == 'OK') {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: data.message,
          })
          getAllAppScopes()
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.message,
          })
        }
      } catch (error) {
        console.error('Error occuring while creating scope. ', error)
        Swal.fire({
          icon: 'error',
          title: 'Internal Server Error',
          text: 'Application scope creation failed.',
        })
      }
    }
  }

  const handleFormChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Manage Application Scope</strong>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row gx-3 gy-2 align-items-center"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol sm={4}>
                <CFormLabel htmlFor="specificSizeInputName">Scope</CFormLabel>
                <CFormInput
                  id="scope"
                  placeholder="Scope"
                  value={formData.scope}
                  onChange={handleFormChange}
                  required
                />
                <CFormFeedback tooltip invalid>
                  Please provide a scope.
                </CFormFeedback>
              </CCol>
              <CCol sm={4}>
                <CFormLabel htmlFor="uniqueId">Unique ID</CFormLabel>
                <CInputGroup>
                  <CFormInput
                    id="uniqueId"
                    placeholder="Unique ID"
                    value={formData.uniqueId}
                    disabled
                  />
                  <CFormFeedback tooltip invalid>
                    Please provide a unique id.
                  </CFormFeedback>
                </CInputGroup>
              </CCol>
              <CCol sm={4}>
                <CFormLabel htmlFor="status">Status</CFormLabel>
                <CFormSelect
                  id="status"
                  style={{ cursor: 'pointer' }}
                  value={formData.status}
                  onChange={handleFormChange}
                  ref={statusRef}
                  required
                >
                  <option value="-1">Select a status</option>
                  <option value="Active">Active</option>
                  <option value="In_active">In-active</option>
                </CFormSelect>
                <CFormFeedback tooltip invalid>
                  Please select a status.
                </CFormFeedback>
              </CCol>
              <CCol xs="auto" style={{ marginTop: '40px' }}>
                <CButton color="primary" type="submit">
                  Create
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CTable>
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell scope="col">No</CTableHeaderCell>
              <CTableHeaderCell scope="col">Scope</CTableHeaderCell>
              <CTableHeaderCell scope="col">Unique ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {applicationScopes.map((scope, index) => (
              <React.Fragment key={scope.applicationScopeId}>
                <CTableRow>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{scope.scope}</CTableDataCell>
                  <CTableDataCell>{scope.uniqueId}</CTableDataCell>
                  <CTableDataCell>{scope.status}</CTableDataCell>
                  <CTableDataCell>
                    <CButton type="button" className="btn btn-primary btn-sm">
                      <span style={{ color: 'white' }}>Edit</span>
                    </CButton>{' '}
                    &nbsp;
                    <CButton type="button" className="btn btn-danger btn-sm">
                      <span style={{ color: 'white' }}>Delete</span>
                    </CButton>{' '}
                  </CTableDataCell>
                </CTableRow>
              </React.Fragment>
            ))}
          </CTableBody>
        </CTable>
      </CCol>
    </CRow>
  )
}
export default ApplicationScope
