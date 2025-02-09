import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))
const User = React.lazy(() => import('./components/user/User'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/main/user', name: 'Users', element: User },
]

export default routes
