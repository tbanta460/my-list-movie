import './App.css';
import Main from './main';
import {Provider} from 'react-redux'
import {store}  from '../config';
function App() {

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
