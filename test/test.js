'use strict';
// モジュール読み込み
const assert = require('assert');
const dc = require('../');

// mochaのテストの書式
// 第一引数：一連のテストの名前
// 第二引数：個々のテスト処理(it処理)を含む無名関数
describe('#effectiveDamage()',
  () => {
    // 個々のテスト処理
    // 第一引数：個々のテストの名前
    // 第二引数：実際のテスト処理を行う関数(assert処理など)
    it('正常なダメージ計算ができる',
      () => { assert.equal(dc.effectiveDamage(100, 50, 30), 83); }
    );
    it('負の異常値におけるダメージ計算ができる',
      () => {
        assert.equal(dc.effectiveDamage(-1, 0, 0), 0);
        assert.equal(dc.effectiveDamage(0, -1, 0), 0);
        assert.equal(dc.effectiveDamage(0, 0, -1), 0);
      }
    );
    it('負の異常値におけるダメージ計算ができる',
      () => {
        assert.equal(dc.effectiveDamage(2001, 0, 0), 2000);
        assert.equal(dc.effectiveDamage(300, 2001, 0), 14);
        assert.equal(dc.effectiveDamage(300, 2000, 2001), 300);
      }
    );
    it('実効防御力は0未満にならない',
      () => {
        assert.equal(dc.effectiveDamage(500, 100, 800), 500);
      }
    );
    it('ダメージは小数点以下を四捨五入して整数にする',
      () => {
        assert.equal(dc.effectiveDamage(620, 100, 30), 365);
      }
    );
  }
);