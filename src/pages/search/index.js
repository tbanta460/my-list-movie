import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './index.css'
import { Card, IsLoading } from '../../components';
import { setDataSearch } from '../../config/redux/action/setForm';
import { useDispatch, useSelector } from 'react-redux';
const Search = () => {
    const location = useLocation()
    const dispatch = useDispatch();
    const {setDataMovie} = useSelector(state => state)
    const {dataSearch} = setDataMovie
    useEffect(() => {
        const textValue = location.state.text
        const filterData = (dataMovies, value) => {
            const filterData = dataMovies.filter(res => {
                const indexTitle = res.original_title.toUpperCase().indexOf(value)
                if(indexTitle >= 0){
                    return res
                }
            })
            return dispatch(setDataSearch("dataSearch", filterData))
        }

        if(textValue !== null && textValue !== undefined){
            filterData(location.state.data.results,textValue.toUpperCase())
        }
    }, [location, dispatch])
    
    return(
        <>
            <div className="ctn-srch chd-home">
                <div className="chd-srch">
                    <h2>Showing all results for <span>{location.state.text.toUpperCase()}</span></h2>
                    <div className="srch-cards card">
                        {
                            dataSearch.length === 0
                            ?<IsLoading />
                            :location.state.text !== "" 
                                ?dataSearch.map(data => {
                                    return(
                                        <div key={data.id}>
                                        <Card res={data}/>
                                        </div>
                                    )
                                })
                                :(<h2>Hasil Tidak Ditemukan</h2>)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search