const assert = require('chai').assert;
const webdriver = require('selenium-webdriver');
const { By, until } = webdriver;

/* To Use these functions the QA team needs to store their webElements in the below fashion,
and pass in the function

e.g. : 

const elementOne = {
  locator : '.classname .otherClasses',
  locatorType: 'css'
}

const elementTwo = {
  locator : '//div[@name='test'],
  locatorType: 'xpath'
}
/* 
-----------------------------------------------------------------
GET THE BY FUCNTIONS BASED UPON THE LOCATOR TYPE
-----------------------------------------------------------------
*/

//Function to get the By Type for for the locatorType
async function getByType(locatorType) {
  const locatorTypeLowerCase = locatorType.toLowerCase();
  if (locatorTypeLowerCase === 'css') {
    return By.css;
  } else if (locatorTypeLowerCase === 'id') {
    return By.id;
  } else if (locatorTypeLowerCase === 'xpath') {
    return By.xpath;
  } else if (locatorTypeLowerCase === 'classname') {
    return By.className;
  } else if (locatorTypeLowerCase === 'linktext') {
    return By.linkText;
  } else if (locatorTypeLowerCase === 'name') {
    return By.name;
  } else if (locatorTypeLowerCase === 'partialLinktext') {
    return By.partialLinkText;
  } else {
    return 'LocatorType is not supported, Please check the input!!';
  }
}

/* 
-----------------------------------------------------------------
FUCNTIONS TO WAIT FOR THE ELEMENT OR ELEMENTS
-----------------------------------------------------------------
*/

//Function to wait upto 60 secs by default to find the element, TIME can be customized by input
async function waitForElement(element, duration) {
  const byType = await getByType(element.locatorType);
  const time = duration === undefined ? 60000 : duration;
  try {
    await this.driver.wait(until.elementLocated(byType(element.locator)), time);
    return true;
  } catch (error) {
    return assert.ok(false,
      `--> Error Description: Unable to Locate Element after ${time} milliseconds!!! 
      Please find the error associated:  ${error}
      Hint:
      A: Please check your locator using Jquery once
      B: Please check the page load Time manually to wait properly for the Object
      `
    );
  }
}

//Function to wait upto 60 secs by default to find the elements, TIME can be customized by input
async function waitForElements(element, duration) {
  const byType = await getByType(element.locatorType);
  const time = duration === undefined ? 60000 : duration;
  try {
    await this.driver.wait(until.elementsLocated(byType(element.locator)), time);
    return true;
  } catch (error) {
    return assert.ok(false,
      `--> Error Description: Unable to Locate Elements after ${time} milliseconds!!! 
      Please find the error associated:  ${error}
      Hint:
      A: Please check your locator using Jquery once
      B: Please check the page load Time manually to wait properly for the Object
      `
    );
  }
}


/* 
-----------------------------------------------------------------
FUCNTIONS TO FIND ELEMENT OR ELEMENTS
-----------------------------------------------------------------
*/

/* Function to find the elements based upon the locator and locatorType 
This can be used to check whether the elements are present in a page or not by catching the length */
async function findElements(elements) {
  // await waitForElements.call(this, elements);
  const byType = await getByType(elements.locatorType);
  const currentElements = await this.driver.findElements(byType(elements.locator));
  return currentElements;
}

// Function to find the element based upon the locator and locatorType
async function findElement(element) {
  const isElementFound = await waitForElement.call(this, element);
  const byType = await getByType(element.locatorType);
  if (isElementFound) {
    const ele = await this.driver.findElement(byType(element.locator));
    return ele;
  } else {
    throw Error('Element is not found, something happened after waiting for element, Please check!')
  }
}

/* How to use the below shadow root Fucntion 
https://github.com/britishgas-engineering/ya-done/wiki/How-to-Use-the-Shadow-Root-Functions
*/
/* 
-----------------------------------------------------------------
FUCNTIONS TO FIND SHADOW ELEMENT OR ELEMENTS
-----------------------------------------------------------------
*/

/* Function to get innerText of elements inside shadow root */
async function getInnerTextOfShadowRootElement(shadowHostElement, shadowRootElement) {
  const shadowHost = await findElement.call(this, shadowHostElement);
  const shadowRoot = await this.driver.executeScript("return arguments[0].shadowRoot", shadowHost);
  const byType = await getByType(shadowRootElement.locatorType);
  const shadowRootElementFromWeb = await shadowRoot.findElement(byType(shadowRootElement.locator));
  return await this.driver.executeScript("return arguments[0].innerText;", shadowRootElementFromWeb);
}

async function clickShadowRootElement(shadowHostElement, shadowRootElement) {
  const shadowHost = await findElement.call(this, shadowHostElement);
  const shadowRoot = await this.driver.executeScript("return arguments[0].shadowRoot", shadowHost);
  const byType = await getByType(shadowRootElement.locatorType);
  const shadowRootElementFromWeb = await shadowRoot.findElement(byType(shadowRootElement.locator));
  await this.driver.executeScript("arguments[0].click();", shadowRootElementFromWeb);
}

async function clickShadowRootElementByCssSelector(shadowHostSelector, shadowELementSelector) {
  const clickOperation =
    'document.querySelector(`' + shadowHostSelector.locator + '`).shadowRoot.querySelector(`' + shadowELementSelector.locator + '`).click();'
  await this.driver.executeScript(clickOperation);
}

async function getInnerTextShadowRootElementByCssSelector(shadowHostSelector, shadowELementSelector) {
  const innerTextOperation =
    'return document.querySelector(`' + shadowHostSelector.locator + '`).shadowRoot.querySelector(`' + shadowELementSelector.locator + '`).innerText;'
  return await this.driver.executeScript(innerTextOperation);
}

async function enterValuesForShadowRootElement(shadowHostSelector, shadowELementSelector, value) {
  const enterValueOperation =
    'document.querySelector(`' + shadowHostSelector.locator + '`).shadowRoot.querySelector(`' + shadowELementSelector.locator + '`).value=' + '`' + value + '`;'
  await this.driver.executeScript(enterValueOperation);
}

async function getLengthForShadowRootElement(shadowHostSelector, shadowELementSelector) {
  const getLengthOperation =
    'return document.querySelector(`' + shadowHostSelector.locator + '`).shadowRoot.querySelector(`' + shadowELementSelector.locator + '`).length;'
  return await this.driver.executeScript(getLengthOperation);
}
/* Function to perform Jquery Action */
async function performJqueryAction(action) {
  try {
    await this.driver.executeScript(action);
    await this.driver.sleep(200);
  } catch (error) {
    assert.ok(false,
      `--> Error Description: Unable to Perfomr Action the element${error}`
    );
  }
}
/* 
-----------------------------------------------------------------
FUCNTIONS TO CLICK ELEMENT, ENTER VALUE AND SELECT FROM DROPDOWN
-----------------------------------------------------------------
*/

//Function to Click any element and sleeping or 500ms for sync
async function clickElement(element) {
  const ele = await findElement.call(this, element);
  ele.click();
  await this.driver.sleep(500);
}

//Function to enter Value
async function enterValue(element, value) {
  const ele = await findElement.call(this, element);
  try {
    ele.sendKeys(value);
    await this.driver.sleep(300);
  } catch (error) {
    assert.ok(false,
      `--> Error Description: Unable to enter the Value${error}`
    );
  }
}

//Function to select Value from drop Down --> only for select type with css
async function dropdownSelectByVisibleText(element, visibleText) {
  const ele = {
    locator: `${element.locator}>option[value='${visibleText}']`,
    locatorType: element.locatorType
  };
  await clickElement.call(this, ele);
}

/* 
-----------------------------------------------------------------
FUCNTIONS TO GET ELEMENT TEXT, ATTRIBUTE AND CURRENT URL
-----------------------------------------------------------------
*/

//Function to get the Text of an element, syncing for 200ms before getting the text 
async function getTextOfElement(element) {
  const ele = await findElement.call(this, element);
  await this.driver.sleep(200);
  const elementText = await ele.getText();
  return elementText;
}

//Function to get any attribute for any element
async function getAttribute(element, attributeName) {
  const ele = await findElement.call(this, element);
  try {
    return ele.getAttribute(attributeName);
  } catch (error) {
    return assert.ok(false,
      `--> Error Description: Unable to get the "${attributeName}" attribute of the element
      Selenium Error ::: ${error}
      `
    );
  }
}

//Function to get CurrentURL
async function getCurrentUrl() {
  try {
    return this.driver.getCurrentUrl();
  } catch (error) {
    return assert.ok(false,
      `--> Error Description: Unable to get the current URL, ${error}`
    );
  }
}

/* 
-----------------------------------------------------------------
DRIVER SLEEP FUNCTIONS 
-----------------------------------------------------------------
*/

//Function to wait for one second
async function waitOneSec() {
  await this.driver.sleep(1000);
}

//Function to sleep for short time for loading the page 3 seconds is default value
async function waitForPageLoad(duration) {
  const time = duration === undefined ? 3000 : duration;
  await this.driver.sleep(time);
}

/* 
-----------------------------------------------------------------
FUCNTIONS TO CHECK ELEMENTS ARE VISIBLE AND SCROLLING BY JQUERY
-----------------------------------------------------------------
*/


//Function to scroll to make the Object visible
async function scrollInto(element) {
  const ele = await findElement.call(this, element);
  try {
    await this.driver.executeScript('arguments[0].scrollIntoView(true);', ele);
    await this.driver.sleep(1000);
  } catch (error) {
    assert.ok(false,
      `Facing error while scrolling down using Jquery, please check in console once!!`
    );
  }
}

//Function to check Element is present or not
async function isElementPresent(element) {
  const byType = await getByType(element.locatorType);
  const elements = await this.driver.findElements(byType(element.locator));
  const result = (elements.length === 1) || (elements.length > 1);
  return result;
}

//Function to check if element is visible
async function isElementVisible(element) {
  try {
    const ele = await findElement.call(this, element);
    return await ele.isDisplayed();
  } catch (error) {
    return assert.ok(false,
      `--> Error Description: Element is not Visible: ${error}`);
  }

}

//Function to generate Numbers for specific digits
async function generateNumbers(digit) {
  let finalNumber;
  do {
    const requiredDigits = Math.pow(10, digit);
    finalNumber = Math.floor(Math.random() * requiredDigits);
  } while (finalNumber.toString().length !== digit)

  return finalNumber;
}

module.exports = {
  getByType: getByType,
  findElement: findElement,
  waitForElement: waitForElement,
  waitForElements: waitForElements,
  getTextOfElement: getTextOfElement,
  getAttribute: getAttribute,
  clickElement: clickElement,
  getCurrentUrl: getCurrentUrl,
  findElements: findElements,
  waitForPageLoad: waitForPageLoad,
  enterValue: enterValue,
  scrollInto: scrollInto,
  waitOneSec: waitOneSec,
  isElementPresent: isElementPresent,
  dropdownSelectByVisibleText: dropdownSelectByVisibleText,
  isElementVisible: isElementVisible,
  clickShadowRootElement: clickShadowRootElement,
  getInnerTextOfShadowRootElement: getInnerTextOfShadowRootElement,
  clickShadowRootElementByCssSelector: clickShadowRootElementByCssSelector,
  getInnerTextShadowRootElementByCssSelector: getInnerTextShadowRootElementByCssSelector,
  performJqueryAction: performJqueryAction,
  enterValuesForShadowRootElement: enterValuesForShadowRootElement,
  getLengthForShadowRootElement: getLengthForShadowRootElement,
  generateNumbers: generateNumbers
};