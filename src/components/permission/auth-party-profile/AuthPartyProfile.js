import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CInputGroup,
    CFormCheck,
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

function AuthPartyProfile() {
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
                        <strong>Manage Authorize Party Profiles</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm
                            className="row gx-3 gy-2 align-items-center"
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                        >
                            <CCol sm={4}>
                                <CFormLabel htmlFor="specificSizeSelect">Authorize Party</CFormLabel>
                                <CFormSelect id="specificSizeSelect" style={{ cursor: 'pointer' }} required>
                                    <option value="-1">Select an authorize party</option>
                                </CFormSelect>
                                <CFormFeedback tooltip invalid>
                                    Please select an authorize party.
                                </CFormFeedback>
                            </CCol>
                            <CCol sm={4}>
                                <CFormLabel htmlFor="specificSizeSelect">Authorize Party Role</CFormLabel>
                                <CInputGroup>
                                    <CFormCheck
                                        type="checkbox"
                                        id="autoSizingCheck2"
                                        label="Verified"
                                        style={{ cursor: 'pointer' }}
                                    />{' '}
                                    &nbsp;&nbsp;
                                    <CFormCheck
                                        type="checkbox"
                                        id="autoSizingCheck2"
                                        label="Verified"
                                        style={{ cursor: 'pointer' }}
                                    />
                                </CInputGroup>
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
                            <CTableHeaderCell scope="col">Party</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Roles</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell>Mark</CTableDataCell>
                            <CTableDataCell>@mdo, @mdo , @mdo, @mdo</CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
            </CCol>
        </CRow>
    )
}

export default AuthPartyProfile