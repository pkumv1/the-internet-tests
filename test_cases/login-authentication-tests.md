# Login Authentication Test Cases

## TC-001: Login Authentication - Valid Credentials

**Objective**: Verify that a user can successfully log in with valid credentials.

**Preconditions**:
- Application is accessible at https://the-internet.herokuapp.com/login
- Valid user credentials are available (username: tomsmith, password: SuperSecretPassword!)

**Test Steps**:
1. Navigate to the login page
2. Enter valid username "tomsmith" in the username field
3. Enter valid password "SuperSecretPassword!" in the password field
4. Click the Login button

**Expected Results**:
1. User is redirected to the secure area page
2. Success message "You logged into a secure area!" is displayed
3. Logout button is present

**Test Data**:
- Username: tomsmith
- Password: SuperSecretPassword!

**Test Type**: 
- Functional
- Security
- Acceptance

**Priority**: High

---

## TC-002: Login Authentication - Invalid Credentials

**Objective**: Verify that appropriate error messages are displayed when invalid credentials are used.

**Preconditions**:
- Application is accessible at https://the-internet.herokuapp.com/login

**Test Steps**:
1. Navigate to the login page
2. Enter invalid username "incorrectuser" in the username field
3. Enter any password in the password field
4. Click the Login button
5. Record error message
6. Clear form fields
7. Enter valid username "tomsmith"
8. Enter invalid password "wrongpassword"
9. Click the Login button
10. Record error message

**Expected Results**:
1. User remains on the login page
2. For invalid username: Error message "Your username is invalid!" is displayed
3. For invalid password: Error message "Your password is invalid!" is displayed
4. No access to secure area is granted

**Test Data**:
- Invalid Username: incorrectuser, Password: anypassword
- Valid Username: tomsmith, Invalid Password: wrongpassword

**Test Type**: 
- Functional
- Security
- Negative Testing

**Priority**: High

---

## TC-003: Login Authentication - SQL Injection Attempt

**Objective**: Verify that the login form is protected against SQL injection attacks.

**Preconditions**:
- Application is accessible at https://the-internet.herokuapp.com/login

**Test Steps**:
1. Navigate to the login page
2. Enter SQL injection string "' OR '1'='1" in the username field
3. Enter SQL injection string "' OR '1'='1" in the password field
4. Click the Login button

**Expected Results**:
1. User is not logged in
2. Appropriate error message is displayed
3. No database errors are exposed to the user
4. No unauthorized access is granted

**Test Data**:
- Username: ' OR '1'='1
- Password: ' OR '1'='1

**Test Type**: 
- Security
- Penetration Testing

**Priority**: Critical

---

## TC-004: Login Authentication - XSS Vulnerability Test

**Objective**: Verify that the login form is protected against Cross-Site Scripting (XSS) attacks.

**Preconditions**:
- Application is accessible at https://the-internet.herokuapp.com/login

**Test Steps**:
1. Navigate to the login page
2. Enter XSS payload "<script>alert('XSS')</script>" in the username field
3. Enter any text in the password field
4. Click the Login button

**Expected Results**:
1. The script should not be executed
2. No JavaScript alert box should appear
3. Form should properly escape or sanitize the input
4. Standard error message for invalid credentials should be displayed

**Test Data**:
- Username: <script>alert('XSS')</script>
- Password: anypassword

**Test Type**: 
- Security
- Penetration Testing

**Priority**: Critical

---

## TC-005: Login Authentication - Session Management

**Objective**: Verify that after successful login, a session is properly established and maintained.

**Preconditions**:
- Application is accessible at https://the-internet.herokuapp.com/login
- Valid user credentials are available (username: tomsmith, password: SuperSecretPassword!)

**Test Steps**:
1. Navigate to the login page
2. Enter valid username "tomsmith"
3. Enter valid password "SuperSecretPassword!"
4. Click the Login button
5. Refresh the secure area page
6. Navigate to a different page in the application and back to secure area

**Expected Results**:
1. After refresh, user should still be logged in
2. After navigation, user should remain logged in
3. Session should be maintained throughout the user flow

**Test Data**:
- Username: tomsmith
- Password: SuperSecretPassword!

**Test Type**: 
- Functional
- Security
- Session Management

**Priority**: High