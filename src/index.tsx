import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from "./Redux/store/index"
import { Provider, useDispatch } from "react-redux"
import { ApolloClient } from '@apollo/client';
import { URi, domen } from 'Const/Const';
import { InMemoryCache } from '@apollo/client/cache';
import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({
    uri: `http://${domen}/graphql`,
    cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>
);
