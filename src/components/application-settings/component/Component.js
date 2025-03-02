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
  CFormSelect,
  CTableHeaderCell,
  CTableHead,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
} from '@coreui/react'
import Swal from 'sweetalert2'
import { getAll as getAllModules, getByUUID } from '../../../service/module/ModuleService'
import { getAll as getAppScopes } from '../../../service/application-scope/ApplicationScopeService'
import { createOrUpdate, getAllWithPagination } from '../../../service/component/ComponentService'
import Pagination from '../../UI/pagination/Pagination'

function Component() {
  // dynamic form fields
  const [formComponents, setFormComponents] = useState([{ id: 1 }])
  const [formComponentFields, setFormComponentFiedls] = useState([])

  // page response
  const [totalPages, setTotalPages] = useState()
  const [currentPage, setCurrentPage] = useState(0)
  const [components, setComponents] = useState([])
  const pageSize = 10

  const [validated, setValidated] = useState(false)
  const [modules, setModules] = useState([])
  const [appScopes, setAppScopes] = useState([])
  const [formData, setFormData] = useState({
    applicationScope: '-1',
    module: null,
    components: [],
  })

  useEffect(() => {
    getScopes()
  }, [])

  useEffect(() => {
    getAllComponents(currentPage, pageSize)
  }, [currentPage])

  // ( + ) => Adding component fields
  const handleAddFields = () => {
    setFormComponents((prevFields) => {
      const lengthOfArr = prevFields.length
      const updatedFields = [...prevFields]
      const lastFieldId = updatedFields[lengthOfArr - 1].id + 1
      updatedFields[lengthOfArr] = { ...updatedFields[lengthOfArr], ['id']: lastFieldId }
      return updatedFields
    })
  }

  // ( - ) => Removing component fields
  const handleRemoveFields = (id) => {
    setFormComponents(formComponents.filter((field) => field.id !== id))
    const moduleArrayIndex = id - 1
    setFormComponentFiedls((prevFields) => {
      let updatedFields = [...prevFields]
      updatedFields = updatedFields.filter((_, index) => index !== moduleArrayIndex)
      return updatedFields
    })
  }

  // Setting array of components
  const handleChangeComponentArray = (id, field, value) => {
    const componentArrayIndex = id - 1
    setFormComponentFiedls((prevFields) => {
      const updatedObjects = [...prevFields]
      updatedObjects[componentArrayIndex] = {
        ...updatedObjects[componentArrayIndex],
        [field]: value,
      }
      return updatedObjects
    })
  }

  const getModulesByAppScope = async (uuid) => {
    try {
      const data = await getByUUID(uuid)
      if (data.data.status === 'OK') {
        setModules(data.data.data)
      } else {
        setModules([])
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.data.message,
        })
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
    }
  }

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

  const getAllComponents = async (currentPage, pageSize) => {
    try {
      const data = await getAllWithPagination(currentPage, pageSize)
      if (data.data.status == 'OK') {
        setComponents(data.data.data.dataList)
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
      console.error('Error occuring while calling user service to fetch all components. ', error)
      Swal.fire({
        icon: 'error',
        title: 'Internal Server Error',
        text: 'Components fetching failed.',
      })
    }
  }

  const handleSubmit = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else {
      const updatedForm = { ...formData }
      updatedForm.components = formComponentFields
      try {
        const data = await createOrUpdate(updatedForm)
        if (data.status == 'OK') {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: data.message,
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

  const handleFormChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
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
                <CFormSelect
                  style={{ cursor: 'pointer' }}
                  id="applicationScope"
                  onChange={(e) => {
                    handleFormChange(e)
                    getModulesByAppScope(e.target.value)
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
                  id="module"
                  onChange={handleFormChange}
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

              <div className="w-100"></div>

              <CCol sm={3}>
                <CFormLabel>Key Name</CFormLabel>
              </CCol>
              <CCol sm={3}>
                <CFormLabel>Component Name</CFormLabel>
              </CCol>
              <CCol sm={3}>
                <CFormLabel>Status</CFormLabel>
              </CCol>
              <CCol sm={1}></CCol>

              {formComponents.map((field) => (
                <React.Fragment key={field.id}>
                  <CCol sm={3}>
                    <CFormInput
                      htmlFor={`specificSizeInputName-${field.id}`}
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
                      htmlFor={`specificSizeInputName-${field.id}`}
                      placeholder="Component Name"
                      id={`name_${field.id}`}
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
                      htmlFor={`specificSizeInputName-${field.id}`}
                      style={{ cursor: 'pointer' }}
                      id={`status_${field.id}`}
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
              <CTableHeaderCell scope="col">No</CTableHeaderCell>
              <CTableHeaderCell scope="col">Application Scope</CTableHeaderCell>
              <CTableHeaderCell scope="col">Module</CTableHeaderCell>
              <CTableHeaderCell scope="col">Key</CTableHeaderCell>
              <CTableHeaderCell scope="col">Component</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {components.map((component, index) => (
              <React.Fragment key={component.componentId}>
                <CTableRow>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{component.applicationScope}</CTableDataCell>
                  <CTableDataCell>{component.module}</CTableDataCell>
                  <CTableDataCell>{component.key}</CTableDataCell>
                  <CTableDataCell>{component.name}</CTableDataCell>
                  <CTableDataCell>{component.status}</CTableDataCell>
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

export default Component
