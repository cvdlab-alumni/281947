!(function (exports){

  var fs = require('fs');

  var plasm_lib = require('plasm.js');
  var obj = plasm_lib.plasm;
  var fun = plasm_lib.plasm_fun;
  var plasm = obj.plasm;
  var Plasm = obj.Plasm;

  var root = this;

  Object.keys(fun).forEach(function (k) { 
    root[k] = fun[k];
  });

  var p = new Plasm();
  fun.PLASM(p);

  var scmodel = (function () {
    
  var pad_width = 12.3;
  var pad_height = 5.4;
  var depth_pad = 1.7;

  var arrow_height=1.8;
  var arrow_width=0.6;
  var arrow_depth=0.2;
  var distanceArrowFromLeft = 1.3;
  var distanceArrowFromBottom = 1.3;

  var pad_width_black = pad_width-0.5;
  var pad_height_black = pad_height-1.2;
  var depth_pad_black = 0;

  var gray_color = [1,1,1];
  var colour_black = [0,0,0]; 
  var colour_red = [1,0,0];
  var colour_green = [0,1,0.5];
  var colour_blu = [0,0,1];
  var colour_green_black = [0.66,1.11,0.66];

  var RBott = 0.5;
  var depthBott = arrow_depth;
  var distanceBott = 0.8;
  var distanceBottFromBottom=1.6;
  var distanceBottFromBorderRight=1.7;

  var distanceBoardArrow = 0.2;

  var depthLetters=0.01;

  var heightNintendoLetters = 0.2;
  var distanceFromBottomLettNintendo= pad_height*0.60;
  var distanceBetLetters = 0.2;
  var spaceSingleLetters = 0.25;

  var distanceRettGreen_x = pad_width/3-0.5;
  var heightRettGreen = pad_height/7.5;
  var widthRettGreen = pad_width/3.5;
  var distanceBorderRettGreen = pad_height-heightRettGreen*2.1;
  var distanceBetRee = 0.2;

  var model;
  var InternalRett;
  var ExternalRett;
  var ArrowBorder;

  function makeRett(altezza,larghezza,profondita){
    return CUBOID([altezza,larghezza, profondita]);
  }

  function colour(color, model){
    return COLOR(color)(model);
  }

  function trasla_x(quantitaTraslazione, model){
    return T([0])([quantitaTraslazione])(model);
  }

  function trasla_y(quantitaTraslazione, model){
    return T([1])([quantitaTraslazione])(model);
  }

  function trasla_z(quantitaTraslazione, model){
    return T([2])([quantitaTraslazione])(model);
  }

  function makeArrow(){
    c1 = makeRett(arrow_width,arrow_height,arrow_depth);
    c2 = makeRett(arrow_height,arrow_width,arrow_depth); //quello di traverso
    
    c2 = trasla_y(arrow_width,c2);
    c2 = trasla_x(-arrow_width,c2);

    arrow = STRUCT([c1,c2]);
    arrow = colour(colour_red,arrow);

    return arrow;
  }

  function centersArrow(model){
    fr = model;
    fr = trasla_z(depth_pad,fr);
    fr = trasla_x(distanceArrowFromLeft,fr);
    fr = trasla_y(distanceArrowFromBottom,fr);
    return fr;
  }

  function centersBorder(model){
    fr = model;
    fr = trasla_z(depth_pad,fr);
    fr = trasla_x(distanceArrowFromLeft- distanceBoardArrow/2,fr);
    fr = trasla_y(distanceArrowFromBottom- distanceBoardArrow/2,fr);
    return fr;
  }

  function makeBoardArrow(){
    b1 = makeRett(arrow_width+distanceBoardArrow, arrow_height+distanceBoardArrow, 0.002);
    b2 = makeRett(arrow_height+distanceBoardArrow, arrow_width+distanceBoardArrow,0.002);
    b2 = trasla_y(arrow_width,b2);
    b2 = trasla_x(-arrow_width,b2);
    board = colour(gray_color,STRUCT([b1,b2]))
    return board;
  }

  function makeBott(){
    cir = DISK(RBott)();
        alt = EXTRUDE([depthBott])(cir);
        alt = colour(colour_red,alt);
    return alt;
  }

  function centersWhiteSquare(){
    q = CUBOID([RBott*2.2,RBott*2.2,0.002]);
    return q;
  }

  
  function makeA(){
    c1 = CUBOID([0.09,0.4,depthLetters])
    
    c2 = CUBOID([0.09,0.4,depthLetters])
    c2 = trasla_x(0.3,c2)
    
    c3 = CUBOID([0.3,0.09,depthLetters])
    c3 = trasla_y(0.31,c3)
    
    c4 = CUBOID([0.3,0.09,depthLetters])
    c4= trasla_y(0.1,c4)

    A = STRUCT([c1,c2,c3,c4])
    return A
  }

  function makeB(){
    c1 = CUBOID([0.25,0.4,depthLetters]);

    c2 = CUBOID([0.05,0.4,depthLetters]);
    c2 = trasla_x(0.43,c2);

    c3 = CUBOID([0.18,0.1,depthLetters])
    c3 = trasla_x(0.25,c3);

    c4 = CUBOID([0.18,0.1,depthLetters])
    c4 = trasla_x(0.25,c4);
    c4 = trasla_y(0.15,c4);

    c5 = CUBOID([0.18,0.1,depthLetters])
    c5 = trasla_x(0.25,c5);
    c5 = trasla_y(0.30,c5);

    B = colour(colour_red,STRUCT([c1,c2,c3,c4,c5]))

    return B
  }

  function makeBigN(){
    c1 = CUBOID([0.1,heightNintendoLetters*2,depthLetters]);

    c2 = CUBOID([heightNintendoLetters*0.8,0.23,depthLetters]);
    c2 = ROTATE([0,1,1])(PI/3)(c2);
    c2 = trasla_x(0.2,c2);
    c2 = trasla_y(0.08,c2);

    c3 = CUBOID([0.1,heightNintendoLetters*2,depthLetters]);
    c3 = trasla_x(0.2,c3);

    NP = colour(colour_red, STRUCT([c1,c2,c3]));
    return NP;
  }

  function makeI(){
    c1 = CUBOID([heightNintendoLetters*0.6,0.25,depthLetters]);

    c2 = CUBOID([heightNintendoLetters*0.6,heightNintendoLetters*0.6,depthLetters])
    c2 = trasla_y(heightNintendoLetters+0.08,c2);

    I = colour(colour_red, STRUCT([c1,c2]));
    return I;
  }

  function makeN(){
    c1 = CUBOID([0.1,0.25,depthLetters]);

    c2 = CUBOID([heightNintendoLetters*0.4,0.2,depthLetters]);
    c2 = ROTATE([0,1,1])(PI/3)(c2);
    c2 = trasla_x(0.2,c2);
    c2 = trasla_y(0.02,c2);

    c3 = CUBOID([0.1,0.25,depthLetters]);
    c3 = trasla_x(0.2,c3);

    NPiccola= colour(colour_red, STRUCT([c1,c2,c3]))    
    return NPiccola;
  }

  function makeT(){
    t1 = CUBOID([0.15, 0.25, depthLetters]);
    
    t2 = CUBOID([0.25, 0.1,depthLetters]);
    t2 = trasla_x(-0.05,t2);
    t2 = trasla_y(heightNintendoLetters*0.6, t2);

    Tletter = colour(colour_red, STRUCT([t1,t2]))
    return Tletter;
  }

  function makeE(){
    e1 = CUBOID([0.15,0.25,depthLetters]);

    e2 = CUBOID([0.20,0.05,depthLetters]);
    e2 = trasla_x(0.10,e2);

    e3 = CUBOID([0.20,0.05,depthLetters]);
    e4 = CUBOID([0.20,0.05,depthLetters]);

    e3 = trasla_y(0.1,e3);
    e3 = trasla_x(0.10,e3);

    e4 = trasla_y(0.20,e4);
    e4 = trasla_x(0.10,e4);

    Eletter = colour(colour_red, STRUCT([e1,e2,e3,e4]));
    return Eletter;

  }

  function makeO(){
    cir = DISK(0.13)();
    cir = colour(colour_red, cir);

    cir2 = DISK(0.06)();
    cir2 = colour(colour_black, cir2);
    cir2 = trasla_y(0.01, trasla_x(0.01, cir2));
    cir2 = trasla_z(0.001,cir2);

    Oletter = STRUCT([cir,cir2])
    return Oletter;
  }

  function makeD(){
    d1 = colour(colour_red, CUBOID([0.10,0.25,depthLetters]));
    d1 = trasla_x(0.07,d1);

    cir = DISK(0.1)();
    cir = colour(colour_red, cir);

    cir2 = DISK(0.05)();
    cir2 = colour(colour_black, cir2);
    cir2 = trasla_y(0.009, trasla_x(0.009, cir2));
    cir2 = trasla_z(0.001,cir2);

    cerchi = STRUCT([cir,cir2]);
    cerchi = trasla_y(0.1,cerchi);
    cerchi = trasla_x(0.02,cerchi);

    D =  STRUCT([d1,cerchi]);
    return D;
  }

  function makeS(){
    c1 = CUBOID([0.23,0.06,depthLetters]); 

    c2 = CUBOID([0.077,0.06,depthLetters]);
    c2 = trasla_y(0.06,c2);
    c2 = trasla_x(0.153,c2);

    c3 = CUBOID([0.23,0.06,depthLetters])
    c3 = trasla_y(0.12,c3)

    c4 = CUBOID([0.077,0.06,depthLetters])
    c4 = trasla_y(0.18,c4)

    c5 = CUBOID([0.23,0.06,depthLetters])
    c5 = trasla_y(0.24,c5)

    S = colour(colour_red, STRUCT([c1,c2,c3,c4,c5]));
  return S
  }

  function makeNintendoLetters(){
    d = distanceBetLetters//+spaceSingleLetters;
    
    N = makeBigN();
    I = trasla_x(d*1.8,makeI());
    NP = trasla_x(d*2.7, makeN());
    TL = trasla_x(d*4.6,makeT());
    E = trasla_x(d*5.8,makeE());
    N2 = trasla_x(d*7.5,makeN());
    D = trasla_x(d*9.5,makeD())
    O = trasla_y(0.12, trasla_x(d*11.1, makeO()));

    word = STRUCT([N,I,NP,TL,E,N2,D,O]);
    return word;
  }

  function makeRettVerde(){
    rettangoloVerde = makeRett(widthRettGreen,heightRettGreen, 0.001);
    rettangoloVerde = colour(colour_green_black,rettangoloVerde);
    return rettangoloVerde;
  }

  function makeESelect(){
    e1 = CUBOID([0.15,0.30,depthLetters]);

    e2 = CUBOID([0.20,0.07,depthLetters]);
    e2 = trasla_x(0.10,e2);

    e3 = CUBOID([0.20,0.07,depthLetters]);
    e4 = CUBOID([0.20,0.07,depthLetters]);

    e3 = trasla_y(0.12,e3);
    e3 = trasla_x(0.10,e3);

    e4 = trasla_y(0.23,e4);
    e4 = trasla_x(0.10,e4);

    ESelect = colour(colour_red, STRUCT([e1,e2,e3,e4]));
    return ESelect;

  }

  function makeL(){
    c1 = CUBOID([0.23,0.10,depthLetters]);
    c2 = CUBOID([0.10,0.30,depthLetters]);

    L = colour(colour_red, STRUCT([c1,c2]));
    return L;
  }

  function makeC(){
    c1 = CUBOID([0.23, 0.10, depthLetters]);

    c2 = CUBOID([0.23, 0.10, depthLetters]);
    c2 = trasla_y(0.20,c2);

    c3 = CUBOID([0.1, 0.23, depthLetters]);
    C = colour(colour_red, STRUCT([c1,c2,c3]));
    return C;
  }

  function makeTSelect(){
    t1 = CUBOID([0.10, 0.30, depthLetters]);
  
    t2 = CUBOID([0.25, 0.1,depthLetters]);
    t2 = trasla_x(-0.08,t2);
    t2 = trasla_y(0.20, t2);

    TSel = colour(colour_red, STRUCT([t1,t2]))
    return TSel;

  }

  function makeSelectLetters(){
    S = makeS();
    ES = trasla_x(0.28,makeESelect());
    L = trasla_x(0.64,makeL());
    ES2 = trasla_x(0.89,makeESelect());
    C = trasla_x(1.23,makeC());
    TS = trasla_x(1.55, makeTSelect());

    select = STRUCT([S,ES,L,ES2,C,TS]);
    return select;
  }


  function makeLittleA(){
    a1 = CUBOID([0.07,0.30,depthLetters]);
    
    a2 = CUBOID([0.07,0.30,depthLetters]);
    a2 = trasla_x(0.14,a2);

    a3 = CUBOID([0.17,0.05,depthLetters])
    a3 = trasla_y(0.25,a3);

    a4 = CUBOID([0.20,0.05,depthLetters]);
    a4 = trasla_y(0.15,a4);

    A = colour(colour_red, STRUCT([a1,a2,a3,a4]));
    return A;
  }

  function makeLittleR(){
    cir = DISK(0.1)();
    cir = colour(colour_red, cir);

    cir2 = DISK(0.03)();
    cir2 = colour(colour_green_black, cir2);
    cir2 = trasla_z(0.001,cir2)

    Oletter = STRUCT([cir,cir2])
    Oletter = trasla_y(0.21,Oletter);
    Oletter = trasla_x(0.15,Oletter);
    Oletter = trasla_z(0.001,Oletter);

    r1 = colour(colour_red, CUBOID([0.1,0.3,depthLetters]));
    
    stan = CUBOID([0.05,0.14,depthLetters]);
    stan = trasla_x(0.15,stan);
    stan = colour(colour_red,stan);

    Rletter = STRUCT([r1,Oletter,stan])
    return Rletter;
  }

  function makeStartLetters(){
    S = makeS();
    TS = trasla_x(0.35, makeTSelect());
    A = trasla_x(0.55, makeLittleA());
    RStart = trasla_x(0.8,makeLittleR());
    TS2 = trasla_x(1.15, makeTSelect());

    start = STRUCT([S,TS,A,RStart,TS2]);
    return start;

  }

  function makeword(){
    select = makeSelectLetters();
    start = trasla_x(2, makeStartLetters());
    start = trasla_z(0.01, start);
    frase = STRUCT([select,start]);
    return frase;
  }

  function makeRettWhite(){
    rettangoloBianco = makeRett(widthRettGreen,heightRettGreen, 0.001);
    rettangoloBianco = colour(gray_color,rettangoloBianco);  
    return rettangoloBianco;
  }

  function makeBlackBott(){
    pn1 = CUBOID([0.6,0.2,depthBott]);
    pn1 = colour(colour_black,pn1);
    pn1 = trasla_x(0.4,pn1)
    
    pn2 = CUBOID([0.6,0.2,depthBott]);
    pn2 = colour(colour_black,pn2);
    pn2 = trasla_x(2.3,pn2);
    
    p = STRUCT([pn2,pn1]);
    return p;
  }

  function makeRettVerdePiccolo(){
    rettangoloBianco = makeRett(widthRettGreen,heightRettGreen/2, 0.001);
    rettangoloBianco = colour(colour_green_black,rettangoloBianco); 
    return rettangoloBianco;
  }

  /*Creo il joypad e lo coloro di grigio*/
  ExternalRett = colour(gray_color, makeRett(pad_width,pad_height,depth_pad));
  InternalRett = colour(colour_black, makeRett(pad_width_black,pad_height_black,depth_pad_black));

  /*Creo il rettangolo nero sulla faccia del joypad*/
  InternalRett=trasla_x((pad_width-pad_width_black)/2,InternalRett);
  InternalRett=trasla_y((pad_height-pad_height_black)/3,InternalRett);
  InternalRett=trasla_z(depth_pad+0.001,InternalRett)

  /*Creo le arrow*/
  arrow = makeArrow();
  arrow = centersArrow(arrow);
  board =  makeBoardArrow();
  board = centersBorder(board);
  ArrowBorder = STRUCT([board,arrow]);
  
  /*creo i pulsanti*/
  ABottom = trasla_x(RBott*2+distanceBott,makeBott()); //stacco dal pulsante B
  ABottom = trasla_z(depth_pad,ABottom);
  ABottom = trasla_y(distanceBottFromBottom,ABottom)
  ABottom = trasla_x(pad_width-distanceBottFromBorderRight-RBott*2-distanceBott,ABottom);
  
  BBottom = makeBott();
  BBottom = trasla_z(depth_pad,BBottom);
  BBottom = trasla_y(distanceBottFromBottom,BBottom)
  BBottom = trasla_x(pad_width-distanceBottFromBorderRight-distanceBott-(RBott*2),BBottom);

  /*creo i quadrati bianchi*/
  qB = trasla_z(depth_pad,centersWhiteSquare());
  qA = trasla_z(depth_pad,centersWhiteSquare());

  qB = trasla_y(distanceBottFromBottom-RBott*1.1,qB);
  qB = trasla_x(pad_width-distanceBottFromBorderRight-distanceBott-(RBott*3.1),qB);

  qA = trasla_y(distanceBottFromBottom-RBott*1.1,qA);
  qA = trasla_x(pad_width-distanceBottFromBorderRight-distanceBott*0.7,qA);

  ALetters = colour(colour_red,makeA());
  ALetters = trasla_z(depth_pad,ALetters);
  ALetters = trasla_x(pad_width-distanceBottFromBorderRight*0.9,ALetters);
  ALetters = trasla_y(distanceBottFromBottom/3,ALetters);

  BLetters = makeB();
  BLetters = trasla_z(depth_pad,BLetters);
  BLetters = trasla_y(distanceBottFromBottom/3,BLetters);
  BLetters = trasla_x(pad_width-distanceBottFromBorderRight- distanceBott -RBott*2,BLetters);

  NGLetter = makeBigN();
  NGLetter = trasla_z(depth_pad,NGLetter);
  NGLetter = trasla_y(distanceFromBottomLettNintendo,NGLetter);
  NGLetter = trasla_x((pad_width-distanceBottFromBorderRight- distanceBott -RBott*2- spaceSingleLetters ),NGLetter);

  nintendo = makeNintendoLetters();
  nintendo = trasla_x(pad_width-distanceBottFromBorderRight-distanceBott-(RBott*3.1),nintendo);
  nintendo = trasla_y(distanceFromBottomLettNintendo,nintendo);
  nintendo = trasla_z(depth_pad+0.01, nintendo);
  

  retVerde1 = makeRettVerde();
  retVerde1 = trasla_x(distanceRettGreen_x, trasla_y(distanceBorderRettGreen,retVerde1))
  retVerde1 = trasla_z(depth_pad+0.001,retVerde1);

  retVerde2 = makeRettVerde();
  retVerde2 = trasla_x(distanceRettGreen_x, trasla_y(distanceBorderRettGreen- heightRettGreen - distanceBetRee ,retVerde2))
  retVerde2 = trasla_z(depth_pad+0.001,retVerde2);

  retVerde3 = makeRettVerde();
  retVerde3 = trasla_x(distanceRettGreen_x, trasla_y(distanceBorderRettGreen- heightRettGreen*2 - distanceBetRee*2 ,retVerde3))
  retVerde3 = trasla_z(depth_pad+0.001,retVerde3);

  word = makeword();
  word = trasla_z(depth_pad,word);
  word = trasla_x(3.65,word);
  word = trasla_y(2.3,word);

  retBianco = makeRettWhite();
  retBianco = trasla_x(3.65, trasla_y(1.2, trasla_z(depth_pad+0.001,retBianco)))

  puls = makeBlackBott();
  puls = trasla_x(3.65, trasla_y(1.4, trasla_z(depth_pad+0.1,puls)))

  retVerdePicc = makeRettVerdePiccolo();
  retVerdePicc = trasla_x(distanceRettGreen_x, retVerdePicc);
  retVerdePicc = trasla_z(depth_pad+0.001,retVerdePicc);
  retVerdePicc = trasla_y(0.4,retVerdePicc);
  
  model = STRUCT([InternalRett,ExternalRett,ArrowBorder,ABottom,BBottom,qB,qA,ALetters,BLetters,word,retVerde1,retVerde2,retVerde3, retVerdePicc, retBianco, nintendo, puls, word]);
    
  return model
  })();

  exports.author = 'dvidi';
  exports.category = 'device';
  exports.scmodel = scmodel;

  if (!module.parent) {
    fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
  }

}(this));