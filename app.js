const pages=[...document.querySelectorAll('[data-page]')];
const homePage=pages.find(page=>page.dataset.page==='home');
const footerComponent=homePage?.querySelector('.site-footer');
pages.filter(page=>page!==homePage).forEach(page=>{if(footerComponent&&!page.querySelector('.site-footer'))page.append(footerComponent.cloneNode(true))});
const navLinks=[...document.querySelectorAll('[data-nav]')];
const nav=document.querySelector('.main-nav');
const menuButton=document.querySelector('.menu-toggle');
const siteHeader=document.querySelector('.site-header');
function updateHeaderState(){
  const isHome=document.querySelector('[data-page="home"]')?.classList.contains('active');
  const atHomeTop=isHome&&window.scrollY<28;
  siteHeader.classList.toggle('header-home-top',Boolean(atHomeTop));
  siteHeader.classList.toggle('header-scrolled',window.scrollY>=28);
}
window.addEventListener('scroll',updateHeaderState,{passive:true});
updateHeaderState();

const ageDescriptions={kids:'Для детей — спектакли от первых театральных впечатлений до историй для самостоятельного просмотра.',teens:'Для подростков — классические сюжеты и современные истории о взрослении, выборе и отношениях.',adults:'Для взрослых — театр предмета, сказки и спектакли о сложных темах без готовых ответов.'};

const articles={
  space:{title:'Пространство как соавтор',category:'Мастерская',intro:'Как работа с местом создаёт философию всего спектакля.',image:'space-article.png',body:[
    'Сцена — не пустая коробка, в которую помещают готовую историю. Её размеры, свет, фактура и даже расстояние до зрителя влияют на то, как будет двигаться кукла и что мы в ней увидим.',
    'Если действие происходит в тесной комнате, жест становится камерным. Если между зрителем и куклой появляется большая дистанция, меняется масштаб: маленькое движение может превратиться в событие. Пространство задаёт спектаклю собственный ритм.',
    'Поэтому режиссёр начинает разговор не только с пьесы и персонажей, но и с места. Иногда именно сцена подсказывает, какой должна быть история.'
  ]},
  'last-viewer':{title:'Режиссёр как последний зритель',category:'Персоналии',intro:'Режиссёр читает не только текст, но и пространство, свет, пластику и энергетику.',image:'journal-last-viewer-hq.png',body:[
    'На репетиции режиссёр одновременно находится внутри процесса и смотрит на него со стороны. Он замечает, что видит зритель: куда направлено внимание, что остаётся в тени и какой жест становится главным.',
    'В кукольном театре этот взгляд особенно важен. Здесь выразительность рождается из точного движения, паузы и отношений между актёром, предметом и сценой. Иногда небольшой поворот головы говорит больше, чем длинная реплика.',
    'Финальный зрительский взгляд помогает собрать эти детали в целое — и вовремя остановиться, оставив спектаклю воздух.'
  ]},
  shadow:{title:'Тень как первокукла',category:'Теория чуда',intro:'От пещерных историй и яванского ваянг-кулит до европейского теневого театра.',image:'journal-shadow-restored.png',body:[
    'Тень появляется раньше подробного изображения. Достаточно света, поверхности и фигуры между ними — и знакомый силуэт уже начинает жить отдельной жизнью.',
    'Теневой театр строится на простых средствах, но оставляет много пространства воображению. Зритель видит контур, движение и перемены масштаба, а остальное достраивает сам.',
    'В этом и заключается особая сила тени: она не показывает персонажа целиком, а предлагает встретиться с образом на границе видимого.'
  ]},
  forbidden:{title:'Запретный театр',category:'Режиссёрская',intro:'Как батлейка выживала в чемоданах и чем кукольный вертеп был опасен для империи.',image:'journal-forbidden-hq.png',body:[
    'Батлейка — кукольная сцена, которую можно было собрать и унести с собой. В небольшом ящике помещались декорации и пространство для представления: театр становился переносным и не зависел от постоянного здания.',
    'Такая компактность помогала сохранять традицию и показывать истории в разных местах. А сатира, спрятанная за кукольными персонажами, позволяла говорить о власти и общественном порядке обходным языком.',
    'Кукольный вертеп был одновременно праздником и высказыванием. Его камерный формат не делал его безобидным: маленькая сцена могла задавать неудобные вопросы.'
  ]},
  'last-stroke':{title:'Последний штрих',category:'Мастерская',intro:'Деталь, которую актёр достраивает уже во время репетиции.',image:'journal-workshop-stage.png',body:['Кукла не всегда становится законченной в мастерской. Последние решения появляются в движении: как она держит паузу, реагирует на партнёра и существует рядом со зрителем.','Этот штрих не обязательно виден как отдельная деталь. Иногда им становится ритм или характер жеста — то, что открывается только в живой работе.']},
  plaster:{title:'От гипса к силикону',category:'Мастерская',intro:'Как слепок актёрского лица меняет кукольный театр.',image:'journal-plaster.jpg',body:['Точное лицо куклы может приблизить её к человеку, но сходство не всегда делает образ убедительнее. Иногда оно, наоборот, вызывает тревогу: знакомые черты соединяются с неподвижностью материала.','На границе узнавания появляется эффект зловещей долины. Материал, пропорции и движение начинают работать вместе, создавая ощущение присутствия.']},
  metaphor:{title:'Метафора в действии',category:'Режиссёрская',intro:'От абстрактной идеи к конкретному жесту куклы.',image:'journal-metaphor.jpg',body:['Театральная метафора становится понятной не потому, что её объяснили словами, а потому, что зритель увидел её в действии. Предмет может изменить значение через движение, повтор или неожиданное соседство.','Кукла помогает сделать абстрактную мысль осязаемой: идея получает форму, вес и направление.']},
  villain:{title:'Маленький, плохой, злой',category:'Режиссёрская',intro:'Зачем современному режиссёру злой и несимпатичный герой?',image:'villain-marionette-balance.jpg?v=20261125-2',body:['Несимпатичный герой нарушает привычное ожидание, что кукольный персонаж должен сразу нравиться. Его неудобство открывает историю с другой стороны и позволяет внимательнее посмотреть на причины поступков.','Зрителю не обязательно соглашаться с героем. Иногда достаточно остаться рядом с ним на время спектакля — и заметить, что простых ответов нет.']},
  'empty-space':{title:'Диалог с пустотой',category:'Теория чуда',intro:'Как работать со сценическим пространством, если на сцене почти ничего нет.',image:'journal-empty_space.jpg',body:['Пустая сцена не означает отсутствие действия. В ней особенно заметны расстояния, направление взгляда и ожидание следующего движения.','Один предмет или жест может менять смысл именно потому, что вокруг него осталось свободное место. Пустота становится частью композиции.']},
  'pocket-secret':{title:'Карман для секрета',category:'Мастерская',intro:'Зачем в спину куклы вшивают маленький потайной мешочек.',image:'journal-pocket_secret.jpg',body:['У куклы есть видимая сторона — та, которую встречает зритель, — и внутренняя конструкция, без которой не получилось бы движение. Потайной карман становится частью этой скрытой системы.','За маленькой деталью стоит практическая логика мастерской: предмет должен оставаться под рукой, не нарушая рисунок спектакля.']},
  documentary:{title:'Документальный театр кукол',category:'Режиссёрская',intro:'Можно ли играть реальные истории и не скатиться в буквализм.',image:'journal-documentary.jpg',body:['Документальный материал приносит на сцену конкретные голоса и события. Кукольная форма позволяет работать с ними не буквально, а через образ, дистанцию и монтаж.','Так появляется возможность говорить о реальном опыте бережно — не подменяя человека персонажем и не превращая историю в иллюстрацию.']},
  'puppet-to-puppet':{title:'От трупа к кукле',category:'Теория чуда',intro:'Анатомические театры Возрождения подарили миру механических людей.',image:'puppet-archive.jpg',body:['История куклы связана с человеческим интересом к устройству тела и движению. Механические модели превращали наблюдение за анатомией в попытку воспроизвести жизнь.','На сцене эта идея меняется: движение становится выразительным жестом, а искусственная фигура получает собственный характер.']},
  'children-death':{title:'Нужны ли детям спектакли о смерти?',category:'Гид',intro:'Как говорить с ребёнком о потере, памяти и переменах — и чем в этом помогает театр.',image:'death-bird-new.png',complete:true,body:['Разговор о смерти редко начинается с готового ответа. Чаще — с вопроса, который ребёнок задаёт неожиданно и очень прямо. В этот момент важнее не найти идеальную формулировку, а остаться рядом и услышать, что именно его тревожит.','Кукольный театр помогает говорить о сложном через образ. На сцене можно увидеть прощание, утрату или перемену на безопасном расстоянии: персонаж проживает чувство, а зритель получает время, чтобы соотнести увиденное со своим опытом.','Подбирать спектакль стоит не только по возрастной маркировке. Важно учитывать чувствительность ребёнка, быть готовыми продолжить разговор после показа и не объяснять историю вместо него. Ниже — пять постановок, которые могут стать поводом поговорить о памяти, расставании и продолжении жизни.'],relatedShows:[{title:'БиМ. Большое и маленькое',age:'0+',image:'rep-chick-restored.png',description:'О первых открытиях и большом мире вокруг.'},{title:'Фьють',age:'0+',image:'guide-bird-stage.png',description:'Камерная история для первого разговора о переменах.'},{title:'Сколько весит сверчок?',age:'6+',image:'adult-heart.jpg',description:'Спектакль о ценности жизни и невидимых вещах.'},{title:'Фердинанд',age:'6+',image:'guide-fox-stage.png',description:'О принятии себя и бережном отношении к другому.'},{title:'Сказки дядюшки Монтеки',age:'6+',image:'guide-monteki.jpg',description:'О фантазии, памяти и том, как истории остаются с нами.'}]},
  'quantum-puppeteer':{title:'Квантовый кукловод',category:'Теория чуда',intro:'Почему мы верим в ожившую куклу? Объясняем с помощью теории суперпозиции.',image:'quantum-puppeteer.png',body:['Кукла на сцене одновременно остаётся предметом и становится персонажем. Мы видим дерево, ткань и механизм, но всё равно следим за тем, что она чувствует и чего хочет. В этом двойном восприятии и рождается театральное чудо.','Можно представить, что образ существует сразу в нескольких состояниях: это ещё вещь, но уже герой; актёр управляет движением, но зритель приписывает персонажу собственную волю. Переход между этими значениями происходит прямо на глазах.','Теория суперпозиции здесь — метафора для разговора о зрительском воображении, а не научное объяснение актёрской работы. Именно зритель соединяет видимый механизм с переживанием и достраивает кукольную жизнь.','Кукловод задаёт точность жеста, а публика — масштаб чуда. Поэтому одна и та же фигура может казаться простой конструкцией и живым собеседником одновременно.']},
  'old-house':{title:'Что нашёптывает старый дом, когда все ложатся спать?',category:'Журнал',intro:'Авторская сказка о ночной жизни домашней утвари и тихих голосах знакомых вещей.',image:'old-house-cutout.png',body:['Когда в доме гаснет свет, привычные вещи будто меняются местами. Скрип половиц звучит как шаг, старый шкаф хранит свои истории, а за закрытой дверцей может прятаться целый маленький мир.','Эта история приглашает не бояться ночной тишины, а прислушаться к ней. В ней есть место любопытству, смешным открытиям и неожиданной дружбе с тем, что днём кажется совсем обычным.','Спектакль обращается к детскому умению замечать характер в предметах. Взрослая чашка, забытая перчатка или настольная лампа становятся героями, потому что воображение умеет дать голос почти всему.','Это камерная встреча для тех, кто любит истории, которые продолжаются после финала: в собственном доме, в вечернем шорохе и в новых вопросах перед сном.']},
  'blind-assembly':{title:'Слепая сборка',category:'Мастерская',intro:'Мастера-конструкторы собирают куклу, полагаясь на прикосновение.',image:'journal-blind_assembly.jpg',body:['Когда зрение перестаёт быть главным ориентиром, мастер начинает внимательнее чувствовать соединения, баланс и фактуру материала. Так обнаруживаются решения, которые легко пропустить при обычной сборке.','Ограничение становится способом исследования конструкции и будущего движения куклы.']},
  postdramatic:{title:'Постдраматический кукольник',category:'Персоналии',intro:'Как Евгений Ильин смешивает куклы, документ и анимацию.',image:'journal-postdramatic.jpg',body:['Кукольный театр может соединять разные способы рассказа: игру актёра, документальный материал и анимацию предмета. В этом смешении кукла не просто иллюстрирует текст, а становится самостоятельным участником действия.','Меняющиеся формы позволяют по-новому смотреть на привычную сценическую историю.']},
  gesture:{title:'Археология жеста',category:'Теория чуда',intro:'Как жест куклы путешествует между традициями и эпохами.',image:'journal-gesture.jpg',body:['Жест хранит историю тела и способа управления. Он может повторяться в разных традициях, каждый раз меняя значение и темп.','Наблюдая за жестом, можно увидеть, как кукольный театр наследует старые формы и приспосабливает их к новому зрителю.']}
};

const shows={
  karlsson:{title:'Карлссон, который живёт на крыше',meta:'Спектакль · 4+ · 55 минут',intro:'История о дружбе, смелости быть собой и маленьких шалостях, которые делают жизнь веселее.',image:'rep-karlsson.jpg',gallery:['karlsson-gallery-user-1.png','karlsson-gallery-user-2.png'],body:['Малыш уверен, что ему очень не хватает друга. И друг действительно появляется — с пропеллером за спиной, весёлым характером и собственным взглядом на правила.','Вместе они исследуют чердак, знакомятся с новыми персонажами и превращают обычные дни в приключение. Спектакль сохраняет лёгкость сказки Астрид Линдгрен и говорит о важном: дружбе, доверии и умении принимать другого.','Постановка подходит для семейного просмотра. Спектакль рекомендован детям от 4 лет; продолжительность — 55 минут.'],schedule:'28 ноября · 12:00, 14:30, 17:00\n5 декабря · 12:00, 14:30, 17:00',address:'Набережная реки Фонтанки, 50К · Санкт-Петербург\nУлица Ломоносова, 14 · Санкт-Петербург'},
  chicken:{title:'Цыплёнок',meta:'Спектакль · 3+ · 35 минут',intro:'Трогательная история по сказке Корнея Чуковского о первых шагах в огромном мире и о маме, которая всегда рядом.',image:'chicken-hero-user.png',gallery:['chicken-gallery-user-1.png','chicken-gallery-user-2.png'],body:['Маленький цыплёнок знакомится с огромным миром — прекрасным, удивительным и добрым, но порой непростым. Он делает первые шаги, встречает новое и учится справляться с маленькими открытиями и потерями.','Рядом с ним мама: она помогает исследовать неизвестное и остаётся опорой, когда мир кажется слишком большим. Спектакль посвящён нашим мамам и рассказывает об обычном ребёнке, который каждый день становится чуть самостоятельнее.','Постановка создана по мотивам сказки Корнея Чуковского, рекомендована детям старше 3 лет. Продолжительность — 35 минут.'],schedule:'Ближайшие даты спектакля пока не опубликованы. Смотрите расписание театра.',address:'Набережная реки Фонтанки, 50К · Санкт-Петербург\nУлица Ломоносова, 14 · Санкт-Петербург'}
};
function setDetailImage(selector,filename,alt){
  const previous=document.querySelector(selector);
  const src=`./assets/${filename}`;
  if(previous.getAttribute('src')===src){previous.alt=alt;return previous;}
  const image=previous.cloneNode(false);
  image.removeAttribute('src');
  image.alt=alt;
  image.classList.add('detail-image-pending');
  const reveal=()=>image.classList.remove('detail-image-pending');
  image.addEventListener('load',reveal,{once:true});
  image.addEventListener('error',reveal,{once:true});
  image.src=src;
  previous.replaceWith(image);
  if(image.complete&&image.naturalWidth)reveal();
  return image;
}
function renderShow(id){
  const item=shows[id]; if(!item)return false;
  const showPage=document.querySelector('#show-page');
  showPage.dataset.showId=id;
  document.querySelector('[data-show-meta]').textContent=item.meta.replace(/ · /g,' · ').replace(/ (минут|минута|минуты|час|часа|часов)/giu,' $1');
  document.querySelector('[data-show-title]').textContent=item.title;
  document.querySelector('[data-show-intro]').textContent=item.intro;
  setDetailImage('[data-show-image]',item.image,`Сцена спектакля «${item.title}»`);
  document.querySelector('[data-show-body]').replaceChildren(...item.body.map(text=>{const p=document.createElement('p');p.textContent=text;return p}));
  document.querySelector('[data-show-schedule]').textContent=item.schedule;
  document.querySelector('[data-show-address]').innerHTML=item.address.replace(/Санкт-Петербург/g,'<span class="address-city">Санкт-Петербург</span>');
  const cta=document.querySelector('[data-show-cta]');
  const hasUpcomingDates=/\d{1,2}\s+\p{L}+\s*·\s*\d{1,2}:\d{2}/u.test(item.schedule);
  if(hasUpcomingDates){const button=document.createElement('span');button.className='hero-cta';button.dataset.showCta='';button.setAttribute('aria-disabled','true');button.textContent='Купить билет';cta.replaceWith(button)}
  else{const link=document.createElement('a');link.className='hero-cta';link.dataset.showCta='';link.href='#schedule';link.textContent='Смотреть расписание';cta.replaceWith(link)}
  const gallery=document.querySelector('.show-detail-gallery');
  ['one','two','three'].forEach((slot,index)=>{const img=document.querySelector(`[data-show-gallery-${slot}]`);if(img){const visible=Boolean(item.gallery[index]);img.hidden=!visible;if(visible){setDetailImage(`[data-show-gallery-${slot}]`,item.gallery[index],`Фотография спектакля «${item.title}»`)}}});
  gallery.style.gridTemplateColumns=`repeat(${Math.max(1,item.gallery.length)},minmax(0,1fr))`;
  document.title=`${item.title} — Karlsson Haus`; return true;
}

function renderArticle(id){
  const item=articles[id];
  if(!item)return false;
  setDetailImage('[data-article-image]',item.image,item.title);
  const articlePhoto=document.querySelector('.article-detail-photo');
  articlePhoto.classList.toggle('cutout-photo',item.image.endsWith('-cutout.png'));
  articlePhoto.classList.toggle('cutout-photo--red',id==='old-house');
  articlePhoto.classList.toggle('article-photo-horizontal',id==='villain'||id==='puppet-to-puppet');
  articlePhoto.classList.toggle('article-photo-bottom',id==='villain');
  articlePhoto.classList.toggle('article-photo-history',id==='puppet-to-puppet');
  document.querySelector('[data-article-category]').textContent=item.category;
  document.querySelector('[data-article-title]').textContent=item.title;
  document.querySelector('[data-article-intro]').textContent=item.intro;
  const body=document.querySelector('[data-article-body]');
  const expanded=[...item.body];
  if(expanded.length<4&&!item.complete){expanded.push('В репетиционной работе эта тема раскрывается постепенно. Важны не только придуманный образ и материал, но и то, как зритель считывает движение, паузу и отношения между сценой и залом.');expanded.push('Поэтому кукольный театр не предлагает единственного способа смотреть. Каждый зритель собирает собственный смысл из деталей, а спектакль остаётся открытым для повторной встречи.');}
  body.replaceChildren(...expanded.map(text=>{const p=document.createElement('p');p.textContent=text;return p}));
  const related=document.querySelector('[data-related-shows]');
  const relatedGrid=related.querySelector('.related-show-grid');
  relatedGrid.replaceChildren();
  if(item.relatedShows){related.hidden=false;item.relatedShows.forEach(show=>{const card=document.createElement('a');card.className='related-show';card.href='#repertoire';const image=document.createElement('img');image.src=`./assets/${show.image}`;image.alt=`Сцена спектакля «${show.title}»`;const age=document.createElement('small');age.textContent=show.age;const title=document.createElement('strong');title.textContent=show.title;const desc=document.createElement('span');desc.textContent=show.description;card.append(image,age,title,desc);relatedGrid.append(card)})}else related.hidden=true;
  const cta=document.querySelector('[data-article-cta]');
  if(item.cta){cta.hidden=false;cta.href=item.ctaHref;cta.textContent=item.cta}else cta.hidden=true;
  document.title=`${item.title} — Karlsson Haus`;
  return true;
}
function keepPrepositionsTogether(root=document.body){
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){return node.parentElement?.closest('script,style,svg')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});
  const pattern=/(^|[^\p{L}])((?:из-за|из-под|вокруг|между|вдоль|около|перед|после|через|ради|вместо|вслед|несмотря|ввиду|согласно|благодаря|или|но|да|и|а|же|ли|бы|в|к|с|у|о|на|за|по|из|от|до|об|во|ко|со|над|под|при|для|без|про|обо))\s+(?=[\p{L}\p{N}])/giu;
  let node;while((node=walker.nextNode()))node.nodeValue=node.nodeValue.replace(pattern,(_,prefix,prep)=>prefix+prep+'\u00a0');
}

function showPage(route,updateHash=true){
  const [name,articleId]=route.split('/');
  if(name==='article'&&!renderArticle(articleId)){route='journal'}
  if(name==='show'&&!renderShow(articleId)){route='repertoire'}
  const currentName=route.split('/')[0];
  const page=pages.find(item=>item.dataset.page===currentName)||pages.find(item=>item.dataset.page==='home');
  pages.forEach(item=>item.classList.toggle('active',item===page));
  updateHeaderState();
  keepPrepositionsTogether();
  const navPage=currentName==='article'?'journal':currentName==='show'?'repertoire':currentName;
  navLinks.forEach(link=>link.classList.toggle('active',link.dataset.nav===navPage));
  if(updateHash&&location.hash!==`#${route}`)history.pushState({route},'',`#${route}`);
  nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='Меню';
  if(currentName!=='show'&&currentName!=='article')document.title='Karlsson Haus — театр, журнал, гид';
  window.scrollTo({top:0,behavior:'smooth'});
}
navLinks.forEach(link=>link.addEventListener('click',event=>{event.preventDefault();showPage(link.dataset.nav)}));

document.querySelectorAll('#journal .article-card [data-article]').forEach(link=>link.addEventListener('click',event=>{
  event.preventDefault();showPage(`article/${link.dataset.article}`);
}));

document.querySelectorAll('[data-show]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();showPage(`show/${link.dataset.show}`)}));
function handleRouteChange(){const route=location.hash.slice(1)||'home';if(route==='schedule'){showPage('repertoire');document.getElementById('schedule')?.scrollIntoView({behavior:'smooth'});return}showPage(route,false)}
window.addEventListener('popstate',handleRouteChange);
window.addEventListener('hashchange',handleRouteChange);

menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'Закрыть':'Меню'});

document.querySelectorAll('.age-tab').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.age-tab').forEach(item=>{const selected=item===button;item.classList.toggle('selected',selected);item.setAttribute('aria-selected',String(selected))});
  const age=button.dataset.age;let count=0;
  document.querySelectorAll('.show-row').forEach(row=>{const visible=row.dataset.group===age;row.hidden=!visible;if(visible)count++});
  const description=document.querySelector('.age-description');
  if(description){description.textContent=ageDescriptions[age];keepPrepositionsTogether(description);}
  document.querySelector('.rep-empty').hidden=count>0;
}));
document.querySelector('.age-tab[data-age="kids"]').click();

const guideInputs={city:document.querySelector('#guide-city'),price:document.querySelector('#guide-price'),age:document.querySelector('#guide-age'),theme:document.querySelector('#guide-theme')};
const guideItems=[...document.querySelectorAll('[data-guide-item]')];
const guideStatus=document.querySelector('.guide-filter-status');
const priceValue=document.querySelector('#guide-price-value');
function applyGuideFilters(){
  const filters=Object.fromEntries(Object.entries(guideInputs).map(([key,input])=>[key,input.value]));
  const maxPrice=Number(filters.price); if(priceValue)priceValue.textContent=`${maxPrice.toLocaleString('ru-RU')} ₽`;
  let visible=0;
  guideItems.forEach(item=>{
    const price=Number(item.dataset.price),age=Number(item.dataset.age);
    let ageMatches=true;
    if(filters.age!=='all'){const threshold=Number(filters.age);ageMatches=threshold===0?age<12:threshold===6?age>=6&&age<12:threshold===12?age>=12&&age<18:age>=18;}
    const matches=(filters.city==='all'||item.dataset.city===filters.city)&&price<=maxPrice&&ageMatches&&(filters.theme==='all'||item.dataset.theme===filters.theme);
    item.hidden=!matches;if(matches)visible++;
  });
  guideStatus.textContent=`Найдено спектаклей: ${visible}`;
}
Object.values(guideInputs).forEach(input=>input.addEventListener(input.type==='range'?'input':'change',applyGuideFilters));
document.querySelector('.guide-reset').addEventListener('click',()=>{guideInputs.city.value='all';guideInputs.price.value='3000';guideInputs.age.value='all';guideInputs.theme.value='all';applyGuideFilters()});
applyGuideFilters();

const topicLabels={craft:'craft',stage:'stage',people:'people',ideas:'ideas'};
document.querySelectorAll('.topic').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.topic').forEach(item=>item.classList.toggle('selected',item===button));
  const selected=button.dataset.topic;
  document.querySelectorAll('.article-card').forEach(card=>card.hidden=selected!=='all'&&card.dataset.topicGroup!==topicLabels[selected]);
}));
document.querySelectorAll('.article-card[data-extra]').forEach(card=>card.hidden=true);
const showMore=document.querySelector('.load-more');
showMore.addEventListener('click',()=>{document.querySelectorAll('.article-card[data-extra]').forEach(card=>card.hidden=false);showMore.hidden=true});

const searchToggle=document.querySelector('.search-toggle');
const searchBox=document.querySelector('.search-box');
const searchInput=searchBox.querySelector('input');
const searchResults=searchBox.querySelector('.search-results');
const searchIndex=[
  ...Object.entries(articles).map(([id,item])=>({title:item.title,meta:item.category,haystack:`${item.title} ${item.intro} ${item.category}`,route:`article/${id}`})),
  ...[...document.querySelectorAll('.show-row')].map(row=>({title:row.querySelector('h2')?.textContent||'',meta:'Репертуар',haystack:row.innerText,route:'repertoire'})),
  ...[...document.querySelectorAll('.guide-card')].map(card=>({title:card.querySelector('h2')?.textContent||'',meta:'Гид · '+card.dataset.city,haystack:card.innerText,route:'guide'})),
  ...pages.filter(page=>page.dataset.page!=='article').map(page=>({title:page.querySelector('h1')?.textContent||page.dataset.page,meta:'Раздел',haystack:page.innerText,route:page.dataset.page}))
];
function renderSearchResults(){
 const query=searchInput.value.trim().toLocaleLowerCase('ru');
 searchResults.replaceChildren();if(!query){searchResults.classList.remove('open');return}
 const matches=searchIndex.filter(item=>item.haystack.toLocaleLowerCase('ru').includes(query)).slice(0,8);
 if(!matches.length){const empty=document.createElement('p');empty.className='search-result';empty.textContent='Ничего не найдено';searchResults.append(empty)}
 else matches.forEach(item=>{const link=document.createElement('a');link.className='search-result';link.href=`#${item.route}`;link.dataset.searchRoute=item.route;const title=document.createElement('span');title.textContent=item.title;const meta=document.createElement('small');meta.textContent=item.meta;link.append(title,meta);searchResults.append(link)});
 searchResults.classList.add('open');
}
searchToggle.addEventListener('click',()=>{searchBox.classList.toggle('open');if(searchBox.classList.contains('open'))searchInput.focus();else searchResults.classList.remove('open')});
searchInput.addEventListener('input',renderSearchResults);
searchBox.addEventListener('submit',event=>{event.preventDefault();renderSearchResults();const first=searchResults.querySelector('[data-search-route]');if(first){showPage(first.dataset.searchRoute);searchBox.classList.remove('open');searchResults.classList.remove('open')}});
searchResults.addEventListener('click',event=>{const link=event.target.closest('[data-search-route]');if(!link)return;event.preventDefault();showPage(link.dataset.searchRoute);searchBox.classList.remove('open');searchResults.classList.remove('open')});

handleRouteChange();
