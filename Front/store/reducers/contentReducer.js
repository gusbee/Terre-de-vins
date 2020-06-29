/**
 * Déclaration du state initial
 */
const initialState = {
    posts: [],
    events: [],
    degustations: []
}

/**
 * 
 * @param {*} state => objet
 * @param {*} action => object
 */

 
function handleContent(state = initialState, action){
        let nextState //Déclaration de la variable qui représente la modification du state initial
        switch (action.type){            
            case 'UPDATE_POSTS':
                if(state.posts[0] !== action.value.data[0]){
                    nextState = {
                        ...state,
                        posts: action.value.data
                    }
                }
                return nextState || state
                break
    
            case 'UPDATE_EVENTS':
                if(state.events[0] !== action.value.data[0]){
                    nextState = {
                        ...state,
                        events: action.value.data
                    }
                }
                return nextState || state
                break
            
            case "UPDATE_DEGUSTATIONS":
                if (state.degustations[0] !== action.value.data[0]) {
                    nextState = {
                        ...state,
                        degustations: action.value.data
                    }
                }
                return nextState || state
                break
            
            default:
                return state // Si pas de changement détecté, on retourn le state initial
        }   
}

export default handleContent