import { TextFilter } from 'react-text-filter';

export const SearchBar = ({searchChangeHandelr}) => {
    const changeHandler = value => {
        searchChangeHandelr(value)
    }

    return (
        <TextFilter 
            className='form-control'
            onFilter={({ target: { value: filter } }) => changeHandler(filter)} />
    )
}