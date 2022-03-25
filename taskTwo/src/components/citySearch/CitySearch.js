import { useEffect, useRef, useState } from 'react';
import fetchJsonp from 'fetch-jsonp';
import './CitySearch.scss';

const CitySearch = () => {

    const [cities, setCities] = useState();
    const [search, setSearch] = useState('');
    const inputRef = useRef()

    useEffect(() => {
        const getCity = (city) => {
            fetchJsonp(`https://kladr-api.ru/api.php?query=${city}&contentType=city`)
                .then(data => data.json())
                .then(data => setCities(data.result))
                .catch(err => console.log('parsing failed', err))
        }
        getCity(search)
    }, [search])

    const makeList = (array) => {
        return array.map(elem => {
            if (elem.id !== 'Free'){
                return (
                    <div key={elem.id}
                    onClick={() => {
                        inputRef.current.value = elem.name;
                        setCities('')
                    }}
                    className='city__one'>{elem.name}</div>
                )
            }
        })
    }

    const russianLanguageTest = (e) => {
        let russianLang = /[а-яА-ЯёЁ]/i;
        if (russianLang.test(e.target.value) || e.target.value.length === 0){
            setSearch(e.target.value)
        }
    }

    const checkResponse = () => {
        if (cities?.length > 1) {
            return (
                <div className="city__bigList">
                    <div className='city__list'>
                        {makeList(cities)}
                    </div>
                </div>
            )
        } if (search?.length !== 0 && cities.length == 1) {
            return(
                <div className='city__undefined'>По вашему запросу городов не найдено</div>
            )
        } else {
            return null
        }
    }

    return(
        <div className="city__search">
            <div className="city__input">
                <label>
                    <input type="text"
                        placeholder="Введите город"
                        ref={inputRef}
                        onChange={(e) => russianLanguageTest(e)}
                        />
                </label>
            </div>
            {checkResponse()}
        </div>
    )
}

export default CitySearch;