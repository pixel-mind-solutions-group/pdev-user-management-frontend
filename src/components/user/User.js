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
  CFormCheck,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'

const User = () => {
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Manage Users</strong>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row gx-3 gy-2 align-items-center"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol sm={4}>
                <CFormLabel htmlFor="specificSizeInputName">First Name</CFormLabel>
                <CFormInput id="specificSizeInputName" placeholder="First Name" required />
                <CFormFeedback tooltip invalid>
                  Please provide a first name.
                </CFormFeedback>
              </CCol>
              <CCol sm={4}>
                <CFormLabel htmlFor="specificSizeInputGroupUsername">Last Name</CFormLabel>
                <CInputGroup>
                  <CFormInput
                    id="specificSizeInputGroupUsername"
                    placeholder="Last Name"
                    required
                  />
                  <CFormFeedback tooltip invalid>
                    Please provide a last name.
                  </CFormFeedback>
                </CInputGroup>
              </CCol>
              <CCol sm={4}>
                <CFormLabel htmlFor="specificSizeInputGroupUsername">User Name</CFormLabel>
                <CInputGroup className="has-validation">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput
                    id="specificSizeInputGroupUsername"
                    placeholder="User Name"
                    required
                  />
                  <CFormFeedback tooltip invalid>
                    Please provide a user name.
                  </CFormFeedback>
                </CInputGroup>
              </CCol>
              <CCol sm={4}>
                <CFormLabel htmlFor="specificSizeInputGroupUsername">Email</CFormLabel>
                <CInputGroup>
                  <CFormInput id="specificSizeInputGroupUsername" placeholder="Email" required />
                  <CFormFeedback tooltip invalid>
                    Please provide an email.
                  </CFormFeedback>
                </CInputGroup>
              </CCol>
              <CCol sm={4}>
                <CFormLabel htmlFor="specificSizeSelect">Status</CFormLabel>
                <CFormSelect id="specificSizeSelect" style={{ cursor: 'pointer' }} required>
                  <option value="-1">Select a status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="IN-ACTIVE">In-active</option>
                </CFormSelect>
                <CFormFeedback tooltip invalid>
                  Please select a status.
                </CFormFeedback>
              </CCol>
              <CCol sm={2}>
                <CFormLabel htmlFor="specificSizeInputGroupUsername">Email verification</CFormLabel>
                <CInputGroup>
                  <CFormCheck
                    type="checkbox"
                    id="autoSizingCheck2"
                    label="Verified"
                    style={{ cursor: 'pointer' }}
                  />
                </CInputGroup>
              </CCol>
              <CCol sm={2}>
                <CFormLabel htmlFor="specificSizeInputGroupUsername">Lock user account</CFormLabel>
                <CInputGroup>
                  <CFormCheck
                    type="checkbox"
                    id="autoSizingCheck2"
                    label="Locked"
                    style={{ cursor: 'pointer' }}
                  />
                </CInputGroup>
              </CCol>
              <CCol xs="auto" style={{ marginTop: '40px' }}>
                <CButton color="primary" type="submit">
                  Submit
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
