import { Provider } from 'react-redux'
import {setupStore} from 'app/store'
import { FC } from 'react'

interface IProvider {
    readonly children: JSX.Element
}

export const ProviderRedux: FC<IProvider> = ({ children }) => {
    return (
        <Provider store={setupStore}>
            {children}
        </Provider>
    )
}