import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'
import Header from "../components/header";
import Footer from "../components/footer";
import Spiner from "../components/Spiner.jsx";
import { useClass } from "../plugin/thme.js";
import HeadComponents from  "../components/HeadComponents"
import Bounce from "react-reveal/Bounce";

import HomeSyle from "../styles/Home.module.css"


export default () =>
{
  
  const router = useRouter();
 
  const [darkTheme, setDarkTheme, consumer] = useClass();
  
  return (
    <>
    <HeadComponents/>
      {router.isReady ? (
        <main className={HomeSyle.sectionRoot }>
          <Header />
           <h1> HELLO </h1>

          <Footer />
        </main>
      ) : (
        <Spiner />
      )}
    </>
  );
};
