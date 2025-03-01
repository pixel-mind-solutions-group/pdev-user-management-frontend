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
import { getAll, createOrUpdate } from '../../../service/module/ModuleService'

const Module = () => {
  const [validated, setValidated] = useState(false)
  const [modules, setModules] = useState([])
  const [formData, setFormData] = useState({
    key: '',
    module: '',
    status: '',
    applicationScope: '',
  })

  const handleAddFields = () => {
    setFormFields([...formFields, { id: Date.now() }])
  }

  const handleRemoveFields = (id) => {
    setFormFields(formFields.filter((field) => field.id !== id))
  }

  useEffect(() => {
    getAllModules()
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
      if (data.status == 'OK') {
        setModules(data.data)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message,
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

              {modules.map((field) => (
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
              <CTableHeaderCell scope="col">Application Scope</CTableHeaderCell>
              <CTableHeaderCell scope="col">Key</CTableHeaderCell>
              <CTableHeaderCell scope="col">Module</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>Otto</CTableDataCell>
              <CTableDataCell>Otto</CTableDataCell>
              <CTableDataCell>Mark</CTableDataCell>
              <CTableDataCell>@mdo</CTableDataCell>
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
          </CTableBody>
        </CTable>
      </CCol>
    </CRow>
  )
}
export default Module
