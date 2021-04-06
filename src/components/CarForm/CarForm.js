import React, { useState, useContext, useEffect } from 'react';
import { Form, FormField, TextInput, Box, Button, FileInput } from 'grommet';
import { AppContext } from '../../context';
import './styles.scss';

const defaultValue = {
    brand: '',
    model: '',
    engineNumber: '',
    entryKM: '',
    buyValue: '',
    plate: '',
}

export default function CarForm() {
    const [value, setValue] = useState(defaultValue);
    const context = useContext(AppContext);

    const submitHandler = (e) => {
        e.preventDefault();
        context.newCar(value.brand, value.model, value.engineNumber, value.entryKM, value.buyValue, value.plate, value.image)
        setValue(defaultValue);
        //console.log('luego de enviado', value.image)
    }

    useEffect(() => {
        const preview = document.querySelector('img');
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();


        //console.log(file);

        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
        else {
            preview.src = "https://cdn4.iconfinder.com/data/icons/interface-79/24/add_small_interface_plus-512.png"
        }

        //console.log(value.image)
    }, [value.image])

    return (
        <div className="car-form-container">
            <Form
                className="form"
                value={value}
                onChange={nextValue => setValue(nextValue)}
                onSubmit={(e) => submitHandler(e)}
                onReset={() => setValue(defaultValue)}
            >
                <div className="car-form">
                    <div className="form-column">
                        <FormField className="input" label="Marca">
                            <TextInput placeholder="Volkswagen" name="brand" />
                        </FormField>
                        <FormField className="input" label="Modelo">
                            <TextInput placeholder="up!" name="model" />
                        </FormField>
                        <FormField className="input" label="Número de Motor">
                            <TextInput type="number" placeholder="12345" name="engineNumber" />
                        </FormField>
                    </div>
                    <div className="form-column">
                        <FormField className="input" label="Matrícula">
                            <TextInput placeholder="ABC1234" name="plate" />
                        </FormField>
                        <FormField className="input" label="Kilómetros de Entrada">
                            <TextInput type="number" placeholder="0" name="entryKM" />
                        </FormField>
                        <FormField className="input" label="Valor de Compra (USD)">
                            <TextInput type="number" placeholder="14890" name="buyValue" />
                        </FormField>
                    </div>
                    <div className="form-column last-form">
                        <div className="picture-form">
                            <Box className="input" direction="row" gap="small">
                                <img className="image" />
                            </Box>
                            <div className="file-input">
                                <FileInput className="file-input" type="file" name="image" />
                            </div>
                        </div>
                    </div>
                </div>
                <Box className="button" direction="row" gap="medium">
                    <Button type="submit" label="Enviar" primary />
                    <Button className="reset" type="reset" label="Borrar" />
                </Box>
            </Form>
        </div>
    )
}