# redux理解和手写
## 基本组成
### store
存储和管理数据状态，一个store可以包含多个reducer
### reducer
执行者：是一个函数，可以接收之前的状态的action（prestate,action），返回新的state
### action
执行方案：是一个对象，需要传递给reducer去执行，改变store的数据，通常使用函数的形式创建（保证每次派发action对象唯一）
* 默认action是一个对象。需要发送请求的action，需要action是一个函数，我们才可以发送请求---借助react-thunk

**如何使用**
用户通过dispatch去派发action，交给reducer处理后，改变state的状态

