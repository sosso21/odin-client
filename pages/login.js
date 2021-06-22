import {useState,useEffect} from 'react';
import Footer from "../components/footer";
import Header from "../components/header";
 import StyleLogin from "../styles/log.module.css"
import HeadComponents from  "../components/HeadComponents"

import { useRouter } from "next/router";


const Signin=() => {
  const router = useRouter();

  
  const [ log,setLog ]=useState( {email: '',pass: ''} );
  const [ seePass,setSeePass ]=useState( false );
  const [ errorLogin,setErrorLogin ]=useState("");
  const [disableBTN, setDisableBTN] = useState(false)


  const onConnect=(e) => {
    e.preventDefault();

 
    let isAdmin =false 
    if(log.email =="admin@odin.com" && log.pass =="123445" ){
      isAdmin= true
    }
      localStorage.setItem( 'token', log.email+"%pass%"+ log.pass1 ); 
      localStorage.setItem( 'isAdmin', isAdmin); 
      return  router.push("/univ")


    /// after finish  api 
    const header={
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: new URLSearchParams( {
        email: log.email,
        pass: log.pass
      } ).toString()
    };
    disableBTN(true)
    fetch( `${process.env.URLSERVER}/api/connect`,header )
      .then( res => res.json() )
      .then( ( result) => {
        disableBTN(false)
        if ( result.error==-1 ) {
          setErrorLogin(-1)
          return sendEmaillToConfirm()
        }
        if ( result.token!= undefined ) {
          localStorage.setItem( "token",result.token);
          sessionStorage.setItem( 'userInfo',JSON.stringify(result.userInfo) );
          return router.push("/")

        } else if ( result.error != undefined ) {
          setErrorLogin(  result.error )
        }
      },
        ( err ) => {
          console.log( 'Une erreur c\' est produit:',err )
        }
      )
  }
 

  
  return (
    <>
       <HeadComponents title="Connexion" />

      <main className={`${StyleLogin.bglog} ${StyleLogin.bgLogin}` }>
        <Header />
        <section className={StyleLogin.wResponsive +" container my-4 text-center"}>
          <h2 className="fw-lighter my-4">Se connecter </h2>


          <form onSubmit={e => onConnect( e )} >
       
            <div className="input-group my-1">
              <input value={log.email} onChange={e => setLog( {email: e.target.value,pass: log.pass} )} type="email" className='form-control' placeholder='email' />
            </div> 
            
            <div className="input-group my-1">
              <input value={log.pass} onChange={e => setLog( {email: log.email,pass: e.target.value} )} type={seePass? 'text':'password'} className='form-control ' placeholder='mot de passe' />
           
           </div>
           <div className="input-group ">
              <i onClick={() =>   setSeePass( !seePass )}  className={StyleLogin.eyesItem+ ` text-hermes bi  ${seePass ? "bi-eye-fill":"  bi-eye-slash-fill" } `} ></i>
            </div>
              
            <div className="input-group">
              {
                (errorLogin && !disableBTN) &&
                <div className="text-center alert alert-danger input-group">
                  {errorLogin!=-1 && <p className="text-center w-100"> {errorLogin} </p>
                    
                  }
                </div>
              }
            </div>
            <button type='submit' className={" my-4 btn-lg btn  btn-hermes "+ (disableBTN && " disabled")}>Se connecter</button>

          </form>
        </section>
 
        <Footer />
      </main>
    </>
  );
};

export default Signin 