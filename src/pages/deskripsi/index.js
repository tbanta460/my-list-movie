import React, { useEffect, useState } from'react';
import { useLocation } from 'react-router-dom';
import { getDetailsMovie, setDataDetailsMovie, postRating, getRequestToken } from '../../config/redux/action/setForm';
import { useDispatch, useSelector } from 'react-redux';
import { IsLoading } from '../../components';
import {FaStar} from 'react-icons/fa';
import './index.css'
const Deskripsi = () => {
    const [score, setScore] = useState(0)
    const [isRated, setIsRated] = useState(0)
    const location = useLocation();
    const dispatch = useDispatch();
    const {setDataMovie} = useSelector(state => state)
    const {setDetailMovie} = setDataMovie
    const keyStorage = "RATINGMOVIE"

     useEffect(() => {
        const detailsMovie = async () => {
        const getId = location.state.data.id
        const resData = await getDetailsMovie(getId)
        dispatch(setDataDetailsMovie("setDetailMovie", [resData]))
      }
      detailsMovie()
     }, [location, dispatch])

     useEffect(() => {

        const runRating = () => {
            if(typeof Storage !== "undefined"){
                let resValueRating;
                const getRatingStorage = localStorage.getItem(keyStorage)
                if(getRatingStorage === null){
                    resValueRating = 0
                } else {
                    const toObj = JSON.parse(getRatingStorage)
                    const {data} = toObj
                    const filterData = data.filter(resData => {
                        return parseInt(resData.id) === parseInt(setDetailMovie[0].id)
                    })
                    if(filterData.length !== 0){
                        resValueRating = filterData[0].score
                    }else {
                        resValueRating = 0
                    }
                }
                setIsRated(resValueRating)
            }else {
                alert("Anda Tidak Dapat Memberi Rating Karena Browser Tidak Mendukung Localstorage")
            }
        }

        setDetailMovie !== undefined && setDetailMovie.length !== 0 && runRating()
     }, [setDetailMovie])



     const handleSubmitRating = async (e) => {
        if(e.currentTarget.textContent.toUpperCase() === "SUBMIT"){
            let newArr = []
            let newObj = {
                value: parseInt(score) * 2
            }
            const getAccessRequestToken = await getRequestToken()
            const {guest_session_id} = getAccessRequestToken;
            const resRating = await postRating(setDetailMovie[0].id, newObj, guest_session_id)
            
            if(resRating.success){
                const getRatingStorage = localStorage.getItem(keyStorage)
                if(getRatingStorage === null){
                    
                    newArr.push({score: parseInt(score), id: parseInt(setDetailMovie[0].id)})
                    localStorage.setItem(keyStorage, JSON.stringify({data: newArr}))
                    
                }else {
                    const toObj = JSON.parse(getRatingStorage)
                    const {data} = toObj
                    data.push({score: score, id: setDetailMovie[0].id})
                    localStorage.setItem(keyStorage, JSON.stringify({data: data}))
                }
                window.location.reload()
            }
        }else {
            const getRatingStorage = localStorage.getItem(keyStorage)
            const toObj = JSON.parse(getRatingStorage)
            const {data} = toObj
            const filterData = data.filter(resData => {
                return parseInt(resData.id) !== parseInt(setDetailMovie[0].id)
            })
            localStorage.setItem(keyStorage, JSON.stringify({data: filterData}))
            window.location.reload()
        }
       
     }
    return(
        <>
            <div className="ctn-desk">
                {setDetailMovie.length === 0 ? <div className="loading"><IsLoading /></div>:(<div className="chd-desk">
                    <div className="bnr-desk">
                        <img src={`https://image.tmdb.org/t/p/original${setDetailMovie[0].backdrop_path}`} alt="banner" className="img-banner"/>
                    </div>
                    <div className="fll-desk">
                        <div className="ctn">
                            <div className="chd">
                                <div className="ctn-sdbr rltv-sdbr">
                                    <div className="wrp-img">
                                    <img src={`https://image.tmdb.org/t/p/original${setDetailMovie[0].poster_path}`} alt="gambar movie" className="desk-img"/>
                                    </div>
                                </div>
                                <div className="ctn-mc-d">
                                    <div className='desk-txt w-50'>
                                        <h2>{setDetailMovie[0].original_title}</h2>
                                        <p>{setDetailMovie[0].overview}</p>
                                        <div className="yr">
                                        <span className="my-rt">Your Rating:</span>
                                        {localStorage.getItem(keyStorage) !== null && isRated > 0
                                        ?<div className="ctn-str-y">
                                            <FaStar id="rating-1" className={`str-rtng-yr ${isRated >= 1 && "rated"}`} onClick={() => setScore(1)}/>
                                            <FaStar id="rating-2" className={`str-rtng-yr ${isRated >= 2 && "rated"}`} onClick={() => setScore(2)}/>
                                            <FaStar id="rating-3" className={`str-rtng-yr ${isRated >= 3 && "rated"}`} onClick={() => setScore(3)}/>
                                            <FaStar id="rating-4" className={`str-rtng-yr ${isRated >= 4 && "rated"}`} onClick={() => setScore(4)}/>
                                            <FaStar id="rating-5" className={`str-rtng-yr ${isRated >= 5 && "rated"}`} onClick={() => setScore(5)}/>
                                        </div>
                                        :<span>Anda Belum Memberi Rating</span>
                                        }
                                        </div>
                                        <div className={`ctn-str ${ isRated <= 0 ? "" : "sembunyikan"}`}>
                                            <FaStar id="rating-1" className={`str-rtng ${score >= 1 && "rated"}`} onClick={() => setScore(1)}/>
                                            <FaStar id="rating-2" className={`str-rtng ${score >= 2 && "rated"}`} onClick={() => setScore(2)}/>
                                            <FaStar id="rating-3" className={`str-rtng ${score >= 3 && "rated"}`} onClick={() => setScore(3)}/>
                                            <FaStar id="rating-4" className={`str-rtng ${score >= 4 && "rated"}`} onClick={() => setScore(4)}/>
                                            <FaStar id="rating-5" className={`str-rtng ${score >= 5 && "rated"}`} onClick={() => setScore(5)}/>
                                        </div>
                                        <button className="btn btn-clr" onClick={handleSubmitRating}>{
                                            isRated <= 0 ? "Submit" : "Remove"
                                        }</button>
                                    </div>
                                    <div className="desk-inf w-50">
                                        <div className="inf-mvi">
                                            <span>
                                                Original Title:
                                            </span>
                                            <span>
                                                {setDetailMovie[0].original_title}
                                            </span>
                                            
                                        </div>
                                        <div className="inf-mvi">
                                            <span>
                                               Status:
                                            </span>
                                            <span>
                                                {setDetailMovie[0].status}
                                            </span>
                                        </div>
                                        <div className="inf-mvi">
                                            <span>
                                               Genres:
                                            </span>
                                            <div className="genress">
                                                {setDetailMovie[0].genres.map(data => {
                                                    return [data.name]
                                                    
                                                }).join(', ')}
                                            </div>
                                        </div>
                                        <div className="inf-mvi">
                                            <span>
                                               Score:
                                            </span>
                                            <span>
                                                {setDetailMovie[0].vote_average}
                                            </span>
                                        </div>
                                        <div className="inf-mvi">
                                            <span>
                                               Total Vote:
                                            </span>
                                            <span>
                                                {setDetailMovie[0].vote_count}
                                            </span>
                                        </div>
                                        <div className="inf-mvi">
                                            <span>
                                               Release Date:
                                            </span>
                                            <span>
                                                {setDetailMovie[0].release_date}
                                            </span>
                                        </div>
                                        <div className="inf-mvi">
                                            <span>
                                               Budget:
                                            </span>
                                            <span>
                                                {setDetailMovie[0].budget.toLocaleString("en-US", {style:"currency", currency:"USD"})}
                                            </span>
                                        </div>
                                        <div className="inf-mvi">
                                            <span>
                                               Revenue:
                                            </span>
                                            <span>
                                                {setDetailMovie[0].revenue.toLocaleString("en-US", {style:"currency", currency:"USD"})}
                                            </span>
                                        </div>
                                        <div className="inf-mvi">
                                            <span>
                                               Populatiry:
                                            </span>
                                            <span>
                                                {setDetailMovie[0].popularity}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
        </>
    )
}

export default Deskripsi

