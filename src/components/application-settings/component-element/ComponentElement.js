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
import { getAll as getAppScopes } from '../../../service/application-scope/ApplicationScopeService'
import { getByUUID } from '../../../service/module/ModuleService'
import { getComponentsByScopeAndModule } from '../../../service/component/ComponentService'
import {
  getAllWithPagination,
  createOrUpdate,
} from '../../../service/component-element/ComponentElementService'
import Swal from 'sweetalert2'
import Pagination from '../../UI/pagination/Pagination'

function ComponentElement() {
  // dynamic form fields
  const [formComponentElements, setFormComponentElements] = useState([{ id: 1 }])
  const [formComponentElementFields, setFormComponentElementFieds] = useState([])

  // page response
  const [totalPages, setTotalPages] = useState()
  const [currentPage, setCurrentPage] = useState(0)
  const [componentElements, setComponentElements] = useState([])
  const pageSize = 10

  const [validated, setValidated] = useState(false)
  const [components, setComponents] = useState([])
  const [modules, setModules] = useState([])
  const [appScopes, setAppScopes] = useState([])
  const [selectedAppScope, setSelectedAppScope] = useState('-1')
  const [selectedModule, setSelectedModule] = useState('-1')
  const [formData, setFormData] = useState({
    applicationScope: null,
    module: null,
    component: null,
    componentElements: [],
  })

  // ( + ) => Adding component fields
  const handleAddFields = () => {
    setFormComponentElements((prevFields) => {
      const lengthOfArr = prevFields.length
      const updatedFields = [...prevFields]
      const lastFieldId = updatedFields[lengthOfArr - 1].id + 1
      updatedFields[lengthOfArr] = { ...updatedFields[lengthOfArr], ['id']: lastFieldId }
      return updatedFields
    })
  }

  // ( - ) => Removing component fields
  const handleRemoveFields = (id) => {
    setFormComponentElements(formComponentElements.filter((field) => field.id !== id))
    const moduleArrayIndex = id - 1
    setFormComponentElementFieds((prevFields) => {
      let updatedFields = [...prevFields]
      updatedFields = updatedFields.filter((_, index) => index !== moduleArrayIndex)
      return updatedFields
    })
  }

  // Setting array of components
  const handleChangeComponentArray = (id, field, value) => {
    const componentArrayIndex = id - 1
    setFormComponentElementFieds((prevFields) => {
      const updatedObjects = [...prevFields]
      updatedObjects[componentArrayIndex] = {
        ...updatedObjects[componentArrayIndex],
        [field]: value,
      }
      return updatedObjects
    })
  }

  useEffect(() => {
    getScopes()
  }, [])

  const getScopes = async () => {
    try {
      const data = await getAppScopes()
      if (data.status === 'OK') {
        setAppScopes(data.data)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message,
        })
      }
    } catch (error) {
      console.error('Error occuring while calling user service to fetch all app scopes. ', error)
      Swal.fire({
        icon: 'error',
        title: 'Internal Server Error',
        text: 'Application scopes fetching failed.',
      })
    }
  }

  const getModulesByAppScope = async (uuid) => {
    try {
      const data = await getByUUID(uuid)
      if (data.data.status === 'OK') {
        setModules(data.data.data)
      } else {
        setModules([])
        setComponents([])
        console.warn(data.data.message)
      }
    } catch (error) {
      console.error(
        'Error occuring while calling user service to fetch all modules by uuid. ',
        error,
      )
      Swal.fire({
        icon: 'error',
        title: 'Internal Server Error',
        text: 'Modules fetching by uuid failed.',
      })
      setModules([])
      setComponents([])
    }
  }

  useEffect(() => {
    getAllComponentElements(currentPage, pageSize)
  }, [currentPage])

  const getAllComponentElements = async (currentPage, pageSize) => {
    try {
      const data = await getAllWithPagination(currentPage, pageSize)
      if (data.data.status == 'OK') {
        setComponentElements(data.data.data.dataList)
        setTotalPages(data.data.data.totalPages)
        setCurrentPage(data.data.data.currentPage)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.data.message,
        })
      }
    } catch (error) {
      console.error(
        'Error occuring while calling user service to fetch all component elements. ',
        error,
      )
      Swal.fire({
        icon: 'error',
        title: 'Internal Server Error',
        text: 'Component elements fetching failed.',
      })
    }
  }

  const appScopeChange = (event) => {
    setSelectedAppScope(event.target.value)
  }

  const moduleChange = (event) => {
    setSelectedModule(event.target.value)
  }

  useEffect(() => {
    getComponentsByAppScopeAndModule()
  }, [selectedAppScope, selectedModule])

  const getComponentsByAppScopeAndModule = async () => {
    if (selectedAppScope !== '-1' && selectedModule !== '-1') {
      try {
        const data = await getComponentsByScopeAndModule(selectedAppScope, selectedModule)
        if (data.data.status === 'OK') {
          setComponents(data.data.data)
        } else {
          setComponents([])
          console.warn(data.data.message)
        }
      } catch (error) {
        console.error(
          'Error occuring while calling user service to fetch all components by app scope and module. ',
          error,
        )
        Swal.fire({
          icon: 'error',
          title: 'Internal Server Error',
          text: 'Components fetching by app scope and module failed.',
        })
        setComponents([])
      }
    } else {
      setComponents([])
    }
  }

  const handleFormChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const handleSubmit = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else {
      const updatedForm = { ...formData }
      updatedForm.componentElements = formComponentElementFields
      try {
        const data = await createOrUpdate(updatedForm)
        if (data.data.status == 'OK') {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: data.data.message,
          })
        }
      } catch (error) {
        console.error('Error occuring while creating components. ', error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.details[1],
        })
      }
    }
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
                <CFormSelect
                  style={{ cursor: 'pointer' }}
                  id="applicationScope"
                  onChange={(e) => {
                    handleFormChange(e)
                    getModulesByAppScope(e.target.value)
                    appScopeChange(e)
                  }}
                  required
                >
                  <option value="-1">Select an application scope</option>
                  {appScopes.map((scope) => (
                    <option key={scope.uniqueId} value={scope.uniqueId}>
                      {scope.scope}
                    </option>
                  ))}
                </CFormSelect>
                <CFormFeedback tooltip invalid>
                  Please select an application scope.
                </CFormFeedback>
              </CCol>
              <CCol sm={4}>
                <CFormLabel>Module</CFormLabel>
                <CFormSelect
                  style={{ cursor: 'pointer' }}
                  onChange={(e) => {
                    handleFormChange(e)
                    moduleChange(e)
                  }}
                  id="module"
                  required
                >
                  <option value="-1">Select a module</option>
                  {modules.map((module) => (
                    <option key={module.id} value={module.id}>
                      {module.module}
                    </option>
                  ))}
                </CFormSelect>
                <CFormFeedback tooltip invalid>
                  Please select a module.
                </CFormFeedback>
              </CCol>
              <CCol sm={4}>
                <CFormLabel>Component</CFormLabel>
                <CFormSelect
                  style={{ cursor: 'pointer' }}
                  onChange={(e) => handleFormChange(e)}
                  id="component"
                  required
                >
                  <option value="-1">Select a component</option>
                  {components.map((c) => (
                    <option key={c.component} value={c.component}>
                      {c.name}
                    </option>
                  ))}
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

              {formComponentElements.map((field) => (
                <React.Fragment key={field.id}>
                  <CCol sm={3}>
                    <CFormInput
                      placeholder="Key name"
                      id={`key_${field.id}`}
                      onChange={(e) => {
                        handleChangeComponentArray(field.id, 'key', e.target.value)
                      }}
                      required
                    />
                    <CFormFeedback tooltip invalid>
                      Please provide a key name.
                    </CFormFeedback>
                  </CCol>
                  <CCol sm={3}>
                    <CFormInput
                      placeholder="Element Name"
                      id={`key_${field.id}`}
                      onChange={(e) => {
                        handleChangeComponentArray(field.id, 'name', e.target.value)
                      }}
                      required
                    />
                    <CFormFeedback tooltip invalid>
                      Please provide a name.
                    </CFormFeedback>
                  </CCol>

                  <CCol sm={3}>
                    <CFormSelect
                      style={{ cursor: 'pointer' }}
                      id={`key_${field.id}`}
                      onChange={(e) => {
                        handleChangeComponentArray(field.id, 'status', e.target.value)
                      }}
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
              <CTableHeaderCell scope="col">No</CTableHeaderCell>
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
            {componentElements.map((componentElement, index) => (
              <React.Fragment key={index}>
                <CTableRow>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{componentElement.scope}</CTableDataCell>
                  <CTableDataCell>{componentElement.module}</CTableDataCell>
                  <CTableDataCell>{componentElement.component}</CTableDataCell>
                  <CTableDataCell>{componentElement.key}</CTableDataCell>
                  <CTableDataCell>{componentElement.name}</CTableDataCell>
                  <CTableDataCell>{componentElement.status}</CTableDataCell>
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </CCol>
    </CRow>
  )
}

export default ComponentElement
