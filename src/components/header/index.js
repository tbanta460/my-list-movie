import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setSearchValue, getDataMovie } from '../../config/redux/action/setForm';
import { useSelector, useDispatch} from 'react-redux';
import "./index.css"
const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {setValue} = useSelector(state => state)
    const {valueSearch} = setValue

    const handleChangeEvent = async (e) => {
        dispatch(setSearchValue("valueSearch",e.target.value))
    }
    const handleClickEvent = async () => {
        const resData = await getDataMovie(1)
        dispatch(setSearchValue("valueSearch",""))
        navigate({
            pathname: "/search",
            search: `?search=${valueSearch}`
        }, {state:{data:resData, text: valueSearch}})
    }
    return(
        <>
        <header>
            <div className="ctn-hdr">
                <Link to="/" className="link">
                <h3>Home</h3>
                </Link>
                <input type="text" placeholder="Mencari" className="srch" value={valueSearch} name="search" onChange={handleChangeEvent}/>                
                <button className="btn-src btn" onClick={handleClickEvent}>Cari</button>
            </div>
        </header>
        </>
    )
}
export default Header