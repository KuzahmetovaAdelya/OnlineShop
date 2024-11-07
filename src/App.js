import './index.css';
import { useState } from 'react';


{/* <div className='test'>
  <div className='test-small'></div>
</div> */}

export default function App() {
  const [page, setPage] = useState("main")
  const [user, setUser] = useState("unauthorized")

  return (
    <>
      {page === "main" && <MainPage page={page} setPage={setPage} user={user} setUser={setUser} />}
    </>
  )
}


function Header({setPage, page, user}) {
  return (
    <>
      <div className='orange-block'>
        <div className='container'>
          <header>
            <nav>
              <h5 className='title'>Funiro.</h5>
              <div className='dropdown-line'>
                <p>Products</p>
                <img src='./arrow-down.svg' className='dropdown-arrow' alt='open'></img>
              </div>
              <div className='search'>
                <img src='./search.svg' className='search-button'></img>
                <input type='search' className='search-input' placeholder='Search for minimalist chair'></input>
              </div>
            </nav>

            <nav>
              <img src='./like.svg' className='nav-icon' alt='waitList'></img>
              <img src='./cart.svg' className='nav-icon' alt='basket'></img>
              {user === 'unauthorized' && <button>Sign On</button> }
              {user !== 'unauthorized' && <img src='./account.svg' className='nav-icon' alt='basket'></img>}
            </nav>
          </header>

          
        </div>
      </div>
    </>
  )
}


function MainPage({setPage, user, setUser, page}) {
  return (
    <>
      <Header setPage={setPage} page={page} user={user} />
      <HeaderSliderBlock />
    </>
  )
}

function HeaderSliderBlock() {
  const [sliderPage, setSliderPage] = useState(0)

  return (
    <>
      <div className='orange-block'>
        <div className='container'>
          <div className='header-slider-inner-block'>
            <div className='header-slider-text-block'>
              <h1>High-Quality Furniture Just For You</h1>
              <button className='invert'>Shop Now</button>
            </div>
          </div>
        </div>
        <div className='header-slider-images-block'></div> {/* Z-index: -1; position: что-то там */}
      </div>
    </>
  )
}