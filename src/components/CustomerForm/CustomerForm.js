import React, { useState, useContext } from 'react';
import { Form, FormField, TextInput, Box, Button, MaskedInput } from 'grommet';
import { AppContext } from '../../context';
import './styles.scss';

const birthDateMask = [
    {
        length: 2,
        regexp: /^[0-2][0-9]$|^3[0-1]$|^[0-9]$/,
        placeholder: '29',
    },
    { fixed: ' / ' },
    {
        length: 2,
        regexp: /^0[1-9]$|^1[0-2]$|^[0-9]$/,
        placeholder: '02',
    },
    { fixed: ' / ' },
    {
        length: 4,
        regexp: /^([1-2]|19|20|19[0-9]|20[0-9]|19[0-9][0-9]|20[0-9][0-9])$/,
        placeholder: '1992',
    },
]

const defaultValue = {
    firstName: '',
    lastName: '',
    ci: '',
    email: '',
    birthDate: '',
    phone: '',
}

export default function CustomerForm() {

    const [value, setValue] = useState(defaultValue);

    const context = useContext(AppContext);

    const submitHandler = (e) => {
        e.preventDefault();
        context.newCustomer(value.firstName, value.lastName, value.ci, value.phone, value.email, value.birthDate)
        setValue(defaultValue)
    }

    return (
        <div className="customer-form-container">
            <Form
                className="form"
                value={value}
                onChange={nextValue => setValue(nextValue)}
                onSubmit={(e) => submitHandler(e)}
                onReset={() => setValue(defaultValue)}
            >
                <div className="customer-form">
                    <div className="form-column">
                        <FormField className="input" label="Nombre">
                            <TextInput placeholder="Agustín" name="firstName" required />
                        </FormField>
                        <FormField className="input" label="Apellido">
                            <TextInput placeholder="Fernández" name="lastName" required />
                        </FormField>
                        <FormField className="input" label="Cédula de Identidad">
                            <TextInput type="number" name="ci" placeholder="12345678" required />
                        </FormField>
                    </div>

                    <div className="form-column">
                        <FormField className="input" label="Fecha de Nacimiento">
                            <MaskedInput name="birthDate"
                                mask={birthDateMask}
                                required
                            />
                        </FormField>
                        <FormField className="input" type="email" label="Email">
                            <TextInput name="email" placeholder="agustinfernandez@ejemplo.com" required />
                        </FormField>
                        <FormField className="input" label="Teléfono">
                            <TextInput type="number" name="phone" placeholder="26045555" required />
                        </FormField>
                    </div>
                </div>

                <Box className="button" direction="row" gap="medium">
                    <Button type="submit" label="Enviar" primary />
                    <Button type="reset" label="Borrar" />
                </Box>
            </Form>
        </div>
    )
}