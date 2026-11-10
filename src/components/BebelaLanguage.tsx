import React, {useState} from "react";
import s from "./BebelaLanguage.module.css";

type Language = "pt-BR" | "en-US";
export function BebelaLanguage({onSelect}:{onSelect:(language:Language)=>void}){
  const [selected,setSelected]=useState<Language>("pt-BR");
  const english=selected==="en-US";
  return <main className={s.screen}>
    <header className={s.title}><h1>Bebella</h1><span>{english?"Learning is an adventure!":"Aprender é uma aventura!"}</span></header>
    <div className={s.layout}>
      <div className={s.character} role="img" aria-label="Bebella estudando, com cabelo vermelho, óculos e roupa preta" style={{backgroundImage:`url("${import.meta.env.BASE_URL}Menina%20Artista%20com%20Livros%20Coloridos.png")`}}/>
      <section className={s.card} aria-labelledby="language-heading">
        <h2 id="language-heading"><span aria-hidden="true">🌐</span> {english?"Choose your language":"Escolha o idioma"}</h2>
        <div className={s.choices} role="group" aria-label="Idioma do aplicativo">
          <button type="button" className={selected==="pt-BR"?s.selected:""} onClick={()=>setSelected("pt-BR")} aria-pressed={selected==="pt-BR"}><span className={s.flag} role="img" aria-label="Bandeira do Brasil">🇧🇷</span><strong>Português (BR)</strong><span className={s.indicator} aria-hidden="true">{selected==="pt-BR"?"✓":""}</span></button>
          <button type="button" className={selected==="en-US"?s.selected:""} onClick={()=>setSelected("en-US")} aria-pressed={selected==="en-US"}><span className={s.flag} role="img" aria-label="United States flag">🇺🇸</span><strong>English (US)</strong><span className={s.indicator} aria-hidden="true">{selected==="en-US"?"✓":""}</span></button>
        </div>
        <button type="button" className={s.continue} onClick={()=>onSelect(selected)}><span aria-hidden="true">▶</span> {english?"Continue":"Continuar"}</button>
        <p className={s.note}>{english?"You can change the language later.":"Você pode mudar o idioma depois."}</p>
      </section>
    </div>
  </main>;
}
