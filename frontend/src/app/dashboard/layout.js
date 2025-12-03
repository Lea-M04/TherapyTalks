import Sidebar from '../../components/layout/Sidebar'

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Sidebar role="dashboard" />
      <div className="dashboard-content">
        {children}
      </div>
    </div>
  )
}
