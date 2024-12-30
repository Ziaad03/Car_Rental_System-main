import AddOfficeForm from "./OfficeManagement/AddOfficeForm";
import OfficeList from "./OfficeManagement/OfficeList";

export default function OfficeManagement() {
  return (
    // Main container to center content and add background
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
      
      <div className="max-w-3xl w-full bg-gray-800 p-8 rounded-xl shadow-xl">
       
        <h2 className="text-3xl font-bold text-center text-white mb-6">Office Management</h2>

        
        <div className="space-y-8">
          
          <div className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-white mb-4">Add New Office</h3>
            <AddOfficeForm />
          </div>

          
          <div className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-white mb-4">Office List</h3>
            <OfficeList />
          </div>
        </div>
      </div>
    </div>
  );
}
