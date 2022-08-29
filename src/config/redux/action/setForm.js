export const setSearchValue = (formType, formValue) => {
	return {
		type: "SET_FORM_SEARCH", formType, formValue
	}
}
export const setDataSearch = (formType, formValue) => {
	return {
		type: "SET_DATA_SEARCH", formType, formValue
	}
}
export const setDataDetailsMovie = (formType, formValue) => {
	return {
		type: "SET_DATA_DETAILS_MOVIE", formType, formValue
	}
}
export const setMainData = (formType, formValue) => {
	return {
		type: "SET_DATA", formType, formValue
	}
}
export const setLoadingData = (formType, formValue) => {
	return {
		type: "SET_LOADING", formType, formValue
	}
}




export const getDataMovie = async (pages) => {
	return await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=15c2047d98e88876ec8163e3ee20f36c&language=en-US&page=${pages}`)
            .then(res => res.json())
            .then(data => data)
            .catch(error => error)
}

export const getDetailsMovie = async (id) => {
	return await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=15c2047d98e88876ec8163e3ee20f36c&language=en-US`)
			.then(res => res.json())
			.then(data => data)
			.catch(error => error.response)
}

export const postRating = async (id, dataValue, guest_session_id) => {
	return await fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=15c2047d98e88876ec8163e3ee20f36c&guest_session_id=${guest_session_id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(dataValue)
			})
			.then(res => res.json())
			.then(data => data)
			.catch(error => error.response)
}
export const getRequestToken = async () => {
	return await fetch('https://api.themoviedb.org/3/authentication/guest_session/new?api_key=15c2047d98e88876ec8163e3ee20f36c')
			.then(res => res.json())
			.then(data => data)
			.catch(error => error.response)
}
