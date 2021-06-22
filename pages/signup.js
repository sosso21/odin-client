import { useState, useEffect } from "react";
import Flip from "react-reveal/Flip";
import Error from "../components/error.jsx";

import Footer from "../components/footer";
import Header from "../components/header";
import StyleSignup from "../styles/log.module.css";
import HeadComponents from  "../components/HeadComponents"
import { useRouter } from "next/router";
 

const Signup = () => {
  const router = useRouter();
  const [log, setLog] = useState({
    condition: false,
    name: "",
    lastname: "",
    email: "",
    pass1: "",
    pass2: "",
  });
  const [seePass1, setSeePass1] = useState(false);
  const [seePass2, setSeePass2] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");
  const [disableBTN, setDisableBTN] = useState(false)
 
  const [PageState, setPageState] = useState(1);

  const changeLog = (element) => {
    setLog({
      ...log,
      ...element,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (log.pass1 != log.pass2) {
      return setErrorLogin({
        error: "les mots de passes ne sont pas indentique",
      })
    }
    else{
      
setDisableBTN(false) 

  setPageState(2);
  localStorage.setItem( 'token', log.email+"%pass%"+ log.pass1 ); 
  localStorage.setItem( 'isAdmin', false); 
    setTimeout(() => {
      router.push("/univ")
    }, 5000);
     
    }

    /// when we finish api


    const header = {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: new URLSearchParams({
        fname: log.name,
        lname: log.lastname,
        email: log.email,
        pass: log.pass1,
        pass1:log.pass1,
        pass2:log.pass2
      }).toString(),
    };
setDisableBTN(true)
    fetch(process.env.URLSERVER+ "/api/register", header)
      .then((res) => res.json())
      .then(
        (result) => {
setDisableBTN(false)
          setErrorLogin(result);
          if (result.success != undefined) {
            setPageState(2);
            setTimeout(() => {
              router.push("/univ")
            }, 5000);
          }
        },
        (err) => {
          console.log("Une erreur c' est produit:", err);
        }
      );
  };
 
  return (
    <>
         <HeadComponents title="Inscription" />
      <main className={`${StyleSignup.bglog} ${StyleSignup.bgSignup}`}>
        <Header />
        <section
          className={StyleSignup.wResponsive + " container text-center my-4"}
        >
          
          {PageState == 1 ? (
            <form onSubmit={(e) => handleSubmit(e)}>
              <h2 className="fw-lighter my-4 text-white">S'inscrire  </h2>
              <div className="input-group my-1">
                <input
                  value={log.name}
                  onChange={(e) =>
                    changeLog({
                      name: e.target.value,
                    })
                  }
                  type="text"
                  className="form-control"
                  placeholder="Nom"
                  required
                />
              </div>
              <div className="input-group my-1">
                <input
                  value={log.lastname}
                  onChange={(e) =>
                    changeLog({
                      lastname: e.target.value,
                    })
                  }
                  type="text"
                  className="form-control "
                  placeholder="Prénom"
                  required
                />
              </div>
              <div className="input-group my-1">
                <input
                  value={log.email}
                  onChange={(e) =>
                    changeLog({
                      email: e.target.value,
                    })
                  }
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="input-group my-1">
                <input
                  value={log.pass1}
                  onChange={(e) =>
                    changeLog({
                      pass1: e.target.value,
                    })
                  }
                  type={seePass1 ? "text" : "password"}
                  className="form-control"
                  placeholder="Mot de passe (min 8 caractères)"
                  required
                />
              </div>
              <div className="input-group ">
                <i
                  onClick={() => setSeePass1(!seePass1)}
                  className={
                    StyleSignup.eyesItem +
                    ` text-hermes bi ${
                      seePass1 ? "bi-eye-fill" : "  bi-eye-slash-fill"
                    } `
                  }
                ></i>
              </div>
              <div className="input-group my-1">
                <input
                  value={log.pass2}
                  onChange={(e) =>
                    changeLog({
                      pass2: e.target.value,
                    })
                  }
                  type={seePass2 ? "text" : "password"}
                  className="form-control "
                  placeholder="Confirmez le  Mot de passe"
                  required
                />
              </div>
              <div className="input-group ">
                <i
                  onClick={() => setSeePass2(!seePass2)}
                  className={
                    StyleSignup.eyesItem +
                    ` text-hermes bi ${
                      seePass2 ? "bi-eye-fill" : "  bi-eye-slash-fill"
                    } `
                  }
                ></i>
              </div>
              <label className="text-white" htmlFor="conditions">
                <input
                  onChange={() =>
                    changeLog({
                      condition: !log.condition,
                    })
                  }
                  checked={log.condition}
                  className="form-check-input"
                  type="checkbox"
                  required
                  id="conditions"
                />
                J 'admet avoir lûs et accepter
                
                  <i  className="text-primary">
                    les Condituins et termes d 'utilisation
                  </i> 
              </label>
              {(errorLogin.error && !disableBTN ) && <Error response={errorLogin} />}
              <div className="input-group ">
                <button className={"mx-auto my-4 btn-lg btn  btn-hermes "+ (disableBTN && " disabled")}>
                S'inscrire 
                </button>
              </div>
            </form>
          ) : (
            <div align="center" className="my-4 text-success">
              <Flip>
                <i
                  style={{
                    "font-size": "20rem",
                  }}
                  className="d-block bi bi-check-circle-fill"
                >
                  
                </i>
              </Flip>
              <span className="text-white">
                
                {errorLogin.success}.
                <i 
                  className="btn text-primary "
                >
                  
                  Renvoyer ?
                </i>
              </span>
            </div>
          )}
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Signup;
