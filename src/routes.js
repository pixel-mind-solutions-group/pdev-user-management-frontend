import React from 'react'
import Component from './components/application-settings/component/Component'
import ComponentElement from './components/application-settings/component-element/ComponentElement'
import AuthParty from './components/permission/auth-party/AuthParty'
import AuthPartyProfile from './components/permission/auth-party-profile/AuthPartyProfile'
import AuthPartyRole from './components/permission/auth-party-role/AuthPartyRole'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const ApplicationScope = React.lazy(
  () => import('./components/application-settings/application-scope/ApplicationScope'),
)
const Module = React.lazy(() => import('./components/application-settings/module/Module'))
const User = React.lazy(() => import('./components/user/User'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/main/user', name: 'Users', element: User },
  { path: '/application/scope', name: 'Application Scope', element: ApplicationScope },
  { path: '/application/component', name: 'Component', element: Component },
  { path: '/application/component-element', name: 'Component', element: ComponentElement },
  { path: '/application/module', name: 'Module', element: Module },
  { path: '/permission/auth-party', name: 'Authorize Party', element: AuthParty },
  {
    path: '/permission/auth-party-profile',
    name: 'Authorize Party Profile',
    element: AuthPartyProfile,
  }, {
    path: '/permission/auth-party-role',
    name: 'Authorize Party Role',
    element: AuthPartyRole,
  },
]

export default routes
