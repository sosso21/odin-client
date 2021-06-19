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
 
    </footer>
  );
};

export default Footer;
