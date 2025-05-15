# Dynamic Controls Test Cases

## TC-013: Dynamic Controls - Enable/Disable Elements

**Objective**: Verify that elements can be properly enabled and disabled via AJAX calls.

**Preconditions**:
- Application is accessible at https://the-internet.herokuapp.com/dynamic_controls

**Test Steps**:
1. Navigate to the dynamic controls page
2. Verify checkbox is present and enabled
3. Click "Remove" button
4. Wait for loading animation to complete
5. Verify checkbox is removed
6. Click "Add" button
7. Wait for loading animation to complete
8. Verify checkbox is added back
9. Verify input field is disabled
10. Click "Enable" button
11. Wait for loading animation to complete
12. Verify input field is enabled
13. Enter text in the input field
14. Click "Disable" button
15. Wait for loading animation to complete
16. Verify input field is disabled again

**Expected Results**:
1. Checkbox should be removed when "Remove" is clicked
2. Checkbox should be added when "Add" is clicked
3. Input field should be enabled when "Enable" is clicked
4. Input field should be disabled when "Disable" is clicked
5. Loading animation should display during AJAX calls
6. Appropriate success messages should appear after each operation

**Test Data**:
- Input field text: "Test input text"

**Test Type**: 
- Functional
- AJAX Interaction
- Dynamic Content

**Priority**: High

---

## TC-014: Dynamic Controls - Race Condition Testing

**Objective**: Verify the application handles concurrent/rapid AJAX requests appropriately.

**Preconditions**:
- Application is accessible at https://the-internet.herokuapp.com/dynamic_controls

**Test Steps**:
1. Navigate to the dynamic controls page
2. Click "Remove" button
3. Immediately (without waiting for completion) click "Add" button
4. Wait for all animations to complete
5. Click "Enable" button
6. Immediately (without waiting for completion) click "Disable" button
7. Wait for all animations to complete

**Expected Results**:
1. Application should handle rapid/overlapping requests gracefully
2. No JavaScript errors should occur in the console
3. Final state of elements should be consistent with the last requested operation
4. UI should not become unresponsive

**Test Type**: 
- Functional
- Stress Testing
- Edge Case
- Race Condition

**Priority**: Medium

---

## TC-015: Dynamic Controls - Network Failure Handling

**Objective**: Verify the application handles network failures during AJAX operations appropriately.

**Preconditions**:
- Application is accessible at https://the-internet.herokuapp.com/dynamic_controls
- Test environment allows simulation of network failures

**Test Steps**:
1. Navigate to the dynamic controls page
2. Simulate network disconnection
3. Click "Remove" button
4. Wait for timeout or error
5. Restore network connection
6. Click "Remove" button again
7. Wait for completion

**Expected Results**:
1. Application should display appropriate error messages when network is unavailable
2. UI should not become permanently unresponsive after failed request
3. After network is restored, operations should function normally
4. No data inconsistency should occur

**Test Type**: 
- Error Handling
- Network Resilience
- Negative Testing

**Priority**: Medium

---

## TC-016: Dynamic Controls - Accessibility During State Changes

**Objective**: Verify that accessibility features are maintained during dynamic state changes.

**Preconditions**:
- Application is accessible at https://the-internet.herokuapp.com/dynamic_controls
- Screen reader or accessibility testing tool is available

**Test Steps**:
1. Navigate to the dynamic controls page
2. Verify initial ARIA attributes and tab order
3. Click "Remove" button
4. During loading animation, check accessibility of the loading indicator
5. After operation completes, verify updated ARIA attributes
6. Repeat for "Enable" button

**Expected Results**:
1. Loading indicators should have appropriate ARIA roles and attributes
2. Focus should be properly managed during state changes
3. Screen readers should announce state changes
4. Tab order should remain logical after DOM changes
5. Color contrast should remain compliant

**Test Type**: 
- Accessibility
- WCAG Compliance
- Dynamic Content

**Priority**: Medium