import {test}from '@playwright/test';
import { LoginPage } from '../page_object/login.po';
import { ContactPage} from '../page_object/contact.po';
const testData = require('../loginFixture/loginFixture.json');
const contactTestData = require('../loginFixture/contactFixture.json');
const {authenticateUser, createEntity} = require('../tests/helper.spec.js');

test.beforeEach(async ({page})=>{
    const login= new LoginPage(page);
    await page.goto('/');
    await login.login(testData.validUser.userName,testData.validUser.password);
})

test.describe('Contact testcases',()=>{
    test('Contact Add test',async({page,request})=>{
        const contact =new ContactPage(page);
        await contact.contactAdd(contactTestData.contact.firstName, contactTestData.contact.lastName, contactTestData.contact.dateOfBirth, contactTestData.contact.email, contactTestData.contact.phone, contactTestData.contact.address, contactTestData.contact.city, contactTestData.contact.state, contactTestData.contact.postal, contactTestData.contact.country);
        await contact.viewContact();
        await contact.validContactCreated(contactTestData.contact.firstName, contactTestData.contact.lastName, contactTestData.contact.dateOfBirth, contactTestData.contact.email, contactTestData.contact.phone, contactTestData.contact.address, contactTestData.contact.city, contactTestData.contact.state, contactTestData.contact.postal, contactTestData.contact.country);
        accessToken = await authenticateUser(testData.validUser.userName,testData.validUser.password)
        const id = await getEntity(accessToken, '/contacts','200',{request});
        await deleteEntity(accessToken, '/contacts/${id}',{request});
        await validateEntity(accessToken, '/contacts/${id}','404,',{request});
    })
})

    test('contact Edit test',async({page,request})=>{
        const Data = {
            "firstName": "Aayush",
            "lastName": "Shrestha",
            "birthdate": "2004-03-03",
            "email": "aayushreshta@example.com",
            "phone": "9898989898",
            "street1": "address1",
            "city": "city1",
            "stateProvince":"",
            "postalCode": "12345",
            "country": "Nepal",  
        };
        const contact = new ContactPage(page);
        const accessToken = await authenticateUser(testData.validUser.userName, testData.validUser.password, {request});
        await createEntity(Data,accessToken,'/contacts',{request});
        page.reload();
        
        await contact.viewContact();
        await contact.contactEdit(contactTestData.contactEdit.firstName);
        await contact.validContactCreated(contactTestData.contactEdit.firstName,Data.lastName,Data.birthdate,Data.email,Data.phone,Data.street1,Data.city,Data.stateProvince,Data.postalCode,Data.country);
        const id = await getEntity(accessToken,'/contacts','200',{request});
        await deleteEntity(accessToken,'/constact/${id}',{request});
        await validateEntity(accessToken,'/contacts/${id}','404',{request});
    })
   test.only('contact delete test', async ({page, request}) => {
    const data ={
      "firstName": "john",
      "lastName": "doe",
      "birthdate": "1990-01-01",
      "email":"johndoe@gmail.com",
      "phone": "1234567890",
      "street1": "address 1",
      "street2": "address 2", 
      "city": "city1",
      "stateProvince": "state1",
      "postalCode": "12345",
      "country": "Nepal"
    };
    const contact = new ContactPage(page);
    const accessToken = await authenticateUser(testData.validuser.userName, testData.password.request);
    await createEntity(data, accessToken, '/contacts', {request});
    page.reload();
    await contact.viewContact();
    const id = await getEntity(accessToken , '/contacts', '200',{request});
    await contact.contactDelete();
    await validateEntity(accessToken, '/contacts/${id}', '404', {request});
  });
  