import React, { useState } from 'react'
import './UserRole.css'
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
    CTableHeaderCell,
    CTableHead,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableRow,
} from '@coreui/react'

function UserRole() {
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
                        <strong>Manage User Roles</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm
                            className="row gx-3 gy-2 align-items-center"
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                        >
                            <CCol sm={4}>
                                <CFormLabel htmlFor="specificSizeInputName">Role</CFormLabel>
                                <CFormInput id="specificSizeInputName" placeholder="First Name" required />
                                <CFormFeedback tooltip invalid>
                                    Please provide a role.
                                </CFormFeedback>
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
                            <CCol sm={4}>
                                <CFormLabel htmlFor="specificSizeSelect">Application Scope</CFormLabel>
                                <CFormSelect id="specificSizeSelect" style={{ cursor: 'pointer' }} required>
                                    <option value="-1">Select an application scope</option>
                                </CFormSelect>
                                <CFormFeedback tooltip invalid>
                                    Please select an application scope.
                                </CFormFeedback>
                            </CCol>
                            <CCol xs={11} />
                            <CCol xs="auto" style={{ marginTop: '20px' }}>
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

export default UserRole
