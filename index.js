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
 * 【補足】攻撃／防御ともにキャラクター属性（火=0、水=1、草=2）を追加
 * 
 * @param {Number} atkAttr 攻撃側属性
 * @param {Number} defAttr 防御側属性
 * @param {Number} power 基礎攻撃力
 * @param {Number} armor 防御力
 * @param {Number} armorPenetration 防御力貫通
 * @return {Number} ダメージ
 */
function effectiveDamage(atkAttr, defAttr ,power, armor, armorPenetration) {
  let attributePower = attributeCulc(atkAttr, defAttr, power);
  power = power + attributePower;
  let effectiveArmor = normalize(armor) - normalize(armorPenetration);
  effectiveArmor = effectiveArmor <= 0 ? 0 : effectiveArmor;
  const damageDecrease = effectiveArmor / (100 + effectiveArmor);
  return Math.round(normalize(power) * (1 - damageDecrease));
}

/**
 * 攻撃／防御 の属性相性から、属性ダメージを計算
 * 上述した通り、キャラクター属性は（火=0、水=1、草=2）のいずれか
 * @param {Number} a 攻撃側の属性値
 * @param {Number} d 防御側の属性値
 * @param {Number} p 基礎攻撃力
 * @return {Number} 属性ダメージ
 */
function attributeCulc(a, d, p){
  if ((a === 0 && d === 1) || (a === 1 && d === 2) || (a === 2 && d === 0) ){
    //攻撃側の相性が悪いので、基礎攻撃力マイナス５％
    return -(p * 0.05);
  }else if( (a ===1 && d ===0) || (a ===0 && d === 2) || (a === 2 && d === 1)){
    //攻撃側の相性が良いので、基礎攻撃力プラス５％
    return (p * 0.05);
  } else{
    return 0;
  }
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
