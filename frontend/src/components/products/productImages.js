// Maps the `image` key in dummyData.json products to bundled PIAX assets.
import packWithPad from '../../assets/home/piax_assets/04_card_pad_pack.png'
import dayPack from '../../assets/home/piax_assets/28_pack_everyday.png'
import nightPack from '../../assets/home/piax_assets/27_pack_night.png'
import heavyPack from '../../assets/home/piax_assets/29_pack_travel.png'
import linersPack from '../../assets/home/piax_assets/31_pack_sensitive_skin.png'
import firstPeriodPack from '../../assets/home/piax_assets/30_pack_first_period.png'
import customBox from '../../assets/home/piax_assets/52_step4_box.png'
import trialPack from '../../assets/home/piax_assets/51_step3_pack.png'
import singlePad from '../../assets/home/piax_assets/50_step2_pad.png'
import shieldPad from '../../assets/home/piax_assets/05_card_shield_pad.png'
import phone from '../../assets/home/piax_assets/49_step1_phone.png'
import leavesLeft from '../../assets/home/piax_assets/11_leaves_left.png'
import leavesRight from '../../assets/home/piax_assets/12_leaves_right.png'
import leafSprig from '../../assets/home/piax_assets/10_leaf_sprig.png'
import trustDelivery from '../../assets/home/piax_assets/16_trust_icon_delivery.png'
import trustPackage from '../../assets/home/piax_assets/18_trust_icon_package.png'
import trustLab from '../../assets/home/piax_assets/14_trust_icon_lab.png'
import trustLeaf from '../../assets/home/piax_assets/15_trust_icon_leaf.png'
import trustPayment from '../../assets/home/piax_assets/17_trust_icon_payment.png'

// Each product image lists one or more layers; bundles stack several packs.
export const productImages = {
  'soft-xl': [packWithPad],
  day: [dayPack],
  night: [nightPack],
  heavy: [heavyPack],
  liners: [linersPack],
  custom: [customBox],
  bundle: [dayPack, nightPack, firstPeriodPack],
  trial: [trialPack],
}

export const artwork = {
  packWithPad, singlePad, shieldPad, phone, leavesLeft, leavesRight, leafSprig, customBox, trialPack,
  trustDelivery, trustPackage, trustLab, trustLeaf, trustPayment,
}
