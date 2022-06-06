import { Page } from 'puppeteer'

export const approve = (page: Page, selectAll: boolean) => async (): Promise<void> => {
  await page.bringToFront()
  await page.reload()

  try {
    if (selectAll) {
      const checkbox = await page.waitForSelector('.permissions-connect-choose-account__select-all > input', {
        timeout: 3000,
      })
      if (checkbox) await checkbox.click({ clickCount: 2 })
    }
  } catch (error) {
    console.log('Couldnt select all, maybe there is only one available.')
  }

  const button = await page.waitForSelector('button.button.btn-primary')
  if (button) await button.click()

  const connectButton = await page.waitForSelector('button.button.btn-primary')
  if (connectButton) await connectButton.click()
}
