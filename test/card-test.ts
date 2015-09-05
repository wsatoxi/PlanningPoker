/// <reference path="../src/card.ts"/>
/// <reference path="../typings/tsd.d.ts"/>

test('card - randomColor test',function(){
  var card : pokerapp.Card = new pokerapp.Card();
  var color : string = (<any>card).randomColor();

  var rgbExp = /^#?[0-9a-fA-F]{6}$/;
  equal(rgbExp.test(color),true);
})

test('card - createComplementaryColor test', function(){
  var card : pokerapp.Card = new pokerapp.Card();
  var r = 255, g =216,b = 31;
  var eR = 31, eG = 70, eB = 255;

  var color : string = (<any>card).createComplementaryColor('#' + r.toString(16) + g.toString(16) + b.toString(16) );
  equal(color.toLowerCase(),('#' + eR.toString(16) + eG.toString(16) + eB.toString(16)).toLowerCase());
})

test('card - createCardsDom test', function(){
  var card : pokerapp.Card = new pokerapp.Card();
  var parent : HTMLElement = document.createElement('div');

  (<any>card).createCardsDom(parent);

  equal(parent.childNodes.length,4);
  equal((<HTMLElement>parent.childNodes[0]).className,'swiper-wrapper');
  equal(parent.childNodes[0].childNodes.length,14);
  equal((<HTMLElement>parent.childNodes[1]).className,'swiper-pagination');
})

test('card - createCardsDom parent node is null test',function(){
  var card : pokerapp.Card = new pokerapp.Card();
  try{
    (<any>card).createCardsDom(null);
  }catch(e){
    if(e instanceof Error){
      equal(1,1);
    }else{
      equal(1,0);
    }
    return;
  }
  equal(1,0);
})

test('card - createSwiper test',function(){
  // Create Dummmy Swiper
  (<any>window).Swiper = function Swiper(target : string,option : SwiperOptions){
    equal(target,'.target')
  };
  var card : pokerapp.Card = new pokerapp.Card();
  (<any>card).createSwiper('.target');
  equal((<any>card)._swip != null,true);

})
