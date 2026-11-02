import React,{useState} from "react";
import {Button} from "./Button";
import {Input} from "./Input";
import {Volume2,Play,Star} from "lucide-react";
import s from "./BebelaWelcome.module.css";
const en=()=>localStorage.getItem('bebela-language')==='en-US';
export function BebelaWelcome({onStart}:{onStart:(name:string)=>void}){
const [name,N]=useState(""),[error,E]=useState(""),[audio,A]=useState("");
const clean=name.trim().replace(/\s+/g," ");
function greet(){if(!window.speechSynthesis||!window.SpeechSynthesisUtterance){A("Peça a um adulto para ler com você.");return;}const u=new SpeechSynthesisUtterance(en()?"Hi! I'm Bebela. What's your name? Enter your first name and let's play!":"Olá! Eu sou a Bebela. Como você se chama? Digite seu primeiro nome e vamos brincar!");u.lang=en()?"en-US":"pt-BR";u.rate=.85;u.onerror=()=>A("Não foi possível tocar a voz neste navegador.");window.speechSynthesis.cancel();window.speechSynthesis.speak(u);}
function submit(e:React.FormEvent){e.preventDefault();if(!clean){E("Digite seu primeiro nome para começar.");return;}window.speechSynthesis?.cancel();onStart(clean);}
return <section className={s.screen}><header className={s.title}><h1>Bebela<span>Aprender é uma aventura!</span></h1></header><div className={s.layout}><div className={s.character} role="img" aria-label="Bebela, uma menina sorridente de cabelo vermelho curto e óculos roxos"/><form className={s.card} onSubmit={submit}><span className={s.hello}>UMA NOVA AMIGA PARA APRENDER</span><h2>{en()?"Hi, I'm Bebela!":"Olá, eu sou a Bebela!"}</h2><p>{en()?"What's your name?":"Como você se chama?"}</p><label htmlFor="child-first-name">Seu primeiro nome ou apelido</label><Input id="child-first-name" value={name} onChange={e=>{N(e.target.value);E("");}} maxLength={24} autoComplete="off" placeholder="Digite seu primeiro nome" aria-invalid={!!error} aria-describedby={error?"name-error":undefined} className={s.input}/>{error&&<p id="name-error" role="alert">{error}</p>}<Button type="submit" size="lg" className={s.start}><Play fill="currentColor" size={20}/> {en()?"Let's play!":"Vamos brincar!"}</Button><Button variant="ghost" onClick={greet}><Volume2 size={18}/> Ouvir a Bebela</Button>{audio&&<small role="status">{audio}</small>}<small>O nome é usado só nesta visita, neste aparelho.</small><div className={s.badges}><span>⭐ 200 palavras</span><span>🎈 Aprender brincando</span></div></form></div></section>;
}
