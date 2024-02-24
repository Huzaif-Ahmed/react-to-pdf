// pages/index.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

export default function Page() {
  
  const router = useRouter(); 
  const [employeeName, setEmployeeName] = useState('');
  const [date, setDate] = useState('');
  const [department, setDepartment] = useState('');
  const[data, setData] = useState(
    {
      employeeName: "",
      date: "",
      department: "",
      genSafety: "",
      bodyMechanics: "",
      safetyRules: "",
      specificSafetyRules: "",
      genSafetyPolicyProgram: "",
      reportInjuries: "",
      bodyMechanicProcedures: "",
      safetyRulesGeneral: "",
      safetyRulesSpecificToJob: "",
      counselingDiscipline: "",
      firePrevention: "",
      housekeepingCleaning: "",
      reportUnsafeConditions: "",
      safeOperationPoweredEquipment: "",
      personalAttirePPE: "",
      specialHazardsReviewMSDS: ""
    }
    );


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(data);
    setTimeout(() => {  console.log(data); }, 5000);

  
    // setData({employeeName: employeeName, date: date, department: department}); 

    localStorage.setItem('data', JSON.stringify(data));

    // Navigate to the preview page with query parameters
    router.push(`/preview`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setData({...data, [e.target.name]: e.target.value})
  }

  // Return statement with the form
  return (
    <div className="container mx-auto mt-10 p-4 bg-gray-100">
    <h1 className="text-2xl font-bold mb-4">Employee Safety Orientation Form</h1>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeName">
          Name of Employee:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="employeeName"
          name="employeeName"
          value={data.employeeName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
          Date:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="date"
          id="date"
          name="date"
          value={data.date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
          Department:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="department"
          name="department"
          value={data.department}
          onChange={handleChange}
          required
        />
      </div>
      {Object.keys(data).slice(3).map((field: string) => (
  <div key={field} className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
      {field.replace(/_/g, ' ')}:
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type="text"
      id={field}
      name={field}
      value={data[field]}
      onChange={handleChange}
      required
    />
  </div>
))}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Preview
      </button>
    </form>
  </div>
  );
}
