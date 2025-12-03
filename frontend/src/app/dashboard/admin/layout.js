// AdminLayout.js
import AdminSidebar from "./components/AdminSidebar";
import AdminGuard from "@/components/guards/AdminGuard"; 

export default function AdminLayout({ children }) {
    return (
     <AdminGuard>
        <div className="flex">
             <AdminSidebar />

         <div className="flex-1 p-8 bg-gray-50">
            {children}
         </div>
    </div>
     </AdminGuard>
    );
}