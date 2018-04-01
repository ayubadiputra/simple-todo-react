# Simple Todo App Using React and Flux

### Description
Simple manage your todo by adding your current tasks in the list. Mark your complete task, so you can focus on unfinished tasks today. You can edit the task title or delete your existing tasks too.

### Learn how to refactor codebase to use Flux
You can find the vanilla React version in `legacy/react`.
- Declare Flux Dispatcher
- Create all needed actions
- Create store to handle the actions
- Add view-controller on the components
- Implement the actions in view-controller

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
- Mark all tasks or unmark your completed tasks

### Tools Used
- [Create React App](https://github.com/facebook/create-react-app)

### FIXED Issues
#### 0.0.1
- FIXED ~Not optimized yet, still render all components~ Most of the components already use `shouldComponentUpdate`.
- FIXED ~Updating states are not optimized yet~ Avoid mutating object for updating the states (not all states actually) to fix an issue with current and next state arguments in `shouldComponentUpdate`.
- FIXED ~There is no PropTypes~
