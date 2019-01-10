'use strict';
const assert = require('assert');
const dc = require('../');

describe('#effectiveDamage()', () => {

  it('正常なダメージ計算ができる', () => {
    assert.equal(dc.effectiveDamage(0,0,100, 50, 30), 83);
  });

  it('負の異常値におけるダメージ計算ができる', () => {
    assert.equal(dc.effectiveDamage(1,0,-1, 0, 0), 0);
    assert.equal(dc.effectiveDamage(0,2,0, -1, 0), 0);
    assert.equal(dc.effectiveDamage(0,1,0, 0, -1), 0);
  });

  it('2000より大きい異常値におけるダメージ計算ができる', () => {
    assert.equal(dc.effectiveDamage(2,2,2001, 0, 0), 2000);
    assert.equal(dc.effectiveDamage(0,2,2000, 0, 0), 2000);
    assert.equal(dc.effectiveDamage(0,0,300, 2001, 0), 14);
    assert.equal(dc.effectiveDamage(0,0,300, 2000, 2001), 300);
  });

  it('実効防御力は0未満にならない', () => {
    assert.equal(dc.effectiveDamage(1,1,500, 100, 800), 500);
  });

  it('ダメージは小数点以下を四捨五入して整数にする', () => {
    assert.equal(dc.effectiveDamage(1,1,620, 100, 30), 365);
  });

  it('属性値の計算ができている', () => {
    assert.equal(dc.effectiveDamage(1,0,100, 50, 30), 88); //攻撃「水」、防御「火」
    assert.equal(dc.effectiveDamage(0,1,100, 50, 30), 79); //攻撃「火」、防御「水」
    assert.equal(dc.effectiveDamage(2,1,100, 50, 30), 88); //攻撃「草」、防御「水」
    assert.equal(dc.effectiveDamage(1,2,100, 50, 30), 79); //攻撃「水」、防御「草」
    assert.equal(dc.effectiveDamage(0,2,100, 50, 30), 88); //攻撃「火」、防御「草」
    assert.equal(dc.effectiveDamage(2,0,100, 50, 30), 79); //攻撃「草」、防御「火」
  });

});
