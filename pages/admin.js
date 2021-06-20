import { useState, useEffect,useRef } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'
import Header from "../components/header";
import Footer from "../components/footer";
import Spiner from "../components/Spiner.jsx";
import { useClass } from "../plugin/thme.js";
import HeadComponents from  "../components/HeadComponents"
import Bounce from "react-reveal/Bounce";

import AdminStyle from "../styles/Admin.module.css"




const data = [
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
 
  // nav
  const [darkTheme, setDarkTheme, consumer] = useClass();
  const [SeeSection, setSeeSection] = useState("univ")

  // univ
  
  const sliderRef = useRef("");
  const [toChange, setToChange] = useState("")
  const [searchInput, setSearchInput] = useState('')
  const [univlist, setunivlist] = useState(data)
  useEffect(() => {
    if (searchInput=="") {
      setunivlist(data)
    }else{
      setunivlist( data.filter(d=> ((d.name).toLowerCase()).search((searchInput).toLowerCase() ) != -1 ||
     ((d.contry).toLowerCase()).search((searchInput).toLowerCase()) != -1  ||  d.curriculum.map(e=> (e.toLowerCase()).search(searchInput.toLowerCase() ) !=1)  ))
    }
  }, [searchInput]);
  
const HandleChangeArr = (value ,parent,key )=>{
     
    let arr = parent
    if(parent.curriculum){
        arr.curriculum[key] = value
    }else if(parent.languages){
        arr.languages[key] = value
    }
      setToChange({...toChange,arr})

    
}

  return (
    <>
    <HeadComponents/>
      {router.isReady ? (
        <main className={AdminStyle.sectionRoot + " "+consumer}>
          <Header darkTheme={darkTheme} setDarkTheme={setDarkTheme} />

<h2 className="fw-lighter mx-auto my-2">Administrateur</h2>
<section className={AdminStyle.Navigation}>
    <button className="btn btn-lg btn-outline-hermes" onClick={()=>setSeeSection("univ")} >universités </button>
    <button className="btn btn-lg btn-outline-hermes" onClick={()=>setSeeSection("user")} >Membres</button>
</section>
{
    SeeSection== "univ" ? <section>
<section ref={sliderRef} className="my-4">
      {toChange ?  <div className="my-4" >
        <div className="input-group">
            <input className="form-control my-1" type="text" value={toChange.name} onChange={(e)=>setToChange({...toChange,name:e.target.value})}placeholder="nom"/>
        </div>

        <div className="input-group">
            <input className="form-control my-1" type="text" value={toChange.contry} onChange={(e)=>setToChange({...toChange,contry:e.target.value})}placeholder="Pays"/>
        </div>


        <div className="input-group">
            <input className="form-control my-1" type="number" value={toChange.level} onChange={(e)=>setToChange({...toChange,level:e.target.value})}placeholder="niveau (BAC + n )"/>
        </div>

        <div className="input-group">
            <input className="form-control my-1" type="number" value={toChange.place} onChange={(e)=>setToChange({...toChange,place:e.target.value})}placeholder="Nombre de places"/>
        </div>

        <div className="input-group">
        <button className={"mx-4 my-2 btn btn-lg "+ (toChange.tcl == false ? "btn-hermes" : "btn-outline-hermes" )  } onClick={()=> setToChange({...toChange, tcl: false})}  >test non obligatoire</button>
        <button className={"mx-4 my-2 btn btn-lg "+ (toChange.tcl == true  ? "btn-hermes" : "btn-outline-hermes" )  } onClick={()=> setToChange({...toChange, tcl: true })}  >test obligatoire </button>
        </div>

        <div className="input-group">
        <button className={"mx-4 my-2 btn btn-lg "+ (toChange.publicSchool == false  ? "btn-hermes" : "btn-outline-hermes" )  } onClick={()=> setToChange({...toChange, publicSchool: false})}  > privé </button>
        <button className={"mx-4 my-2 btn btn-lg "+ (toChange.publicSchool == true  ? "btn-hermes" : "btn-outline-hermes" )  } onClick={()=> setToChange({...toChange, publicSchool: true })}  >Public</button>
        </div>

<h2>Formation: </h2>
{toChange.curriculum.map((i,k) =>  
<div className="input-group">
    <button onClick={()=> setToChange({...toChange,curriculum: (toChange.curriculum).filter((ii ,kk)=>kk ==k ) })} className="btn btn-danger btn-sm">supprimer</button> 
    <input type="text" value={i} onChange={e=>HandleChangeArr(e.target.value,{curriculum: toChange.curriculum},k)} className="form-control" placeholder="Formation"/>
</div> 
    ) }
<button className="btn btn-lg btn-hermes mx-auto" onClick={()=>setToChange({...toChange,curriculum : [...toChange.curriculum,""]})}>+</button>

<h2>Langues: </h2>
{toChange.languages.map((i,k) =>  
<div className="input-group">
    <button onClick={()=> setToChange({...toChange,languages: (toChange.languages).filter((ii ,kk)=>kk ==k ) })} className="btn btn-danger btn-sm">supprimer</button> 
    <input type="text" value={i} onChange={e=>HandleChangeArr(e.target.value,{languages: toChange.languages},k)} className="form-control" placeholder="Langues"/>
</div> 
    ) }
<button className="btn btn-lg btn-hermes mx-auto" onClick={()=>setToChange({...toChange,languages : [...toChange.languages,""]})}>+</button>
<div className="input-group">
{(toChange.status == "add")?<button className="btn btn-lg btn-hermes mx-auto">Ajouter</button>: <button className="btn btn-lg btn-hermes mx-auto">Modifier</button>}
</div>
</div>:<div className="input-group">
<button onClick={()=> setToChange({name:"",
contry:"",
curriculum:[],
languages:[],
level:"",
tcl:false,
place:"",
publicSchool:true,status:"add"})} className="btn btn-lg btn-hermes mx-auto">Ajouter</button>
</div>
}
</section>

 <form className="input-group mt-4"> 
   <input type="text" value={searchInput} onChange={e=>setSearchInput(e.target.value)}  className='form-control' placeholder="Trouver universités" />
   <button onClick={e=> e.preventDefault()} className="btn btn-lg btn-hermes bi bi-search"></button>
   </form>
   <ul className="list-group">
     {univlist.map(i=> <li onClick={()=>setToChange({...i,status:"modify"}) } className="list-group-item my-2 py-4 pinter"><span className="d-block"> <strong>{i.name}</strong> <i className="mx-4">{i.contry} </i> </span>  
     <span className="d-block">
      Spétialitées  <ul>
{i.curriculum.map(ii=> <li>{ii} </li> )}
      </ul>
     </span>
     <span className="d-block">
      Langues requise:   <ul>
      {i.languages.map(ii=> <li>{ii} </li> )}
      </ul>
      </span>
      
     <span className="d-block">
       Nieau minimum requis :  BAC <strong>+ {i.level}</strong>
     </span>
     
     <span className="d-block">
      Le test de langue est-il requis ? : <strong> {i.tcl ? "oui" : "non"}</strong>
     </span>

     <span className="d-block">
      Type  d'établissement  : <strong>{i.publicSchool ? "Public" : "Privé"}</strong>
     </span>
     
     <span className="d-block">
      Nombre de places restantes : <strong>{i.place}</strong>
     </span>
     <div className="input-group">
<button   onClick={()=>{setToChange({...i,status:"modify"});sliderRef.current.scrollIntoView({ behavior: 'smooth' })} } className="btn btn-lg btn-success mx-auto">Modifier</button>
</div>
     </li>
      ) }
   </ul>


    </section> :<section>
<h1>USER</h1>

    </section>

}


          <Footer />
        </main>
      ) : (
        <Spiner />
      )}
    </>
  );
};
