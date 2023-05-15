import { Provider } from 'react-redux';
import './App.css';
import Store from './store/Store';
import CustomerRouter from './routers/CustomRouter';

function App() {
  return (
    <Provider store={Store}>
      <CustomerRouter/>
    </Provider>
  );
}

export default App;
