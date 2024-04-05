import { useState } from 'react';

const employeesData = [
  {
    fullName: 'sima tame',
    gender: 'Male',
    workPosition: 'Software Engineer',
    status: { active: true, lastActiveDate: '2021-10-15' },
    picture: 'http://localhost:5173/simon.JPG'
  },
  {
    fullName: 'Jane Smith',
    gender: 'Female',
    workPosition: 'Product Manager',
    status: { active: true, lastActiveDate: '2021-08-20' },
    picture: 'http://localhost:5173/simon.JPG'
  },
  {
    fullName: 'Jane Smith',
    gender: 'Female',
    workPosition: 'Product Manager',
    status: { active: false, lastActiveDate: '2021-08-20' },
    picture: 'http://localhost:5173/simon.JPG'
  },  {
    fullName: 'Jane Smith',
    gender: 'Female',
    workPosition: 'Product Manager',
    status: { active: false, lastActiveDate: '2021-08-20' },
    picture: 'http://localhost:5173/simon.JPG'
  },  {
    fullName: 'Jane Smith',
    gender: 'Female',
    workPosition: 'Product Manager',
    status: { active: false, lastActiveDate: '2021-08-20' },
    picture: 'http://localhost:5173/simon.JPG'
  },  {
    fullName: 'Jane Smith',
    gender: 'Female',
    workPosition: 'Product Manager',
    status: { active: false, lastActiveDate: '2021-08-20' },
    picture: 'http://localhost:5173/simon.JPG'
  },  {
    fullName: 'Jane Smith',
    gender: 'Female',
    workPosition: 'Product Manager',
    status: { active: false, lastActiveDate: '2021-08-20' },
    picture: 'http://localhost:5173/simon.JPG'
  },  {
    fullName: 'Jane Smith',
    gender: 'Female',
    workPosition: 'Product Manager',
    status: { active: false, lastActiveDate: '2021-08-20' },
    picture: 'http://localhost:5173/simon.JPG'
  },  {
    fullName: 'Jane Smith',
    gender: 'Female',
    workPosition: 'Product Manager',
    status: { active: false, lastActiveDate: '2021-08-20' },
    picture: 'http://localhost:5173/simon.JPG'
  },  {
    fullName: 'Jane Smith',
    gender: 'Female',
    workPosition: 'Product Manager',
    status: { active: false, lastActiveDate: '2021-08-20' },
    picture: 'http://localhost:5173/simon.JPG'
  },  {
    fullName: 'Jane Smith',
    gender: 'Female',
    workPosition: 'Product Manager',
    status: { active: false, lastActiveDate: '2021-08-20' },
    picture: 'http://localhost:5173/simon.JPG'
  },  {
    fullName: 'Jane Smith',
    gender: 'Female',
    workPosition: 'Product Manager',
    status: { active: false, lastActiveDate: '2021-08-20' },
    picture: 'http://localhost:5173/simon.JPG'
  },  {
    fullName: 'Jane Smith',
    gender: 'Female',
    workPosition: 'Product Manager',
    status: { active: false, lastActiveDate: '2021-08-20' },
    picture: 'http://localhost:5173/simon.JPG'
  },  {
    fullName: 'Jane Smith',
    gender: 'Female',
    workPosition: 'Product Manager',
    status: { active: false, lastActiveDate: '2021-08-20' },
    picture: 'http://localhost:5173/simon.JPG'
  },  {
    fullName: 'Jane Smith',
    gender: 'Female',
    workPosition: 'Product Manager',
    status: { active: false, lastActiveDate: '2021-08-20' },
    picture: 'http://localhost:5173/simon.JPG'
  },  {
    fullName: 'Jane Smith',
    gender: 'Female',
    workPosition: 'Product Manager',
    status: { active: false, lastActiveDate: '2021-08-20' },
    picture: 'http://localhost:5173/simon.JPG'
  },  {
    fullName: 'Jane Smith',
    gender: 'Female',
    workPosition: 'Product Manager',
    status: { active: false, lastActiveDate: '2021-08-20' },
    picture: 'http://localhost:5173/simon.JPG'
  },  {
    fullName: 'Jane Smith',
    gender: 'Female',
    workPosition: 'Product Manager',
    status: { active: false, lastActiveDate: '2021-08-20' },
    picture: 'http://localhost:5173/simon.JPG'
  },  {
    fullName: 'Jane Smith',
    gender: 'Female',
    workPosition: 'Product Manager',
    status: { active: false, lastActiveDate: '2021-08-20' },
    picture: 'http://localhost:5173/simon.JPG'
  },  {
    fullName: 'Jane Smith',
    gender: 'Female',
    workPosition: 'Product Manager',
    status: { active: false, lastActiveDate: '2021-08-20' },
    picture: 'http://localhost:5173/simon.JPG'
  },  {
    fullName: 'Jane Smith',
    gender: 'Female',
    workPosition: 'Product Manager',
    status: { active: false, lastActiveDate: '2021-08-20' },
    picture: 'http://localhost:5173/simon.JPG'
  },  {
    fullName: 'Jane Smith',
    gender: 'Female',
    workPosition: 'Product Manager',
    status: { active: false, lastActiveDate: '2021-08-20' },
    picture: 'http://localhost:5173/simon.JPG'
  },  {
    fullName: 'Jane Smith',
    gender: 'Female',
    workPosition: 'Product Manager',
    status: { active: false, lastActiveDate: '2021-08-20' },
    picture: 'http://localhost:5173/simon.JPG'
  },  {
    fullName: 'Jane Smith',
    gender: 'Female',
    workPosition: 'Product Manager',
    status: { active: false, lastActiveDate: '2021-08-20' },
    picture: 'http://localhost:5173/simon.JPG'
  },
  // Add more employees as needed
];

const ListOfEmployees = () => {
    const [employees, setEmployees] = useState(employeesData);
  
    // Pagination logic
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(4);
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  
    const paginate = pageNumber => setCurrentPage(pageNumber);
  
    return (
    <div className=" sm:col-span-5  lg:col-span-6 ml-2">
      <h1>Employee List</h1>  
      <div className="mx-auto max-w-4xl">
      
        {currentEmployees.map((employee, index) => (
        <EmployeeCard key={index} employee={employee} badgeNumber={5} />
        ))}

        <div className="flex justify-center mt-4">
          {employees.length > employeesPerPage && (
            <ul className="flex">
              {Array.from({ length: Math.ceil(employees.length / employeesPerPage) }, (_, i) => i + 1).map(number => (
                <li key={number} className="mr-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
     </div> 
      )
};

const EmployeeCard = ({ employee, badgeNumber }) => {
    const { fullName, gender, workPosition, status, lastActiveDate, picture } = employee;
    console.log(employee)
    return (
      <div className="flex items-center justify-between bg-white border border-gray-300 shadow-sm rounded-lg p-4 mb-4">
        <div className="flex items-center">
          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
            <img src={picture} alt={fullName} className="w-full h-full" />
            {badgeNumber > 0 && (
              <div className="absolute top-3 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                <span>{badgeNumber}</span>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold">{fullName}</h2>
            <p className="text-gray-600">{workPosition}</p>
          </div>
        </div>
        <div className="flex items-center">
          {employee.status.active === true ? (
            <div className="rounded-full h-6 w-6 bg-green-500 mr-2"></div>
          ) : (
            <div className="rounded-full h-6 w-6 bg-gray-500 mr-2"></div>
          )}
          {employee.status.active === true ? (
            <p className="text-green-500">Active</p>
          ) : (
            <p className="text-gray-500">Last active: {lastActiveDate}</p>
          )}
          <div className="ml-2">
            <button className="border border-gray-300 p-1 rounded-full">
              <svg
                className="h-4 w-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };
export default ListOfEmployees;
