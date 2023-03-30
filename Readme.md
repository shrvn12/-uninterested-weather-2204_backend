# Tooth Tracker API documentation
- This repository contains API documentation for Tooth-Tracker

## 1. Overview

Basic API endpoint = `https://tooth-tracker.cyclic.app/`.

## 2. User
- Registration
    - URL: `https://tooth-tracker.cyclic.app/register`
    - Parameters:
    ```
    {
        name: string,
        date_of_birth: YYYY-MM-DD,
        phone: 123456789 (7 characters or more),
        email: string,
        password: user_password (5 characters or more),
        role: (admin or default user)
    }
    ```
    - Responses
        - 200 (Ok): `{msg: Registration successful as ${user.role}}`
        - 409 (account already exists): `{"msg": "Email is already registered"}`
        - 401 (missing credentails): `{"msg": "Please provide name, date_of_birth(YYYY-MM-DD) ,phone, e-mail & Password"}`
        - 411 (invalid credentails): `{"msg": "Password must be of length 5"}`
        - 422 (invalid credentails): `{"msg": "Please provide valid phone number"}`

- Login
    - URL: `https://tooth-tracker.cyclic.app/login`
    - Parameters:
    ```
    {
        email: string,
        password: user_password (5 characters or more)
    }
    ```
    - Responses
        - 200 (Ok): `{msg: Login successful as ${user.role}}`
        - 401 (account does not exists): `{"msg": "Account does not exists"}`
        - 401 (missing credentails): `{"msg": "Please provide, e-mail & Password"}`
        - 411 (invalid credentails): `{"msg": "Password must be of length 5"}`

- Check Providers
    - URL: `https://tooth-tracker.cyclic.app/doctors`
    - Parameters: none
    - Response: `[doctor's data...]`

- Check Slots
    - URL: `https://tooth-tracker.cyclic.app/slots`
    - Parameters: none
    - Response: `[slot's data...]`

- Book Appointment
    - URL: `https://tooth-tracker.cyclic.app/newMeeting`
    - Parameters:
    ```
    {
        category: string,
        sub_category: string,
        slotId: number
    }
    ```
    - Responses
        - 200 (Ok): `{msg: Meeting Initialised, rows}`
        - 401 (Missing Credentials) : `{"msg": "Please provide category, sub category and slotId"}`
        - 404 (Not found) : `{msg: Slot Not available}`
        - 409 (Conflicting categories): `{"msg": "This slot is not available for provided category or sub_category"}`

## 3. Admin

**Note**- You need to login with admin account to perform below operations.

- Users
    - URL: `https://tooth-tracker.cyclic.app/admin/users`
    - Parameters: none
    - Response: `[users data...]`

- Delete a User
    - URL: `https://tooth-tracker.cyclic.app/admin/deleteuser/:id`
    - Parameters: userId as params
    - Responses
        - 404 (Not Found): `{msg: User does not exist}`
        - 200 (Ok): `{msg: User deletion successful}`

- Add Provider
    - URL: `https://tooth-tracker.cyclic.app/admin/addDoctor`
    - Parameters:
    ```
    {
        name: string,
        speciality: string,
        sub_speciality: string,
        desgree: string
    }
    ```
    - Responses:
        - 401 (Missing credentials): `{msg:'Please provide name ,speciality and degree'}`
        - 200 (Ok): `{msg: 'Doctor registration successful'}`

- Add Slot
    - URL: `https://tooth-tracker.cyclic.app/admin/addSlot`
    - Parameters: 
    ```
    {
        category: string,
        sub_category: string,
        date: YYYY-MM-DD,
        start: HH:MM (24Hrs clock),
        duration: minutes (number)
    }
    ```

- DB Operations
    - URL: `https://tooth-tracker.cyclic.app/admin/query`
    **Important** - This operation has access to complete database, be careful while using this route
    - Parameters:
    ```
    {
        query: 'write your MySQL query here' (string)
    }
    ```
    - Responses:
        - 404 (Not found): `{msg : 'please write your queries inside an object with key as 'query''}`
        - Query Response