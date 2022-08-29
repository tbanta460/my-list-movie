const initState = {
	setValue:{
		valueSearch:""
	},
    setDataMovie:{
        dataSearch:[],
        setData:[],
        setDetailMovie:[],
    },
    setLoading:{
        loadingHome: false,
        loadingDesk: false,
        loadingSearch: false
    },
}

export const SetForm = (state = initState, action) => {
	switch(action.type){
        
		case "SET_FORM_SEARCH":
            return{
                ...state,
                setValue:{
                    ...state.setValue,
                    [action.formType]: action.formValue
                }
            }
        case "SET_DATA_SEARCH":       
            return{
                ...state,
                setDataMovie:{
                    ...state.setDataMovie,
                    [action.formType]: action.formValue
                }
            }
        case "SET_DATA_DETAILS_MOVIE":       
            return{
                ...state,
                setDataMovie:{
                    ...state.setDataMovie,
                    [action.formType]: action.formValue
                }
            }
        case "SET_DATA":
            return{
                ...state,
                setDataMovie:{
                    ...state.setDataMovie,
                    [action.formType]: action.formValue
                }
            }
        case "LOADING_HOME":
            return{
                ...state,
                setLoading:{
                    ...state.setLoading,
                    [action.formType]: action.formValue
                }
            }
        case "LOADING_DESK":
            return{
                ...state,
                setLoading:{
                    ...state.setLoading,
                    [action.formType]: action.formValue
                }
            }
        case "LOADING_SEARCH":
            return{
                ...state,
                setLoading:{
                    ...state.setLoading,
                    [action.formType]: action.formValue
                }
            }
        case "SET_LOADING":
            return{
                ...state,
                setLoading:{
                    ...state.setLoading,
                    [action.formType]: action.formValue
                }
            }
		default:
		return state
	}
}