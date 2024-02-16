import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from "react-redux";
import store from "./app/store"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <GoogleOAuthProvider clientId="940296097962-egah6j1696g4klui60c73bvksgn6ladb.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
      </Provider>
  </React.StrictMode>,
)
