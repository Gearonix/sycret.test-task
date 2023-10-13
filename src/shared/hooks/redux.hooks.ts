import      { TypedUseSelectorHook } from 'react-redux'
import      { useDispatch }          from 'react-redux'
import      { useSelector }          from 'react-redux'

import type { AppDispatch }          from '../../redux/store'
import type { RootState }            from '../../redux/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
