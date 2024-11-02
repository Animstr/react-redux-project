import { useHttp } from "../../hooks/http.hook";
import { Formik, Form, Field } from 'formik';
import {useEffect, useState} from 'react'
import { usePostHeroMutation } from "../../Api/apiSlice";

const HeroesAddForm = () => {

    const {request} = useHttp();
    const [filter, setFilter] = useState([]);
    const [postHero, {isLoading}] = usePostHeroMutation();

    useEffect(() => {
        getFilters()
    }, [])

    const postNewHero = (values) => {
        postHero(values).unwrap();
        values = {}; 
    }

    const getFilters = () => {
        request("http://localhost:3001/filters")
        .then(data => setFilter(data))
    }

    const optionElements = filter.map((option, i) => {
        return <Select key={i} value={option}/>
    })

    return (
        <Formik
        initialValues={{ name: '', description: '', element: 'all'}}
        validate={values => {
            const errors = {};
            if (!values.name) {
            errors.name = 'Заполните поле';
            } else if (
            /\d/ig.test(values.name)
            ) {
            errors.name = 'Недоступное имя пользователя';
            }
            return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
            postNewHero(values);
            setSubmitting(false);
        }}
        className="border p-4 shadow-lg rounded">
            {({ isSubmitting, errors }) => (
                <Form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                        <Field 
                            type="text" 
                            name="name" 
                            className="form-control" 
                            id="name" 
                            placeholder="Как меня зовут?"/>{errors.name ? (
                                <div style={{color: 'red'}}>{errors.name}</div>
                              ) : null}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label fs-4">Описание</label>
                        <Field
                            as='textarea'
                            required
                            name="description" 
                            className="form-control" 
                            id="description" 
                            placeholder="Что я умею?"
                            style={{"height": '130px'}}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                        <Field
                            as="select" 
                            required
                            className="form-select" 
                            id="element" 
                            name="element">
                            {optionElements ? optionElements : null}
                        </Field>
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Создать</button>
                </Form>
            )}
        </Formik>
    )
}

const Select = ({value}) => {
    return (
        <option value={value}>{value}</option>
    )
}

export default HeroesAddForm;