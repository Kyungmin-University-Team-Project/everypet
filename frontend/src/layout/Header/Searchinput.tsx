import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Searchinput.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store/store';
import { setSearchInput } from '../../redux/features/searchSlice';

interface PlaceholderData {
    placeholders: string[];
}

const Searchinput = () => {
    const dispatch = useDispatch<AppDispatch>();
    const inputValue = useSelector((state: RootState) => state.search.input);
    const [placeholder, setPlaceholder] = useState<string>('');
    const location = useLocation();

    useEffect(() => {
        const fetchPlaceholders = async (): Promise<void> => {
            try {
                const response = await fetch('/mock/search_input_placeholder_texts.json');
                const data: PlaceholderData = await response.json();
                const randomPlaceholder =
                    data.placeholders[Math.floor(Math.random() * data.placeholders.length)];
                setPlaceholder(randomPlaceholder);
            } catch (error) {
                console.error('Failed to fetch placeholder texts:', error);
            }
        };

        fetchPlaceholders();
    }, [location]);

    useEffect(() => {
        dispatch(setSearchInput('')); // Reset input value
    }, [location, dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchInput(e.target.value));
    };

    const handleSearchClick = () => {
        console.log(inputValue);
    };

    return (
        <div className={styles.container}>
            <input
                type='text'
                className={styles.search__input}
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
            />
            <button className={styles.search__btn} onClick={handleSearchClick}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </div>
    );
};

export default Searchinput;
