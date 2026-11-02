import React from "react";
import s from "./BebelaLanguage.module.css";
export function BebelaLanguage({onSelect}:{onSelect:(language:"pt-BR"|"en-US")=>void}){
return <main className={s.screen}><section className={s.card}><h1>Selecione seu idioma</h1><p>Choose your language</p><div className={s.choices}><button type="button" onClick={()=>onSelect("pt-BR")}><span className={s.flag} role="img" aria-label="Bandeira do Brasil">🇧🇷</span><strong>Português</strong><small>Brasil</small></button><button type="button" onClick={()=>onSelect("en-US")}><span className={s.flag} role="img" aria-label="United States flag">🇺🇸</span><strong>English</strong><small>United States</small></button></div><p className={s.note}>Você pode alterar depois nas configurações. / You can change this later in settings.</p></section></main>;
}
