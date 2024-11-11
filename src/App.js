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
      <MainHeaderSliderBlock />
      <MainFeatures />
      <MainProductsBlock />
    </>
  )
}

function MainHeaderSliderBlock() {
  const [sliderPage, setSliderPage] = useState(0)

  let imgClassMain = 'header-slider-image'
  let imgClassLeft = 'header-slider-image'
  let imgClassRight = 'header-slider-image'
  if (sliderPage === 0) {
    imgClassLeft = 'header-slider-image ' + 'header-slider-image-one'
    imgClassMain = 'header-slider-image ' + 'header-slider-image-two'
    imgClassRight = 'header-slider-image ' + 'header-slider-image-three'
  } else if (sliderPage === 1) {
    imgClassLeft = 'header-slider-image ' + 'header-slider-image-three'
    imgClassMain = 'header-slider-image ' + 'header-slider-image-one'
    imgClassRight = 'header-slider-image ' + 'header-slider-image-two'
  } else if (sliderPage === 2) {
    imgClassLeft = 'header-slider-image ' + 'header-slider-image-two'    
    imgClassMain = 'header-slider-image ' + 'header-slider-image-three'
    imgClassRight = 'header-slider-image ' + 'header-slider-image-one'
  }

  function handleNext() {
    if (sliderPage === 2) {
      setSliderPage(0)
    } else {
      setSliderPage(n => n + 1)
    }

    if (sliderPage === 0) {
      document.getElementById('header-slider3').checked = true
    } else if (sliderPage === 2) {
      document.getElementById('header-slider2').checked = true
    } else {
      document.getElementById('header-slider1').checked = true
    }
  }

  function handleBack() {
    if (sliderPage === 0) {
      setSliderPage(2)
    } else {
      setSliderPage(n => n - 1)
    }

    if (sliderPage === 0) {
      document.getElementById('header-slider3').checked = true
    } else if (sliderPage === 2) {
      document.getElementById('header-slider2').checked = true
    } else {
      document.getElementById('header-slider1').checked = true
    }
  }

  // let timerId = setInterval(() => handleNext(), 2000)

  return (
    <>
      <div className='orange-block mb'>
        <div className='container'>
          <div className='header-slider'>
            <div className='header-slider-inner-block'>
              <div className='header-slider-text-block'>
                <h1>High-Quality Furniture Just For You</h1>
                <button className='invert'>Shop Now</button>
              </div>

              <div className='control-block'>
                <div className='points-control-block'>
                  <input type='radio' name='header-slider' id='header-slider1' className='points-control-input'></input>
                  <input type='radio' name='header-slider' id='header-slider2' className='points-control-input'></input>
                  <input type='radio' name='header-slider' id='header-slider3' className='points-control-input'></input>

                  <label htmlFor='header-slider1' onClick={() => {setSliderPage(0)}} className='points-control-label' id='point-control1'></label>
                  <label htmlFor='header-slider2' onClick={() => {setSliderPage(1)}} className='points-control-label' id='point-control2'></label>
                  <label htmlFor='header-slider3' onClick={() => {setSliderPage(2)}} className='points-control-label' id='point-control3'></label>
                </div>

                <div className='arrows-control-block'>
                  <div className='arrow-block' onClick={handleBack}><img src='./arrow-down.svg' className='arrows-control arrow-left' alt='back'></img></div>
                  <div className='arrow-block' onClick={handleNext}><img src='./arrow-down.svg' className='arrows-control arrow-right' alt='next'></img></div>
                </div>
              </div>
            </div>
            <div className='header-slider-images-block'>
              <div className={imgClassLeft}>
                <div className='header-slider-image-text-block'>
                  <h4>{sliderPage === 0 ? 'Sofa' : sliderPage === 1 ? "Bed" : "Bohauss"}</h4>
                  <p className='gray-text'>{sliderPage === 0 ? 'Luxury big sofa 3-seat' : sliderPage === 1 ? "Luxury big bed" : "Luxury big sofa 2-seat"}</p>
                  <div className='header-slider-image-texl-line'>
                    <h6>{sliderPage === 0 ? 'Rp 15.000.000' : sliderPage === 1 ? "Rp 20.000.000" : "Rp 17.000.000"}</h6>
                    <img src='./arrow-right.svg' className='header-slider-image-icon' alt='go'></img>
                  </div>
                </div>
              </div>
              <div className={imgClassMain}>
                <div className='header-slider-image-text-block'>
                  <h4>{sliderPage === 0 ? 'Bohauss' : sliderPage === 1 ? "Sofa" : "Bed"}</h4>
                  <p className='gray-text'>{sliderPage === 0 ? 'Luxury big sofa 2-seat' : sliderPage === 1 ? "Luxury big sofa 3-seat" : "Luxury big bed"}</p>
                  <div className='header-slider-image-texl-line'>
                    <h6>{sliderPage === 0 ? 'Rp 17.000.000' : sliderPage === 1 ? "Rp 15.000.000" : "Rp 20.000.000"}</h6>
                    <img src='./arrow-right.svg' className='header-slider-image-icon' alt='go'></img>
                  </div>
                </div>
              </div>
              <div className={imgClassRight}>
                <div className='header-slider-image-text-block'>
                  <h4>{sliderPage === 0 ? 'Bed' : sliderPage === 1 ? "Bohauss" : "Sofa"}</h4>
                  <p className='gray-text'>{sliderPage === 0 ? 'Luxury big bed' : sliderPage === 1 ? "Luxury big sofa 2-seat" : "Luxury big sofa 3-seat"}</p>
                  <div className='header-slider-image-texl-line'>
                    <h6>{sliderPage === 0 ? 'Rp 20.000.000' : sliderPage === 1 ? "Rp 17.000.000" : "Rp 15.000.000"}</h6>
                    <img src='./arrow-right.svg' className='header-slider-image-icon' alt='go'></img>
                  </div>
                </div>
              </div>
            </div> 
          </div>
        </div>
      </div>

    </>
  )
}

function MainFeatures() {
  return (
    <>
      <div className='container mb'>
        <div className='features'>
          <MainFeatureItem title={"High Quality"} subtitle={"Crafted from top materials"} img={'./trophy.svg'} />
          <MainFeatureItem title={"Warrany Protection"} subtitle={"Over 2 years"} img={'./guarantee.svg'} />
          <MainFeatureItem title={"Free Shipping"} subtitle={"Order over 150 $"} img={'./shipping.svg'} />
          <MainFeatureItem title={"24 / 7 Support"} subtitle={"Dedicated support"} img={'./customer-support.svg'} />
        </div>
      </div>
    </>
  )
}

function MainFeatureItem({title, subtitle, img}) {
  return (
    <>
      <div className='feature-item'>
        <img src={img} className='feature-img'></img>
        <div className='feature-col'>
          <p className='large'><b>{title}</b></p> 
          <p className='gray-text'>{subtitle}</p>
        </div>
      </div>
    </>
  )
}

function MainProductsBlock({}) {
  return (
    <>
      <div className='container'>
        <div className='products'>
          <h2>Our Products</h2>
          <div className='products-block'>
            <MainProductCard />
            <MainProductCard />
            <MainProductCard />
            <MainProductCard />
            <MainProductCard />
            <MainProductCard />
            <MainProductCard />
          </div>
        </div>
      </div>
    </>
  )
}

function MainProductCard() {
  return (
    <>
      <div className='product-card'>
        <img src="prod1.png" className='product-card-img' alt='Syltherine'></img>
        <div className='product-card-text-block'>
          <h5>Syltherine</h5>
          <p className='gray-text'>Stylish cafe chair</p>
          <div className='product-card-text-line'>
            <h6>Rp 2.500.000</h6>
            <p className='light-text product-card-last-price'>Rp 3.500.000</p>
          </div>
        </div>

        <div className='product-card-new invisible'>
          <p className='white-text'>New</p>
        </div>
        <div className='product-card-sale'>
          <p className='white-text'>- 30%</p>
        </div>
      </div>
    </>
  )
}