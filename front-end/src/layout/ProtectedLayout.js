import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const ProtectedLayout = () => {
    return (
        <>
            <Navbar />
            <div className="dash-container">
                <Outlet />
            </div>
        </>
    )
}
export default ProtectedLayout