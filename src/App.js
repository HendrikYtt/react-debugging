import React, { useEffect, useState } from 'react'

function App() {
    const [users, setUsers] = useState([])
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseUsers = await fetch('https://jsonplaceholder.typicode.com/users')
                const usersData = await responseUsers.json()

                const responseTodos = await fetch('https://jsonplaceholder.typicode.com/todos')
                const todosData = await responseTodos.json()

                setUsers(usersData)
                setTodos(todosData)
            } catch (error) {
                console.error('An error occurred:', error)
            }
        }

        fetchData()
    }, [])

    const productivityScore = (userId) => {
        const userTodos = todos.filter(todo => todo.userId === userId)
        const completedTodos = userTodos.filter(todo => todo.completed)
        return ((completedTodos.length / userTodos.length) * 100).toFixed(2)
    }

    return (
        <>
            <h1>Users:</h1>
            {users.map((user) => {
                const userTodos = todos.filter(todo => todo.userId === user.id)
                const completedTodosCount = userTodos.filter(todo => todo.completed).length
                const pendingTodosCount = userTodos.length - completedTodosCount
                return (
                    <div key={user.id}>
                        <h2>{user.name}</h2>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phone}</p>
                        <p>Website: {user.website}</p>
                        <p>Company: {user.company.name}</p>
                        <h3>To-Do Summary:</h3>
                        <p>Productivity Score: {productivityScore(user.id)}%</p>
                        <p>Total Tasks: {userTodos.length}</p>
                        <p>Completed Tasks: {completedTodosCount}</p>
                        <p>Pending Tasks: {pendingTodosCount}</p>
                        <h2>--------------------</h2>
                    </div>
                )
            })}
        </>
    )
}

export default App
