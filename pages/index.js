import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'
import Header from "../components/header";
import Footer from "../components/footer";
import Spiner from "../components/Spiner.jsx";
import { useClass } from "../plugin/thme.js";
import HeadComponents from  "../components/HeadComponents"
import Bounce from "react-reveal/Bounce";
import Search from "../components/search.jsx";
import HomeSyle from "../styles/Home.module.css"


export default () =>
{

  
  const router = useRouter();
 
  const [darkTheme, setDarkTheme, consumer] = useClass();
  const [isConnect, setIsConnect] = useState(false)
  
useEffect(() => {
  
  fetch( `https://127.0.0.1/api/prediction/all`,{ headers: {
    'Accept': 'application/json, text/plain, */*',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }})
  .then( res => res.json() )
  .then(result=> {
  console.log('result:', result)
  },err=>{
    console.log('err:', err)

  })

}, []);




useEffect(() => {
if (localStorage.getItem("token")) {
  setIsConnect(true)
  }
}, [router.route])



  return (
    <>
    <HeadComponents/>
      {router.isReady ? (
        <main className={HomeSyle.sectionRoot }>
          <Header darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
          
          <section className="w-50 mt-4 mx-auto ">
            <h1 className="fw-lighter my-4 mx-auto text-center">{process.env.NAMEWEBSITE} </h1>
            <hr/>
            <p className="w-100 mx-auto my-4 fs-5">Trouvez l'université qui vous convient le plus parmi un large choix ,et cela en prenant en compte votre parcoure  </p>
          </section>

<div className="w-50 h-50 mx-auto my-4">
<Bounce top>
<Search classTheme={consumer} />
</Bounce>
</div>
        {isConnect ==false ?  <Bounce left>
          <section className={HomeSyle.ListGroup}>
   
        <Link href="/login">
          <a> <h2> <i className="bi bi-person-check-fill d-block"></i> Se connecter </h2> </a>
        </Link>
   
 
        <Link href="/signup">
          <a> <h2> <i className="bi bi-person-plus-fill d-block"></i>S'inscrire  </h2> </a>
        </Link>
   
    </section>

    </Bounce>: <div className="w-100 my-4  d-flex justify-content-center">
    <Link href="/univ">
          <a className="btn btn-lg btn-hermes mx-auto my-4">  Trouver universités  </a>
        </Link>
    </div> }

          <Footer />
        </main>
      ) : (
        <Spiner />
      )}
    </>
  );
};
