# Simple Todo App Using React

### Description
Simple manage your todo today by adding your current tasks in the list. Mark your complete task, so you can focus on you unfinished tasks today. You can edit task title or delete your existing tasks too. It also includes a feature to clear all your complete tasks if needed.

### Features
- Submit new task
- Check or uncheck completed task
- Edit task title
- Remove task
- Filter tasks based on the status

### Issues
- Doesn't support Ajax yet
- The UI needs improvement

### Incoming Features
- Save data via Ajax
- Multiple days
- More info about the task
- Drag and drop
- Limit tasks number to increase focus
- Add Flux to handle state

### Tools Used
- [Create React App](https://github.com/facebook/create-react-app)

### FIXED Issues
#### 0.0.1
- FIXED ~Not optimized yet, still render all components~ Most of the components already use `shouldComponentUpdate`.
- FIXED ~Updating states are not optimized yet~ Avoid mutating object for updating the states (not all states actually) to fix an issue with current and next state arguments in `shouldComponentUpdate`.
- FIXED ~There is no PropTypes~
