import { configureStore } from '@reduxjs/toolkit'
import { SetForm } from './reducer/setForm.js'
const store = configureStore({
    reducer: SetForm
})

export default store;