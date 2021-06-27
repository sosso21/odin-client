import component from "../pages/api/FooterComponent.json";
import StyleFooter from "../styles/footer.module.css";

const Footer = () => {
  return (
    <footer className="pt-4 w-100 bg-dark text-light d-flex justify-content-around flex-column">
      <div className={StyleFooter.footerCmponent}>
        {component.map((i) => (
          <span className={StyleFooter.footerCmponentChild}>
            <i className={"fs-1 bi " + i.svg}></i>
            <strong>{i.title}</strong>
            <p> {i.content} </p>
          </span>
        ))}
      </div>

      
      <ul className="mt-4 d-flex justify-content-around flex-wrap">
        <li>{new Date().getFullYear()} All right is reserved</li>
        <li>Propriétaire officiel : <strong>Manar Menassel</strong></li>
        <li>Réaliser avec amour par : <strong><a href="https://hermes-dev-fr.web.app" className="text-link" target="_blanck" >HERMES DEV</a></strong> <i className="bi bi-heart"></i> </li>
      </ul>

 
    </footer>
  );
};

export default Footer;
