import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './components/deliveryExecutive/main';
import PusherEvents from './components/deliveryExecutive/pusher';
import ResponsiveDrawer from './components/deliveryExecutive/sidebar';
import { configureStore } from './components/redux/configureStore';
import Sidebar from './components/deliveryExecutive/sidebar';
import NavBar from './components/Header/navbar';
const store = configureStore();
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          {/* <ResponsiveDrawer /> */}
          
          <Sidebar>
         
          </Sidebar>
          
          
        </BrowserRouter>
      </Provider>


    </div>
  );
}

export default App;
