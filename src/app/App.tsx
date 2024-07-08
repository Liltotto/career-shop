import { ProviderRedux as Provider } from './providers'
import { AppRouter } from './routers'

import './styles/index.scss'

function App() {
    return (
        <Provider>
            <AppRouter />
        </Provider>
    )
}

export default App