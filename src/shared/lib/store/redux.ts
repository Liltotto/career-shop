
// // import { RootState } from '@reduxjs/toolkit/query';
// // import { AppDispatch,RootState} from 'app/types';
// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// import { RootState } from '@reduxjs/toolkit/query'
// import { AppDispatch, RootState } from 'app/types'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector