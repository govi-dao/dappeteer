import { Page } from 'puppeteer'

import { TransactionOptions } from '..'

import { GetSingedIn } from './index'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const confirmTransaction =
  (page: Page, getSingedIn: GetSingedIn) =>
  async (options?: TransactionOptions): Promise<void> => {
    await page.bringToFront()
    if (!(await getSingedIn())) {
      throw new Error("You haven't signed in yet")
    }
    await page.waitForTimeout(500)
    await page.reload()

    if (options) {
      const editSelector = '.transaction-detail > .transaction-detail-edit > button:first-child'
      const edit = await page.waitForSelector(editSelector)
      await edit.click()

      await page.waitForSelector('button.btn-primary[disabled]')
      await page.waitForSelector('button.btn-primary:not([disabled])')

      if (options.gasLimit) {
        const gasLimitSelector = '.advanced-gas-controls .form-field:nth-child(1) .numeric-input > input'
        const gasLimit = await page.waitForSelector(gasLimitSelector)

        await page.evaluate(
          selector => ((document.querySelectorAll(selector)[0] as HTMLInputElement).value = ''),
          gasLimitSelector,
        )
        await gasLimit.type(options.gasLimit.toString())
      }

      if (options.gas) {
        const gasSelector = '.advanced-gas-controls .form-field:nth-child(2) .numeric-input > input'
        const gas = await page.waitForSelector(gasSelector)

        await page.evaluate(
          selector => ((document.querySelectorAll(selector)[0] as HTMLInputElement).value = ''),
          gasSelector,
        )

        await gas.type(options.gas.toString())
      }

      const saveSelector = '.btn-primary'
      const save = await page.waitForSelector(saveSelector)
      await save.click()
    }

    const confirmButton = await page.waitForSelector('.btn-primary:not([disabled])')
    await confirmButton.click()
  }
