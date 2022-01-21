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

### How to Use Project
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


1. When the usermanagement server is started, it calls a generate key function that initializes the Node-RSA keys where the private and public keys are extracted from. The private key is stored into an empty string, key_private, and the public key is sent to the /storeKeys endpoint on the getway application using an axios http client. In the /storeKeys endpoint, the public key is stored in the database in the storedkeys table.   
![1111](https://user-images.githubusercontent.com/65035748/150591179-af41a165-b9b1-4e70-b839-4049a7c8cc88.png)
![fggh](https://user-images.githubusercontent.com/65035748/150592055-c34e570c-1286-40b1-9c7f-c19b4164018d.png)
