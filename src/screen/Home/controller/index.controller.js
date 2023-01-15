import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

///MODEL
import { PokemonEntity } from '../../../config/types'

///REDUX TYPES
import * as types from '../../../redux/types'

///API CALLS
import { getFormattedPokemonInfoApi } from '../../../shared/api_request_function'

const useController = () => {
  const dispatch = useDispatch()
  const { favorite } = useSelector((state) => state.pokemon)
  const { list, currentPage, nextPage, isGettingMoreData } = useSelector(
    (state) => state.pokemon.pokemons
  )
  const [isLoading, setIsLoading] = useState(false)
  const [errroModal, setErrorModal] = useState(false)
  const [page, setPage] = useState(1)

  useMemo(() => {
    if (isGettingMoreData) {
      fetchPokemon()
    }
  }, [page])



  async function fetchPokemon() {
    try {
      const [data, next] = await getFormattedPokemonInfoApi(nextPage)
      onloadingHideModal()
      dispatch({
        type: types.POPULATE_POKEMON_LIST,
        payload: {
          pokemons: [...data],
          currentPage: currentPage + 1,
          nextPage: next,
          isGettingMoreData: next != null ? true : false,
        },
      })
    } catch (error) {
      console.log(error)
      onloadingHideModal()
    }
  }

  const onSearch = (name) => {
    const result = list.filter((res) => res.name.toLowerCase().includes(name.toLowerCase()))
    return result
  }

  const onSearchFavorite = (name) => {
    const result = favorite.filter((res) => res.name.toLowerCase().includes(name.toLowerCase()))
    return result
  }

  const onNextPage = () => setPage((page) => currentPage + 1)

  const onloadingShowModal = () => {
    setIsLoading(true)
  }

  const onloadingHideModal = () => {
    setIsLoading(false)
  }

  const onShowError = () => {
    setIsLoading(false)
    setErrorModal(true)
  }

  const onHideError = () => {
    setErrorModal(false)
  }

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
  }

  return {
    isLoading,
    errroModal,
    onloadingShowModal,
    onloadingHideModal,
    onShowError,
    onHideError,
    onSearch,
    onSearchFavorite,
    onNextPage,
    isCloseToBottom,
  }
}

export default useController
