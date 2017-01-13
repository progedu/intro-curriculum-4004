'use strict';

/**
 * ダメージが防御力や防御力貫通によってどのようなダメージになるのかを計算する関数
 *
 * 負の入力値があった場合には0として扱い、2000以上の入力値は2000として扱う。
 * 実効防御力は、防御力 - 防御力貫通 で定義され、
 * この実行防御力は、0未満にはならない。
 * ダメージ減少率は、実効防御力 / (100 + 実効防御力) で定義され、
 * ダメージは、攻撃力 * (1 - ダメージ減少率) を小数点以下で四捨五入した値となる。
 *
 * @param {Number} power 攻撃力
 * @param {Number} armor 防御力
 * @param {Number} armorPenetration 防御力貫通
 * @return {Number} ダメージ
 */
function effectiveDamage(power, armor, armorPenetration) {
  let effectiveArmor = normalize( normalize(armor) - normalize(armorPenetration) );
  const damageDecrease = effectiveArmor / (100 + effectiveArmor);
  return Math.round(normalize(power) * (1 - damageDecrease));
}

const MIN_PARAM = 0;
const MAX_PARAM = 2000;
/**
 * 異常な可能性のある入力値を正常値にする
 * @param {Number} n 異常な可能性のある入力値
 * @return {Number} 正常値
 */
function normalize(n) {
  if (n < MIN_PARAM) {
    return MIN_PARAM;
  } else if (n >= MAX_PARAM) {
    return MAX_PARAM;
  } else {
    return n;
  }
}

module.exports = {
  effectiveDamage: effectiveDamage
};
