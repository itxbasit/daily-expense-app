import './App.css';
import Content from './component/content';
import logo from './budget.png'

function App() {
  return (
    <div className="App">
      <div className='header'>
        <div className='sub-header'>
          <img src={logo} />
          <p>Expense Tracker App</p>
        </div>
        <div>
          <button>Clear All</button>
        </div>
      </div>
      <div>
        <Content />
      </div>
    </div>
  );
}

export default App;
