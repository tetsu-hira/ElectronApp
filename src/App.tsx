import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter, Route, Routes, Link } from 'react-router-dom';

import './App.css';
import allActions from './actions';
import Header from './components/Header';
import Index from './components/Index';
import Item from './components/Item';
import Process from './components/Process';
import Product from './components/Product';
import Test from './components/Test';

const App: React.FC = () => {
  const [item, setItem] = useState<string>('');

  const entryItem = useSelector((state: any) => state.entryItem);
  const dispatch = useDispatch();
  const itemName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (item) {
      if (item.length < 33) {
        setItem(event.target.value);
        console.log(item);
      }
    }
  };

  const defaultItem = () => {
    setItem(item.slice(1));
    console.log(item);
  };

  const nullItem = () => {
    setItem(' ');
    console.log(item);
  };

  return (
    <HashRouter>
      <Header />
      <div className='App'>
        <div className='Top'>
          <div className='TopContainer'>
            <div className='TopContainer__Left'>
              {/* Reduxを使ったテスト */}
              <div className='TopHead'>
                <div className='TopButton'>
                  <input
                    className='TopButton__name'
                    type='text'
                    id='name'
                    onChange={itemName}
                    value={!item ? '作成したい大会・部門名を入力' : item}
                    onBlur={defaultItem}
                    onClick={nullItem}
                  ></input>
                  <button
                    onClick={() => dispatch(allActions.entryAction.addItem(item))}
                    className='TopButton__button'
                  >
                    Create
                  </button>
                </div>
                <div className='TopHead__title'>＜Category-List＞</div>
              </div>
              <ul className='TopList'>
                {entryItem.itemList.map((item: string) => (
                  <li key={item} className='TopList__item'>
                    <div className='TopList__itemName'>
                      <Link to={`./New2set/${item}`} className='TopList__itemName'>
                        <p>{item}</p>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className='TopContainer__Right'>
              <Routes>
                <Route path='/New2set' element={<Index />} />
                <Route path='/top' element={<Process />} />
                <Route path='/test' element={<Test />} />
                <Route path='/:id/:name' element={<Product />} />
                <Route path='/New2set/:item' element={<Item />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </HashRouter>
  );
};

export default App;
