import { useState, useEffect } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Link from 'next/link';
import StyleHeader from "../styles/Header.module.css";
import { useRouter } from 'next/router';
import { useClass } from "../plugin/thme.js"

const Header = ({ darkTheme = false, setDarkTheme = () => [] }) =>
{

  const router = useRouter();

  const [isConnect, setUsConnect] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
 
/*
// deleete after 
 useEffect(() =>
  {
 if(router.route == "/univ"){
  setUsConnect(true)
 }
 if(router.route == "/admin"){
  setIsAdmin(true)
 }
  }, [router.route])

*/

 
  useEffect(() =>
  {

    if (localStorage.getItem("token")) {
      setUsConnect(true);
      if(localStorage.getItem("isAdmin")){
        setIsAdmin(true)
      }

      //sessionStorage.getItem("userInfo") && setIsAdmin(JSON.parse(sessionStorage.getItem("userInfo")).isAdmin)

      if ((["/login", "/signup" ]).includes(router.route) ) {
        router.push("/univ");
      }
      if (router.route =="/admin" && !localStorage.getItem("isAdmin") ) {
        router.push("/");
      }
    }
    else if ((["/admin","univ"]).includes(router.route)) {
      router.push("/");
    }
  }, [router.route])

  const disconnect = () =>
  {

    localStorage.clear();
    sessionStorage.clear();;
    if(router.route!= "/"){
      router.push("/");
    }else{
      router.reload();
    }
  }
 

  return (
    <header className={StyleHeader.sticky} >
      <Navbar className="px-4" nnecllapseOnSelect expand="lg" bg="dark" variant="dark">
        <Link href="/" ><a title="home" className="navbar-brand"> <h1 className={StyleHeader.FFTitle + " fs-6"}>{process.env.NAMEWEBSITE.toUpperCase()} </h1> </a>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className=" justify-content-end text-center" id="responsive-navbar-nav">
          <Nav>

          <button className="nav-link btn btn-link text-left" onClick={() => setDarkTheme(!darkTheme)} >{darkTheme ? <i className="bi bi-moon-stars-fill"></i> : <i className="bi bi-sun-fill"></i>} Thème</button>
 

          </Nav>
          {!!isConnect ?
            <Nav className="mr-auto">
              {!!isAdmin && <Link href="/admin"><a className="nav-link"><i className="bi bi-gear-fill mx-1"></i>Administration</a></Link>}
              <Link href="/univ"><a className="nav-link"><i className="bi bi-list-check mx-1"></i>ATrouver universités</a></Link>
              

              <button className="nav-link btn btn-link" onClick={(e) => disconnect()} ><i className="bi bi-person-x-fill mx-1"></i> Déconnexion</button>
            </Nav>
            :
            <Nav className="mr-auto">
              <Link href="/login"><a className="nav-link" title="Connexion" > <i className="bi bi-person-check-fill mx-1"></i>Se connecter</a></Link>
              <Link href="/signup"><a className="nav-link" title="Inscription" ><i className="bi bi-person-plus-fill mx-1"></i>S'inscrire </a></Link>
            </Nav>

          }

        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;

