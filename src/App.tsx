import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import MyRouter from './Page/Routes/MyRoutes';

function App() {

  return (
      <div className="App">
        <BrowserRouter>
          <Layout />
          <MyRouter />
          </BrowserRouter>
      </div>
  );
}

export default App;
