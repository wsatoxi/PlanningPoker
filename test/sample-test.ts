/// <reference path="../src/sample.ts"/>
/// <reference path="../typings/tsd.d.ts"/>

test("sample - test",function(){
  var sample : pokerapp.Sample = new pokerapp.Sample();
  equal(sample.hello('hoge'),'Hello hoge');
})
