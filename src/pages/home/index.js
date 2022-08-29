import React, { useEffect, useState } from 'react';
import { Card, IsLoading } from '../../components';
import { getDataMovie, setMainData  } from '../../config/redux/action/setForm';
import { useSelector, useDispatch } from 'react-redux';
import './index.css'
const Home = () => {
    const [topScore, setTopScore] = useState([])
    const keyStorage = "SORTMOVIE";
    const textSort = ["alphabet", "score", "release"]
    const dispatch = useDispatch();
    const {setDataMovie} = useSelector(state => state)
    const {setData} = setDataMovie;

    
    // feature sort list by Alphabet, Score, and Release date
    const sortListMovies = async (textTitle, listAnims) => {
      let resSort;
      if(textSort.includes(textTitle) && textTitle === "alphabet"){
        
        resSort = await listAnims.sort((a,b) => a.original_title.localeCompare(b.original_title));
      }else if(textSort.includes(textTitle) && textTitle === "score"){
        resSort = await listAnims.sort((a,b) =>  {
          return parseInt(a.vote_average) - parseInt(b.vote_average)
        });
      }else {
        resSort = await listAnims.sort((a,b) =>  {
          return new Date(a.release_date) - new Date(b.release_date)
        });
      }
  
      return resSort
    }

    useEffect(() => {
      const getDataMovies = async () => {
        const resData = await getDataMovie(1);
        const resFilterByTopScore = resData.results.sort((a,b) =>  {
            return parseInt(b.vote_average) - parseInt(a.vote_average)
          }).slice(0, 3)
        setTopScore(resFilterByTopScore)

        const textTitle = localStorage.getItem(keyStorage)
        if(textTitle === null){

          // If localstorage is null then the movie list will be sorted by default
        
          dispatch(setMainData("setData", resData.results))
         
        }else{
          // If the localstorage is not null, the movie list will be sorted by the value it has
          const textTitletoObject = JSON.parse(textTitle).name
          const result = await sortListMovies(textTitletoObject.toString(), resData.results)
          dispatch(setMainData("setData", Array.from(result)))
        }
      }
      getDataMovies();
    }, [dispatch]);

    const handleClickEventSort = async (e) => {
      const textTitle = e.target.id.toString()

      if (typeof Storage !== "undefined") {
        // store value to localstorage if browser supports localstorage
        if(localStorage.getItem(keyStorage) === null){
          localStorage.setItem(keyStorage, JSON.stringify({name: textTitle}));
        }
        await localStorage.removeItem(keyStorage);
        await localStorage.setItem(keyStorage, JSON.stringify({name: textTitle}));
        window.location.reload()
      } else {
        // if browser doesn't support localstorage then use simple sort feature
        alert('Menggunakan Fitur Sort Sederhana Karena Browser Anda Tidak Memiliki LocalStorage')
        sortListMovies(textTitle, setData)
      }
    }

    // remove localstorage
    const handleClickEventRemoveSort = () => {
      localStorage.removeItem(keyStorage);
      window.location.reload()
    }
    return (
      <div className="App">
        <main>
          <div className="ctn">
            <div className="chd-home">
                <div className="ctn-mv">
                    <div className="chd-mvs">
                        <h2 className="txt-chd-mvs txt-hm">Top Rate</h2>
                        {topScore.length !==0 ?(<div className="chd-mv">
                          <div className="mc-mv wrp-cvr-mv">
                            {topScore.length!==0 && (<>
                              <img src={`https://image.tmdb.org/t/p/original${topScore[0].backdrop_path}`}alt="cover top score" className="tps-cvr" />
                              <div className="inf-mv">
                                  <h4 className="txt-tps-mv">{topScore[0].original_title}</h4>
                                  <p>{topScore[0].overview}</p>
                                  <button className="btn btn-clr btn-hidee">Lihat Desk</button>
                              </div></>)}
                          </div>
                          <div className="tps-mv-ant">
                              {topScore.length!==0 && topScore.map((dataTopScore,i) => {
                                  if(i > 0){
                                      return (
                                          <div className="mv-ant" key={dataTopScore.id}>
                                              <img src={`https://image.tmdb.org/t/p/original${dataTopScore.backdrop_path}`} className="cvr-ant" alt="tuhmbnail movie"/>
                                              <div className="ant-inf-mv">
                                                  <h4 className="txt-tps-mv-ant">{dataTopScore.original_title}</h4>
                                                  <button className="btn btn-clr btn-hidee">Lihat Desk</button>
                                              </div>
                                          </div>
                                      )
                                  }
                              })}
                          </div>
                        </div>): <IsLoading />}
                    </div>
                </div>
                <div className="ctn-srt">
                    {
                        textSort.map(text => {
                            return (<button className="btn btn-clr " onClick={handleClickEventSort} key={text}id={text}>Sort By {text.charAt(0).toUpperCase() + text.slice(1)}</button>)
                        })
                    }
                    <button className="btn btn-clr" onClick={handleClickEventRemoveSort} id="kembalikan">Default</button>
                </div>
                <div className="ctn-mc">
                  <h2 className="mc-pplr-txt txt-hm">Most Popular</h2>
                    <div className='card'>
                    {
                        localStorage.getItem(keyStorage) !== null && setData.length !== 0
                        ?setData.map((result) => {
                        return(
                            <div key={result.id}>
                            <Card res={result}/>
                            </div>
                        )
                        })
                        :setData.length !== 0 ? setData.map((result) => {
                            return(
                            <div key={result.id}>
                            <Card res={result}/>
                            </div>
                            )
                        })
                        :<IsLoading />
                    }
                    </div>
                </div>
            </div>
          </div>
        </main>
      </div>
    );
}

export default Home