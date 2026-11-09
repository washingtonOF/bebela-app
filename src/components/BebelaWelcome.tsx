import { speakText, stopSpeech } from "../helpers/nativeSpeech";
import React,{useRef,useState} from "react";
import {Button} from "./Button";
import {Input} from "./Input";
import {Volume2,Play,Star} from "lucide-react";
import s from "./BebelaWelcome.module.css";
const en=()=>localStorage.getItem('bebela-language')==='en-US';
export function BebelaWelcome({onStart}:{onStart:(name:string)=>void}){
const [name,N]=useState(""),[error,E]=useState(""),[audio,A]=useState(""),[keyboardOpen,KeyboardOpen]=useState(false);
const nameInput=useRef<HTMLInputElement>(null);
const clean=name.trim().replace(/\s+/g," ").slice(0,24);
function greet(){A("");void speakText(en()?"Hi! I'm Bebella. What's your name? Enter your first name and let's play!":"Olá! Eu sou a Bebella. Como você se chama? Digite seu primeiro nome e vamos brincar!",en()?"en-US":"pt-BR",.85).catch(()=>A("Não foi possível tocar a voz. Verifique o mecanismo de fala do Android."));}
function submit(e:React.FormEvent){e.preventDefault();nameInput.current?.blur();KeyboardOpen(false);if(!clean || !/[\p{L}\p{N}]/u.test(clean)){E("Digite um primeiro nome ou apelido válido para começar.");return;}void stopSpeech();onStart(clean);}
return <section className={s.screen}><header className={s.title}><h1>Bebella<span>Aprender é uma aventura!</span></h1></header><div className={s.layout}><div className={s.character} role="img" aria-label="Bebella, uma menina sorridente de cabelo vermelho curto e óculos roxos"/><form className={s.card} onSubmit={submit}><span className={s.hello}>UMA NOVA AMIGA PARA APRENDER</span><h2>{en()?"Hi, I'm Bebella!":"Olá, eu sou a Bebella!"}</h2><p>{en()?"What's your name?":"Como você se chama?"}</p><label htmlFor="child-first-name">Seu primeiro nome ou apelido</label><Input ref={nameInput} id="child-first-name" enterKeyHint="done" onFocus={()=>KeyboardOpen(true)} onBlur={()=>KeyboardOpen(false)} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();nameInput.current?.blur();}}} value={name} onChange={e=>{N(e.target.value);E("");}} maxLength={24} autoComplete="off" placeholder="Digite seu primeiro nome" aria-invalid={!!error} aria-describedby={error?"name-error":undefined} className={s.input}/>{keyboardOpen&&<button type="button" className={s.hideKeyboard} onPointerDown={e=>e.preventDefault()} onClick={()=>nameInput.current?.blur()}>⌄ Ocultar teclado</button>}{error&&<p id="name-error" role="alert">{error}</p>}<Button type="submit" size="lg" className={s.start}><Play fill="currentColor" size={20}/> {en()?"Let's play!":"Vamos brincar!"}</Button><Button variant="ghost" onClick={greet}><Volume2 size={18}/> Ouvir a Bebella</Button>{audio&&<small role="status">{audio}</small>}<small>O nome é usado só nesta visita, neste aparelho.</small><div className={s.badges}><span>⭐ 200 palavras</span><span>🎈 Aprender brincando</span></div></form></div></section>;
}
