import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const ApplicationScope = React.lazy(
  () => import('./components/application-settings/application-scope/ApplicationScope'),
)
const User = React.lazy(() => import('./components/user/User'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/main/user', name: 'Users', element: User },
  { path: '/application/scope', name: 'Application Scope', element: ApplicationScope },
]

export default routes
