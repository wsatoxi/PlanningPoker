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
