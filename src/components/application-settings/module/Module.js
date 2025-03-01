import React, { useEffect, useState } from 'react'
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
  CTableHeaderCell,
  CTableHead,
} from '@coreui/react'
import Swal from 'sweetalert2'
import { getAll, createOrUpdate } from '../../../service/module/ModuleService'
import { getAll as getAllAppScopes } from '../../../service/application-scope/ApplicationScopeService'

const Module = () => {
  const [validated, setValidated] = useState(false)
  const [formModules, setFormModules] = useState([{ id: 1 }])
  const [modules, setModules] = useState([])
  const [applicationScopes, setApplicationScopes] = useState([])
  const [formData, setFormData] = useState({
    key: '',
    module: '',
    status: '',
    applicationScope: '',
  })

  const handleAddFields = () => {
    setFormModules([...formModules, { id: Date.now() }])
  }

  const handleRemoveFields = (id) => {
    setFormModules(formModules.filter((field) => field.id !== id))
  }

  useEffect(() => {
    getAllModules()
    getAllScopse()
  }, [])

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
        console.error('Error occuring while creating modules. ', error)
        Swal.fire({
          icon: 'error',
          title: 'Internal Server Error',
          text: 'Modules creation failed.',
        })
      }
    }
  }

  const getAllModules = async () => {
    try {
      const data = await getAll()
      if (data.data.status == 'OK') {
        setModules(data.data.data)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.data.message,
        })
      }
    } catch (error) {
      console.error('Error occuring while calling user service to fetch all modules. ', error)
      Swal.fire({
        icon: 'error',
        title: 'Internal Server Error',
        text: 'Modules fetching failed.',
      })
    }
  }

  const getAllScopse = async () => {
    try {
      const data = await getAllAppScopes()
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

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Manage Module</strong>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row gx-3 gy-2 align-items-center"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol sm={4}>
                <CFormLabel htmlFor="applicationScope">Application Scope</CFormLabel>
                <CFormSelect id="applicationScope" style={{ cursor: 'pointer' }} required>
                  <option value="-1">Select an application scope</option>
                  {applicationScopes.map((scope) => (
                    <option value={scope.id}>{scope.scope}</option>
                  ))}
                </CFormSelect>
                <CFormFeedback tooltip invalid>
                  Please select an scope.
                </CFormFeedback>
              </CCol>

              <div className="w-100"></div>

              <React.Fragment>
                <CCol sm={3}>
                  <CFormLabel>Key Name</CFormLabel>
                </CCol>
                <CCol sm={3}>
                  <CFormLabel>Module Name</CFormLabel>
                </CCol>
                <CCol sm={3}>
                  <CFormLabel>Status</CFormLabel>
                </CCol>
                <CCol sm={1}></CCol>
              </React.Fragment>

              {formModules.map((field) => (
                <React.Fragment key={field.id}>
                  <CCol sm={3}>
                    <CFormInput id="key" placeholder="Key name" required />
                    <CFormFeedback tooltip invalid>
                      Please provide a key name.
                    </CFormFeedback>
                  </CCol>
                  <CCol sm={3}>
                    <CFormInput id="module" placeholder="Module name" required />
                    <CFormFeedback tooltip invalid>
                      Please provide a module name.
                    </CFormFeedback>
                  </CCol>
                  <CCol sm={3}>
                    <CFormSelect id="status" style={{ cursor: 'pointer' }} required>
                      <option value="-1">Select a status</option>
                      <option value="ACTIVE">Active</option>
                      <option value="IN-ACTIVE">In-active</option>
                    </CFormSelect>
                    <CFormFeedback tooltip invalid>
                      Please select a status.
                    </CFormFeedback>
                  </CCol>
                  <CCol sm={1}>
                    <CCol xs="auto" style={{ marginTop: '0px' }}>
                      <CButton
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveFields(field.id)}
                      >
                        <strong style={{ color: 'white' }}>-</strong>
                      </CButton>
                    </CCol>
                  </CCol>
                </React.Fragment>
              ))}

              <CCol sm={1}>
                <CCol xs="auto" style={{ marginTop: '0px' }}>
                  <CButton
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={handleAddFields}
                  >
                    <strong style={{ color: 'white' }}>+</strong>
                  </CButton>{' '}
                </CCol>
              </CCol>

              <div className="w-100"></div>
              <CRow className="justify-content-end">
                <CCol xs="auto" style={{ marginTop: '30px' }}>
                  <CButton color="primary" type="submit">
                    Create
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CTable>
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell scope="col">No</CTableHeaderCell>
              <CTableHeaderCell scope="col">Application Scope</CTableHeaderCell>
              <CTableHeaderCell scope="col">Module</CTableHeaderCell>
              <CTableHeaderCell scope="col">Key</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {modules.map((module, index) => (
              <React.Fragment key={module.id}>
                <CTableRow>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{module.applicationScope}</CTableDataCell>
                  <CTableDataCell>{module.module}</CTableDataCell>
                  <CTableDataCell>{module.key}</CTableDataCell>
                  <CTableDataCell>{module.status}</CTableDataCell>
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
export default Module
