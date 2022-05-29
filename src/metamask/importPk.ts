import { Page } from 'puppeteer'

export const importPk =
  (page: Page) =>
  async (privateKey: string): Promise<void> => {
    await page.bringToFront()
    const accountSwitcher = await page.waitForSelector('.identicon')
    await accountSwitcher.click()
    const addAccount = await page.waitForSelector('.account-menu > div:nth-child(7)')
    await addAccount.click()
    const pKInput = await page.waitForSelector('input#private-key-box')
    await pKInput.type(privateKey)
    const importButton = await page.waitForSelector('button.btn-primary')
    await importButton.click()
  }
