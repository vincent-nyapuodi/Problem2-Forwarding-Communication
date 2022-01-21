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
