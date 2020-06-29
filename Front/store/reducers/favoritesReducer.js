/**
 * Déclaration du state initial
 */
const initialState = {
    favoritesIds: [],
    favoritesPosts: []
}

/**
 * 
 * @param {*} state => objet
 * @param {*} action => object
 */

 
function handleFavorites(state = initialState, action){
        let nextState
        switch (action.type){
            case 'TOOGLE_FAVORITE':
                const favoriteIndex = state.favoritesIds.indexOf(action.value.id)
                if(favoriteIndex < 0){
                    // L'article n'est pas encore dans les favoris, on l'ajoute.
                    nextState = {
                        ...state,
                        favoritesIds: [...state.favoritesIds, action.value.id],
                        favoritesPosts: [...state.favoritesPosts, action.value.post]
                    }
                } else {
                    // L'article est déjà dans les favoris, on le retire.
                    nextState = {
                        ...state,
                        favoritesIds: state.favoritesIds.filter( (item, index) => index !== favoriteIndex),
                        favoritesPosts: state.favoritesPosts.filter( (item, index) => index !== favoriteIndex)
                    }
                }
                return nextState || state
            default:
                return state // Si pas de changement détecté, on retourn le state initial
        }
}

export default handleFavorites