import React, { useEffect, useState } from 'react'
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
import Swal from 'sweetalert2'
import { getAllUserRolesByScope } from '../../../service/user-role/UserRoleService'
import { getAll as getAllAppScopes } from '../../../service/application-scope/ApplicationScopeService'
import { getByUUID as getModulesByUUID } from '../../../service/module/ModuleService'
import { getComponentsByScopeAndModules as getAllComponentsByScopeAndModules } from '../../../service/component/ComponentService'
import { getComponentElementsByScopeAndComponents as getAllComponentElementsByScopeAndComponents } from '../../../service/component-element/ComponentElementService'

function AccessControl() {
  const [userRoles, setUserRoles] = useState([])
  const [scopes, setScopes] = useState([])

  // Modules, Components, Component Elements
  const [modules, setModules] = useState([])
  const [selectedModules, setSelectedModules] = useState([])
  const [components, setComponents] = useState(new Map())
  const [selectedComponents, setSelectedComponents] = useState([])
  const [componentElements, setComponentElements] = useState(new Map())
  const [selectedComponentElements, setSelectedComponentElements] = useState([])

  useEffect(() => {
    getApplicationScopes()
  }, [])

  useEffect(() => {
    handleLoadComponentsByCheckedModules()
  }, [selectedModules])

  useEffect(() => {
    handleLoadComponentElementsByCheckedComponents()
  }, [selectedComponents])

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

  const getUserRolesByScope = async (e) => {
    try {
      const uuid = e.target.value
      if (uuid === '-1') {
        setUserRoles([])
        return
      }
      const data = await getAllUserRolesByScope(uuid)
      if (data.data.status === 'OK') {
        setUserRoles(data.data.data)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.data.message,
        })
      }
    } catch (error) {
      console.error(
        'Error occuring while calling user service to fetch active user roles by scope. ',
        error,
      )
      Swal.fire({
        icon: 'error',
        title: 'Internal Server Error',
        text: 'User roles fetching failed.',
      })
    }
  }

  const getApplicationScopes = async () => {
    try {
      const data = await getAllAppScopes()
      if (data.status == 'OK') {
        setScopes(data.data)
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

  const getAllModulesByUUID = async (e) => {
    try {
      const uuid = e.target.value
      if (uuid === '-1') {
        return
      }
      setModules([])
      setSelectedModules([])
      setComponents(new Map())
      setSelectedComponents([])
      setComponentElements(new Map())
      setSelectedComponentElements([])

      const data = await getModulesByUUID(uuid)
      if (data.data.status === 'OK') {
        setModules(data.data.data)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.data.message,
        })
      }
    } catch (error) {
      console.error('Error occuring while calling user service to fetch modules by scope. ', error)
      Swal.fire({
        icon: 'error',
        title: 'Internal Server Error',
        text: 'Modules fetching failed.',
      })
    }
  }

  const handleModuleCheck = (e) => {
    const moduleId = e.target.id.replace('module_', '')
    setSelectedModules((prevData) => {
      const updatedArr = [...prevData]
      const isAlreadySelected = updatedArr.includes(moduleId)

      if (isAlreadySelected) {
        // If it's already selected, remove it (uncheck)
        return updatedArr.filter((id) => id !== moduleId)
      } else {
        // Otherwise, add it to the array (check)
        updatedArr.push(moduleId)
        return updatedArr
      }
    })
  }

  const handleLoadComponentsByCheckedModules = async () => {
    if (selectedModules.length === 0) {
      return
    }
    const scope = document.getElementById('appScope').value
    const modules = selectedModules
    try {
      const data = await getAllComponentsByScopeAndModules(scope, modules)
      if (data.data.status === 'OK') {
        var mapObj = new Map()
        data.data.data.forEach((data) => {
          mapObj.set(data.module, data.components)
        })
        setComponents(mapObj)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.data.message,
        })
      }
    } catch (error) {
      console.error(
        'Error occuring while calling user service to fetch components by scope and modules. ',
        error,
      )
      Swal.fire({
        icon: 'error',
        title: 'Internal Server Error',
        text: 'Components fetching failed.',
      })
    }
  }

  const handleComponentCheck = (e) => {
    const componentId = e.target.id.replace('component_', '')
    setSelectedComponents((prevData) => {
      const updatedArr = [...prevData]
      const isAlreadySelected = updatedArr.includes(componentId)

      if (isAlreadySelected) {
        // If it's already selected, remove it (uncheck)
        return updatedArr.filter((id) => id !== componentId)
      } else {
        // Otherwise, add it to the array (check)
        updatedArr.push(componentId)
        return updatedArr
      }
    })
  }

  const handleLoadComponentElementsByCheckedComponents = async () => {
    if (selectedComponents.length === 0) {
      return
    }
    const scope = document.getElementById('appScope').value
    const components = selectedComponents
    try {
      const data = await getAllComponentElementsByScopeAndComponents(scope, components)
      if (data.data.status === 'OK') {
        console.log(data.data.data)
        var mapObj = new Map()
        data.data.data.forEach((data) => {
          mapObj.set(data.component, data.componentElements)
        })
        setComponentElements(mapObj)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.data.message,
        })
      }
    } catch (error) {
      console.error(
        'Error occuring while calling user service to fetch component elements by scope and components. ',
        error,
      )
      Swal.fire({
        icon: 'error',
        title: 'Internal Server Error',
        text: 'Component elements fetching failed.',
      })
    }
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
                <CFormSelect
                  id="appScope"
                  style={{ cursor: 'pointer' }}
                  required
                  onChange={() => {
                    getUserRolesByScope(event)
                    getAllModulesByUUID(event)
                  }}
                >
                  <option value="-1">Select an application scope</option>
                  {scopes.map((scope, index) => {
                    return (
                      <option key={index} value={scope.uniqueId}>
                        {scope.scope}
                      </option>
                    )
                  })}
                </CFormSelect>
                <CFormFeedback tooltip invalid>
                  Please select an application scope.
                </CFormFeedback>
              </CCol>
              <CCol sm={4}>
                <CFormLabel htmlFor="specificSizeSelect">User Role</CFormLabel>
                <CFormSelect id="userRole" style={{ cursor: 'pointer' }} required>
                  <option value="-1">Select a user role</option>
                  {userRoles.map((role, index) => {
                    return (
                      <option key={index} value={role.userRoleId}>
                        {role.role}
                      </option>
                    )
                  })}
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
                <CCol sm={14}>
                  <CInputGroup>
                    {modules.map((m) => (
                      <React.Fragment key={m.id}>
                        <div style={{ cursor: 'pointer', marginRight: '1rem' }}>
                          <CFormCheck
                            type="checkbox"
                            id={`module_` + m.id}
                            label={m.key}
                            style={{ cursor: 'pointer', marginRight: '0.2rem' }}
                            onChange={(e) => {
                              handleModuleCheck(e)
                            }}
                            checked={selectedModules.includes(m.id.toString())}
                          />{' '}
                        </div>
                      </React.Fragment>
                    ))}
                  </CInputGroup>
                </CCol>
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={2}>
              <CAccordionHeader>Components</CAccordionHeader>
              <CAccordionBody>
                <CCard className="mb-4">
                  {Array.from(components.entries()).map(([module, components], index) => {
                    return (
                      <React.Fragment key={index}>
                        <CCard>
                          <CCardHeader>
                            <span>{module.module}</span>
                          </CCardHeader>
                          <CCardBody>
                            <CCol sm={14}>
                              <CInputGroup>
                                {components.map((c) => {
                                  return (
                                    <React.Fragment key={c.component}>
                                      <div style={{ cursor: 'pointer', marginRight: '2rem' }}>
                                        <CFormCheck
                                          type="checkbox"
                                          id={`component_` + c.component}
                                          label={c.key}
                                          style={{ cursor: 'pointer' }}
                                          onChange={(e) => handleComponentCheck(e)}
                                          checked={selectedComponents.includes(
                                            c.component.toString(),
                                          )}
                                        />
                                      </div>
                                    </React.Fragment>
                                  )
                                })}
                              </CInputGroup>
                            </CCol>
                          </CCardBody>
                        </CCard>
                      </React.Fragment>
                    )
                  })}
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
