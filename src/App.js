import './index.css';
import { useState } from 'react';
import itemsList from "./list1.js";
import footerList from './footerList.js';

export default function App() {
  const [page, setPage] = useState("main")
  const [user, setUser] = useState("unauthorized")

  return (
    <>
      {page === "main" && <MainPage page={page} setPage={setPage} user={user} setUser={setUser} />}
      {page === "registration" && <RegistrationPage page={page} setPage={setPage} user={user} setUser={setUser} />}
      {page === "authorization" && <AuthorizationPage page={page} setPage={setPage} user={user} setUser={setUser} />}
    </>
  )
}


function Header({setPage, page, user}) {
  return (
    <>
      <div className='orange-block pb'>
        <div className='container'>
          <header>
            <nav>
              <h5 className='title' onClick={() => {setPage("main")}}>Funiro.</h5>
              <div className='dropdown-line'>
                <p>Products</p>
                <img src='./arrow-down.svg' className='dropdown-arrow' alt='open'></img>
              </div>
              <div className='search'>
                <img src='./search.svg' className='search-button' alt='search'></img>
                <input type='search' className='search-input' placeholder='Search for minimalist chair' name='search'></input>
              </div>
            </nav>

            <nav>
              <img src='./like.svg' className='nav-icon' alt='waitList'></img>
              <img src='./cart.svg' className='nav-icon' alt='basket'></img>
              {user === 'unauthorized' && <button onClick={() => {setPage("registration")}}>Sign Up</button> }
              {user !== 'unauthorized' && <img src='./account.svg' className='nav-icon' alt='basket'></img>}
            </nav>
          </header>
        </div>
      </div>
    </>
  )
}

function LittleHeader({setPage}) {
  return (
    <>
      <div className='orange-block pb pt'>
        <div className='container'>
          <h5 className='title' onClick={() => {setPage("main")}}>Funiro.</h5>
        </div>
      </div>
    </>
  )
}

function Footer({setPage, page, user}) {
  let footerListItems = []
  for (let i = 0; i < footerList.length; i++) {
    footerListItems.push(<FooterList list={footerList[i]} />)
  }

  return (
    <>
      <div className='container'>
        <footer>
          <div className='footer-list'>
            <h5><b>Funiro.</b></h5>
            <div className='footer-list-items'>
              <p className='gray-text'>Worldwide furniture store since<br/>2020. We sell over 1000+<br/>branded products on our<br/>website</p>
              
              <div className='footer-line'>
                <img src='./map.svg' className='footer-icon' alt='map-pointer'></img>
                <p className='gray-text'>Sawojajar Malang, Indonesia</p>
              </div>
              <div className='footer-line'>
                <img src='./phone.svg' className='footer-icon' alt='phone'></img>
                <p className='gray-text'>+6289 456 3455</p>
              </div>

              <p className='gray-text'>www.funiro.com</p>
            </div>
          </div>

          {footerListItems}

          <div className='footer-list'>
            <h5><b>Stay Updated</b></h5>
            <div className='search'>
              <input type='email' className='footer-input' placeholder='Enter your email' name='search'></input>
              <img src='./send.svg' className='footer-button' alt='search'></img>
            </div> 
          </div>
        </footer>
      </div>
    </>
  )
}

function FooterList({list}) {
  let listItem = []
  for (let i = 0; i < list.elements.length; i++) { 
    listItem.push(<p className='gray-text'>{list.elements[i]}</p>)
  }

  return (
    <>
      <div className='footer-list'>
        <h5><b>{list.title}</b></h5>
        <div className='footer-list-items'>
          {listItem}
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
      <MainTips />
      <Footer />
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
        <img src={img} className='feature-img' alt='feature'></img>
        <div className='feature-col'>
          <p className='large'><b>{title}</b></p> 
          <p className='gray-text'>{subtitle}</p>
        </div>
      </div>
    </>
  )
}

function MainProductsBlock({}) {
  let productCards = []
  for (let i = 0; i < itemsList.length; i++) {
    productCards.push(<MainProductCard key={itemsList[i].id} itemsList={itemsList[i]} />)
  }

  return (
    <>
      <div className='container mb'>
        <div className='products'>
          <h2>Our Products</h2>
          <div className='products-block'>
            {productCards}
          </div>
        </div>
      </div>
    </>
  )
}

function MainProductCard({itemsList}) {
  function handleHover(id) {
    let element = document.getElementById(id)
    element.className = "card-hover"
  }

  function handleLeave(id) {
    let element = document.getElementById(id)
    element.className = "card-hover-invisible"
  }

  return (
    <>
      <div className='product-card' onMouseEnter={() => {handleHover(itemsList.id)}} onMouseLeave={() => {handleLeave(itemsList.id)}}>
        <img src={itemsList.img} className='product-card-img' alt='Syltherine'></img>
        <div className='product-card-text-block'>
          <h5>{itemsList.name}</h5>
          <p className='gray-text'>{itemsList.subtitle}</p>
          <div className='product-card-text-line'>
            <h6>Rp {itemsList.price}</h6>
            <p className='light-text product-card-last-price'>{itemsList.dopInfo.oldPrice}</p>
          </div>
        </div>

        {itemsList.dopInfo.type === "new" &&
          <div className='product-card-new'>
            <p className='white-text'>New</p>
          </div>
        }
        {itemsList.dopInfo.type === "discount" &&
          <div className='product-card-sale'>
            <p className='white-text'>- {itemsList.dopInfo.percent}%</p>
          </div>
        }
        
        <div className='card-hover-invisible' id={itemsList.id}>
          <div className='card-hover-block'>
            <button className='card-hover-button'>Add to cart</button>
            <div className='card-hover-line'>
              <div className='card-hover-item'>
                <img src='share.svg' alt='share' className='card-hover-icon'></img>
                <p className='white-text'><b>Share</b></p>
              </div>

              <div className='card-hover-item'>
                <img src='like.svg' alt='like' className='card-hover-icon like'></img>
                <p className='white-text'><b>Like</b></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function MainTips() {
  const [tipsPage, setTipsPage] = useState(0)

  function handleNext() {
    console.log(tipsPage)
    if (tipsPage === 3) {
      setTipsPage(0)
    } else {
      setTipsPage(n => n + 1)
    }

    if (tipsPage === 0) {
      document.getElementById("tips-slider2").checked = true
    } else if (tipsPage === 1) {
      document.getElementById("tips-slider3").checked = true
    } else if (tipsPage === 2) {
      document.getElementById("tips-slider4").checked = true
    } else if (tipsPage === 3) {
      document.getElementById("tips-slider1").checked = true
    }
  }

  function handleBack() {
    if (tipsPage === 0) {
      setTipsPage(3)
    } else {
      setTipsPage(n => n - 1)
    }

    if (tipsPage === 1) {
      document.getElementById("tips-slider1").checked = true
    } else if (tipsPage === 2) {
      document.getElementById("tips-slider2").checked = true
    } else if (tipsPage === 3) {
      document.getElementById("tips-slider3").checked = true
    } else if (tipsPage === 0) {
      document.getElementById("tips-slider4").checked = true
    }
  }

  return (
    <>
      <div className='container mb'>
        <div className='tips'>
          <h2>Tips & Triks</h2>
          {tipsPage === 0 ?
          <div className='tips-line'>
            <div className='tips-card'>
              <img src='tip1.png' className='tips-card-img' alt="tip"></img>
              <div className='tips-card-text-block'>
                <h5>How to create a living room to love</h5>
                <p className='small-text light-text'>20 jan 2020</p>
              </div>
            </div>

            <div className='tips-card'>
              <img src='tip2.png' className='tips-card-img' alt="tip"></img>
              <div className='tips-card-text-block'>
                <h5>Solution for clean look working space</h5>
                <p className='small-text light-text'>21 jan 2020</p>
              </div>
            </div>

            <div className='tips-card'>
              <img src='tip3.png' className='tips-card-img' alt="tip"></img>
              <div className='tips-card-text-block'>
                <h5>Make your cooking activity more fun with good setup</h5>
                <p className='small-text light-text'>22 jan 2020</p>
              </div>
            </div>
          </div> :
          tipsPage === 1 ?
          <div className='tips-line'>
            <div className='tips-card'>
              <img src='tip1.png' className='tips-card-img' alt="tip"></img>
              <div className='tips-card-text-block'>
                <h5>How to create a living room to love</h5>
                <p className='small-text light-text'>23 jan 2020</p>
              </div>
            </div>

            <div className='tips-card'>
              <img src='tip2.png' className='tips-card-img' alt="tip"></img>
              <div className='tips-card-text-block'>
                <h5>Solution for clean look working space</h5>
                <p className='small-text light-text'>24 jan 2020</p>
              </div>
            </div>

            <div className='tips-card'>
              <img src='tip3.png' className='tips-card-img' alt="tip"></img>
              <div className='tips-card-text-block'>
                <h5>Make your cooking activity more fun with good setup</h5>
                <p className='small-text light-text'>25 jan 2020</p>
              </div>
            </div>
          </div> :
          tipsPage === 2 ?
          <div className='tips-line'>
            <div className='tips-card'>
              <img src='tip1.png' className='tips-card-img' alt="tip"></img>
              <div className='tips-card-text-block'>
                <h5>How to create a living room to love</h5>
                <p className='small-text light-text'>26 jan 2020</p>
              </div>
            </div>

            <div className='tips-card'>
              <img src='tip2.png' className='tips-card-img' alt="tip"></img>
              <div className='tips-card-text-block'>
                <h5>Solution for clean look working space</h5>
                <p className='small-text light-text'>27 jan 2020</p>
              </div>
            </div>

            <div className='tips-card'>
              <img src='tip3.png' className='tips-card-img' alt="tip"></img>
              <div className='tips-card-text-block'>
                <h5>Make your cooking activity more fun with good setup</h5>
                <p className='small-text light-text'>28 jan 2020</p>
              </div>
            </div>
          </div> :
          tipsPage === 3 ?
          <div className='tips-line'>
            <div className='tips-card'>
              <img src='tip1.png' className='tips-card-img' alt="tip"></img>
              <div className='tips-card-text-block'>
                <h5>How to create a living room to love</h5>
                <p className='small-text light-text'>29 jan 2020</p>
              </div>
            </div>

            <div className='tips-card'>
              <img src='tip2.png' className='tips-card-img' alt="tip"></img>
              <div className='tips-card-text-block'>
                <h5>Solution for clean look working space</h5>
                <p className='small-text light-text'>30 jan 2020</p>
              </div>
            </div>

            <div className='tips-card'>
              <img src='tip3.png' className='tips-card-img' alt="tip"></img>
              <div className='tips-card-text-block'>
                <h5>Make your cooking activity more fun with good setup</h5>
                <p className='small-text light-text'>31 jan 2020</p>
              </div>
            </div>
          </div> :
          <h1>ERROR</h1>
          }

          <div className='tips-control-block'>
            <input type='radio' name='tips-slider' id='tips-slider1' className='points-control-input'></input>
            <input type='radio' name='tips-slider' id='tips-slider2' className='points-control-input'></input>
            <input type='radio' name='tips-slider' id='tips-slider3' className='points-control-input'></input>
            <input type='radio' name='tips-slider' id='tips-slider4' className='points-control-input'></input>

            <label onClick={() => {setTipsPage(0)}} htmlFor='tips-slider1' className='points-control-label' id='tips-control1'></label>
            <label onClick={() => {setTipsPage(1)}} htmlFor='tips-slider2' className='points-control-label' id='tips-control2'></label>
            <label onClick={() => {setTipsPage(2)}} htmlFor='tips-slider3' className='points-control-label' id='tips-control3'></label>
            <label onClick={() => {setTipsPage(3)}} htmlFor='tips-slider4' className='points-control-label' id='tips-control4'></label>
          </div>

          <div className='tips-arrows-control-block'>
            <div className='tips-arrow-block' onClick={handleBack}><img src='./arrow-down.svg' className='tips-arrows-control arrow-left' alt='back'></img></div>
            <div className='tips-arrow-block' onClick={handleNext}><img src='./arrow-down.svg' className='tips-arrows-control arrow-right' alt='next'></img></div>
          </div>
        </div>
      </div>
    </>
  )
}


function RegistrationPage({page, setPage, user, setUser}) {


  return (
    <>
      <LittleHeader setPage={setPage} />
      <RegistrationForm user={user} setUser={setUser} setPage={setPage} />
    </>
  )
}

function RegistrationForm({user, setUser, setPage}) {
  const [danns, setDanns] = useState([])
  const [response, setResponse] = useState({})

  function registr(e) {
    e.preventDefault()
    let name = document.getElementById("name").value
    let surname = document.getElementById("surname").value
    let email = document.getElementById("email").value
    let city = document.getElementById("city").value
    let password = document.getElementById("password").value
    let passwordRep = document.getElementById("passwordRep").value

    if (password === passwordRep) {
      // console.log(btoa(password))
      fetch("http://localhost:3001/getusers")
      .then((response) => response.json())
      .then((data) => setDanns(data));

      for (let i = 0; i < danns.length; i++) {
        if (email === danns[i]) {
          alert("Sorry, this email is already busy")
        } else {
          let userData = {
            email: email,
            name: name,
            surname: surname,
            city: city,
            password: password
          }

          

          fetch("http://localhost:3001/registration", {method: "POST", headers: {
              "Content-Type": "application/json"
            }, 
            body: JSON.stringify(userData)
          }).then((response) => {
            if (response.status !== 200) {
              alert("Регистрация не получилась :(")
            }
            else {
              response.json()
            }
          }).then((data) => setResponse(data))

          // console.log(JSON.parse(response))
        }
      }
    } else {
      alert("Sorry, passwords aren't same")
    }
  }

  return (
    <>
      <div className='orange-block max'>
        <div className='container'>
          <form className='revert-orange-block reg-form' onSubmit={(e) => {registr(e)}}>
            <div className='reg-title-line'>
              <p onClick={() => {setPage("main")}}><u>Go Back</u></p>
              <h5>Registration</h5>
            </div>

            <div className='reg-input-block'>
              <label htmlFor='email' className='reg-label'>Email</label>
              <input name="email" id='email' placeholder='test@test.com' className='reg-input' type='email'></input>
            </div>

            <div className='reg-input-block'>
              <label htmlFor='name' className='reg-label'>Name</label>
              <input name="name" id='name' placeholder='Ivan' className='reg-input' type='text'></input>
            </div>

            <div className='reg-input-block'>
              <label htmlFor='surname' className='reg-label'>Surname</label>
              <input name="surname" id='surname' placeholder='Ivanov' className='reg-input' type='text'></input>
            </div>

            <div className='reg-input-block'>
              <label htmlFor='city' className='reg-label'>City</label>
              <input name="city" id='city' placeholder='Moscow' className='reg-input' type='text'></input>
            </div>

            <div className='reg-input-block'>
              <label htmlFor='password' className='reg-label'>Password</label>
              <input name="password" id='password' placeholder='' className='reg-input' type='password'></input>
            </div>

            <div className='reg-input-block'>
              <label htmlFor='passwordRep' className='reg-label'>Repeat password</label>
              <input name="passwordRep" id='passwordRep' placeholder='' className='reg-input' type='password'></input>
            </div>

            <div className='reg-bottom-block'>
              <button className='reg-button'>Sign Up</button>
              <p>Have got an account?</p>
              <p onClick={() => {setPage("authorization")}}><u><b>Sign In</b></u></p>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}


function AuthorizationPage({page, setPage, user, setUser}) {
  return (
    <>
      <LittleHeader setPage={setPage} />
      <AuthorizationForm user={user} setUser={setUser} setPage={setPage} />
    </>
  )
}

function AuthorizationForm({user, setUser, setPage}) {
  return (
    <>
      <div className='orange-block max'>
        <div className='container'>
          <form className='revert-orange-block reg-form'>
            <div className='reg-title-line'>
              <p onClick={() => {setPage("main")}}><u>Go Back</u></p>
              <h5>Authorization</h5>
            </div>
    
            <div className='reg-input-block'>
              <label htmlFor='email' className='reg-label'>Email</label>
              <input name="email" id='email' placeholder='test@test.com' className='reg-input' type='email'></input>
            </div>
    
            <div className='reg-input-block'>
              <label htmlFor='password' className='reg-label'>Password</label>
              <input name="password" id='password' placeholder='' className='reg-input' type='password'></input>
            </div>
    
            <div className='reg-input-block'>
              <label htmlFor='passwordRep' className='reg-label'>Repeat password</label>
              <input name="passwordRep" id='passwordRep' placeholder='' className='reg-input' type='password'></input>
            </div>
    
            <div className='reg-bottom-block'>
              <button className='reg-button'>Sign In</button>
              <p>Haven't got an account?</p>
              <p onClick={() => {setPage("registration")}}><u><b>Sign Up</b></u></p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}