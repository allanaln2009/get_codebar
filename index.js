//setx /m path "%path%;C:\nodejs\selenium_test\bin"
const fs = require('fs');

const { Builder, By, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
chrome.setDefaultService(new chrome.ServiceBuilder('bin/chromedriver.exe').build());

(async function myFunction() {
  let driver = await new Builder().forBrowser('chrome').build();
  await getSabesp(driver);
})();

async function getSabesp(driver) {
  await driver.get('https://www9.sabesp.com.br/agenciavirtual/pages/template/siteexterno.iface?idFuncao=22');
  var element;
  console.log(await driver.getCurrentUrl());
  await sleep(1);

  //Fill RGI
  element = await driver.findElement(By.id("frmhome:rgi1"));
  await element.sendKeys("04812565/20");
  //Click in next
  element = await driver.findElement(By.id("frmhome:j_id172"));
  await proceed(element);

  ///*
  //Get data to compare and validate
  var rgi = await driver.findElement(By.id("frmhome:j_id163-0-0")).getText();
  var name = await driver.findElement(By.id("frmhome:j_id163-1-0")).getText();
  var addr = await driver.findElement(By.id("frmhome:j_id163-2-0")).getText();
  console.log(rgi, name, addr);
  //*/
  //Click in next
  //element = await driver.findElement(By.id('frmhome\:j_id206'));
  //element = await driver.findElement(By.xpath("//li[2]/a/b/span"));
  //element = await driver.findElement(By.xpath('//a[@id=\'frmhome\:j_id206\']/b/span'));
  element = await driver.findElement(By.xpath("//a[@id='frmhome:j_id206']/b/span"));
  await proceed(element);

  //Mark checkbox
  element = await driver.findElement(By.id("frmhome:table:0:j_id185"));
  await element.click();
  //Select optionbox to show codebar
  element = await driver.findElement(By.id("frmhome:j_id356:_4"));
  await element.click();
  await sleep(0.11);
  //Click in next
  element = await driver.findElement(By.id("frmhome:j_id380"));
  await proceed(element);

  var final_date = await driver.findElement(By.id("frmhome:table1:0:j_id162")).getText();
  var code_bar = await driver.findElement(By.id("frmhome:table1:0:j_id168")).getText();
  var value = await driver.findElement(By.xpath("//tr[@class='iceDatTblRow marginBottom25Row row1']/td[3]")).getText();
  //var value = await driver.findElement(By.id("frmhome:table1:0:j_id168")).getText();
  console.log(final_date, code_bar, value);

  /*
  //var element = await driver.findElement(By.css('input[title=Search]'));
  let image = await driver.takeScreenshot();
  fs.writeFileSync('out.png', image, 'base64');
  var imageSearch = driver.findElement(By.xpath("//a[contains(text(), 'Images')]"));
  await imageSearch.click();
  */
}

async function sleep(delay, log = false) {
  if (log) {
    console.log("Esperando " + delay + " segundo(s)");
  }
  var ms = delay * 1000;
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  });
}

async function proceed(element) {
  await element.click();
  await sleep(0.45);
}


//https://www9.sabesp.com.br/agenciavirtual/pages/template/siteexterno.iface?idFuncao=22

/*

driver.navigate().to("https://selenium.dev");
await driver.navigate().back();
await driver.navigate().forward();
driver.navigate().refresh();
driver.getTitle();
await driver.getWindowHandle();


*/