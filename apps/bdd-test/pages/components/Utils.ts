import { expect } from "@playwright/test";
import { State } from "apps/bdd-test/utils/type";
import { Locator } from "playwright";

export async function verifyComponentState(locator: Locator, state: State) {
    console.log(`\tCommon:: Verify component state is ${state}`);
    switch (state) {
      case 'visible':
        await expect(locator).toBeVisible();
        break;
      case 'hidden':
        await expect(locator).toBeHidden();
        break;
      case 'enabled':
        await expect(locator).toBeEnabled();
        break;
      case 'disabled':
        await expect(locator).toBeDisabled();
        break;
      default:
        throw Error(`Invalid Component State ${state}`);
    }
}

export async function isButtonToggled(locator: Locator, attributeName: string) {
    const attributeValue = await locator.getAttribute(attributeName);
    if (attributeValue == null) {
        return false;
    }
    return true;
}