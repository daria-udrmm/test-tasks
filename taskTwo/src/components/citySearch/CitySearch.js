import { useEffect, useRef, useState, useCallback } from 'react';
import fetchJsonp from 'fetch-jsonp';
import './CitySearch.scss';
import debounce from 'lodash.debounce';

const CitySearch = () => {

    const [cities, setCities] = useState(null);
    const [search, setSearch] = useState('');
    const inputRef = useRef();
    const FREE = 'Free';

    useEffect(() => {
        const getCity = () => {
            fetchJsonp(`https://kladr-api.ru/api.php?query=${search}&contentType=city`)
            .then(data => data.json())
            .then(data => setCities(data.result))
            .catch(err => console.log('parsing failed', err))
        }
        getCity();
    }, [search])

    const makeList = (array) => {
        return array.map(element => {
            if (element.id !== FREE){
                return (
                    <div key={element.id}
                    onClick={() => {
                        inputRef.current.value = element.name;
                        setCities(null)
                    }}
                    className='city__one'>{element.name}</div>
                )
            }
        })
    }

    const russianLanguageTest = (event) => {
        let russianLang = /[а-яА-ЯёЁ]/i;
        if (russianLang.test(event.target.value) || event.target.value.length === 0){
            setSearch(event.target.value)
        }
    }

    const debouncedChangeHandler = useCallback(debounce(russianLanguageTest, 100), []);

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
                        onChange={debouncedChangeHandler}
                        />
                </label>
            </div>
            {checkResponse()}
        </div>
    )
}

export default CitySearch;