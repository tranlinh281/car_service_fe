import {
    DialogActions,
    DialogContent,
    Autocomplete,
    DialogTitle,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { Form, Formik } from 'formik';
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createModel,
    listAllManufacturer
} from 'src/actions/manufacturerAction';
import { DisplayingErrorMessagesModelSchema } from 'src/services/ValidConstants';

const CreateModelDialog = ({ open, onClose }) => {
    const { manufacturers } = useSelector((state) => state.manufacturerListAll);
    const dispatch = useDispatch();
    console.log(manufacturers, 'debug manu list all');
    useEffect(() => {
        dispatch(listAllManufacturer());
    }, [listAllManufacturer]);
    const submitHandler = (data) => {
        dispatch(createModel(data));
        console.log(data, 'debug create model');
    };

    const handleReset = () => { };

    return (
        <Formik
            initialValues={{
                manufacturerName: '',
                models: []
            }}
            validationSchema={DisplayingErrorMessagesModelSchema}
            validateOnChange
            validateOnBlur
            onSubmit={submitHandler}
            onReset={handleReset}
        >
            {({ errors, handleBlur, handleChange, values }) => (
                <Dialog
                    onClose={onClose}
                    aria-describedby="scroll-dialog-description"
                    open={open}
                    maxWidth={'xs'}
                    fullWidth={true}
                >
                    <Form>
                        <DialogTitle id="customized-dialog-title" onClose={onClose}>
                            Thêm mới Loại xe
                        </DialogTitle>

                        <DialogContent dividers>
                            {/* <DialogContentText> */}
                            <Grid item>
                                {/* <Autocomplete
         multiple
         id="tags-filled"
         freeSolo
         renderTags={(value, getTagProps) =>
          value.map((option, index) => (
           <Chip
            variant="outlined"
            label={option}
            {...getTagProps({ index })}
           />
          ))
         }
         renderInput={(params) => ( */}
                                <TextField
                                    //    {...params}
                                    fullWidth
                                    label="Tên Loại xe"
                                    error={!!errors.models}
                                    helperText={errors.models}
                                    margin="normal"
                                    name="models"
                                    variant="outlined"
                                    value={values.models}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                )
                                {/* }
        /> */}

                                <FormControl
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    error={!!errors.manufacturerName}
                                >
                                    <InputLabel>Hãng</InputLabel>
                                    <Select
                                        name="manufacturerName"
                                        value={values.manufacturerName}
                                        onChange={handleChange}
                                        label="Hãng"
                                    >
                                        {manufacturers?.map((manufacturerName) => (
                                            <MenuItem value={manufacturerName.name}>
                                                {manufacturerName.name}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                    <FormHelperText>{errors.manufacturerName}</FormHelperText>
                                </FormControl>
                            </Grid>

                            {/* </DialogContentText> */}
                        </DialogContent>
                        <DialogActions>
                            <Button type="submit" color="primary" left>
                                Lưu
                            </Button>
                            <Button onClick={onClose} type="reset" color="secondary">
                                Hủy
                            </Button>
                        </DialogActions>
                    </Form>
                </Dialog>
            )}
        </Formik>
    );
};
export default memo(CreateModelDialog);
