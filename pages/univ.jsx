import { useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'
import Header from "../components/header";
import Footer from "../components/footer";
import Spiner from "../components/Spiner.jsx";
import { useClass } from "../plugin/thme.js";
import HeadComponents from  "../components/HeadComponents"
import Bounce from "react-reveal/Bounce";
import Search from "../components/search.jsx";
 


import StyleUniv from "../styles/univ.module.css"


export default () =>
{
  
  const sliderRef = useRef("");
  const router = useRouter();
 
  const [darkTheme, setDarkTheme, consumer] = useClass();
  const [prediction, setPrediction] = useState("")
  const [filter, setFilter] = useState({
    contry:[],
curriculum:"",
level:"",
tcl:"",
publicSchool:"",
languages:[]
  })

  const [allFilter, setallFilter] = useState({
    curriculum: [ "Analyse de bases de données" , "Big Data" , "Cloud computing", "Génie logiciel" , "réseau informatique" , "Sécurité informatique" , "Architecture logicielle et matérielle" , "Conception d'applications" , "Système d'information" , "intelligence artificielle" , "réseau informatique" ],
    languages:[ "Anglais" , "Français" , "Chinois" , "allemand" , "Espagnol" , "Italien" ],
    contry:[ "États-Unis" , "Chine" , "Allemagne" , "Suisse" , "France", "Espagne" , "Angleterre" , "Italie" , "Canada"],
    level:[1,2,3,4,5],
    tcl:[true,false],
    publicSchool:[true,false]
  } )

  return (
    <>
    <HeadComponents/>
      {router.isReady ? (
        <main className={StyleUniv.sectionRoot }>
           <Header darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
          
        <div className={consumer+" "+StyleUniv.container }>
          {prediction ? <Bounce top> <Search /> </Bounce>:
          <Bounce top>
          <section className=" mx-auto">
             <h2 className="my-4 mx-auto fw-lighter text-center">Trouver universités</h2>
             <p className="text-center m-4"><i className="bi bi-info-circle-fill mx-4"></i> Sélectionnez votre profil type en cliquant sur les choix ci-dessous , et obtenez des prédiction sur vos potentielles établissements</p>
             <button onClick={()=>sliderRef.current.scrollIntoView({ behavior: 'smooth' })} className="btn btn-lg btn-hermes d-block my-4 mx-auto" >Démarrer</button>
          </section>

          <section ref={sliderRef} className="mx-auto test-center">
            <h2 className="my-4 mx-auto fw-lighter text-center">Sélectionnez votre Niveau : </h2>
            <div className=" my-4 mx-auto d-flex justify-content-around align-item-center flex-wrap">

            {allFilter.level.map(i => <button className={"mx-4 my-2 btn btn-lg "+ (filter.level == i  ? "btn-hermes" : "btn-outline-hermes" )  } onClick={()=> setFilter({...filter, level:i})} >Bac + {i} </button> ) }
            </div>
          </section>

          <section  className="mx-auto test-center">
            <h2 className="my-4 mx-auto fw-lighter text-center">Sélectionnez vos Langues : </h2>
            <div className=" my-4 mx-auto d-flex justify-content-around align-item-center flex-wrap">

            {allFilter.languages.map(i => <button className={"mx-4 my-2 btn btn-lg "+ (filter.languages.includes(i)  ? "btn-hermes" : "btn-outline-hermes" )  } onClick={()=> setFilter({...filter, languages:[...filter.languages,i ]})} onDoubleClick={()=>setFilter({...filter, languages:filter.languages.filter(ii=> ii!=i) })} >  { i } </button> ) }
            </div>
          </section>

          
          <section  className="mx-auto test-center">
            <h2 className="my-4 mx-auto fw-lighter text-center">Quel sont les pays qui vous intéresse? </h2>
            <div className=" my-4 mx-auto d-flex justify-content-around align-item-center flex-wrap">

            {allFilter.contry.map(i => <button className={"mx-4 my-2 btn btn-lg "+ (filter.contry.includes(i)  ? "btn-hermes" : "btn-outline-hermes" )  } onClick={()=> setFilter({...filter, contry:[...filter.contry,i ]})} onDoubleClick={()=>setFilter({...filter, contry:filter.contry.filter(ii=> ii!=i) })} >  { i } </button> ) }
            </div>
          </section>
        
        
          <section  className="mx-auto test-center">
            <h2 className="my-4 mx-auto fw-lighter text-center">Quel est la spatialité que vous voulez étudier?</h2>
            <div className=" my-4 mx-auto d-flex justify-content-around align-item-center flex-wrap">

            { allFilter.curriculum.map(i => <button className={"mx-4 my-2 btn btn-lg "+ (filter.curriculum == i  ? "btn-hermes" : "btn-outline-hermes" )  } onClick={()=> setFilter({...filter, curriculum: i})} onDoubleClick={()=>setFilter({...filter, curriculum:""})} >  { i } </button> ) }
            </div>
          </section>


          <section  className="mx-auto test-center">
            <h2 className="my-4 mx-auto fw-lighter text-center">Disposez vous d'un test de langue?</h2>
            <div className=" my-4 mx-auto d-flex justify-content-around align-item-center flex-wrap">

            { allFilter.tcl.map(i => <button className={"mx-4 my-2 btn btn-lg "+ (filter.tcl == i  ? "btn-hermes" : "btn-outline-hermes" )  } onClick={()=> setFilter({...filter, tcl: i})}  >  { i ? "oui" : "non" } </button> ) }
            </div>
          </section>

          
          <section  className="mx-auto test-center">
            <h2 className="my-4 mx-auto fw-lighter text-center">Quel type d'université vous intéresse ? </h2>
            <div className=" my-4 mx-auto d-flex justify-content-around align-item-center flex-wrap">

            { allFilter.publicSchool.map(i => <button className={"mx-4 my-2 btn btn-lg "+ (filter.publicSchool == i  ? "btn-hermes" : "btn-outline-hermes" )  } onClick={()=> setFilter({...filter, publicSchool: i})}  >  { i ? "Public" : "Privé" } </button> ) }
            </div>
          </section>
          <hr/>
          <button className="btn btn-dark btn -lg my-4 mx-auto">Valider </button>
          </Bounce>
          }
          </div>


          <Footer />
        </main>
      ) : (
        <Spiner />
      )}
    </>
  );
};
