import React, { useState } from 'react'
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
  CFormSelect,
  CTableHeaderCell,
  CTableHead,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
} from '@coreui/react'

function Component() {
  const [validated, setValidated] = useState(false)
  const [formFields, setFormFields] = useState([{ id: 1 }])

  const handleAddFields = () => {
    setFormFields([...formFields, { id: Date.now() }])
    console.log(formFields)
  }

  const handleRemoveFields = (id) => {
    setFormFields(formFields.filter((field) => field.id !== id))
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    const selects = form.querySelectorAll('select')
    selects.forEach((select) => {
      if (select.value === '-1') {
        select.setCustomValidity('Please select an option.')
      } else {
        select.setCustomValidity('')
      }
    })
    setValidated(true)
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Manage Components</strong>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row gx-3 gy-2 align-items-center"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol sm={4}>
                <CFormLabel>Application Scope</CFormLabel>
                <CFormSelect style={{ cursor: 'pointer' }} required>
                  <option value="-1">Select an application scope</option>
                </CFormSelect>
                <CFormFeedback tooltip invalid>
                  Please select an application scope.
                </CFormFeedback>
              </CCol>
              <CCol sm={4}>
                <CFormLabel>Module Name</CFormLabel>
                <CFormSelect style={{ cursor: 'pointer' }} required>
                  <option value="-1">Select a module</option>
                </CFormSelect>
                <CFormFeedback tooltip invalid>
                  Please select a module.
                </CFormFeedback>
              </CCol>

              <div className="w-100"></div>

              <CCol sm={7}>
                <CFormLabel>Component Name</CFormLabel>
              </CCol>
              <CCol sm={2}>
                <CFormLabel>Status</CFormLabel>
              </CCol>

              {formFields.map((field) => (
                <React.Fragment key={field.id}>
                  <CCol sm={7}>
                    <CFormInput
                      htmlFor={`specificSizeInputName-${field.id}`}
                      placeholder="Name"
                      required
                    />
                    <CFormFeedback tooltip invalid>
                      Please provide a name.
                    </CFormFeedback>
                  </CCol>
                  <CCol sm={3}>
                    <CFormSelect
                      htmlFor={`specificSizeInputName-${field.id}`}
                      style={{ cursor: 'pointer' }}
                      required
                    >
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
                  </CButton>
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
              <CTableHeaderCell scope="col">Module</CTableHeaderCell>
              <CTableHeaderCell scope="col">Component</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>Mark</CTableDataCell>
              <CTableDataCell>Otto</CTableDataCell>
              <CTableDataCell>Otto</CTableDataCell>
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

export default Component
