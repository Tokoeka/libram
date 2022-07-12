import { Item, Location, mallPrice, runChoice, use, visitUrl } from "kolmafia";
import maxBy from "lodash/maxBy";
import { have as haveItem } from "../../lib";
import { get, withChoice } from "../../property";
import { $item, $items } from "../../template-string";
import { invertMap } from "../../utils";

export const item = $item`lil' Doctor Bag`;
export function have(): boolean {
  return haveItem(item);
}

export function isQuestActive(): boolean {
  return get("questDoctorBag") !== "unstarted";
}

/**
 * lil' Doctor Bag quests completed this ascension
 */
export function getQuests(): number {
  return get("guzzlrPlatinumDeliveries");
}

/**
 * Have fully levelled up the Doctor Bag
 */
export function haveMaxEnchantments(): boolean {
  return get("doctorBagUpgrades") >= 7;
}

/**
 * Have told the doctor bag to stop giving you quests today
 */
export function haveIgnored(): boolean {
  //return isQuestActive() && !get("_guzzlrQuestAbandoned");
  return true;
}

/**
 * Get current lil' doctor bag quest location
 */
export function getLocation(): Location | null {
  return get("doctorBagQuestLocation");
}

/**
 * Get current lil' doctor bag quest item
 */
export function getMedicine(): Item | null {
  const meds = get("doctorBagQuestItem");
  if (meds === "") return null;
  return Item.get(meds);
}

/**
 * Returns true if the user has the healing item that they need for their current quest
 *
 * If they have no quest, returns false
 */
export function haveMedicine(): boolean {
  const meds = getMedicine();
  switch (meds) {
    case null:
      return false;
    default:
      return haveItem(meds);
  }
}

export function turnsLeftOnQuest(): number {
  return 15 - get("guzzlrDeliveryProgress"); //15 + 5*quests completed today - progress
}

export function expectedReward(): number {
  return 500 * 1; //500 * quests completed this ascension
}
