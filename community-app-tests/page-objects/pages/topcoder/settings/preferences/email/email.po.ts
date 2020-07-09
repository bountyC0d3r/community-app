import { logger } from "../../../../../../logger/logger";
import * as appconfig from "../../../../../../app-config.json";
import { BrowserHelper, ElementHelper } from "topcoder-testing-lib";
import { SettingsPage } from "../../settings.po";
import { ConfigHelper } from "../../../../../../utils/config-helper";
import { SettingsPageConstants } from "../../settings.constants";

export class EmailPreferencesPage extends SettingsPage {
  /**
   * Gets the Community page
   */
  public async open() {
    await BrowserHelper.open(ConfigHelper.getPreferencesUrl());
    logger.info("User navigated to Preferences Page");
  }

  /**
   * Gets the prefernce  label
   * @param pref
   */
  private async getPrefLabel(pref: String) {
    const el = await ElementHelper.getElementByXPath(
      `//label[@for='pre-onoffswitch-${pref}']`
    );
    return el;
  }

  /**
   * Gets the preference switch used for toggling
   */
  private async getPrefSwitch(pref) {
    const el = await ElementHelper.getElementByXPath(
      `//label[@for='pre-onoffswitch-${pref}']//child::span[@class='onoffswitch-switch']`
    );
    return el;
  }

  /**
   * Returns whether a given pref is enabled or not
   * @param pref
   */
  public async isPrefEnabled(pref): Promise<boolean> {
    const prefLabel = await this.getPrefLabel(pref);
    const bgColor = await prefLabel.getCssValue("background-color");
    return bgColor === SettingsPageConstants.Colors.GreyColor ? false : true;
  }

  /**
   * Updates a pref if enabled from config
   * @param pref
   */
  public async updatePref(pref: string) {
    const prefSwitch = await this.getPrefSwitch(pref);
    await prefSwitch.click();
    await this.waitForSuccessMsg(this.successMsg);
  }
  /**
   * Gets the pref success message
   */
  public get successMsg() {
    return ElementHelper.getTagElementContainingText(
      "div",
      SettingsPageConstants.Messages.EmailPrefSuccessMessage
    );
  }
}
