import { useState, useEffect } from "react";

 const data = [
  {name:'Université de Chicago' ,contry : 'États-Unis' ,curriculum : ["Analyse de bases de données" , "Big Data" , "Cloud computing" , "Conception d'applications" , "Sécurité informatique" ] ,language: [ "Anglais" , "Espagnol"  ] ,level: '1' ,tcf : true ,place: "400" ,publicSchool:false },
  
  {name: 'Université Tsinghua' ,contry : 'Chine' ,curriculum : ["Système d'information" , "Big Data" , "Cloud computing" , "intelligence artificielle" ] ,language: [ "Anglais" , "Chinois"  ] ,level:  '3' ,tcf : false ,place: "700" ,publicSchool: true },
  
  { name: 'Université technique de Munich' ,contry : 'Allemagne' ,curriculum : [  "Cloud computing" , "intelligence artificielle" , "Génie logiciel"] ,language: [ "Anglais" , "allemand"  ] ,level:  '5' ,tcf : true ,place: "210" ,publicSchool: true },
  
  { name: 'ETH Zurich' ,contry : ' Suisse' ,curriculum : ["Cloud computing" , "intelligence artificielle" , "Génie logiciel" , "réseau informatique"] ,language: [ "fr"  ] ,level:  '1' ,tcf : false ,place: "620" ,publicSchool: true },
  
  {name: 'Université Paris Sciences et Lettres' ,contry : ' France' ,curriculum : [  "Cloud computing" , "intelligence artificielle" , "Génie logiciel" , "réseau informatique" , "Sécurité informatique" ] ,language: [ "Français"  ] ,level:  '1' , tcf :true ,place: "700" , publicSchool:true },
  
  {name:'Université de Navarre ' ,contry : ' Espagne' ,curriculum :[ "Analyse de bases de données" , "Big Data" , "Cloud computing", "Génie logiciel" , "réseau informatique" , "Sécurité informatique" ] ,language: [ "Français" , "Espagnol"  ] ,level:  '1' ,tcf : false , place: "1350" ,publicSchool: true },
  
  { name: 'Université de Cambridge' ,contry : 'Angleterre' , curriculum :[ "intelligence artificielle" , "Cloud computing" ] ,language: [ "Anglais" ] ,level:  '5' ,tcf : true ,place: "150" , publicSchool:true },
  
  
  {name: 'Polytechnique de Milan ' ,contry : ' Italie' ,curriculum :["Système d'information" , "Big Data" , "Cloud computing" , "intelligence artificielle" ,  "Génie logiciel"] ,language: [  "Italien"  ] ,level:  '1' ,tcf : false ,place: "1500" ,publicSchool: true },
  
  {name:  'University of Toronto' ,contry : ' Canada' , 
  curriculum : [ "Analyse de bases de données" , "Big Data" ,"Cloud computing" , "intelligence artificielle" , "Génie logiciel"] , 
   
  language:  [ "Anglais", "Français"  ] , 
  level:   '1'  , tcf :  true ,  
  place: "530" , publicSchool: true },
  
  {name: 'Johns Hopkins University' ,contry : 'Etats-Unis' ,curriculum : [  "Cloud computing" , "intelligence artificielle" , "Génie logiciel" , "réseau informatique" , "Architecture logicielle et matérielle"] ,language: [ "Anglais"  ] ,level:  '1' ,tcf : false ,place: "1000" ,publicSchool: true },
  
  
  {name :  'Université de Paris' ,contry : 'France' ,curriculum : ["Cloud computing" , "intelligence artificielle" , "Génie logiciel" , "réseau informatique" , "Sécurité informatique" , "Architecture logicielle et matérielle" , "Conception d'applications" ] ,language: [ "Français"  ] , level:'1' ,tcf :  false ,place:"1000" ,publicSchool: true },
  
  {name :  'Université de Pékin' ,contry : 'Chine' , curriculum : [  "Analyse de bases de données" , "Big Data" , "Cloud computing", "Génie logiciel" , "réseau informatique" , "Sécurité informatique" , "Architecture logicielle et matérielle" , "Conception d'applications"] , language:[ "Français" , "Anglais" , "Chinois"  ] ,level: '1' ,tcf :  false , place:"1050" , publicSchool: true },
  
   
  { name : 'Université Agrosup Dijon' ,contry : 'France' ,curriculum :  [ "Analyse de bases de données" , "Big Data" , "Cloud computing", "Génie logiciel" , "réseau informatique" , "Sécurité informatique" , "Architecture logicielle et matérielle" , "Conception d'applications" , "Système d'information" , "intelligence artificielle" ] ,language:[ "Français" , "Anglais"  ] , level:'3' , tcf : false ,place:"540" ,publicSchool: false },
  
  {name :  'Université de Valence' ,contry : 'Espagne' ,curriculum :  [ "Analyse de bases de données" , "Big Data" , "Cloud computing", "Génie logiciel" , "réseau informatique" , "Sécurité informatique" , "Architecture logicielle et matérielle" , "Conception d'applications" , "Système d'information" , "intelligence artificielle" ] , language:[  "Espagnol"  ] , level:'1' ,tcf :  true ,place: "1000" ,publicSchool:  true },
  
  { name : 'University College London' ,contry : 'Angleterre' ,curriculum :  [ "Système d'information" ] ,language: [ "Anglais" ] ,level: '5' , tcf : true ,place:"100" ,publicSchool: true },
  
  {name :  'Université de la Tuscia' ,contry : 'Italie' ,curriculum :  ["Analyse de bases de données" , "Big Data" , "Cloud computing", "Génie logiciel" , "réseau informatique" , "Sécurité informatique" , "Architecture logicielle et matérielle" , "Conception d'applications" , "Système d'information" , "intelligence artificielle" ] ,language: [  "Italien" , "Français" ] ,level: '1' , tcf : false ,place:"1500" , publicSchool: true },
  
  {name :  'université de montréal' ,contry : 'Canada' ,curriculum :  [   "Analyse de bases de données" , "Big Data" , "Cloud computing", "Génie logiciel" , "réseau informatique" , "Sécurité informatique"] ,language: [  "Français"  ] ,level: '1' ,tcf :false ,place: "710" ,publicSchool: true },
  
  {name :  'université du Zhejiang' ,contry : 'Chine' , curriculum : [  "Génie logiciel" , "réseau informatique" , "Sécurité informatique" , "Architecture logicielle et matérielle" , "Conception d'applications" , "Système d'information"] ,language: [ "Anglais" , "Chinois"  ] , level:'3' ,tcf : true ,place:"1200" ,publicSchool: true },
  
  {name :  'Université Le Havre Normandie' ,contry : 'France' , curriculum : [  "Système d'information" , "Big Data" , "Cloud computing" , "intelligence artificielle" ,  "Génie logiciel" ] ,language: [ "Français"  ] ,level: '5' ,tcf :  false ,place:"170" ,publicSchool: true },
  
  {name :  'université franklin switzerland' ,contry : 'Suisse' ,curriculum :  [  "Analyse de bases de données" , "Big Data" , "Cloud computing", "Génie logiciel" , "réseau informatique" , "Sécurité informatique" , "Architecture logicielle et matérielle" , "Conception d'applications"] ,language: [ "Anglais" , "Suisse"  ] , level:'1' ,tcf :  true ,place:"930" , publicSchool:false }
  ]
   // -------
   /*
  Pays:
   [ "États-Unis" , "Chine" , "Allemagne" , "Suisse" , "France", "Espagne" , "Angleterre" , "Italie" , "Canada"]
   
  
  Langue :
   [ "Anglais" , "Français" , "Chinois" , "allemand" , "Suisse" , "Espagnol" , "Italien" ]
    
  Spécialités :
   [ "Analyse de bases de données" , "Big Data" , "Cloud computing", "Génie logiciel" , "réseau informatique" , "Sécurité informatique" , "Architecture logicielle et matérielle" , "Conception d'applications" , "Système d'information" , "intelligence artificielle" , "réseau informatique" ]
  
  */
   

const Search = ({classTheme="text-dark bg-light"}) => {
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
  
  return (
 <>
 <section className={classTheme}>
   <form className="input-group"> 
   <input type="text" value={searchInput} onChange={e=>setSearchInput(e.target.value)}  className='form-control' placeholder="Trouver universités" />
   <button onClick={e=> e.preventDefault()} className="btn btn-lg btn-hermes bi bi-search"></button>
   </form>
   <ul className="list-group">
     {univlist.map(i=> <li className="list-group-item my-2 py-4"><span className="d-block"> <strong>{i.name}</strong> <i className="mx-4">{i.contry} </i> </span>  
     <span className="d-block">
      Spétialitées  <ul>
{i.curriculum.map(ii=> <li>{ii} </li> )}
      </ul>
     </span>
     <span className="d-block">
      Langues requise:   <ul>
      {i.language.map(ii=> <li>{ii} </li> )}
      </ul>
      </span>
      
     <span className="d-block">
       Nieau minimum requis :  BAC <strong>+ {i.level}</strong>
     </span>
     
     <span className="d-block">
      LLe TCF est-il requis ? : <strong>+ {i.tcf ? "oui" : "non"}</strong>
     </span>

     <span className="d-block">
      Type D'établesement : <strong>+ {i.publicSchool ? "Public" : "Privé"}</strong>
     </span>
     
     <span className="d-block">
      Nombre de places restantes : <strong>+ {i.place}</strong>
     </span>
     </li>
      ) }
   </ul>

 </section>

 </>
)
  

};

export default Search;
