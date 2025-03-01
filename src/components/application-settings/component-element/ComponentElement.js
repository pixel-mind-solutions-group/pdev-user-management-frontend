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
  CTableRow,
  CFormSelect,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHeaderCell,
  CTableHead,
} from '@coreui/react'

function ComponentElement() {
  const [validated, setValidated] = useState(false)
  const [formFields, setFormFields] = useState([{ id: 1 }])

  const handleFormFields = () => {
    setFormFields([...formFields, { id: Date.now() }])
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
            <strong>Manage Component Elements</strong>
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
                <CFormLabel>Module</CFormLabel>
                <CFormSelect style={{ cursor: 'pointer' }} required>
                  <option value="-1">Select a module</option>
                </CFormSelect>
                <CFormFeedback tooltip invalid>
                  Please select a module.
                </CFormFeedback>
              </CCol>
              <CCol sm={4}>
                <CFormLabel>Component</CFormLabel>
                <CFormSelect style={{ cursor: 'pointer' }} required>
                  <option value="-1">Select a component</option>
                </CFormSelect>
                <CFormFeedback tooltip invalid>
                  Please select a component.
                </CFormFeedback>
              </CCol>

              <div className="w-100"></div>

              <CCol sm={3}>
                <CFormLabel>Key Name</CFormLabel>
              </CCol>
              <CCol sm={3}>
                <CFormLabel>Element Name</CFormLabel>
              </CCol>
              <CCol sm={3}>
                <CFormLabel>Status</CFormLabel>
              </CCol>
              <CCol sm={1}></CCol>

              {formFields.map((field) => (
                <React.Fragment key={field.id}>
                  <CCol sm={3}>
                    <CFormInput id="specificSizeInputName" placeholder="Key name" required />
                    <CFormFeedback tooltip invalid>
                      Please provide a key name.
                    </CFormFeedback>
                  </CCol>
                  <CCol sm={3}>
                    <CFormInput id="specificSizeInputName" placeholder="Element Name" required />
                    <CFormFeedback tooltip invalid>
                      Please provide a name.
                    </CFormFeedback>
                  </CCol>

                  <CCol sm={3}>
                    <CFormSelect id="specificSizeSelect" style={{ cursor: 'pointer' }} required>
                      <option value="-1">Select a status</option>
                      <option value="Active">Active</option>
                      <option value="In_active">In-active</option>
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
                        onClick={() => {
                          handleRemoveFields(field.id)
                        }}
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
                    onClick={handleFormFields}
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
              <CTableHeaderCell scope="col">Key</CTableHeaderCell>
              <CTableHeaderCell scope="col">Element</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>Mark</CTableDataCell>
              <CTableDataCell>Mark</CTableDataCell>
              <CTableDataCell>Mark</CTableDataCell>
              <CTableDataCell>Otto</CTableDataCell>
              <CTableDataCell>@mdo</CTableDataCell>
              <CTableDataCell>Mark</CTableDataCell>
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

export default ComponentElement
