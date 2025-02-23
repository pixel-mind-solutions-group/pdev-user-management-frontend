import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CFormLabel,
  CFormFeedback,
  CRow,
  CFormCheck,
  CFormSelect,
  CTableHeaderCell,
  CTableHead,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
  CInputGroup,
} from '@coreui/react'

function AccessControl() {
  const [validated, setValidated] = useState(false)
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
            <strong>Manage Access Controls</strong>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row gx-3 gy-2 align-items-center"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol sm={4}>
                <CFormLabel htmlFor="specificSizeSelect">Application Scope</CFormLabel>
                <CFormSelect id="specificSizeSelect" style={{ cursor: 'pointer' }} required>
                  <option value="-1">Select an application scope</option>
                </CFormSelect>
                <CFormFeedback tooltip invalid>
                  Please select an application scope.
                </CFormFeedback>
              </CCol>
              <CCol sm={4}>
                <CFormLabel htmlFor="specificSizeSelect">User Role</CFormLabel>
                <CFormSelect id="specificSizeSelect" style={{ cursor: 'pointer' }} required>
                  <option value="-1">Select a user role</option>
                </CFormSelect>
                <CFormFeedback tooltip invalid>
                  Please select a user role.
                </CFormFeedback>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4" style={{ padding: '1em' }}>
          <CAccordion alwaysOpen activeItemKey={1}>
            <CAccordionItem itemKey={1}>
              <CAccordionHeader>Modules</CAccordionHeader>
              <CAccordionBody>
                <CCol sm={6}>
                  <CInputGroup>
                    <CFormCheck
                      type="checkbox"
                      id="autoSizingCheck2"
                      label="checkbox1"
                      style={{ cursor: 'pointer' }}
                    />{' '}
                    &nbsp;&nbsp;&nbsp;
                  </CInputGroup>
                </CCol>
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={2}>
              <CAccordionHeader>Components</CAccordionHeader>
              <CAccordionBody>
                <CCard className="mb-4">
                  <CCardHeader>
                    <span>Job Position Module</span>
                  </CCardHeader>
                  <CCardBody>
                    <CCol sm={6}>
                      <CInputGroup>
                        <CFormCheck
                          type="checkbox"
                          id="autoSizingCheck2"
                          label="checkbox2"
                          style={{ cursor: 'pointer' }}
                        />{' '}
                        &nbsp;&nbsp;&nbsp;
                      </CInputGroup>
                    </CCol>
                  </CCardBody>
                </CCard>
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={3}>
              <CAccordionHeader>Component Elements</CAccordionHeader>
              <CAccordionBody>
                <CCard className="mb-4">
                  <CCardHeader>
                    <span>Job Position Component</span>
                  </CCardHeader>
                  <CCardBody>
                    <CCol sm={6}>
                      <CInputGroup>
                        <CFormCheck
                          type="checkbox"
                          id="autoSizingCheck2"
                          label="checkbox2"
                          style={{ cursor: 'pointer' }}
                        />{' '}
                        &nbsp;&nbsp;&nbsp;
                      </CInputGroup>
                    </CCol>
                  </CCardBody>
                </CCard>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
          <br />
          <CCol xs={12} className="d-flex justify-content-end">
            <CButton color="primary" type="submit">
              Create
            </CButton>
          </CCol>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CTable>
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell scope="col">Role</CTableHeaderCell>
              <CTableHeaderCell scope="col">Application Scope</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>Mark</CTableDataCell>
              <CTableDataCell>Otto</CTableDataCell>
              <CTableDataCell>@mdo</CTableDataCell>
              <CTableDataCell>Mark</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCol>
    </CRow>
  )
}

export default AccessControl
