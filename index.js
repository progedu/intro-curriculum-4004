'use strict';

/**
 * ダメージが防御や防御貫通によってどのような実効ダメージになるのかを計算する関数
 * 
 * 負の入力値があった場合には0として扱い、2000以上の入力値は2000として扱う。
 * 実効防御は、防御 - 防御貫通 で定義され、
 * この実効防御は、0未満にはならない。
 * ダメージ減少率は、実効防御 / (100 + 実効防御) で定義され、
 * 実効ダメージは、ダメージ * (1 - ダメージ減少率) を小数点以下で四捨五入した値となる。
 * 
 * @param {Number} damage ダメージ
 * @param {Number} armor 防御
 * @param {Number} armorPenetration 防御貫通
 * @return {Number} 実効ダメージ
 */
function effectiveDamage(damage, armor, armorPenetration) {
  let effectiveArmor = normalize(armor) - normalize(armorPenetration);
  effectiveArmor = effectiveArmor <= 0 ? 0 : effectiveArmor;
  let damageDecrease = effectiveArmor / (100 + effectiveArmor);
  return Math.floor(normalize(damage) * (1 - damageDecrease));
}

/**
 * 異常な可能性のある入力値を正常値にする
 * @param {Number} n 異常な可能性のある入力値
 * @return {Number} 正常値
 */
function normalize(n) {
  if (n < 0) {
    return 0;
  } else if (n >= 2000) {
    return 2000;
  } else {
    return n;
  }
}

module.exports = {
  effectiveDamage: effectiveDamage
};
