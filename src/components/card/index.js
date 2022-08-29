import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'
const Card = ({res}) => {
    return(
        <>
            <div className="ctn-card">
                <div className="img-rlt">
                    <img className="cvr-mvi"src={`https://image.tmdb.org/t/p/original${res.poster_path}`} alt={`cover ${res.original_title}`}/>
                    <h4 className="ttl-mvi">{res.original_title}</h4>
                    <span className="scr-crd">{res.vote_average}</span>
                    <span className="rls-crd">{res.release_date}</span>
                </div>
                
                <Link to={{pathname: `/deskripsi/${res.id}`}} state={{data:res}}>
                    <button className="btn-mvi btn btn-clr btn-o-desk">Lihat Desk</button>
                </Link>
            </div>
        </>
    )
}

export default Card