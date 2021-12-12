import {useSelector, useDispatch} from 'react-redux';
import {decrement, increment} from './redux/web3.config/accountSlice';

function App() {
  const count = useSelector((state) => state.account.value);

  return <div className="App">{count}</div>;
}

export default App;
