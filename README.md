# Problem2: Re-routing/Forwarding Communication
## Login Form Example
This project is a simple login form written in Node JS, which implements the element of authentication through forwarding of http requests between the client and server at multiple endpoints. This program basically consists of two applications:
  - The Client App -> getway
  - The Server App -> userManagement  
  
To improve on the program's security, it is encrypted end to end using asymmetric key cryptography.The getWay App receives input from the user interface, encrypts these details using the public key and forwards the encrypted string to the userManagement App which decrypts the string using it's private key then queries the database(**login-node.sql**) with these decrypted details and sends back a response to the getWay.

## Getting Started
The Project is built with: 
```
Node.js
```

### Prerequisites
To get the program up and locally running on your system, follow these simple steps:
1. You will need to [download and setup Node JS](https://nodejs.org/en/) on your computer to run this program.
2. Provided in the project zip folder is the MySQL database (login-node.sql). You may import this to your MySQL Administration tool and ensure that it runs on default port 3306. The database has two tables:
    - Users table - contains data pertaining the registered users.
    - storedkeys table - stores the public key whenever generated
3. Open the applications(getWay & userManagement) on two different editor windows.
4. Then, run the following command on your editor's terminal to install all dependencies tied to the project as defined in the package.json file. You should repeat this step for both the getWay application and the userManagement application windows.
```
npm install
```
3. Still on the terminals, run the following command to start the projects on their dedicated ports. getWay listens to port 4000 while userManagement app listens to port 4001.
```
npm start
```
**Expected results:**

![12](https://user-images.githubusercontent.com/65035748/150553405-d412675b-2e07-43c4-9384-0281f7be9320.png)

</br>

## How to Use Project
After successfully starting both servers on the getway and usermanagement applications, and also connecting to MySQL, this is how to go about the project:   
1. On your web browser start the following.
```
http://localhost:4000/
```
**Expected results:**   
  This will bring up a Login Form UI to the user
  ![1233](https://user-images.githubusercontent.com/65035748/150556619-71c6d494-8118-45f8-a83d-ad0bd01ac8c7.png)

</br>

2. Input the following correct login details.   
```
email: vin@email.com
```
```
password: 123a
```
**Expected results:**   
  On Successful Login: 
  ![122](https://user-images.githubusercontent.com/65035748/150558556-783939ec-9530-442c-9de5-b384c91372e0.png)
     
  Unsuccessful Login:
  ![323](https://user-images.githubusercontent.com/65035748/150559004-d11cc4e6-94b0-4512-bab1-822428d61e16.png)

</br>

## Behind the scenes
### Sequence Diagram
This diagram explains the series of events taking place in the backend of the program between the getway application and the usermanagement application.   

![login sequence diagram](https://user-images.githubusercontent.com/65035748/150589771-4e7e4168-2dfe-42d4-a026-c87ef12fc236.png)   


1. When the usermanagement server is started, it calls a generate key function that initializes the Node-RSA keys where the private and public keys are extracted from. The private key is stored into an empty string, key_private, and the public key is sent to the /storeKeys endpoint on the getway application using an axios http client.   
 
![1111](https://user-images.githubusercontent.com/65035748/150591179-af41a165-b9b1-4e70-b839-4049a7c8cc88.png)   
In the /storeKeys endpoint, the public key is stored in the database in the storedkeys table.   
![fggh](https://user-images.githubusercontent.com/65035748/150592055-c34e570c-1286-40b1-9c7f-c19b4164018d.png)   

2. When running the getway app on port 4000, the user receives the login form UI where they fill in details. Upon clicking the submit button, the application hits the /login endpoint parsing the inserted details to a variable reqBody. After this a sendRequest function gets called, which first queries the db for the public key and uses it to encrypt the reqBody.   

![uio](https://user-images.githubusercontent.com/65035748/150593035-92b3bda4-0ccd-4255-b220-97e10a6b01d6.png)   

3. The next step is to forward the encrypted string using axios http client post method to the /authenticate endpoint in the usermanagement API to validate the entered details with database records.   

![klo](https://user-images.githubusercontent.com/65035748/150593757-115910ae-9705-49ba-9f2a-6206aaa3543c.png)   

4. In the API, at the /authenticate endpoint, we get the encrypted string and parse it as JSON. We then retrieve the private key locally stored key_private variable and use it to decrypt the string. The results of this is the sent email and password. We may then do a query on the database using these details and send back a response to the getway from our results. A response with the status code 200 means successful login whereas a response with status code 401 means the login was not successful.   
![lop](https://user-images.githubusercontent.com/65035748/150594863-3b7f6cf2-b945-4673-ace4-ab03035c22a7.png)   

![bcm](https://user-images.githubusercontent.com/65035748/150595114-e9bd7bf4-58c6-434b-b2c9-80472b228e67.png)   

5. The axios upon receiving the response from the API validates the status code and if it is 200 it will render the homepage to the user with a welcome display message. However, if the status code is 401, then it will render the login page and display an error message.   

![dks](https://user-images.githubusercontent.com/65035748/150596010-c95d8a81-dab2-43dc-bdc6-42201982cdbf.png)


## Contact
Name -> **Vincent Odhiambo Nyapuodi**   

Email -> **nyapuodivincent@gmail.com**   

Project Link - https://github.com/vincent-nyapuodi/Problem2-Forwarding-Communication
