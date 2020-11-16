import { Form } from 'react-bootstrap'

export const SearchBar = props => {

    return (
        <Form>
            <Form.Control type="text" placeholder="nombre de lista" />
        </Form>
    )
}