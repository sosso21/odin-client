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


const defData = [
  {name:'Université de Chicago' ,contry : 'États-Unis' ,curriculum : ["Analyse de bases de données" , "Big Data" , "Cloud computing" , "Conception d'applications" , "Sécurité informatique" ] ,languages: [ "Anglais" , "Espagnol"  ] ,level: '1' ,tcl : true ,place: "400" ,publicSchool:false },
  
  {name: 'Université Tsinghua' ,contry : 'Chine' ,curriculum : ["Système d'information" , "Big Data" , "Cloud computing" , "intelligence artificielle" ] ,languages: [ "Anglais" , "Chinois"  ] ,level:  '3' ,tcl : false ,place: "700" ,publicSchool: true },
  
  { name: 'Université technique de Munich' ,contry : 'Allemagne' ,curriculum : [  "Cloud computing" , "intelligence artificielle" , "Génie logiciel"] ,languages: [ "Anglais" , "allemand"  ] ,level:  '5' ,tcl : true ,place: "210" ,publicSchool: true },
  
  { name: 'ETH Zurich' ,contry : ' Suisse' ,curriculum : ["Cloud computing" , "intelligence artificielle" , "Génie logiciel" , "réseau informatique"] ,languages: [ "fr"  ] ,level:  '1' ,tcl : false ,place: "620" ,publicSchool: true },
  
  {name: 'Université Paris Sciences et Lettres' ,contry : ' France' ,curriculum : [  "Cloud computing" , "intelligence artificielle" , "Génie logiciel" , "réseau informatique" , "Sécurité informatique" ] ,languages: [ "Français"  ] ,level:  '1' , tcl :true ,place: "700" , publicSchool:true },
  
  {name:'Université de Navarre ' ,contry : ' Espagne' ,curriculum :[ "Analyse de bases de données" , "Big Data" , "Cloud computing", "Génie logiciel" , "réseau informatique" , "Sécurité informatique" ] ,languages: [ "Français" , "Espagnol"  ] ,level:  '1' ,tcl : false , place: "1350" ,publicSchool: true },
  
  { name: 'Université de Cambridge' ,contry : 'Angleterre' , curriculum :[ "intelligence artificielle" , "Cloud computing" ] ,languages: [ "Anglais" ] ,level:  '5' ,tcl : true ,place: "150" , publicSchool:true },
  
  
  {name: 'Polytechnique de Milan ' ,contry : ' Italie' ,curriculum :["Système d'information" , "Big Data" , "Cloud computing" , "intelligence artificielle" ,  "Génie logiciel"] ,languages: [  "Italien"  ] ,level:  '1' ,tcl : false ,place: "1500" ,publicSchool: true },
  
  {name:  'University of Toronto' ,contry : ' Canada' , 
  curriculum : [ "Analyse de bases de données" , "Big Data" ,"Cloud computing" , "intelligence artificielle" , "Génie logiciel"] , 
   
  languages:  [ "Anglais", "Français"  ] , 
  level:   '1'  , tcl :  true ,  
  place: "530" , publicSchool: true },
  
  {name: 'Johns Hopkins University' ,contry : 'Etats-Unis' ,curriculum : [  "Cloud computing" , "intelligence artificielle" , "Génie logiciel" , "réseau informatique" , "Architecture logicielle et matérielle"] ,languages: [ "Anglais"  ] ,level:  '1' ,tcl : false ,place: "1000" ,publicSchool: true },
  
  
  {name :  'Université de Paris' ,contry : 'France' ,curriculum : ["Cloud computing" , "intelligence artificielle" , "Génie logiciel" , "réseau informatique" , "Sécurité informatique" , "Architecture logicielle et matérielle" , "Conception d'applications" ] ,languages: [ "Français"  ] , level:'1' ,tcl :  false ,place:"1000" ,publicSchool: true },
  
  {name :  'Université de Pékin' ,contry : 'Chine' , curriculum : [  "Analyse de bases de données" , "Big Data" , "Cloud computing", "Génie logiciel" , "réseau informatique" , "Sécurité informatique" , "Architecture logicielle et matérielle" , "Conception d'applications"] , languages:[ "Français" , "Anglais" , "Chinois"  ] ,level: '1' ,tcl :  false , place:"1050" , publicSchool: true },
  
   
  { name : 'Université Agrosup Dijon' ,contry : 'France' ,curriculum :  [ "Analyse de bases de données" , "Big Data" , "Cloud computing", "Génie logiciel" , "réseau informatique" , "Sécurité informatique" , "Architecture logicielle et matérielle" , "Conception d'applications" , "Système d'information" , "intelligence artificielle" ] ,languages:[ "Français" , "Anglais"  ] , level:'3' , tcl : false ,place:"540" ,publicSchool: false },
  
  {name :  'Université de Valence' ,contry : 'Espagne' ,curriculum :  [ "Analyse de bases de données" , "Big Data" , "Cloud computing", "Génie logiciel" , "réseau informatique" , "Sécurité informatique" , "Architecture logicielle et matérielle" , "Conception d'applications" , "Système d'information" , "intelligence artificielle" ] , languages:[  "Espagnol"  ] , level:'1' ,tcl :  true ,place: "1000" ,publicSchool:  true },
  
  { name : 'University College London' ,contry : 'Angleterre' ,curriculum :  [ "Système d'information" ] ,languages: [ "Anglais" ] ,level: '5' , tcl : true ,place:"100" ,publicSchool: true },
  
  {name :  'Université de la Tuscia' ,contry : 'Italie' ,curriculum :  ["Analyse de bases de données" , "Big Data" , "Cloud computing", "Génie logiciel" , "réseau informatique" , "Sécurité informatique" , "Architecture logicielle et matérielle" , "Conception d'applications" , "Système d'information" , "intelligence artificielle" ] ,languages: [  "Italien" , "Français" ] ,level: '1' , tcl : false ,place:"1500" , publicSchool: true },
  
  {name :  'université de montréal' ,contry : 'Canada' ,curriculum :  [   "Analyse de bases de données" , "Big Data" , "Cloud computing", "Génie logiciel" , "réseau informatique" , "Sécurité informatique"] ,languages: [  "Français"  ] ,level: '1' ,tcl :false ,place: "710" ,publicSchool: true },
  
  {name :  'université du Zhejiang' ,contry : 'Chine' , curriculum : [  "Génie logiciel" , "réseau informatique" , "Sécurité informatique" , "Architecture logicielle et matérielle" , "Conception d'applications" , "Système d'information"] ,languages: [ "Anglais" , "Chinois"  ] , level:'3' ,tcl : true ,place:"1200" ,publicSchool: true },
  
  {name :  'Université Le Havre Normandie' ,contry : 'France' , curriculum : [  "Système d'information" , "Big Data" , "Cloud computing" , "intelligence artificielle" ,  "Génie logiciel" ] ,languages: [ "Français"  ] ,level: '5' ,tcl :  false ,place:"170" ,publicSchool: true },
  
  {name :  'université franklin switzerland' ,contry : 'Suisse' ,curriculum :  [  "Analyse de bases de données" , "Big Data" , "Cloud computing", "Génie logiciel" , "réseau informatique" , "Sécurité informatique" , "Architecture logicielle et matérielle" , "Conception d'applications"] ,languages: [ "Anglais" , "Suisse"  ] , level:'1' ,tcl :  true ,place:"930" , publicSchool:false }
  ]


export default () =>
{
  
  const router = useRouter();
  const sectionRef = useRef("");
 
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

  
  const [MyPredictions, setMyPredictions] = useState(false)
  console.log('MyPredictions:', MyPredictions)

  const giveMePrediction=()=>{
     let arr =  defData.filter(element=>{
      let languesValidation =false; 
      filter.languages.map(i => {if(element.languages.includes(i)){  languesValidation= true } })
      if (filter.contry.includes(element.contry) && element.curriculum.includes(filter.curriculum) && +element.level<=filter.level &&  ((element.tcl==false) ? true : (filter.tcl == true)) && filter.publicSchool == element.publicSchool &&  languesValidation == true ) {
        return true 
      }
    })
    setMyPredictions(arr)
    if (arr.length ==0) {
      setTimeout(() => {
    setMyPredictions(false)
      }, 10000);
    }

    // --- when we finish the api : 
    /*
  fetch( `${{process.env.NAMEWEBSITE}}/api/prediction/univ`,{
    methode:"POST",
    body:filter
  } )
  .then( res => res.json() )
  .then(result=> {
    setMyPredictions(result)
  },err=>{
    console.log('err:', err)

  })

    */

  }

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
          <div className="w-100">
            <Header darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
            </div>
          { (MyPredictions == false || MyPredictions == [] )?
        <div className={consumer+" "+StyleUniv.container }>
         
          <Bounce top>
          <section className=" mx-auto">
             <h2 className="my-4 mx-auto fw-lighter text-center">Trouver universités</h2>
             <p className="text-center m-4"><i className="bi bi-info-circle-fill mx-4"></i> Sélectionnez votre profil type en cliquant sur les choix ci-dessous , et obtenez des prédiction sur vos potentielles établissements</p>
             <button onClick={()=>sectionRef.current.scrollIntoView({ behavior: 'smooth' })} className="btn btn-lg btn-hermes d-block my-4 mx-auto" >Démarrer</button>
          </section>

          <section className="mx-auto test-center">
            <h2  ref={sectionRef}  className="my-4 mx-auto fw-lighter text-center">Sélectionnez votre Niveau : </h2>
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
          <button onClick={()=>giveMePrediction()} className="btn btn-dark btn -lg my-4 mx-auto">Valider </button>
          </Bounce>
        
          {(MyPredictions.length == 0 )&& <Bounce bottom> <div className="alert alert-danger w-100 text-center my-4">  
          Désolé , mais malheureusement aucune université ne vous correspond  
          </div> </Bounce>}
          </div>
          : 
          <Bounce left><Search data={MyPredictions}/></Bounce> 
}

          <Footer />
        </main>
      ) : (
        <Spiner />
      )}
    </>
  );
};
