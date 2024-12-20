import './index.css';
import { useState, useEffect } from 'react';
import footerList from './footerList.js';

export default function App() {
  const [page, setPage] = useState("main")
  const token = localStorage.getItem("token")
  const [products, setProducts] = useState([])
  const [likedProducts, setLikedProducts] = useState([])
  const [basketProducts, setBasketProducts] = useState([])


  return (
    <>
      {page === "main" && <MainPage page={page} setPage={setPage} products={products} setProducts={setProducts} token={token} likedProducts={likedProducts} setLikedProducts={setLikedProducts} basketProducts={basketProducts} setBasketProducts={setBasketProducts} />}
      {page === "registration" && <RegistrationPage page={page} setPage={setPage} />}
      {page === "authorization" && <AuthorizationPage page={page} setPage={setPage} />}
      {page === "waitlist" && <WaitListPage page={page} setPage={setPage} token={token} likedProducts={likedProducts} setLikedProducts={setLikedProducts} setBasketProducts={setBasketProducts} basketProducts={basketProducts} />}
      {page === "basket" && <BasketPage page={page} setPage={setPage} likedProducts={likedProducts} setLikedProducts={setLikedProducts} token={token} />}
      {page === "buying" && <BuyingPage page={page} setPage={setPage} token={token} />}
    </>
  )
}




function Header({setPage, page, token}) {
  let likeClass = "nav-icon"
  let cartClass = "nav-icon"
  if(page === "basket") {
    cartClass = "nav-icon active-icon"
  }
  if(page === "waitlist") {
    likeClass = "nav-icon active-icon"
  }

  function logOut() {
    localStorage.removeItem("token")
  }

  return (
    <>
      <div className='orange-block pb'>
        <div className='container'>
          <header>
            <nav>
              <h5 className='title' onClick={() => {setPage("main")}}>Funiro.</h5>
              
            </nav>

            <nav>
              {token !== null && <img onClick={() => {setPage("waitlist")}} src='./like.svg' className={likeClass} alt='waitList'></img>}
              {token !== null && <img onClick={() => {setPage("basket")}} src='./cart.svg' className={cartClass} alt='basket'></img>}              
              {token !== null && <button onClick={() => {logOut()}}>Sign Out</button>}              
              {token === null && <button onClick={() => {setPage("registration")}}>Sign Up</button> }
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

function Footer({setPage, page}) {
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
        </footer>
      </div>
    </>
  )
}

function FooterList({list}) {
  let listItem = []
  for (let i = 0; i < list.elements.length; i++) { 
    listItem.push(<p className='gray-text' key={i}>{list.elements[i]}</p>)
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


function MainPage({setPage, page, products, setProducts, token, likedProducts, setLikedProducts, basketProducts, setBasketProducts}) {
  return (
    <>
      <Header setPage={setPage} page={page} token={token} />
      <MainHeaderSliderBlock />
      <MainFeatures />
      <MainProductsBlock products={products} setProducts={setProducts} token={token} setPage={setPage} likedProducts={likedProducts} setLikedProducts={setLikedProducts} basketProducts={basketProducts} setBasketProducts={setBasketProducts} />
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

function MainProductsBlock({products, setProducts, token, setPage, likedProducts, setLikedProducts, basketProducts, setBasketProducts}) {
  const [response, setResponse] = useState({})
  const [likedIds, setLikedIds] = useState([])



  useEffect(() => {
    fetch("http://localhost:3001/getproducts")
    .then((response) => response.json())
    .then((data) => setProducts(data));

    if(token !== null) {
      fetch("http://localhost:3001/getliked", {method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then((response) => response.json())
      .then((data) => {
        const likedIdsArray = data.map((product) => product.productId);
  
        fetch("http://localhost:3001/getproductbyid", {method: "POST",       
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({likedIds: likedIdsArray})
        })
        .then((response) => response.json())
        .then((data) => setLikedProducts(data));
      });

      fetch("http://localhost:3001/getbasket", {method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })      
      .then((response) => response.json())
      .then((data) => {setBasketProducts(data)})
    }

  }, [basketProducts])

  function handleAddToBasket(id) {
    fetch("http://localhost:3001/addtobasket", {method: "POST",       
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({productId: id})
    })
    .then((response) => response.json())
    .then((data) => setResponse(data));
  }

  function handleDeleteFromBasket(id) {
    let prodId = {
      productId: id
    }

    fetch("http://localhost:3001/deletefrombasket", {method: "DELETE",  
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(prodId)
    })
    .then((response) => {
      return response.json()
    }).then((data) => console.log(data));
  }

  function handleLike(id) {
    document.getElementById(`${id}-like`).classList.add("liked")

    let body = {
      productId: id
    }

    fetch("http://localhost:3001/addlike", {method: "POST",  
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body)
    }).then((response) => {
      return response.json()
    }).then((data) => setResponse(data))
  }

  function handleDislike(id) {
    document.getElementById(`${id}-like`).classList.remove("liked")

    let body = {
      productId: id
    }

    fetch("http://localhost:3001/deletelike", {method: "DELETE",  
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body)
    }).then((response) => {
      return response.json()
    }).then((data) => setResponse(data))
  }

  return (
    <>
      <div className='container mb'>
        <div className='products'>
          <h2>Our Products</h2>
          <div className='products-block'>
            {products.map((product) => <MainProductCard key={product.id} itemsList={product} setPage={setPage} handleLike={handleLike} handleDislike={handleDislike} token={token} likedProducts={likedProducts} handleAddToBasket={handleAddToBasket} basketProducts={basketProducts} handleDeleteFromBasket={handleDeleteFromBasket} />)}
          </div>
        </div>
      </div>
    </>
  )
}

function MainProductCard({itemsList, handleLike, handleDislike, token, setPage, likedProducts, handleAddToBasket, basketProducts, handleDeleteFromBasket}) {

  function handleHover(id) {
    document.getElementById(`${id}`).classList.add("card-hover")
  }

  function handleLeave(id) {
    document.getElementById(`${id}`).classList.remove("card-hover")
  }

  let likeClass = 'card-hover-icon like'
  if (likedProducts.map(function(e) { return e.id; }).indexOf(itemsList.id) !== -1) {
    likeClass = "card-hover-icon like liked"
  }

  let likeId = itemsList.id + "-like"

  function handleClick(id) {
    if (document.getElementById(`${id}-like`).className.baseVal === "card-hover-icon like liked") {
      handleDislike(id)
    } else {
      handleLike(id)
    }
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
            <p className='light-text product-card-last-price'>{itemsList.oldPrice}</p>
          </div>
        </div>

        {itemsList.type === "new" &&
          <div className='product-card-new'>
            <p className='white-text'>New</p>
          </div>
        }
        {itemsList.type === "discount" &&
          <div className='product-card-sale'>
            <p className='white-text'>- {itemsList.percent}%</p>
          </div>
        }
        
        <div className='card-hover-invisible' id={itemsList.id}>
          <div className='card-hover-block'>
            {token === null ?
              <button className='card-hover-button' onClick={() => {setPage("registration")}}>Add to cart</button> :
              basketProducts.map(function(e) { return e.id; }).indexOf(itemsList.id) !== -1 ? 
              <button className='card-hover-button' onClick={() => handleDeleteFromBasket(itemsList.id)}>Delete from cart</button> :
              <button className='card-hover-button' onClick={() => handleAddToBasket(itemsList.id)}>Add to cart</button>
            }
            {token !== null &&
              <div className='card-hover-line'>
                <div className='card-hover-item'>
                  <img src='share.svg' alt='share' className='card-hover-icon'></img>
                  <p className='white-text'><b>Share</b></p>
                </div>

                <div className="card-hover-item like-item" onClick={() => {handleClick(itemsList.id)}}>
                  <svg id={likeId} className={likeClass} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9996 21.0542C-8 10 5.99999 -1.99997 11.9996 5.58809C18 -1.99997 32 10 11.9996 21.0542Z" stroke="#ffffff" stroke-width="1.8"/>
                  </svg>
                  <p className='white-text'><b>Like</b></p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

function MainTips() {
  const [tipsPage, setTipsPage] = useState(0)

  function handleNext() {
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


function RegistrationPage({page, setPage}) {
  return (
    <>
      <LittleHeader setPage={setPage} />
      <RegistrationForm setPage={setPage} />
    </>
  )
}

function RegistrationForm({setPage}) {
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
        let userData = {
          email: email,
          name: name,
          surname: surname,
          city: city,
          password: password
        }

        fetch("http://localhost:3001/registration", {method: "POST",  
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData)
        }).then((response) => {
          if (response.status === 409) {
            alert("Email isn't unuque")
          } else {
            return response.json()
          }
        }).then((data) => localStorage.setItem("token", data.token))
        
        setPage("main")
        alert("Registration was successful")
    } else {
      alert("Sorry, passwords aren't same")
    }
  }

  return (
    <>
      <div className='orange-block max'>
        <div className='container'>
          <form className='revert-orange-block reg-form' onSubmit={(e) => registr(e)}>
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


function AuthorizationPage({page, setPage}) {
  return (
    <>
      <LittleHeader setPage={setPage} />
      <AuthorizationForm setPage={setPage} />
    </>
  )
}

function AuthorizationForm({setPage}) {
  const [response, setResponse] = useState({})

  function login(e) {
    e.preventDefault()
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    let userData = {
      email: email,
      password: password
    }

    fetch("http://localhost:3001/auth", {method: "POST",  
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData)
    })
    .then((response) => {
      if (response.status === 409) {
        alert("We haven't got user with this email")
      } else if (response.status === 403) {
        alert("Wrong password")
      } else {
        return response.json()
      }
    }).then((data) => localStorage.setItem("token", data.token));
    setPage("main")
    alert("Autentifiacation was successful")
  }

  return (
    <>
      <div className='orange-block max'>
        <div className='container'>
          <form className='revert-orange-block reg-form' onSubmit={(e) => {login(e)}}>
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


function WaitListPage({page, setPage, token, likedProducts, setLikedProducts, setBasketProducts, basketProducts}) {
  return (
    <>
      <Header setPage={setPage} page={page} token={token} />
      <WaitListProducts token={token} likedProducts={likedProducts} setLikedProducts={setLikedProducts} setBasketProducts={setBasketProducts} basketProducts={basketProducts} />
      <Footer />
    </>
  )
}

function WaitListProducts({token, likedProducts, setLikedProducts, setBasketProducts, basketProducts}) {
  const [productCards, setProductCards] = useState([])
  const [response, setResponse] = useState([])
  
  function handleAddToBasket(id) {
    fetch("http://localhost:3001/addtobasket", {method: "POST",       
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({productId: id})
    })
    .then((response) => response.json())
    .then((data) => setResponse(data));
  }

  function handleDeleteFromBasket(id) {
    let prodId = {
      productId: id
    }

    fetch("http://localhost:3001/deletefrombasket", {method: "DELETE",  
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(prodId)
    })
    .then((response) => {
      return response.json()
    }).then((data) => setResponse(data));
  }

  useEffect(() => {
    fetch("http://localhost:3001/getliked", {method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then((response) => response.json())
    .then((data) => {
      const likedIdsArray = data.map((product) => product.productId);

      fetch("http://localhost:3001/getproductbyid", {method: "POST",       
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({likedIds: likedIdsArray})
      })
      .then((response) => response.json())
      .then((data) => setLikedProducts(data));
    });

    fetch("http://localhost:3001/getbasket", {method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })      
    .then((response) => response.json())
    .then((data) => {setBasketProducts(data)})
  }, [productCards, basketProducts])

  function handleDislike(id) {
    if (document.getElementById(`${id}-like`).className.baseVal === "card-hover-icon like liked") {
      document.getElementById(`${id}-like`).classList.remove("liked")

      let prodId = {
        productId: id
      }

      fetch("http://localhost:3001/deletelike", {method: "DELETE",  
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(prodId)
      })
      .then((response) => {
        return response.json()
      }).then((data) => setProductCards(data));
    }
  }

  return (
    <>
      <div className='container mb pt'>
        <div className='products'>
          <h2>Favourite List</h2>
          <div className='products-block'>
            {likedProducts.map((product) => <WaitProductCard key={product.id} handleDislike={handleDislike} itemsList={product} likedProducts={likedProducts} setLikedProducts={setLikedProducts} handleAddToBasket={handleAddToBasket} handleDeleteFromBasket={handleDeleteFromBasket} basketProducts={basketProducts} />)}
          </div>
          {likedProducts.length === 0 && <h2>Your list of favourites is empty</h2>}
        </div>
      </div>
    </>
  )
}

function WaitProductCard({itemsList, likedProducts, setLikedProducts, handleDislike, handleAddToBasket, handleDeleteFromBasket, basketProducts}) {
  function handleHover(id) {
    document.getElementById(`${id}`).classList.add("card-hover")
  }

  function handleLeave(id) {
    document.getElementById(`${id}`).classList.remove("card-hover")
  }

  let likeClass = 'card-hover-icon like'
  if (likedProducts.map(function(e) { return e.id; }).indexOf(itemsList.id) !== -1) {
    likeClass = "card-hover-icon like liked"
  }

  let likeId = itemsList.id + "-like"

  return (
    <>
      <div className='product-card' onMouseEnter={() => {handleHover(itemsList.id)}} onMouseLeave={() => {handleLeave(itemsList.id)}}>
        <img src={itemsList.img} className='product-card-img' alt='Syltherine'></img>
        <div className='product-card-text-block'>
          <h5>{itemsList.name}</h5>
          <p className='gray-text'>{itemsList.subtitle}</p>
          <div className='product-card-text-line'>
            <h6>Rp {itemsList.price}</h6>
            <p className='light-text product-card-last-price'>{itemsList.oldPrice}</p>
          </div>
        </div>

        {itemsList.type === "new" &&
          <div className='product-card-new'>
            <p className='white-text'>New</p>
          </div>
        }
        {itemsList.type === "discount" &&
          <div className='product-card-sale'>
            <p className='white-text'>- {itemsList.percent}%</p>
          </div>
        }
        
        <div className='card-hover-invisible' id={itemsList.id}>
          <div className='card-hover-block'>
            {basketProducts.map(function(e) { return e.id; }).indexOf(itemsList.id) !== -1 ? 
              <button className='card-hover-button' onClick={() => handleDeleteFromBasket(itemsList.id)}>Delete from cart</button> :
              <button className='card-hover-button' onClick={() => handleAddToBasket(itemsList.id)}>Add to cart</button>
            }
            <div className='card-hover-line'>
              <div className='card-hover-item'>
                <img src='share.svg' alt='share' className='card-hover-icon'></img>
                <p className='white-text'><b>Share</b></p>
              </div>

              <div className='card-hover-item' onClick={() => {handleDislike(itemsList.id)}}>
                <svg id={likeId} className={likeClass} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.9996 21.0542C-8 10 5.99999 -1.99997 11.9996 5.58809C18 -1.99997 32 10 11.9996 21.0542Z" stroke="#ffffff" stroke-width="1.8"/>
                </svg>
                <p className='white-text'><b>Like</b></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


function BasketPage({page, setPage, likedProducts, setLikedProducts, token}) {
  return (
    <>
      <Header setPage={setPage} page={page} token={token} />
      <BasketProductPage likedProducts={likedProducts} setLikedProducts={setLikedProducts} token={token} setPage={setPage} />
      <Footer />
    </>
  )
}

function BasketProductPage({likedProducts, setLikedProducts, token, setPage}) {
  const [productCards, setProductCards] = useState([])
  const [basket, setBasket] = useState([])
  const [response, setResponse] = useState([])

  let basketCounts = []

  useEffect(() => {
    fetch("http://localhost:3001/getbasket", {method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then((response) => response.json())
    .then((data) => {setBasket(data);});

    if(token !== null) {
      fetch("http://localhost:3001/getliked", {method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then((response) => response.json())
      .then((data) => {
        const likedIdsArray = data.map((product) => product.productId);
  
        fetch("http://localhost:3001/getproductbyid", {method: "POST",       
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({likedIds: likedIdsArray})
        })
        .then((response) => response.json())
        .then((data) => setLikedProducts(data));
      });
    }
  }, [productCards])

  let price = 0

  for (let i = 0; i < basket.length; i++) {
    let product = basket[i]
    let itemPrice = product.count * product.price
    price = price + itemPrice
  }

  function handleDelete(id) {
    let prodId = {
      productId: id
    }

    fetch("http://localhost:3001/deletefrombasket", {method: "DELETE",  
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(prodId)
    })
    .then((response) => {
      return response.json()
    }).then((data) => setProductCards(data));
  }

  function handleLike(id) {
    document.getElementById(`${id}-like`).classList.add("liked")

    let body = {
      productId: id
    }

    fetch("http://localhost:3001/addlike", {method: "POST",  
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body)
    }).then((response) => {
      return response.json()
    }).then((data) => setResponse(data))
  }

  function handleDislike(id) {
    document.getElementById(`${id}-like`).classList.remove("liked")

    let body = {
      productId: id
    }

    fetch("http://localhost:3001/deletelike", {method: "DELETE",  
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body)
    }).then((response) => {
      return response.json()
    }).then((data) => setResponse(data))
  }

  return (
    <>
      <div className='container mb pt'>
        <div className='product'>
          <h2>Basket</h2>
          <div className='basket'>
            <div className='basket-block'>
              {basket.map((product) => <BasketProductCard key={product.id} handleDelete={handleDelete} setBasket={setBasket} itemsList={product} likedProducts={likedProducts} setLikedProducts={setLikedProducts} token={token} setPage={setPage} handleDislike={handleDislike} handleLike={handleLike} />)}
            </div>
            {/* {basket.length === 0 && <h2>Your list of favourites is empty</h2>} */}
            <div className='basket-price'>
              <div className='basket-price-text-block'>
                <h5>Price List</h5>
                <div className='basket-price-block'>
                  {basket.map((product) => <PriceListItem key={product.id} product={product} />)}
                </div> 

                <div className='basket-price-item'>
                  <h5>Total:</h5>
                  <p><u>Rp {price}</u></p>
                </div>
              </div>
              <button className='basket-button' onClick={() => {setPage("buying")}}>Buy</button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

function PriceListItem({product}) {
  // setPrice((n) => n + (product.price * product.count))
  return (
    <>
      <div className='basket-price-item'>
        <p className='gray-text'>{product.name} <u>{product.count}</u></p>
        <p><u>Rp {product.price * product.count}</u></p>
      </div>
    </>
  )
}

function BasketProductCard({handleDislike, handleLike, itemsList, likedProducts, setBasket, token, setPage, handleDelete}) {
  const [counter, setCounter] = useState(itemsList.count)
  function handleHover(id) {
    document.getElementById(`${id}`).classList.add("card-hover")
  }

  function handleLeave(id) {
    document.getElementById(`${id}`).classList.remove("card-hover")
  }

  let likeClass = 'card-hover-icon like'
  if (likedProducts.map(function(e) { return e.id; }).indexOf(itemsList.id) !== -1) {
    likeClass = "card-hover-icon like liked"
  }
  
  let likeId = itemsList.id + "-like"

  function handleClick(id) {
    if (document.getElementById(`${id}-like`).className.baseVal === "card-hover-icon like liked") {
      handleDislike(id)
    } else {
      handleLike(id)
    }
  }

  let body = {
    productId: itemsList.id
  }

  function handleCountChange(id, count) {
    setBasket((prevBasket) => {
      const newBasket = prevBasket.map((item) => {
        if (item.id === id) {
          const newCount = Math.max(1, item.count + count);
          return { ...item, count: newCount };
        }
        return item;
      });
  
      const updatedItem = newBasket.find(item => item.id === id);
      if (updatedItem) {
        fetch("http://localhost:3001/updatebasketcount", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            count: updatedItem.count,
            productId: id
          })
        });
      }
  
      return newBasket;
    });
  }

  useEffect(() => {
    fetch("http://localhost:3001/getbasketbyids", {method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }, 
      body: JSON.stringify(body)
    })
    .then((response) => response.json())
    .then((data) => {setCounter(data.count)});
  }, [counter])

  return (
    <>
      <div className='product-card' onMouseEnter={() => {handleHover(itemsList.id)}} onMouseLeave={() => {handleLeave(itemsList.id)}}>
        <img src={itemsList.img} className='product-card-img' alt='Syltherine'></img>
        <div className='product-card-text-block'>
          <h5>{itemsList.name}</h5>
          <p className='gray-text'>{itemsList.subtitle}</p>
          <div className='product-card-text-line'>
            <h6>Rp {itemsList.price}</h6>
            <p className='light-text product-card-last-price'>{itemsList.oldPrice}</p>
          </div>
        </div>

        {itemsList.type === "new" &&
          <div className='product-card-new'>
            <p className='white-text'>New</p>
          </div>
        }
        {itemsList.type === "discount" &&
          <div className='product-card-sale'>
            <p className='white-text'>- {itemsList.percent}%</p>
          </div>
        }
        
        <div className='card-hover-invisible' id={itemsList.id}>
          <div className='card-hover-block'>
            <div className='basket-mini-block'>
              <div className='card-hover-line'>
                <button className='rounded-button' onClick={() => {handleCountChange(itemsList.id, -1)}}>-</button>
                <p className='white-text'>{itemsList.count}</p> 
                <button className='rounded-button' onClick={() => {handleCountChange(itemsList.id, 1)}}>+</button>
              </div>

              <p className='white-text'><b>Rp {itemsList.count * itemsList.price}</b></p>
            </div>
            

            

            {token === null ?
              <button className='card-hover-button' onClick={() => {setPage("registration")}}>Add to cart</button> :
              <button className='card-hover-button' onClick={() => {handleDelete(itemsList.id)}}>Remove from cart</button>
            }
            {token !== null &&
              <div className='card-hover-line'>
                <div className='card-hover-item'>
                  <img src='share.svg' alt='share' className='card-hover-icon'></img>
                  <p className='white-text'><b>Share</b></p>
                </div>

                {/* <div className="card-hover-item like-item"> */}
                <div className="card-hover-item like-item" onClick={() => {handleClick(itemsList.id)}}>
                  <svg id={likeId} className={likeClass} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9996 21.0542C-8 10 5.99999 -1.99997 11.9996 5.58809C18 -1.99997 32 10 11.9996 21.0542Z" stroke="#ffffff" stroke-width="1.8"/>
                  </svg>
                  <p className='white-text'><b>Like</b></p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}


function BuyingPage({page, setPage, token}) {
  return (
    <>
      <Header setPage={setPage} page={page} token={token} />
      <BuyingForm setPage={setPage} />
    </>
  )
}


function BuyingForm({setPage}) {
  return (
    <>
      <div className='orange-block max'>
        <div className='container'>
          <form className='revert-orange-block reg-form'>
            <div className='reg-title-line'>
              <p onClick={() => {setPage("basket")}}><u>Go Back</u></p>
              <h5>Paying</h5>
            </div>
    
            <div className='reg-input-block'>
              <label htmlFor='email' className='reg-label'>Card number</label>
              <input name="card-num" id='card-num' placeholder='1111 1111 1111 1111' className='reg-input' type='text'></input>
            </div>
    
            <div className='reg-input-block'>
              <label htmlFor='password' className='reg-label'>Date</label>
              <input name="date" id='date' placeholder='10/26' className='reg-input' type='text'></input>
            </div>
    
            <div className='reg-input-block'>
              <label htmlFor='password' className='reg-label'>CVV</label>
              <input name="cvv" id='cvv' placeholder='888' className='reg-input' type='password'></input>
            </div>

            <div className='reg-input-block'>
              <label htmlFor='password' className='reg-label'>Postal code</label>
              <input name="postal-code" id='postal-code' placeholder='886070' className='reg-input' type='number'></input>
            </div>

            <div className='reg-input-block'>
              <label htmlFor='password' className='reg-label'>Adress</label>
              <input name="adress" id='adress' placeholder='Surgut, University st., 21, 190' className='reg-input' type='text'></input>
            </div>
    
            <div className='reg-bottom-block'>
              <button className='reg-button'>Buy</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}