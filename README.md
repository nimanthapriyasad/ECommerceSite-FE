# EMart - Single Vendor E-Commerce Platform

![GitHub language count](https://img.shields.io/github/languages/count/Team-Accident/E-Mart-Frontend)
![GitHub top language](https://img.shields.io/github/languages/top/Team-Accident/E-Mart-Frontend)
![GitHub repo size](https://img.shields.io/github/repo-size/Team-Accident/E-Mart-Frontend)

EMart is a online ecommerce tool that helps customers to buy items. Here the customers are not able to
sell products. Only one shop can add products to this site. And the users can purchase the products according to their needs. Here the admin user can add the products to the platform using admin dashboard.

This web application was developed using ReactJs and Material UI has used as the component library for the UI elements. 

## Home page

<img width="1436" alt="Screenshot 2022-07-18 at 21 36 38" src="https://user-images.githubusercontent.com/59884818/179554598-62c96ffc-4472-4214-b3f6-1aa262774541.png">

## Admin page

<img width="1436" alt="Screenshot 2022-07-18 at 21 41 00" src="https://user-images.githubusercontent.com/59884818/179555351-860f880e-325a-4113-9cf4-5c4d9f5d2a67.png">

## Sign in page

<img width="1436" alt="Screenshot 2022-07-18 at 21 40 09" src="https://user-images.githubusercontent.com/59884818/179555427-4df71062-9eac-4013-a8c0-1680eb492641.png">

## Orders page

<img width="1436" alt="Screenshot 2022-07-18 at 21 41 45" src="https://user-images.githubusercontent.com/59884818/179555829-a532f4e7-3e2d-4b09-ab92-7a5fa0147975.png">

## Product add edit page for admin

<img width="1436" alt="Screenshot 2022-07-18 at 21 42 00" src="https://user-images.githubusercontent.com/59884818/179555894-3422adea-1db4-4e32-8543-2a79e8ab7844.png">


# Set up instructions

Requirements needed
- NodeJS
- Azure storage account (You can run the web application without this but you cannot upload images to the product)

As all the other node projects you need to run `npm i` to install the required packages.
Then you need to add an .env file in the root of the project which contains the credentials for Azure Storage account. Add the following environmental variables to .env file and change their values accordingly.
```js
REACT_APP_STORAGESASTOKEN="YOUR_STORAGE_ACCESS_TOKEN"
REACT_APP_STORAGERESOURCENAME="YOUR_STORAGE_RESOURCE_NAME"
```

As well as this web application needs a backend to operate. Without a proper backend you cannot do anything. You can find the repository of the backend of this application by this [url](https://github.com/Team-Accident/ecommerce-backend). To configure the backend to the web application you need to change a variable value in the src/constants/index.js file at line number 1. 
~~~js
export const HOST_URL = 'YOUR_BACKEND_URL';
~~~
