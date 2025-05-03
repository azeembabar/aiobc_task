import { useState } from "react";
import ComposeEmailForm from "./components/mail-app/MailForm";
import DataTable from "./components/mail-app/MailTable";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  return (
    <>
      <div className="min-h-screen w-full bg-gray-100 py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Mail Campaign
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 col-span-1">
              <ComposeEmailForm onSuccess={() => setRefreshKey(prev => prev + 1)}/>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 col-span-1">
              <DataTable refreshKey={refreshKey} onSent={() => setRefreshKey(prev => prev + 1)}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
