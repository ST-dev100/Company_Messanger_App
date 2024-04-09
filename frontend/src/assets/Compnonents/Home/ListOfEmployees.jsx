import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useQuery, gql } from '@apollo/client';

const GET_Employees = gql`
  query getEmployees {
    employees {
      userName
      dataa
      id
      occupation
      gender
      email
      firstName
      lastName
    }
  }
`;

const ListOfEmployees = () => {
  const { loading, error, data } = useQuery(GET_Employees);
  const [currentPage, setCurrentPage] = useState(1);
   const employeesPerPage = 4;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const employees = data.employees.map((employee) => {
    var binaryImage = atob(employee.dataa);
    var array = new Uint8Array(binaryImage.length);
    for (var i = 0; i < binaryImage.length; i++) {
      array[i] = binaryImage.charCodeAt(i);
    }
    var blob = new Blob([array], { type: 'image/png' });
    var url = URL.createObjectURL(blob);

    return {
      userName: employee.userName,
      dataa: url,
      id: employee.id,
      occupation: employee.occupation,
      gender: employee.gender,
      fullName: `${employee.firstName} ${employee.lastName}`,
      email: employee.email
    };
  });
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  return (
    <div className=" sm:col-span-5  lg:col-span-6 ml-2">
      <h1>Employee List</h1>
      <br />
      <div className="mx-auto max-w-4xl">
        {currentEmployees.map((employee, index) => (
          <EmployeeCard key={index} employee={employee} badgeNumber={5} />
        ))}
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
        )}
        {currentPage < Math.ceil(employees.length / employeesPerPage) && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        )}
      </div>
    </div>
  );
};

const EmployeeCard = ({ employee, badgeNumber }) => {
  const { userName, dataa, id, occupation, gender, fullName, email } = employee;

  return (
    <div className="flex items-center justify-between bg-white border border-gray-300 shadow-sm rounded-lg p-4 mb-4">
      <div className="flex items-center">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
          <img src={dataa} alt={fullName} className="w-full h-full" />
          {badgeNumber > 0 && (
            <div className="absolute top-3 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
              <span>{badgeNumber}</span>
            </div>
          )}
        </div>
        <div>
          <h2 className="text-lg font-semibold">{fullName}</h2>
          <p className="text-gray-600">{occupation}</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="rounded-full h-6 w-6 bg-green-500 mr-2"></div>
        <p className="text-green-500">Active</p>
        <div className="ml-2">
          <MoreVertIcon />
        </div>
      </div>
    </div>

  );
};

export default ListOfEmployees;
