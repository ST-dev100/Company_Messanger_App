import { useState } from 'react'
import Home from './assets/Compnonents/Home/Home';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import {Route,Routes} from 'react-router-dom'
import Navigation from './assets/Compnonents/Home/Navigation';
import Messages from './assets/Compnonents/Home/Messages';
import PersonMessage from './assets/Compnonents/Home/PersonMessage';
import PersonMessage2 from './assets/Compnonents/Home/PersonMessage2';
import Test from './assets/Compnonents/Home/Test';
import Test2 from './assets/Compnonents/Home/Test2';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import  createUploadLink  from 'apollo-upload-client/createUploadLink.mjs';
import { WebSocketLink } from '@apollo/link-ws';
// import { WebSocketLink } from '@apollo/client/link/ws';
import { split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

import { setContext } from '@apollo/client/link/context';
import LoginPage from './assets/Compnonents/Home/Login/Login';
import Navigation2 from './assets/Compnonents/Home/Navigation2';
import AddEmployee from './assets/Compnonents/Home/AddEmployee';
import ListOfEmployees from './assets/Compnonents/Home/ListOfEmployees';
import DashBoard from './assets/Compnonents/Home/Dashboard';


const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // const token = sessionStorage.getItem('token');
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`, // Change the URL to your WebSocket endpoint
  options: {
    reconnect: true,
    connectionParams: {
      // You can include any necessary connection parameters here
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    );
  },
  wsLink,
  uploadLink,
);
const cache = new InMemoryCache({
  typePolicies: {
      Query: {
          fields: {
              getMessage: {
                  merge(existing = [], incoming) {
                      return incoming;
                  },
              },
          },
      },
  },
});



export const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache,
});

// import './index.css'

function App() {
  const [count, setCount] = useState(0)
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim() !== '') {
      setMessages([...messages, inputText]);
      setInputText('');
    }
  };
  // const App = () => { const [count, setCount] = useState(0);

  //   return ( 
  //     <ApolloProvider client={client}>
  //         <Routes> 
  //           <Route path="/home" element={<Home />}> 
  //             <Route path="messages" element={<Messages />}>
  //               <Route path=":id" element={<PersonMessage />} />
  //             </Route> 
  //             <Route path="employees" element={<Employees />} />
  //             <Route path="dashboard" element={<Dashboard />} /> 
  //             <Route path="addEmployees" element={<AddEmployees />} /> 
  //           </Route> 
  //           <Route path="*" element={<h1>Page not found</h1>} /> 
  //         </Routes> 
  //       </ApolloProvider> ); 
  //       };
    
  //   export default App;

  return (
    <ApolloProvider client={client}>
    <div>
      <Routes>
        <Route path='/messages' element={<Navigation/>}>
          <Route path='/messages/:id' element={<PersonMessage/>}/>
        </Route>
        <Route path='homee' element={<Navigation2/>}>
          <Route path='message/:id' element={<PersonMessage2/>}/>
          <Route path='addEmployee' element={<AddEmployee/>}/>
          <Route path='empList' element={<ListOfEmployees/>}/>
          <Route path='dashboard' element={<DashBoard/>}/>
        </Route>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/test' element={<Test/>}/>
        <Route path='/test2' element={<Test2/>}/>
        <Route path='*' element={<h1>Page not found</h1>}/>
      </Routes>
    </div>
    </ApolloProvider>
  )
}

export default App
