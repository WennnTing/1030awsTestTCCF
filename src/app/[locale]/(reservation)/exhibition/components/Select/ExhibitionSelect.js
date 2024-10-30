import React from 'react'
import styles from './exhibitionSelect.module.scss'
import Select from 'react-select'

const ExhibitionSelect = ({ options, isSearchable = false, onChange, value, placeholder }) => {
    return (
        <Select
            options={options}
            isSearchable={isSearchable}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            className={styles.exhibitionSelect}
            classNamePrefix="select"
        />
    )
}

export default ExhibitionSelect