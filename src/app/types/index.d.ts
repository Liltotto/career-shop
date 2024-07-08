declare type RootState = ReturnType<typeof import('../store').setupStore.getState>
declare type AppDispatch = typeof import('../store').setupStore.dispatch