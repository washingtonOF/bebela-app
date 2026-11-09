import { speakText, stopSpeech } from "../helpers/nativeSpeech";
/**
 * BEBELLA — declaração de propriedade e homenagem.
 * Esse app é de propriedade de Washington Santos de Souza e da ISAMIG Shop,
 * feita com muito amor pra homenagear minha filha, meu amor.
 *
 * Registro exclusivo do código-fonte: não renderizar na interface do aplicativo.
 */
import React, {useState,useRef,useEffect} from "react";
import {Button} from "../components/Button";
import {Volume2, ArrowRight, ArrowLeft, Star, BookOpen, Pencil, Leaf, House} from "lucide-react";
import s from "./_index.module.css";
import {LiteracyPath} from "../components/LiteracyPath";
import {QuickWords} from "../components/QuickWords";
import {BebelaWelcome} from "../components/BebelaWelcome";
import {BebelaLanguage} from "../components/BebelaLanguage";
import {BebelaLevelSelect} from "../components/BebelaLevelSelect";
import {BebelaLevels} from "../components/BebelaLevels";
import {BebelaParent} from "../components/BebelaParent";
const words=[{name:"GATO",parts:["GA","TO"],pic:"🐱",group:"Animais"},{name:"PATO",parts:["PA","TO"],pic:"🦆",group:"Animais"},{name:"SAPO",parts:["SA","PO"],pic:"🐸",group:"Animais"},{name:"BOLA",parts:["BO","LA"],pic:"⚽",group:"Objetos"},{name:"MALA",parts:["MA","LA"],pic:"🧳",group:"Objetos"},{name:"VACA",parts:["VA","CA"],pic:"🐄",group:"Animais"}];
export default function Page(){
const [childName,ChildName]=useState("");
const [languageChosen,LanguageChosen]=useState(false);
const [quick,Quick]=useState(true);
const [selectedLevel,SelectLevel]=useState<0|1|2|3|4>(0);
const [foundation,Foundation]=useState(false);
const [idx,I]=useState(0),[stage,S]=useState(0),[started,B]=useState(false),[built,U]=useState<string[]>([]),[msg,M]=useState(""),[done,D]=useState<string[]>([]),[ready,R]=useState(false),[ink,K]=useState(false),[letter,L]=useState(0),[audio,A]=useState("");
const canvas=useRef<HTMLCanvasElement>(null),drawing=useRef(false),distance=useRef(0),prev=useRef({x:0,y:0});
const w=words[idx],key=idx+":"+stage;
function goHome(){void stopSpeech();ChildName("");LanguageChosen(false);SelectLevel(0);Quick(true);Foundation(false);B(false);}
function withHome(view:React.ReactNode){return <><Button onClick={goHome} aria-label="Início: escolher idioma e nome" style={{position:"fixed",right:12,bottom:18,zIndex:9999,borderRadius:30,boxShadow:"0 4px 15px #0003",background:"#256650",color:"#fff"}}><House size={20}/> Início</Button>{view}</>;}
useEffect(()=>{try{const v=JSON.parse(localStorage.getItem("primeiras-v1")||"[]");if(Array.isArray(v))D(v.filter(x=>typeof x==="string"));}catch{}R(true);return()=>{void stopSpeech();}},[]);
useEffect(()=>{if(ready)try{localStorage.setItem("primeiras-v1",JSON.stringify(done));}catch{M("Seu navegador não permitiu salvar o progresso.");}},[done,ready]);
function say(t:string){A("");void speakText(t,localStorage.getItem("bebela-language")==="en-US"?"en-US":"pt-BR",.8).catch(()=>A("Não foi possível tocar a voz. Verifique o mecanismo de fala do Android."));}
function win(){if(!done.includes(key))D(a=>a.includes(key)?a:[...a,key]);M("Muito bem! Você completou esta atividade. ⭐");say("Muito bem! Vamos continuar aprendendo.");}
function change(n:number){S(n);U([]);M("");K(false);L(0);distance.current=0;}
function choose(p:string){say(p.toLowerCase());if(p!==w.parts[built.length]){M("Vamos ouvir de novo? Toque na sílaba que falta.");return;}const a=[...built,p];U(a);M("");if(a.length===w.parts.length)win();}
function clear(){canvas.current?.getContext("2d")?.clearRect(0,0,600,240);K(false);distance.current=0;}
useEffect(()=>{clear();},[idx,stage,letter]);
function point(e:React.PointerEvent<HTMLCanvasElement>){const r=e.currentTarget.getBoundingClientRect();return{x:(e.clientX-r.left)*600/r.width,y:(e.clientY-r.top)*240/r.height};}
if(!languageChosen)return <BebelaLanguage onSelect={language=>{localStorage.setItem("bebela-language",language);LanguageChosen(true);}}/>;
if(!childName)return withHome(<BebelaWelcome onStart={name=>{ChildName(name);SelectLevel(0);}}/>);
if(selectedLevel===0)return withHome(<BebelaLevelSelect childName={childName} onBack={()=>ChildName("")} onParent={()=>SelectLevel(4)} onSelect={level=>{SelectLevel(level);Quick(true);}}/>);
if(selectedLevel===4)return withHome(<BebelaParent childName={childName} onBack={()=>SelectLevel(0)}/>);
if(selectedLevel===2||selectedLevel===3||(selectedLevel===1&&localStorage.getItem('bebela-language')==='en-US'))return withHome(<BebelaLevels key={selectedLevel} level={selectedLevel} childName={childName} onBack={()=>SelectLevel(0)}/>);
if(quick)return withHome(<main className={s.app}><QuickWords childName={childName} onChangeName={()=>{ChildName("");SelectLevel(0);}} onWrite={()=>{Quick(false);I(4);change(3);B(true);}}/></main>);
if(foundation)return withHome(<main className={s.app}><LiteracyPath onExit={()=>Foundation(false)} onFinish={()=>{Foundation(false);I(4);change(0);B(true);}}/></main>);
return withHome(<main className={s.app}><header className={s.header}><div className={s.brand}><span className={s.logo}><BookOpen/></span><span>Bebella</span></div><div className={s.stars}><Star fill="currentColor" size={20}/> {done.length} estrelas</div></header>
{!started?<><section className={s.hero}><div><span className={s.eyebrow}><Leaf size={16}/> UMA DESCOBERTA DE CADA VEZ</span><h1>Pequenas palavras.<br/><em>Grandes descobertas.</em></h1><p>Vamos ouvir, brincar e escrever juntos?<br/>Cada tentativa faz parte do caminho.</p><Button size="lg" onClick={()=>{Foundation(true);}}>Vamos começar <ArrowRight/></Button><small>Com um adulto por perto • No seu ritmo</small></div><div className={s.heroArt}><span className={s.cat} role="img" aria-label="Gato">🐱</span><div className={s.tiles}><span>GA</span><span>TO</span></div><span className={s.artLabel}>Um som encontra o outro.</span></div></section><section className={s.path}><h2>Nosso caminho de aprendizagem</h2><div className={s.steps}>{["Ligar sons e letras","Juntar e compreender","Explorar palavras","Escrever com o dedo"].map((t,i)=><div key={t}><span>0{i+1}</span><h3>{t}</h3><p>{["Uma preparação com ajuda gradual.","Use o que aprendeu numa palavra nova.","Figuras, sílabas e significado.","Prática livre, sem nota de caligrafia."][i]}</p></div>)}</div></section><section className={s.collection}><h2>Seu primeiro jardim de palavras</h2><p>Seis palavras familiares para explorar e revisitar.</p><div className={s.wordGrid}>{words.map((a,i)=><button key={a.name} onClick={()=>{I(i);change(0);B(true);say(a.name.toLowerCase());}}><span role="img" aria-label={a.name}>{a.pic}</span><b>{a.name}</b><small>{a.group}</small></button>)}</div></section></>:<section className={s.lesson}><div className={s.lessonMascot}><strong>Vamos aprender juntos!</strong></div><div className={s.lessonTop}><Button variant="ghost" onClick={()=>{B(false);void stopSpeech();}}><ArrowLeft/> Início</Button><span>Palavra {idx+1} de {words.length} · Etapa {stage+1} de 4</span></div><div className={s.progress}>{[0,1,2,3].map(n=><span key={n} className={n<=stage?s.filled:""}/>)}</div><h1>{["Vamos conhecer a palavra","Qual é a figura?","Monte a palavra","Vamos praticar a escrita"][stage]}</h1><p>{["Ouça a palavra. Depois, toque em cada sílaba.","Ouça e toque na figura que combina.","Toque nas sílabas na ordem certa.","Siga a letra com o dedo. Este é um treino, sem nota de caligrafia."][stage]}</p>
<Button variant="secondary" size="lg" onClick={()=>say(stage===1?w.name.toLowerCase():stage===3?"Trace a letra "+w.name[letter]:w.name.toLowerCase())}><Volume2/> Ouvir {stage===3?"instrução":"palavra"}</Button>
{stage===0&&<><div className={s.picture} role="img" aria-label={w.name}>{w.pic}</div><h2 className={s.word}>{w.name}<small>{w.name.toLowerCase()}</small></h2><div className={s.tiles}>{w.parts.map(p=><Button key={p} size="lg" variant="outline" onClick={()=>say(p.toLowerCase())}>{p}<Volume2 size={17}/></Button>)}</div><Button onClick={()=>{win();change(1);say("Ouça a palavra e encontre a figura. "+w.name.toLowerCase());}}>Vamos brincar <ArrowRight/></Button></>}
{stage===1&&<div className={s.choices}>{[words[(idx+2)%6],w,words[(idx+1)%6]].sort((a,b)=>a.name.localeCompare(b.name)).map(a=><button aria-label={a.name} key={a.name} onClick={()=>a.name===w.name?win():(M("Vamos tentar de novo. Ouça a palavra com calma."),say("Ouça novamente. "+w.name.toLowerCase()))}><span role="img" aria-label={a.name}>{a.pic}</span></button>)}</div>}
{stage===2&&<><div className={s.picture} role="img" aria-label={w.name}>{w.pic}</div><div className={s.tiles}>{w.parts.map((p,n)=><span key={n}>{built[n]||"___"}</span>)}</div><div className={s.tiles}>{[...w.parts].reverse().map(p=><Button key={p} disabled={built.includes(p)} size="lg" variant="outline" onClick={()=>choose(p)}>{p}</Button>)}</div><Button variant="ghost" onClick={()=>{U([]);M("");}}>Recomeçar a montagem</Button></>}
{stage===3&&<><div className={s.trace}><svg viewBox="0 0 600 240" aria-hidden="true"><text x="300" y="195" textAnchor="middle" fontSize="210" fontFamily="sans-serif" fill="none" stroke="#9cae9d" strokeWidth="2" strokeDasharray="5 6">{w.name[letter]}</text></svg><canvas ref={canvas} width={600} height={240} aria-label={"Área para traçar a letra "+w.name[letter]} onPointerDown={e=>{e.currentTarget.setPointerCapture(e.pointerId);drawing.current=true;prev.current=point(e);}} onPointerMove={e=>{if(!drawing.current)return;const p=point(e),c=canvas.current?.getContext("2d");if(c){c.beginPath();c.moveTo(prev.current.x,prev.current.y);c.lineTo(p.x,p.y);c.strokeStyle="#256650";c.lineWidth=8;c.lineCap="round";c.stroke();distance.current+=Math.hypot(p.x-prev.current.x,p.y-prev.current.y);if(distance.current>70)K(true);}prev.current=p;}} onPointerUp={()=>{drawing.current=false;}} onPointerCancel={()=>{drawing.current=false;}}/></div><span>Letra {letter+1} de {w.name.length} · {w.name}</span><div className={s.tiles}><Button variant="outline" onClick={clear}>Apagar</Button><Button disabled={!ink} onClick={()=>{if(letter<w.name.length-1){L(letter+1);say("Agora a letra "+w.name[letter+1]);}else win();}}><Pencil/>{letter<w.name.length-1?"Próxima letra":"Terminei meu treino"}</Button></div><small>A estrela celebra a prática. O aplicativo não avalia a forma da letra.</small></>}
<div className={s.feedback} role="status">{msg}</div>{done.includes(key)&&stage>0&&<Button size="lg" onClick={()=>{if(stage<3){change(stage+1);say(stage===1?"Agora junte as sílabas.":"Vamos escrever com o dedo.");}else{I((idx+1)%words.length);change(0);say(words[(idx+1)%words.length].name.toLowerCase());}}}>{stage<3?"Continuar":"Próxima palavra"}<ArrowRight/></Button>}
</section>}
{audio&&<p role="alert">{audio}</p>}<footer className={s.footer}>Feito para aprender com calma, curiosidade e carinho.<br/><small>Voz do dispositivo • Progresso salvo neste navegador • Sem ranking</small></footer></main>);
}
